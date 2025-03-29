import { UseQueryResult } from "@tanstack/react-query";
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { TFunction } from "i18next";
import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import { ArrowDownTableIcon } from "@/assets/icons/general/ArrowDownTable";
import Pagination from "@/components/shared/pagination";
import { Typography } from "@/components/ui/text/Typography/Typography";
import { CommonModels } from "@/data/common/common.models";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClass?: string;
    cellClass?: string;
    sortClass?: string;
  }
}

export type PaginationData<T> = Omit<CommonModels.PaginationDto, "items"> & {
  items?: T[] | null;
};

export type TableWrapper<T> = Omit<TableDef<T>, "tableColumns"> & {
  tableColumns?: (t: TFunction) => ColumnDef<T>[];
};

export type TableDef<T> = {
  query: UseQueryResult<PaginationData<T>>;
  tableColumns: (t: TFunction) => ColumnDef<T>[];
  onRowClick?: (row: T) => void;
  onDoubleClick?: (row: T) => void;
  emptyText?: string;
  className?: string;
  selectedId?: string;
  addedBottomPadding?: string;
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState> | undefined;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
};

export const Table = <T extends any>({
  query,
  tableColumns,

  onRowClick,
  onDoubleClick,
  emptyText,
  className,
  selectedId,
  addedBottomPadding = "pb-2",
  pagination,
  setPagination,
  sorting,
  setSorting,
}: TableDef<T>) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const columns = useMemo(() => tableColumns(t), [t, tableColumns]);

  const getCoreRowModelCallback = useCallback(getCoreRowModel, []);
  const getSortedRowModelCallback = useCallback(getSortedRowModel, []);
  const getPaginationRowModelCallback = useCallback(getPaginationRowModel, []);
  const data = useMemo(() => query.data?.items ?? [], [query.data?.items]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    rowCount: query.data?.totalItems,
    getCoreRowModel: getCoreRowModelCallback(),
    getSortedRowModel: getSortedRowModelCallback(),
    getPaginationRowModel: getPaginationRowModelCallback(),
    onPaginationChange: setPagination,
    manualPagination: true,
    onSortingChange: setSorting,
    manualSorting: true,
    autoResetPageIndex: false,
    autoResetExpanded: false,
  });

  return (
    <div className={clsx("relative flex w-full flex-1 flex-col", addedBottomPadding)}>
      <div className="relative flex w-full overflow-x-scroll">
        <table className={clsx("block w-full px-3", className)}>
          <thead className="sticky top-0 flex w-full flex-1 justify-between border-b border-b-elevation-outline-1">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex h-[36px] w-full flex-1 gap-2">
                {headerGroup.headers.map((header, index, array) => {
                  const columnMeta = header.column.columnDef.meta ?? {};
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      /* eslint-disable-next-line tailwindcss/no-custom-classname */
                      className={clsx(
                        "flex items-center",
                        index === 0 ? "pl-4" : "border-l border-solid border-l-elevation-outline-1",
                        index === array.length - 1 && "pr-4",
                        columnMeta.headerClass,
                      )}
                    >
                      <button
                        type="button"
                        aria-label="Sort column"
                        {...{
                          className: clsx(
                            "select-none text-interactive-tertiary-on",
                            header.column.getCanSort()
                              ? "flex h-[24px] cursor-pointer items-center rounded-[4px] px-1 hover:bg-elevation-surface-1"
                              : "cursor-default",
                            index > 0 ? "ml-[7px]" : "ml-[-4px]",
                            columnMeta.sortClass,
                          ),
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ArrowDownTableIcon width={18} height={18} className="rotate-180" />,
                          desc: <ArrowDownTableIcon width={18} height={18} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody ref={ref} className="relative block w-full overflow-auto">
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr
                  key={row.id}
                  className={clsx(
                    "flex max-h-[50px] min-h-[36px] flex-1 cursor-pointer gap-2 border-b-[1px] border-solid border-b-elevation-outline-1 hover:bg-elevation-surface-0",
                    selectedId === (row.original as any).id && "bg-elevation-surface-0",
                  )}
                  onClick={() => {
                    if (!onRowClick) {
                      return;
                    }
                    onRowClick(row.original);
                  }}
                  onDoubleClick={() => {
                    if (!onDoubleClick) {
                      return;
                    }
                    onDoubleClick(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell, cellIndex, array) => {
                    const columnMeta = cell.column.columnDef.meta ?? {};
                    return (
                      <td
                        key={cell.id}
                        id={`cell-btn-dropdown-${index}`}
                        className={clsx(
                          "relative flex items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap",
                          cellIndex === 0 ? "pl-4" : "border-l border-solid border-l-[transparent] pl-3",
                          cellIndex === array.length - 1 && "pr-4",
                          columnMeta.cellClass,
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && data.length > 0 && (
        <Pagination
          currentPage={pagination.pageIndex}
          onPageSizeChange={(newPageSize: number) => {
            table.setPagination({
              pageIndex: 1,
              pageSize: newPageSize,
            });
          }}
          goToPage={(pageNum: number) => {
            table.setPageIndex(pageNum);
          }}
          pageSize={pagination.pageSize}
          totalItems={query.data?.totalItems ?? 0}
          showPagination
        />
      )}
      {data.length === 0 && (
        <div className="flex flex-grow items-start justify-center">
          <Typography size="label-3" className="overflow-hidden text-ellipsis text-interactive-tertiary-on">
            {emptyText ?? t("shared.table.noData")}
          </Typography>
        </div>
      )}
    </div>
  );
};
