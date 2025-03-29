import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Row,
  Column,
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
  HeaderGroup,
} from "@tanstack/react-table";
import clsx from "clsx";
import { TFunction } from "i18next";
import { useCallback, useMemo, useRef, CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { TabItem } from "@/components/platform/Tabs/Tabs";
import { CargoFinancesTabItemsEnums } from "@/components/platform/logistics/quotes/finances/CargoFinancesTabs";
import { Loader } from "@/components/ui/status/Loader/Loader";
import { Typography } from "@/components/ui/text/Typography/Typography";
import { QuoteFinancesContext } from "@/data/quoteAccount/quoteAccount.context";
import { QuoteAccountModels } from "@/data/quoteAccount/quoteAccount.models";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClass?: string;
    cellClass?: string;
    sortClass?: string;
    showShadow?: string;
  }
}

export type ListData<T> = Omit<QuoteAccountModels.QuoteAccountResponseDto, "items"> & {
  items?: T[];
};

export type ExpandedTableTableWrapper<T> = Omit<TableDef<T>, "tableColumns"> & {
  tableColumns?: (t: TFunction) => ColumnDef<T>[];
  isQuoteDisabled: boolean;
};

export type TableDef<T> = {
  query: UseQueryResult<ListData<T>>;
  tableColumns: (t: TFunction, isQuoteDisabled: boolean) => ColumnDef<T>[];
  emptyText?: string;
  isQuoteDisabled: boolean;
};

