import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Spin } from 'antd';
import { Formik } from 'formik';
import { handleFormHttpResponse } from '~utils/forms/errors';
import NotificationService from '~services/notification';
import FormField from '~components/FormField';

import classNames from 'classnames';
import { initialValues, formFields, validationSchema } from './formSchema';
import './EditJob.scss';

export class EditJob extends React.Component {
  static propTypes = {
    getJob: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    onClose: PropTypes.func,
    updateJob: PropTypes.func.isRequired,
    editedJob: PropTypes.object,
  };

  static defaultProps = {
    onClose: () => {},
  };

  state = {
    formData: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.editedJob !== prevState.editedJob) {
      return {
        formData: nextProps.editedJob,
      };
    }

    return null;
  }

  componentDidMount() {
    const { getJob, match } = this.props;
    getJob(match.params.id);
  }

  handleSubmit = async (data, form) => {
    const { updateJob } = this.props;
    try {
      await updateJob(validationSchema.cast(data));
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
      description: 'Job successfully edited.',
    });
    history.goBack();
  };

  render() {
    const { formData } = this.state;
    const { isLoading } = this.props;

    return (
      <Spin spinning={isLoading}>
        <div className="EditJob">
          <Formik
            initialValues={formData}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize>
            {({ handleSubmit, isSubmitting, values, dirty, isValid }) => {
              return (
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

                  <div className="EditJob__button-container">
                    <Button
                      disabled={!isValid || isSubmitting}
                      size="large"
                      type="primary"
                      loading={isSubmitting}
                      htmlType="submit"
                      className="EditJob__button-container--button">
                      Edit
                    </Button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.effects.jobs.getJob,
  editedJob: state.jobs.editedJob,
});

const mapDispatchToProps = dispatch => ({
  updateJob: dispatch.jobs.updateJob,
  getJob: dispatch.jobs.getJob,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditJob);
