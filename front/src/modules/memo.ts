import { ActionType, createAction, createReducer } from 'typesafe-actions';

export interface MemoState {
  form: {
    title: string;
    content: string;
  };
}

const SAVE_MEMO = 'memo/SAVE_MEMO';
const SET_FORM = 'memo/SET_FORM';

export const saveMemo = createAction(SAVE_MEMO)();
export const setForm = createAction(
  SET_FORM,
  (payload: MemoState['form']) => payload
)();

const actions = {
  saveMemo,
  setForm,
};

type MemoAction = ActionType<typeof actions>;

export const initialState: MemoState = {
  form: {
    title: '',
    content: '',
  },
};

const memo = createReducer<MemoState, MemoAction>(initialState).handleAction(
  setForm,
  (state, { payload: form }) => ({
    ...state,
    form,
  })
);

export default memo;