const getCommonPinningStyles = <T,>(column: Column<T, unknown>): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getStart("left")}px` : undefined,
    opacity: 1,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  };
};

const TableRow = <T,>({ headerGroup, isQuoteDisabled }: { headerGroup: HeaderGroup<T>; isQuoteDisabled: boolean }) => (
  <tr className="flex h-[36px] w-full flex-1">
    {headerGroup.headers.map((header, index, array) => {
      const { column, id, colSpan } = header;
      const columnMeta = column.columnDef.meta ?? {};

      if (isQuoteDisabled && (index === 0 || index === array.length - 1)) {
        return null;
      }

      return (
        <th
          key={id}
          colSpan={colSpan}
          // IMPORTANT: do not edit or remove this!
          style={{ ...getCommonPinningStyles(column) }}
          /* eslint-disable-next-line tailwindcss/no-custom-classname */
          className={clsx(
            "flex items-center pl-3",
            index === 0 && "justify-center",
            index > 1 && index < array.length - 1 && "border-l border-solid border-l-elevation-outline-1",
            index === array.length - 1 && "pr-4",
            column.getIsPinned() ? "bg-elevation-background" : "",
            columnMeta.showShadow,
            columnMeta.headerClass,
          )}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      );
    })}
  </tr>
);

/**
 * [:todo] Rewrite this shitshow off an component!
 */
const DraggableRow = <T,>({
  activeTab,
  row,
  isQuoteDisabled,
}: {
  activeTab: TabItem;
  row: Row<T>;
  isQuoteDisabled: boolean;
}) => {
  const { type, id } = row.original as any;
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
    scale: 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="relative flex min-h-[36px] flex-1 cursor-pointer border-b-[1px] border-solid border-b-elevation-outline-1 p-0"
    >
      {row.getVisibleCells().map((cell, cellIndex, array) => {
        const { column } = cell;
        const columnMeta = column.columnDef.meta ?? {};
        const isInternal = activeTab.value === CargoFinancesTabItemsEnums.Enum.INTERNAL;

        if (type === "DIVIDER" && cellIndex > 2 && cellIndex < array.length - 1 && isInternal) {
          return null;
        }

        if (type === "DIVIDER" && cellIndex > 2 && !isInternal) {
          return null;
        }

        if (type === "TEXT" && cellIndex > 2 && cellIndex < array.length - 1) {
          return null;
        }

        if (isQuoteDisabled && (cellIndex === 0 || cellIndex === array.length - 1)) {
          return null;
        }

        return (
          <td
            key={cell.id}
            id={`cell-btn-dropdown-${cellIndex}`}
            // IMPORTANT: do not edit or remove this!
            style={{
              ...getCommonPinningStyles(column),
              ...(type === "TEXT" && cellIndex === 1
                ? {
                    minWidth: "660px",
                    alignItems: "flex-start",
                  }
                : {}),
              ...(type === "DIVIDER" && cellIndex === 1 ? { minWidth: "120px" } : {}),
              ...(type === "DIVIDER" && cellIndex === 2
                ? {
                    backgroundImage: "linear-gradient(to right, #2c6942 50%, transparent 50%)",
                    backgroundSize: "10px 1px",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat-x",
                    width: "100%",
                  }
                : {}),
            }}
            className={clsx(
              "relative box-border flex items-start justify-start pt-[2px]",
              cellIndex === 0 && "justify-center",
              (cellIndex === 0 || cellIndex === array.length - 1) && type === "TEXT" && "!items-start pt-2",
              cellIndex > 0 && "pl-3",
              columnMeta.showShadow,
              cellIndex === 2 && type === "DIVIDER" && "w-full",
              cellIndex === 2 && type === "TEXT" && "w-full",
              column.id === "right" && (type === "DIVIDER" || type === "TEXT") ? "pr-0" : "",
              cellIndex === array.length - 1 && type === "CHARGE" && "pr-4",
              column.getIsPinned() ? "bg-elevation-background" : "",
              columnMeta.cellClass,
              !isInternal && type === "DIVIDER" && cellIndex === 1 && "w-36",
            )}
          >
            {flexRender(column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export const ExpandedTable = <T extends { id: string }>({
  emptyText,
  query,
  tableColumns,
  isQuoteDisabled,
}: TableDef<T>) => {
  const { updateAccountItemMutation, cargoParams, activeTab } = QuoteFinancesContext.useFinances();
  const { t } = useTranslation();
  const ref = useRef(null);
  const data = useMemo(() => query.data?.items ?? [], [query.data?.items]);
  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id), [data]);
  const columns = useMemo(() => tableColumns(t, isQuoteDisabled), [t, tableColumns, isQuoteDisabled]);
  const getCoreRowModelCallback = useCallback(getCoreRowModel, []);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning: {
        left: ["leftSticky"],
        right: ["rightSticky"],
      },
    },
    rowCount: query?.data?.items?.length || 0,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModelCallback(),
    columnResizeMode: "onChange",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const newIndex = over?.data?.current?.sortable.index ?? 0;
      const oldIndex = active?.data?.current?.sortable.index ?? 0;
      updateAccountItemMutation.mutate({
        quoteId: cargoParams.quoteId,
        officeId: cargoParams.officeId,
        itemId: dataIds[oldIndex] as string,
        data: {
          orderPosition: newIndex + 1,
        },
      });
    }
  };

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}));

  if (query.isLoading || !data) {
    return (
      <div className="mx-auto flex w-full justify-center pt-[25%]">
        <Loader size="l" />
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="relative flex w-full flex-1 flex-col overflow-x-scroll">
        <table className="relative w-full px-4">
          <thead className="border-b border-b-elevation-outline-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} headerGroup={headerGroup} isQuoteDisabled={isQuoteDisabled} />
            ))}
          </thead>
          <tbody ref={ref} className="">
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows.map((row) => (
                <DraggableRow key={row.id} row={row} activeTab={activeTab} isQuoteDisabled={isQuoteDisabled} />
              ))}
            </SortableContext>
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="flex flex-grow items-start justify-center">
            <Typography size="label-3" className="overflow-hidden text-ellipsis py-10 text-interactive-tertiary-on">
              {emptyText ?? t("shared.table.noData")}
            </Typography>
          </div>
        )}
      </div>
    </DndContext>
  );
};
