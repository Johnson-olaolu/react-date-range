import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
  addWeeks,
} from 'date-fns';

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfLastFourWeeks: startOfWeek(addWeeks(new Date(), -4)),
  startOfLastSixMonths: startOfMonth(addMonths(new Date(), -6)),
  startOfLastThreeMonths: startOfMonth(addMonths(new Date(), -4)),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: '4 Weeks',
    range: () => ({
      startDate: defineds.startOfLastFourWeeks,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: '3 Months',
    range: () => ({
      startDate: defineds.startOfLastThreeMonths,
      endDate: defineds.endOfYesterday,
    }),
  },

  {
    label: '6 Months',
    range: () => ({
      startDate: defineds.startOfLastSixMonths,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: 'All Time',
    range: () => ({
      startDate: null,
      endDate: null,
    }),
  },
  // {
  //   label: 'This Month',
  //   range: () => ({
  //     startDate: defineds.startOfMonth,
  //     endDate: defineds.endOfMonth,
  //   }),
  // },
  // {
  //   label: 'Last Month',
  //   range: () => ({
  //     startDate: defineds.startOfLastMonth,
  //     endDate: defineds.endOfLastMonth,
  //   }),
  // },
]);

export const defaultInputRanges = [
  {
    label: 'days up to today',
    range(value) {
      return {
        startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: 'days starting today',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];
