import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createStore } from 'redux';
import rootReducer, { RootState } from '../modules/store';

function renderWithRedux(
  ui: React.ReactNode,
  initialState: RootState = { memo: { titil: '' } }
) {
  const store = createStore(rootReducer, initialState);
  const utils = render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

  return {
    ...utils,
    store,
  };
}

export default renderWithRedux;
