import moment from 'moment';

const weekOfear = weeksToAdd => {
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

const getStartPeriodWeek = () => {
  const currentWeek = moment().week();
  return currentWeek - currentWeek % 2;
};

export const getCurrentTwoWeeksPeriod = () => {
  let startDate = null;
  let endDate = null;

  if (moment().week() <= 2) {
    startDate = getFirstWeekOfTheYear();
    endDate = weekOfear(1).endOf('isoWeek');
  }

  if (moment().week() > 2) {
    let startWeek = getStartPeriodWeek();

    startDate = weekOfear(startWeek).startOf('isoWeek');
    endDate = weekOfear(startWeek + 1).endOf('isoWeek');
  }

  return { startDate, endDate };
};

export const getPreviousTwoWeeksPeriod = () => {
  let startWeek = getStartPeriodWeek();

  let startDate = weekOfear(startWeek - 2).startOf('isoWeek');
  let endDate = weekOfear(startWeek - 1).endOf('isoWeek');

  return { startDate, endDate };
};
