import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';

import classNames from 'classnames';
import { initialValues, formFields, validationSchema } from './formSchema';
import './AddJob.scss';
import NotificationService from '~services/notification';
import { handleFormHttpResponse } from '~utils/forms/errors';

export class AddJob extends React.Component {
  static propTypes = {
    addJob: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="AddJob">
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
        <FormField
          key={name}
          name={name}
          label={options.label}
          {...options.input}
          className={classNames('', {
            'InputGroup--wide': options.input.wide,
          })}
        />
      ))}

      <div className="AddJob__button-container">
        <Button
          disabled={!dirty || isSubmitting}
          size="large"
          type="primary"
          loading={isSubmitting}
          htmlType="submit"
          className="AddJob__button-container--button">
          Add
        </Button>
      </div>
    </form>
  );

  handleSubmit = async (data, form) => {
    const { addJob } = this.props;
    data.isActive = true;
    try {
      await addJob(validationSchema.cast(data));
      this.handleSubmitSuccess();
    } catch (err) {
      handleFormHttpResponse(form, err.response.data.error, err.response);
    }
  };

  handleSubmitSuccess = () => {
    const { history } = this.props;
    NotificationService.open({
      type: 'success',
      message: 'Success',
      description: 'Job successfully added.',
    });
    history.goBack();
  };
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.jobs.addJob,
});

const mapDispatchToProps = dispatch => ({
  addJob: dispatch.jobs.addJob,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
