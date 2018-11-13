import moment from 'moment';

export const PERIODS = {
  ONE_WEEK: 'ONE_WEEK',
  TWO_WEEKS: 'TWO_WEEKS',
  MONTH: 'MONTH',
};

export const weekOfYear = weeksToAdd => {
  return moment(moment().startOf('year')).add(weeksToAdd - 1, 'weeks');
};

const getFirstWeekOfTheYear = () => {
  return moment(
    moment()
      .year()
      .toString()
  ).startOf('isoWeek');
};

const getCurrent = period => {
  return { startDate: moment().startOf(period), endDate: moment().endOf(period) };
};

export const getCurrentWeekPeriod = () => {
  return getCurrent('week');
};

export const getStartPeriodWeek = () => {
  const currentWeek = moment().week();
  return currentWeek - (currentWeek - 1) % 2;
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
  return getCurrent('month');
};

export const getPreviousTwoWeeksPeriod = () => {
  let startWeek = getStartPeriodWeek();

  let startDate = weekOfYear(startWeek - 2).startOf('week');
  let endDate = weekOfYear(startWeek - 1).endOf('week');

  return { startDate, endDate };
};

export const movePeriod = (period, startDate, endDate, side = 'next', format = 'MMM DD') => {
  let periodInWeeks = 1;
  if (period === PERIODS.TWO_WEEKS) {
    periodInWeeks = 2;
  }

  if (side === 'prev') {
    periodInWeeks *= -1;
  }

  let previousStartDate =
    period === PERIODS.MONTH
      ? startDate
          .clone()
          .add(periodInWeeks, 'month')
          .startOf('month')
      : startDate.clone().add(periodInWeeks, 'week');
  let previousEndDate =
    period === PERIODS.MONTH
      ? endDate
          .clone()
          .add(periodInWeeks, 'month')
          .endOf('month')
      : endDate.clone().add(periodInWeeks, 'week');

  return {
    startDate: previousStartDate,
    endDate: previousEndDate,
    currentFormattedPeriod: {
      startDate: previousStartDate.format(format),
      endDate: previousEndDate.format(format),
    },
  };
};

export const formatDate = date => moment.unix(date.seconds).format('MM/DD');

export const renderDate = date => new Date(date).toLocaleDateString();

export const renderShortDate = date => moment(date).format('MM-DD');

export const renderRegularDate = date => moment(date).format('YYYY-MM-DD');

export const dateAsMoment = defaultFormat => (date, format = defaultFormat) => {
  if (typeof date === 'string') {
    const tryDate = moment.utc(date, format);
    if (tryDate.isValid()) {
      return tryDate;
    }
  }

  return moment(date);
};
