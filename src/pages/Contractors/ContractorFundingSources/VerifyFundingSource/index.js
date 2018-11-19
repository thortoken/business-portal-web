import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { formFields, validationSchema, initialValues } from './formSchema';
import './VerifyFundingSource.scss';
import NotificationService from '~services/notification';

import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';

export class VerifyFundingSource extends React.Component {
  static propTypes = {
    verifyFundingSourceAmount: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
        fsId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className="VerifyFundingSource">
        <Formik
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}>
          {this.renderForm}
        </Formik>
      </div>
    );
  }

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

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {this.prepareForm(formFields)}

      <div className="VerifyFundingSource__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="VerifyFundingSource__button-container--button">
          Verify
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { verifyFundingSourceAmount, match } = this.props;
    try {
      await verifyFundingSourceAmount({ data, id: match.params.fsId });
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
      description: 'Funding source successfully verified.',
    });
    history.push(`/contractors/${match.params.id}/fundingSources`);
  };
}

const mapDispatchToProps = dispatch => ({
  verifyFundingSourceAmount: dispatch.users.verifyFundingSourceAmount,
});

export default connect(null, mapDispatchToProps)(VerifyFundingSource);
