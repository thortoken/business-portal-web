import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { prepareFormFieldsAndValidation, transformDateToMoment } from './formSchema';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';
import './BeneficialOwners.scss';

export class BeneficialOwners extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    createBeneficialOwner: PropTypes.func.isRequired,
    checkStep: PropTypes.func.isRequired,
  };
  state = {
    canNext: false,
    formData: prepareFormFieldsAndValidation(),
  };

  render() {
    const { formData } = this.state;
    return (
      <div className="BeneficialOwners">
        <Formik
          initialValues={formData.initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={formData.validationSchema}>
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
      {this.prepareForm(this.state.formData.formFields)}

      <div className="BeneficialOwners__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={this.props.isLoading}
          htmlType="submit"
          className="BeneficialOwners__button-container--button">
          Add Beneficial Owner
        </Button>
        <Button
          disabled={!this.state.canNext}
          size="large"
          type="primary"
          onClick={this.handleNext}
          className="BeneficialOwners__button-container--button">
          Next
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { createBeneficialOwner } = this.props;
    data.address.country = 'US';
    let dataProfile = JSON.parse(JSON.stringify(data));
    dataProfile.dateOfBirth = transformDateToMoment(dataProfile.dateOfBirth).format('YYYY-MM-DD');

    try {
      await createBeneficialOwner(dataProfile);
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleNext = () => {
    this.props.checkStep();
  };

  handleSubmitSuccess = () => {
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Owner successfully added.',
    });
    this.setState({
      formData: prepareFormFieldsAndValidation(),
      canNext: true,
    });
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.beneficialOwners.createBeneficialOwner,
});

const mapDispatchToProps = dispatch => ({
  checkStep: dispatch.welcome.checkStep,
  createBeneficialOwner: dispatch.beneficialOwners.createBeneficialOwner,
});

export default connect(mapStateToProps, mapDispatchToProps)(BeneficialOwners);
