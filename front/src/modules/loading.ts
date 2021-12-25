import { ActionType, createAction, createReducer } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
  START_LOADING,
  (type: string) => type
)();
export const finishLoading = createAction(
  FINISH_LOADING,
  (type: string) => type
)();

interface LoadingType {
  [key: string]: boolean;
}

const actions = { startLoading, finishLoading };
type LoadingAction = ActionType<typeof actions>;

const initialState: LoadingType = {};
const loading = createReducer<LoadingType, LoadingAction>(initialState)
  .handleAction(startLoading, (state, { payload: type }) => ({
    ...state,
    [type]: true,
  }))
  .handleAction(finishLoading, (state, { payload: type }) => ({
    ...state,
    [type]: false,
  }));

export default loading;
