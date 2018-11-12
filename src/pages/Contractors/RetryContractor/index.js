import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Spin } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, transformDateToMoment, validationSchema } from './formSchema';
import './RetryContractor.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';

import { traverseRecursively } from '~utils/iterators';
import { transformData } from '../EditContractor/formSchema';

export class RetryContractor extends React.Component {
  static propTypes = {
    retryContractor: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    formData: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentUser && nextProps.currentUser.id !== prevState.formData.id) {
      return {
        formData: { profile: transformData(nextProps.currentUser) },
      };
    }

    return null;
  }
  componentDidMount() {
    const { currentUser = {}, match } = this.props;

    if (!currentUser || currentUser.id !== match.params.id) {
      this.getContractorData();
    }
  }

  componentDidUpdate(prevProps) {
    const { currentUser = {}, match } = this.props;
    const prevMatch = prevProps.match;

    if (prevMatch.params.id !== match.params.id && currentUser.id !== match.params.id) {
      this.getContractorData();
    }
  }

  getContractorData = async () => {
    const { getUser, match } = this.props;

    return getUser(match.params.id);
  };

  prepareForm(fields) {
    let formArray = [];
    traverseRecursively(fields, {
      childKey: 'fields',
      nodeCallback: () => console.log(),
      leafCallback: data => {
        const { value, path } = data;
        formArray.push(
          <FormField
            key={path.join('.')}
            name={path.join('.')}
            label={value.label}
            {...value.input}
          />
        );
      },
    });
    return [...formArray];
  }

  render() {
    const { formData } = this.state;
    const { isLoading } = this.props;

    return (
      <Spin spinning={isLoading}>
        <div className="RetryContractor">
          <Formik
            initialValues={initialValues(formData)}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize>
            {this.renderForm}
          </Formik>
        </div>
      </Spin>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {this.prepareForm(formFields)}

      <div className="RetryContractor__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="RetryContractor__button-container--button">
          Send
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { profile } = data;
    const { retryContractor, match } = this.props;
    try {
      let dataProfile = profile;

      dataProfile.postalCode = String(dataProfile.postalCode);
      dataProfile.dateOfBirth = transformDateToMoment(dataProfile.dateOfBirth).format('YYYY-MM-DD');
      await retryContractor({ id: match.params.id, data: dataProfile });
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ error: null });

    const { history, match } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Data successfully send.',
    });
    history.push(`/contractors/${match.params.id}`);
  };
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  isLoading: state.loading.effects.users.getUser,
});

const mapDispatchToProps = dispatch => ({
  retryContractor: dispatch.users.retryContractor,
  getUser: dispatch.users.getUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(RetryContractor);
