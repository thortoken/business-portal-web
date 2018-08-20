import moment from 'moment';

export const PERIODS = {
  ONE_WEEK: 'ONE_WEEK',
  TWO_WEEKS: 'TWO_WEEKS',
  MONTH: 'MONTH',
};

export const weekOfYear = weeksToAdd => {
  return moment(
    moment(
      moment()
        .year()
        .toString()
    ).add(weeksToAdd, 'weeks')
  );
};

const getFirstWeekOfTheYear = () => {
  return moment(
    moment()
      .year()
      .toString()
  ).startOf('isoWeek');
};

export const getCurrentWeek = () => {
  return moment().week();
};

export const getCurrentWeekPeriod = () => {
  return { startDate: moment().startOf('week'), endDate: moment().endOf('week') };
};

export const getStartPeriodWeek = () => {
  const currentWeek = moment().week();
  return currentWeek - (currentWeek % 2 === 0 ? 1 : 0);
};

export const getCurrentTwoWeeksPeriod = () => {
  let startDate = null;
  let endDate = null;

  if (moment().week() <= 2) {
    startDate = getFirstWeekOfTheYear();
    endDate = weekOfYear(1).endOf('week');
  }

  if (moment().week() > 2) {
    let startWeek = getStartPeriodWeek();

    startDate = weekOfYear(startWeek).startOf('week');
    endDate = weekOfYear(startWeek + 1).endOf('week');
  }

  return { startDate, endDate };
};

export const getCurrentMonthPeriod = () => {
  return { startDate: moment().startOf('month'), endDate: moment().endOf('month') };
};

export const getPreviousTwoWeeksPeriod = () => {
  let startWeek = getStartPeriodWeek();

  let startDate = weekOfYear(startWeek - 2).startOf('week');
  let endDate = weekOfYear(startWeek - 1).endOf('week');

  return { startDate, endDate };
};

export const movePeriod = (period, startDate, endDate, side = 'next', format = 'MMM DD') => {
  let periodInWeeks = 1;
  if (period === PERIODS.ONE_WEEK) {
    periodInWeeks = 1;
  } else if (period === PERIODS.TWO_WEEKS) {
    periodInWeeks = 2;
  } else if (period === PERIODS.MONTH) {
    periodInWeeks = 4;
  }

  if (side === 'prev') {
    periodInWeeks *= -1;
  }

  let previousStartDate = startDate.add(periodInWeeks, 'week');
  let previousEndDate = endDate.add(periodInWeeks, 'week');

  return {
    startDate: previousStartDate,
    endDate: previousEndDate,
    currentFormattedPeriod: {
      startDate: previousStartDate.format(format),
      endDate: previousEndDate.format(format),
    },
  };
};
