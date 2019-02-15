import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { initialValues, formFields, transformDateToMoment, validationSchema } from './formSchema';
import { handleFormHttpResponse } from '~utils/forms/errors';
import { traverseRecursively } from '~utils/iterators';
import './Profile.scss';

export class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  state = {
    error: null,
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Profile">
        <div className="Profile__form">
          <div className="Profile__errors">{error}</div>
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}>
            {this.renderForm}
          </Formik>
        </div>
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

      <div className="Profile__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="Profile__button-container--button">
          Next
        </Button>
      </div>
    </form>
  );

  create = async data => {
    const { createContractor, user } = this.props;
    let dataProfile = JSON.parse(JSON.stringify(data));
    dataProfile.profile.dateOfBirth = transformDateToMoment(dataProfile.profile.dateOfBirth).format(
      'YYYY-MM-DD'
    );
    dataProfile.profile.postalCode = String(dataProfile.profile.postalCode);
    dataProfile.profile.email = user.email;

    await createContractor(dataProfile);
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
    const { changeStep } = this.props;
    changeStep(2);
  };
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.loading.effects.onBoarding.createContractor,
});

const mapDispatchToProps = dispatch => ({
  createContractor: dispatch.onBoarding.createContractor,
  changeStep: dispatch.onBoarding.changeStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
