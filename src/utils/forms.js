import { getIn } from 'formik'
import * as Yup from 'yup'

import { traverseRecursively } from './iterators'

const validateFieldsSchema = fieldsSchema => {
  if (
    typeof fieldsSchema !== 'object' ||
    Object.keys(fieldsSchema).length === 0
  ) {
    throw new Error(
      'Invalid form schema. Provide an object with { [fieldName]: { ... } } structure'
    )
  }
}

const defaultNodeValidator = fieldValidators =>
  Yup.object().shape(fieldValidators)

export const makeValidationSchema = (
  fieldsSchema,
  nodeValidator = defaultNodeValidator
) => {
  validateFieldsSchema(fieldsSchema)

  const fieldValidators = traverseRecursively(fieldsSchema, {
    childKey: 'fields',
    nodeCallback: ({ newSubtree }) => nodeValidator(newSubtree),
    leafCallback: ({ value }) =>
      value.label ? value.validator.label(value.label) : value.validator,
  })

  return nodeValidator(fieldValidators)
}

export const makeEmptyInitialValues = (fieldsSchema, values = {}) => {
  validateFieldsSchema(fieldsSchema)

  return traverseRecursively(fieldsSchema, {
    childKey: 'fields',
    nodeCallback: ({ newSubtree }) => newSubtree,
    leafCallback: ({ path }) => getIn(values, path, ''),
  })
}
