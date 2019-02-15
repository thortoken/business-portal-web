import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Divider, Select } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { prepareFormFieldsAndValidation, transformDateToMoment } from './formSchema';
import SelectField from '~components/SelectField';
import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';
import './CompanyDetails.scss';

const { Option, OptGroup } = Select;

const businessTypes = [
  { name: 'Sole', id: 'soleProprietorship' },
  { name: 'Corporation', id: 'corporation' },
  { name: 'Llc', id: 'llc' },
  { name: 'Partnership', id: 'partnership' },
];

const generateClassificationOptions = list => {
  let mapped = [];
  // eslint-disable-next-line
  list.map(item => {
    let newMap = (
      <OptGroup label={item.name} key={item.id}>
        {item.category.industryClassifications.map(item => {
          return (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          );
        })}
      </OptGroup>
    );
    mapped.push(newMap);
  });
  return mapped;
};

const generateBusinessOptions = list => {
  return list.map(item => (
    <Option key={item.id} value={item.id}>
      {item.name}
    </Option>
  ));
};

export class CompanyDetails extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    addTenantCompany: PropTypes.func.isRequired,
    checkStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formData: prepareFormFieldsAndValidation(),
      businessType: null,
    };
  }

  async componentDidMount() {
    const { getCategories } = this.props;
    await getCategories();
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
        businessType: event.value,
      });
    }
  };

  prepareForm(fields) {
    const { categories } = this.props;
    const { businessType } = this.state;
    let formObject = {
      company: [
        <Divider orientation="left" key="company">
          Company Details
        </Divider>,
      ],
      owner: [
        <Divider orientation="left" key="owner">
          {businessType && businessType === 'soleProprietorship'
            ? 'Owner Details'
            : 'Admin Details'}
        </Divider>,
      ],
      controller: [
        <Divider orientation="left" key="controller">
          Controller Details
        </Divider>,
      ],
    };
    traverseRecursively(fields, {
      childKey: 'fields',
      nodeCallback: () => console.log(),
      leafCallback: data => {
        const { key, value, path } = data;
        let push = path[0];
        if (key === 'businessClassification') {
          formObject[push].push(
            <FormField
              key={path.join('.')}
              name={path.join('.')}
              component={SelectField}
              dataSource={generateClassificationOptions(categories)}
              showSearch
              className="CompanyDetails_half"
              filterOption={(inputValue, option) => {
                if (typeof option.props.children.toUpperCase === 'function') {
                  return (
                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  );
                }
              }}
              label={value.label}
              {...value.input}
            />
          );
        } else if (key === 'businessType') {
          formObject[push].push(
            <FormField
              key={path.join('.')}
              name={path.join('.')}
              component={SelectField}
              dataSource={generateBusinessOptions(businessTypes)}
              onSelect={this.handleChange}
              className="CompanyDetails_half"
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
    if (formObject.controller.length === 1) {
      formObject.controller.length = 0;
    }
    return [...formObject.company, ...formObject.owner, ...formObject.controller];
  }

  renderForm = ({ handleSubmit, isSubmitting, values, dirty }) => (
    <form onSubmit={handleSubmit}>
      {this.prepareForm(this.state.formData.formFields)}

      <div className="CompanyDetails__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="CompanyDetails__button-container--button">
          Next
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { addTenantCompany } = this.props;
    let dataProfile = JSON.parse(JSON.stringify(data));
    // dataProfile: {
    //   company: {}
    //   owner: {}
    //   controller: {}
    // }
    dataProfile.owner.dateOfBirth = transformDateToMoment(dataProfile.owner.dateOfBirth).format(
      'YYYY-MM-DD'
    );

    if (dataProfile.company.businessType === 'soleProprietorship' && dataProfile.controller) {
      delete dataProfile.controller;
    } else {
      dataProfile.controller.address.country = 'US';
      dataProfile.controller.dateOfBirth = transformDateToMoment(
        dataProfile.controller.dateOfBirth
      ).format('YYYY-MM-DD');
    }
    try {
      await addTenantCompany(dataProfile);
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    this.props.checkStep();
  };
}

const mapStateToProps = state => ({
  categories: state.tenantCompany.categories,
});

const mapDispatchToProps = dispatch => ({
  getCategories: dispatch.tenantCompany.getCategories,
  addTenantCompany: dispatch.tenantCompany.addTenantCompany,
  checkStep: dispatch.welcome.checkStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
