import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import memo, { memoSaga } from './memo';
import loading from './loading';

const rootReducer = combineReducers({
  memo,
  loading,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([memoSaga()]);
}

export default rootReducer;
