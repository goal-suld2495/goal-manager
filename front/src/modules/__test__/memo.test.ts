import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import memo, * as memoActions from '../memo';
import * as memoApi from '../../lib/api/memo';

describe('memo', () => {
  const getInitialState = () => memo(undefined, {} as never);
  const getForm = () => {
    return { title: '제목', content: '내용' };
  };

  describe('actions', () => {
    it('액션 생성 함수', () => {
      const expectedActions = [
        {
          type: 'memo/SET_FORM',
          payload: { title: '제목', content: '내용' },
        },
      ];

      const actions = [memoActions.setForm({ title: '제목', content: '내용' })];

      expect(actions).toEqual(expectedActions);
    });
  });

  describe('redux saga', () => {
    const axiosResponse = <T>(data: T, status: number, option?: any) => ({
      data,
      status,
      statusText: '',
      headers: '',
      config: {},
      ...option,
    });

    it('메모를 저장한다.', () => {
      const form = getForm();
      const memoData = { id: '아이디', ...form };
      const state = getInitialState();

      const response = axiosResponse(memoData, 200, {});

      return expectSaga(memoActions.memoSaga)
        .dispatch(memoActions.saveMemoAsync.request(form))
        .provide([[matchers.call.fn(memoApi.saveMemo), response]])
        .put({
          type: 'memo/SAVE_MEMO_SUCCESS',
          payload: memoData,
          meta: response,
        })
        .withReducer(memoActions.default)
        .hasFinalState({
          ...state,
          memo: memoData,
        })
        .silentRun();
    });

    it('메모 저장에 실패한다.', () => {
      const form = getForm();
      const error = new Error('Fail Save');
      const state = getInitialState();

      return expectSaga(memoActions.memoSaga)
        .dispatch(memoActions.saveMemoAsync.request(form))
        .provide([[matchers.call.fn(memoApi.saveMemo), throwError(error)]])
        .put({
          type: 'memo/SAVE_MEMO_FAILURE',
          payload: error,
        })
        .withReducer(memoActions.default)
        .hasFinalState({
          ...state,
          memoError: error,
        })
        .silentRun();
    });
  });

  describe('reducer', () => {
    it('초기 상태를 반환', () => {
      const state = getInitialState();
      expect(state).toEqual({
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
      });
    });

    it('메모 폼을 스토어에 저장한다.', () => {
      const form = getForm();
      const state = memo(undefined, memoActions.setForm(form));
      expect(state).toHaveProperty('form', form);
    });
  });
});
