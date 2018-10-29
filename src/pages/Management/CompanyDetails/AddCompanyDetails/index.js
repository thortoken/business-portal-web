import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Divider, AutoComplete } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import { prepareFormFieldsAndValidation } from './formSchema';
import './AddCompanyDetails.scss';
import NotificationService from '~services/notification';
import AutoCompleteField from '~components/AutoCompleteField';

import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';

const Option = AutoComplete.Option;

const generateOptions = list => {
  let mapped = [];
  list.map((item, index) => {
    let tempMapped = item.category.industryClassifications.map((item, index) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      );
    });
    mapped.push(...tempMapped);
  });
  return mapped;
};

export class AddCompanyDetails extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    addTenantCompany: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formData: prepareFormFieldsAndValidation(),
    };
  }

  render() {
    const { formData } = this.state;
    return (
      <div className="AddCompanyDetails">
        <Formik
          initialValues={formData.initialValues}
          onSubmit={this.handleSubmit}
          validationSchema={formData.validationSchema}>
          {this.renderForm}
        </Formik>
      </div>
    );
  }

  handleChange = event => {
    if (event.value) {
      this.setState({
        formData: prepareFormFieldsAndValidation(event.value),
      });
    }
  };

  prepareForm(fields) {
    const { categories } = this.props;
    let formObject = {
      company: [
        <Divider orientation="left" key="company">
          Company Details
        </Divider>,
      ],
      owner: [
        <Divider orientation="left" key="owner">
          Owner Details
        </Divider>,
      ],
    };
    traverseRecursively(fields, {
      childKey: 'fields',
      nodeCallback: () => console.log(),
      leafCallback: data => {
        const { key, value, path } = data;
        let push = path.length > 1 ? 'owner' : 'company';
        if (key === 'businessClassification') {
          formObject[push].push(
            <FormField
              key={path.join('.')}
              name={path.join('.')}
              component={AutoCompleteField}
              dataSource={generateOptions(categories)}
              // onSelect={this.handleChange}
              className="AddCompanyDetails_half"
              filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              label={value.label}
              {...value.input}
            />
          );
        } else {
          formObject[push].push(
            <FormField
              key={path.join('.')}
              name={path.join('.')}
              label={value.label}
              {...value.input}
            />
          );
        }
      },
    });
    return [...formObject.company, ...formObject.owner];
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {this.prepareForm(this.state.formData.formFields)}

      <div className="AddCompanyDetails__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddCompanyDetails__button-container--button">
          Save
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { addTenantCompany } = this.props;
    const { formData } = this.state;
    const normalizedData = formData.validationSchema.cast(data);
    if(normalizedData.businessType === 'soleProprietorship' && normalizedData.controller){
      delete normalizedData.controller;
    }
    console.log(normalizedData);
    try {
      // await addTenantCompany(normalizedData);
      form.setSubmitting(false)
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Company Details successfully added.',
    });
  };
}

const mapDispatchToProps = dispatch => ({
  addTenantCompany: dispatch.tenantCompany.addTenantCompany,
});

export default connect(null, mapDispatchToProps)(AddCompanyDetails);
