import { fromDate, getLocalTimeZone, parseAbsoluteToLocal, ZonedDateTime, DateValue } from "@internationalized/date";

export namespace DateTimeUtils {
  export function fromISOtoZonedDateTime(isoString: string): ZonedDateTime {
    return parseAbsoluteToLocal(isoString);
  }

  export function fromDateValueToISO(dateValue: DateValue): string {
    return dateValue.toDate(getLocalTimeZone()).toISOString();
  }

  export function fromLocalToZonedDateTime(date: Date): ZonedDateTime {
    return fromDate(date, getLocalTimeZone());
  }

  export function fromDateValueToLocal(dateValue: DateValue): Date {
    return dateValue.toDate(getLocalTimeZone());
  }
}
