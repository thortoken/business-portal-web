import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard } from './index';

const initDashboard = overrides => {
  const mockProps = {
    exchangeRates: { 'thor-usd': { rate: 1.0 } },
    syncTransactions: jest.fn(),
    syncWallet: jest.fn(),
    transactions: [],
    wallet: {},
  };
  const wrapper = shallow(<Dashboard {...mockProps} {...overrides} />);
  return { mockProps, wrapper };
};

describe('page: <Dashboard/>', () => {
  it('should render without crashing', () => {
    const { wrapper } = initDashboard();
    expect(wrapper).toBeTruthy();
  });

  it('should render as expected', () => {
    const { wrapper } = initDashboard({ wallet: { EUSD: 10, THOR: 20 } });
    expect(wrapper).toMatchSnapshot();
  });

  describe('lifecycle', () => {
    describe('componentDidMount', () => {
      const { mockProps, wrapper } = initDashboard();
      const instance = wrapper.instance();

      instance.componentDidMount();

      expect(mockProps.syncTransactions).toHaveBeenCalled();
      expect(mockProps.syncWallet).toHaveBeenCalled();
    });
  });

  describe('calcWalletBalance', () => {
    const { wrapper } = initDashboard();

    it('should calculate wallet balance', () => {
      wrapper.setProps({
        wallet: { EUSD: 100, THOR: 200 },
        exchangeRates: { 'thor-usd': { rate: 2 } },
      });

      const balance = wrapper.instance().calcWalletBalance();

      expect(balance).toEqual({
        usd: 100,
        thor: 200,
        thorAsUsd: 200 * 2,
        total: 100 + 400,
      });
    });

    it('should fallback exchange rate to 0 when not set', () => {
      wrapper.setProps({
        wallet: { EUSD: 100, THOR: 200 },
        exchangeRates: { 'thor-usd': {} },
      });

      const balance = wrapper.instance().calcWalletBalance();

      expect(balance).toEqual({
        usd: 100,
        thor: 200,
        thorAsUsd: 200 * 0,
        total: 100,
      });
    });

    it('should fallback usd to 0 when not set', () => {
      wrapper.setProps({
        wallet: { THOR: 200 },
        exchangeRates: { 'thor-usd': { rate: 2 } },
      });

      const balance = wrapper.instance().calcWalletBalance();

      expect(balance).toEqual({
        usd: 0,
        thor: 200,
        thorAsUsd: 200 * 2,
        total: 0 + 400,
      });
    });

    it('should fallback thor to 0 when not set', () => {
      wrapper.setProps({
        wallet: { EUSD: 100 },
        exchangeRates: { 'thor-usd': { rate: 2 } },
      });

      const balance = wrapper.instance().calcWalletBalance();

      expect(balance).toEqual({
        usd: 100,
        thor: 0,
        thorAsUsd: 0 * 2,
        total: 100 + 0,
      });
    });
  });

  describe('handleTransactionsPeriodChange', () => {
    it('should update transactionsPeriod state', () => {
      const { wrapper } = initDashboard();
      const instance = wrapper.instance();

      instance.handleTransactionsPeriodChange('MONTH');
      expect(wrapper.state('transactionsPeriod')).toBe('MONTH');
      instance.handleTransactionsPeriodChange('DAY');
      expect(wrapper.state('transactionsPeriod')).toBe('DAY');
    });
  });
});
