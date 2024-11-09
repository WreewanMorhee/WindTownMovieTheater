import React, { useReducer } from 'react';

// Define the initial state
export const initialState = { count: 0 };

// Define the reducer function
export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: action.payload };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}
