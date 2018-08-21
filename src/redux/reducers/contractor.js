import { types } from '../actions/contractor';

const initialState = {
  contractor: {
    id: 'testId',
    tenantId: 'tenantId',
    userId: 'userId',
    firstName: 'John',
    lastName: 'Doe',
    phone: '(408) 555-2345',
    email: 'test@gmail.com',
    dwollaUri: 'dwollaUri',
    dwollaSoureUri: '',
    street: '380 Dillard Ave #15',
    city: 'San Francisco',
    postalCode: '94105',
    state: 'CA',
    country: 'USA',
    createdAt: new Date('2018-08-01'),
    updatedAt: new Date('2018-08-05'),
  },
};

export default function contractorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_CONTRACTOR.SUCCESS:
      return {
        ...state,
        contractor: action.contractor,
      };

    default:
      return state;
  }
}
