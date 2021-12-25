import { AxiosResponse } from 'axios';
import { put, call } from 'redux-saga/effects';
import {
  Action,
  AsyncActionCreatorBuilder,
  PayloadAction,
} from 'typesafe-actions';
import { finishLoading, startLoading } from '../modules/loading';

export function createRequestActionNames(type: string) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
}

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

function isPayloadAction<P>(
  action: Action
): action is PayloadAction<string, P> {
  return (action as PayloadAction<string, P>).payload !== undefined;
}

export function createAsyncSaga<P1, P2, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [string, [P1, undefined]],
    [string, [P2, AxiosResponse]],
    [string, [P3, undefined]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, AxiosResponse<P2>>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    yield put(startLoading(action.type));

    try {
      const response: AxiosResponse<P2> = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(response.data, response));
    } catch (e) {
      yield put(asyncActionCreator.failure(e as P3));
    }

    yield put(finishLoading(action.type));
  };
}
