import { traverseRecursively } from './iterators'

describe('utils: iterators', () => {
  describe('traverseRecursively', () => {
    const options = {
      childKey: 'fields',
      nodeCallback: jest.fn(({ newSubtree }) => newSubtree),
      leafCallback: jest.fn(({ value }) => value),
    }

    beforeEach(() => {
      options.nodeCallback.mockClear()
      options.leafCallback.mockClear()
    })

    it('should return empty object on empty input parameter', () => {
      expect(traverseRecursively({}, options)).toEqual({})
    })

    it('should throw an error on invalid callbacks', () => {
      expect(() =>
        traverseRecursively({}, { nodeCallback: undefined })
      ).toThrow()
      expect(() =>
        traverseRecursively({}, { leafCallback: undefined })
      ).toThrow()
      expect(() =>
        traverseRecursively(
          {},
          { nodeCallback: undefined, leafCallback: undefined }
        )
      ).toThrow()
    })

    it('should call nodeCallback on each node (depth first strategy)', () => {
      const subtree = {
        user: {
          fields: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        age: 30,
        address: {
          fields: {
            city: 'California',
            street: 'Test St',
          },
        },
      }

      traverseRecursively(subtree, options)

      expect(options.nodeCallback).toHaveBeenCalledTimes(2)
      expect(options.nodeCallback.mock.calls[0]).toEqual([
        {
          key: 'user',
          value: subtree.user,
          path: ['user'],
          newSubtree: subtree.user.fields,
        },
      ])
      expect(options.nodeCallback.mock.calls[1]).toEqual([
        {
          key: 'address',
          value: subtree.address,
          path: ['address'],
          newSubtree: subtree.address.fields,
        },
      ])
    })

    it('should call leafCallback on each leaf', () => {
      const subtree = {
        user: {
          fields: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
        age: 30,
        status: 'active',
      }

      traverseRecursively(subtree, options)

      expect(options.leafCallback).toHaveBeenCalledTimes(4)
      expect(options.leafCallback.mock.calls[0]).toEqual([
        {
          key: 'firstName',
          value: subtree.user.fields.firstName,
          path: ['user', 'firstName'],
        },
      ])
      expect(options.leafCallback.mock.calls[1]).toEqual([
        {
          key: 'lastName',
          value: subtree.user.fields.lastName,
          path: ['user', 'lastName'],
        },
      ])
      expect(options.leafCallback.mock.calls[2]).toEqual([
        {
          key: 'age',
          value: subtree.age,
          path: ['age'],
        },
      ])
      expect(options.leafCallback.mock.calls[3]).toEqual([
        {
          key: 'status',
          value: subtree.status,
          path: ['status'],
        },
      ])
    })
  })

  it('should return transformed subtree', () => {
    const subtree = {
      user: {
        fields: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      age: 30,
      address: {
        fields: {
          city: 'California',
          street: 'Test St',
        },
      },
    }

    const newOptions = {
      childKey: 'fields',
      nodeCallback: ({ newSubtree }) => ({
        type: 'node',
        nodeChildren: newSubtree,
      }),
      leafCallback: ({ value }) => ({ type: 'leaf', value }),
    }
    const result = traverseRecursively(subtree, newOptions)

    expect(result).toEqual({
      user: {
        type: 'node',
        nodeChildren: {
          firstName: {
            type: 'leaf',
            value: 'John',
          },
          lastName: {
            type: 'leaf',
            value: 'Doe',
          },
        },
      },
      age: {
        type: 'leaf',
        value: 30,
      },
      address: {
        type: 'node',
        nodeChildren: {
          city: {
            type: 'leaf',
            value: 'California',
          },
          street: {
            type: 'leaf',
            value: 'Test St',
          },
        },
      },
    })
  })
})
