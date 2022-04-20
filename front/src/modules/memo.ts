import { takeLatest } from 'redux-saga/effects';
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';
import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { Form, Memo } from '../types';
import * as memoApi from '../lib/api/memo';
import {
  createAsyncSaga,
  createRequestActionNames,
} from '../utils/createRequestSaga';

const [SAVE_MEMO, SAVE_MEMO_SUCCESS, SAVE_MEMO_FAILURE] =
  createRequestActionNames('memo/SAVE_MEMO');
const SET_FORM = 'memo/SET_FORM';
const [FETCH_MEMO, FETCH_MEMO_SUCCESS, FETCH_MEMO_FAILURE] =
  createRequestActionNames('memo/FETCH_MEMO');

export const saveMemoAsync = createAsyncAction(
  SAVE_MEMO,
  SAVE_MEMO_SUCCESS,
  SAVE_MEMO_FAILURE
)<MemoState['form'], [Memo, AxiosResponse], Error>();

export const setForm = createAction(
  SET_FORM,
  (payload: MemoState['form']) => payload
)();

export const fetchMemoAsync = createAsyncAction(
  FETCH_MEMO,
  FETCH_MEMO_SUCCESS,
  FETCH_MEMO_FAILURE
)<MemoState['memo']['id'], [Memo, AxiosResponse], Error>();

export const saveMemoSaga = createAsyncSaga(saveMemoAsync, memoApi.saveMemo);
export const fetchMemoSaga = createAsyncSaga(fetchMemoAsync, memoApi.fetchMemo);

export function* memoSaga() {
  yield takeLatest(SAVE_MEMO, saveMemoSaga);
  yield takeLatest(FETCH_MEMO, fetchMemoSaga);
}

const actions = {
  [SAVE_MEMO_SUCCESS]: saveMemoAsync.success,
  [SAVE_MEMO_FAILURE]: saveMemoAsync.failure,
  [FETCH_MEMO_SUCCESS]: fetchMemoAsync.success,
  [FETCH_MEMO_FAILURE]: fetchMemoAsync.failure,
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
    content: '',
  },
  memoError: null,
};

// TODO
// async 액션에 대한 타입 설정 하기
// 현재 succss, failure라는 이름으로 들어가서 하나의 async 액션만 들어감
const memo = createReducer<MemoState, MemoAction>(initialState)
  .handleAction(setForm, (state, { payload: form }) => ({
    ...state,
    form,
  }))
  .handleAction(SAVE_MEMO_SUCCESS, (state, { payload: memoData }) => ({
    ...state,
    memo: memoData,
  }))
  .handleAction(saveMemoAsync.failure, (state, { payload: memoError }) => ({
    ...state,
    memoError,
  }))
  .handleAction(fetchMemoAsync.success, (state, { payload: memoData }) => ({
    ...state,
    memo: memoData,
  }))
  .handleAction(fetchMemoAsync.failure, (state, { payload: memoError }) => ({
    ...state,
    memoError,
  }));

export default memo;

/*
  -----------------------
*/

export const formState = atom<Form>({
  key: 'formState',
  default: {
    title: '',
    content: '',
  },
});

export const memoState = atom<Memo>({
  key: 'memoState',
  default: {
    id: '',
    title: '',
    content: '',
  },
});

export const memoErrorState = atom<Error | null>({
  key: 'memoErrorState',
  default: null,
});

export const memoIdState = atom<string>({
  key: 'memoIdState',
  default: '',
});

export const CurrentMemoState = selectorFamily<Memo, string>({
  key: 'CurrentMemoState',
  get: (memoId) => async () => {
    try {
      const response = await memoApi.fetchMemo(memoId);
      return response.data;
    } catch {
      throw new Error('');
    }
  },
});
