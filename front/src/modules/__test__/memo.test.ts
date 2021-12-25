import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import memo, * as memoActions from '../memo';

describe('memo', () => {
  const getInitialState = () => memo(undefined, {} as never);
  const getForm = () => {
    return { title: '제목', content: '내용' };
  };

  describe('actions', () => {
    it('액션 생성 함수', () => {
      const expectedActions = [
        {
          type: 'memo/SAVE_MEMO',
        },
        {
          type: 'memo/SET_FORM',
          payload: { title: '제목', content: '내용' },
        },
      ];

      const actions = [
        memoActions.saveMemo(),
        memoActions.setForm({ title: '제목', content: '내용' }),
      ];

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

    // TODO
    // 메모 저장 리듀서 테스트 코드 추가
    // it('메모를 저장한다.', () => {
    //   const form = getForm();
    //   const state = getInitialState();

    //   const response = axiosResponse('', 200);

    //   return expectSaga(memoActions.saveMemo)
    //     .withReducer(memo)
    //     .provide([[matchers.call.fn(memoAPI.saveMemo), response]]);
    // });
  });

  describe('reducer', () => {
    it('초기 상태를 반환', () => {
      const state = getInitialState();
      expect(state).toEqual({
        form: {
          title: '',
          content: '',
        },
      });
    });

    it('메모 폼을 스토어에 저장한다.', () => {
      const form = getForm();
      const state = memo(undefined, memoActions.setForm(form));
      expect(state).toHaveProperty('form', form);
    });
  });
});
