import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { initialValues, formFields, validationSchema } from './formSchema';
import './AddFundingSource.scss';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

export class AddFundingSource extends React.Component {
  static propTypes = {
    createFundingSource: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    invitedContractor: null,
    error: null,
  };

  render() {
    const { error } = this.state;

    return (
      <div className="AddFundingSource">
        <div className="AddFundingSource__errors">{error}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}>
          {this.renderForm}
        </Formik>
      </div>
    );
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {Object.entries(formFields).map(([name, options]) => (
        <FormField key={name} name={name} label={options.label} {...options.input} />
      ))}

      <div className="AddFundingSource__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddFundingSource__button-container--button">
          Add
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { createFundingSource, match } = this.props;
    try {
      await createFundingSource({ userId: match.params.id, data });
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { history, match } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Funding Source successfully added.',
    });
    history.push(`/contractors/${match.params.id}/fundingSources`);
  };
}

const mapDispatchToProps = dispatch => ({
  createFundingSource: dispatch.users.createFundingSource,
});

export default connect(null, mapDispatchToProps)(AddFundingSource);
