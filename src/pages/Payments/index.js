import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getTransactions, pauseTransactions } from '~redux/actions/transactions';
import { getJobs, pauseJobs } from '~redux/actions/jobs';

import Box from '~components/Box';
import Header from '~components/Header';
import Summary from './components/Summary';

import { getCurrentTwoWeeksPeriod, getPreviousTwoWeeksPeriod } from '~utils/time';
import { formatUsd } from '~utils/number';

import './Payments.css';

const { Column } = Table;

const TitleWithIcon = ({ title, icon }) => {
  return (
    <span>
      <Icon type={icon} /> {title}
    </span>
  );
};

const transactionsPerContractor = transactions =>
  _.groupBy(transactions, transaction => transaction.contractor.id);

const calculateSummaryTransactions = (transactions, period) => {
  const datesForPeriod =
    period === 'prev' ? getPreviousTwoWeeksPeriod() : getCurrentTwoWeeksPeriod();
  const obj = { ...datesForPeriod };
  obj.contractorsCount = Object.keys(transactionsPerContractor(transactions)).length;
  obj.value = _.sumBy(transactions, 'jobCost');
  return obj;
};

const calculateTransactions = (transactions, jobs) => {
  let groupedContractors = transactionsPerContractor(transactions);
  let summarizedContractors = Object.keys(groupedContractors).map(cId => {
    const contractor = groupedContractors[cId][0].contractor;
    return {
      rank: 0,
      contractor: `${contractor.firstName} ${contractor.lastName}`,
      contractorId: cId,
      numOfJobs: groupedContractors[cId].length,
      jobs: groupedContractors[cId].map(job => {
        return {
          ...job,
          jobName: jobs[job.jobId] ? jobs[job.jobId].name : '',
        };
      }),
      salary: _.sumBy(groupedContractors[cId], 'jobCost'),
    };
  });

  return _.sortBy(summarizedContractors, 'salary')
    .reverse()
    .map((contractor, index) => ({ ...contractor, key: index + 1 }));
};

class Payments extends React.Component {
  static propTypes = {
    getTransactions: PropTypes.func.isRequired,
    pauseTransactions: PropTypes.func.isRequired,
    pendingTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    paidTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    jobs: PropTypes.object.isRequired,
  };

  state = {
    previous: {
      value: 0,
      contractorsCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    current: {
      value: 0,
      contractorsCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    previousTransactionsMap: new Map(),
    calculatedPreviousTransactions: [],
    calculatedCurrentTransactions: [],
    pendingTransactions: [],
  };

  componentDidMount() {
    this.props.getJobs();
    this.props.getTransactions({ status: 'PENDING', ...getCurrentTwoWeeksPeriod() });
    this.props.getTransactions({ status: 'PAID', ...getPreviousTwoWeeksPeriod() });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const hasJobs = Object.keys(nextProps.jobs).length > 0;

    if (nextProps.pendingTransactions !== prevState.pendingTransactions) {
      const objState = {
        pendingTransactions: nextProps.pendingTransactions,
      };

      if (hasJobs) {
        objState.current = calculateSummaryTransactions(nextProps.pendingTransactions, 'curr');
        objState.calculatedCurrentTransactions = calculateTransactions(
          nextProps.pendingTransactions,
          nextProps.jobs
        );
      }

      return objState;
    }

    if (nextProps.paidTransactions !== prevState.paidTransactions) {
      const objState = {
        paidTransactions: nextProps.paidTransactions,
      };
      if (hasJobs) {
        objState.previous = calculateSummaryTransactions(nextProps.paidTransactions, 'prev');
        objState.calculatedPreviousTransactions = calculateTransactions(
          nextProps.paidTransactions,
          nextProps.jobs
        );
        objState.previousTransactionsMap = new Map(
          objState.calculatedPreviousTransactions.map(t => [t.contractorId, t.salary])
        );
      }
      return objState;
    }
    return null;
  }

  componentWillUnmount() {
    this.props.pauseTransactions();
    this.props.pauseJobs();
  }

  render() {
    const { previous, current, calculatedCurrentTransactions } = this.state;

    return (
      <div>
        <Header title="Payments" size="medium" />

        <Summary previous={previous} current={current} />

        <Box>
          <Table dataSource={calculatedCurrentTransactions} bordered>
            <Column align="center" dataIndex="key" title="Rank" />
            <Column
              align="center"
              dataIndex="contractor"
              title={<TitleWithIcon title="Contractor" icon="user" />}
            />
            <Column align="center" dataIndex="numOfJobs" title="Num Jobs" />
            <Column
              align="center"
              dataIndex="contractorId"
              render={this.showPreviousSalary}
              title="Prev"
            />
            <Column
              align="center"
              dataIndex="salary"
              render={this.renderAmount}
              title={<TitleWithIcon title="Current" icon="dollar" />}
            />
            <Column title="Approval" />
          </Table>
        </Box>
      </div>
    );
  }

  handleTypeChange = e => this.setState({ type: e.target.value });

  renderAmount = amount => formatUsd(amount);
  showPreviousSalary = contractorId => {
    const { previousTransactionsMap } = this.state;
    return previousTransactionsMap.get(contractorId)
      ? formatUsd(previousTransactionsMap.get(contractorId))
      : '$0';
  };
}

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
  paidTransactions: state.transactions.paidTransactions,
  pendingTransactions: state.transactions.pendingTransactions,
  jobs: state.jobs.jobs,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactions,
      pauseTransactions,
      getJobs,
      pauseJobs,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
