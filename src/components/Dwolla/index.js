import * as React from 'react';
import PropTypes from 'prop-types';

export const load = environment =>
  new Promise(resolve => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src =
      environment === 'prod'
        ? 'https://cdn.dwolla.com/1/dwolla.min.js'
        : 'https://cdn.dwolla.com/1/dwolla.js';

    s.addEventListener('load', () => {
      window.dwolla.configure(environment);
      resolve();
    });
    document.body.appendChild(s);
  });

const pluckFundingSource = res => {
  try {
    return res._links['funding-source'].href;
  } catch (_) {
    return '';
  }
};

const containerId = '__react-dwolla-iav-container';

export default class Dwolla extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    dwollaConfig: PropTypes.shape({
      backButton: PropTypes.bool,
      customerToken: PropTypes.string,
      environment: PropTypes.string,
      fallbackToMicroDeposits: PropTypes.bool,
      microDeposits: PropTypes.bool,
      stylesheets: PropTypes.array,
      subscriber: PropTypes.func,
    }),
  };

  componentDidMount() {
    const {
      dwollaConfig: { environment, customerToken },
      dwollaConfig,
    } = this.props;
    load(environment)
      .then(() => {
        window.dwolla.iav.start(
          customerToken,
          { ...dwollaConfig, container: containerId },
          (err, res) => {
            if (err) this.props.onError(err.message || err.code);
            this.props.onSuccess(pluckFundingSource(res));
          }
        );
      })
      .catch(e => {
        this.props.onError(e);
      });
  }

  render() {
    return <div id={containerId} />;
  }
}
