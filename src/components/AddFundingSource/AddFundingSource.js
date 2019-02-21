import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Formik } from 'formik';

import FormField from '~components/FormField';
import { formFields, validationSchema, initialValues } from './formSchema';
import { traverseRecursively } from '~utils/iterators';
import './AddFundingSource.scss';

export class AddFundingSource extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { onSubmit } = this.props;
    return (
      <div className="AddFundingSource">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
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
}

export default AddFundingSource;
