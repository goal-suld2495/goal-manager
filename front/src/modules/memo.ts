import { takeLatest } from 'redux-saga/effects';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosResponse } from 'axios';
import { Form, Memo } from '../types';
import * as memoApi from '../lib/api/memo';
import {
  createAsyncSaga,
  createRequestActionNames,
} from '../utils/createRequestSaga';

const [SAVE_MEMO, SAVE_MEMO_SUCCESS, SAVE_MEMO_FAILURE] =
  createRequestActionNames('memo/SAVE_MEMO');
const SET_FORM = 'memo/SET_FORM';

export const saveMemoAsync = createAsyncAction(
  SAVE_MEMO,
  SAVE_MEMO_SUCCESS,
  SAVE_MEMO_FAILURE
)<MemoState['form'], [Memo, AxiosResponse], Error>();

export const setForm = createAction(
  SET_FORM,
  (payload: MemoState['form']) => payload
)();

export const saveMemoSaga = createAsyncSaga(saveMemoAsync, memoApi.saveMemo);

export function* memoSaga() {
  yield takeLatest(SAVE_MEMO, saveMemoSaga);
}

const actions = {
  ...saveMemoAsync,
  setForm,
};

type MemoAction = ActionType<typeof actions>;

export interface MemoState {
  form: Form;
  memo: Memo;
  memoError: Error | null;
}

export const initialState: MemoState = {
  form: {
    title: '',
    content: '',
  },
  memo: {
    id: '',
    title: '',
  },
  memoError: null,
};

const memo = createReducer<MemoState, MemoAction>(initialState)
  .handleAction(setForm, (state, { payload: form }) => ({
    ...state,
    form,
  }))
  .handleAction(saveMemoAsync.success, (state, { payload: memoData }) => ({
    ...state,
    memo: memoData,
  }))
  .handleAction(saveMemoAsync.failure, (state, { payload: memoError }) => ({
    ...state,
    memoError,
  }));

export default memo;
