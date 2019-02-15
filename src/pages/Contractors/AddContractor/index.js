import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { initialValues, formFields, transformDateToMoment, validationSchema } from './formSchema';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';
import './AddContractor.scss';

export class AddContractor extends React.Component {
  static propTypes = {
    addContractor: PropTypes.func.isRequired,
  };

  state = {
    createdContractor: null,
    error: null,
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
    const { error } = this.state;

    return (
      <div className="Add-contractor">
        <div className="Add-contractor__errors">{error}</div>
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
      {this.prepareForm(formFields)}

      <div className="Add-contractor__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="Add-contractor__button-container--button">
          Add {values.profile.firstName}
        </Button>
      </div>
    </form>
  );

  create = async data => {
    const { addContractor } = this.props;
    let dataProfile = JSON.parse(JSON.stringify(data));
    dataProfile.profile.dateOfBirth = transformDateToMoment(dataProfile.profile.dateOfBirth).format(
      'YYYY-MM-DD'
    );
    dataProfile.profile.postalCode = String(dataProfile.profile.postalCode);

    await addContractor(dataProfile);
  };

  handleSubmit = async (data, form) => {
    const validData = validationSchema.cast(data);
    validData.profile['country'] = 'US';

    try {
      await this.create(validData);

      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    this.setState({ error: null });

    const { onSubmit, history } = this.props;
    if (typeof onSubmit === 'function') {
      const { addedContractor } = this.state;
      onSubmit(addedContractor);
    }
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Contractor successfully added.',
    });
    history.push(`/contractors`);
  };
}

const mapDispatch = ({ users: { addContractor } }) => ({
  addContractor,
});

export default connect(null, mapDispatch)(AddContractor);
