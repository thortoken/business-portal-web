import * as Yup from 'yup'

import { makeEmptyInitialValues, makeValidationSchema } from './forms'

describe('utils: forms', () => {
  describe('makeEmptyInitialValues', () => {
    it('should throw an exception on invalid schema', () => {
      expect(() => makeEmptyInitialValues(null)).toThrow()
      expect(() => makeEmptyInitialValues(undefined)).toThrow()
      expect(() => makeEmptyInitialValues({})).toThrow()
    })

    it('should return the schema structure with empty strings as values', () => {
      const schema = {
        username: { icon: 'fake icon' },
        email: { something: true },
      }
      const result = makeEmptyInitialValues(schema)
      expect(result).toEqual({
        username: '',
        email: '',
      })
    })

    it('should work with nested structures using "fields" property', () => {
      const schema = {
        user: {
          fields: {
            firstName: {},
            lastName: {},
          },
        },
        email: {},
      }
      expect(makeEmptyInitialValues(schema)).toEqual({
        user: {
          firstName: '',
          lastName: '',
        },
        email: '',
      })
    })

    it('should use provided default values', () => {
      const schema = {
        user: {
          fields: {
            firstName: {},
            lastName: {},
          },
        },
        email: {},
        city: {},
      }
      const values = {
        user: {
          lastName: 'Tester',
        },
        city: 'Seattle',
      }
      expect(makeEmptyInitialValues(schema, values)).toEqual({
        user: {
          firstName: '',
          lastName: 'Tester',
        },
        email: '',
        city: 'Seattle',
      })
    })
  })

  describe('makeValidationSchema', () => {
    const makeFakeValidator = () => ({ fake: 'validator' })
    const makeFakeValidatorWithLabel = () => ({
      fake: 'validator',
      label: jest.fn(l => 'used label validator'),
    })
    const nodeValidator = node => ({ ...node, node: 'injected' })

    it('should throw an exception on invalid schema', () => {
      expect(() => makeValidationSchema(null)).toThrow()
      expect(() => makeValidationSchema(undefined)).toThrow()
      expect(() => makeValidationSchema({})).toThrow()
    })

    it('should generate validators for each field', () => {
      const userValidator = makeFakeValidator()
      const emailValidator = makeFakeValidator()

      const schema = {
        user: { validator: userValidator },
        email: { validator: emailValidator },
      }

      expect(makeValidationSchema(schema, nodeValidator)).toEqual({
        user: { fake: 'validator' },
        email: { fake: 'validator' },
        node: 'injected',
      })
    })

    it('should work with nested structures using "fields" property', () => {
      const userValidator = makeFakeValidator()
      const emailValidator = makeFakeValidator()
      const firstNestedValidator = makeFakeValidator()

      const schema = {
        user: { validator: userValidator },
        email: { validator: emailValidator },
        nested: {
          fields: {
            first: { validator: firstNestedValidator },
          },
        },
      }

      expect(makeValidationSchema(schema, nodeValidator)).toEqual({
        user: { fake: 'validator' },
        email: { fake: 'validator' },
        nested: {
          first: { fake: 'validator' },
          node: 'injected',
        },
        node: 'injected',
      })
    })

    it('should add label validator for better error message, if label is present', () => {
      const userValidator = makeFakeValidatorWithLabel()
      const emailValidator = makeFakeValidatorWithLabel()

      const schema = {
        user: { label: 'User name', validator: userValidator },
        email: { label: 'E-mail', validator: emailValidator },
      }

      expect(makeValidationSchema(schema, nodeValidator)).toEqual({
        user: 'used label validator',
        email: 'used label validator',
        node: 'injected',
      })

      expect(userValidator.label).toHaveBeenCalledWith('User name')
      expect(emailValidator.label).toHaveBeenCalledWith('E-mail')
    })
  })
})
