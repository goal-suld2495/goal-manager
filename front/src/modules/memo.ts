import { atom, selector, selectorFamily } from 'recoil';
import { Form, Memo } from '../types';
import * as memoApi from '../lib/api/memo';

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

export const memoListStateTrigger = atom({
  key: 'memoListStateTrigger',
  default: 0,
});

export const getMemoListState = selector<Memo[]>({
  key: 'memoListState',
  get: async ({ get }) => {
    const response = await memoApi.fetchMemoList();
    get(memoListStateTrigger);
    return response.data;
  }
});
