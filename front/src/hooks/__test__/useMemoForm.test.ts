import { act, renderHook } from '@testing-library/react-hooks';
import { RecoilRoot } from 'recoil';
import { mocked } from 'jest-mock';
import useMemoForm from '../useMemoForm';
import * as memoApi from '../../lib/api/memo';
import { Form, Memo } from '../../types';

jest.mock('../../lib/api/memo');
const mockedMemoApi = mocked(memoApi, true);

describe('useMemoForm', () => {
  it('메모 폼을 스토어에 저장한다.', () => {
    const form = { title: '제목', content: '내용' };
    const { result } = renderHook(() => useMemoForm(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.setForm(form));

    expect(result.current.form).toEqual(form);
  });

  it('메모를 저장한다.', async () => {
    const form: Form = { title: '제목', content: '내용' };
    const memo: Memo = { ...form, id: '100' };

    mockedMemoApi.saveMemo.mockResolvedValue({
      data: memo,
      status: 200,
      statusText: '',
      headers: '',
      config: {},
    });
    const { result, waitForNextUpdate } = renderHook(() => useMemoForm(), {
      wrapper: RecoilRoot,
    });

    result.current.saveMemo();

    await waitForNextUpdate();

    expect(result.current.memo).toEqual(memo);
  });

  it('메모 저장에 실패한다.', async () => {
    mockedMemoApi.saveMemo.mockRejectedValue({
      data: {
        error: true,
      },
      status: 400,
    });

    const { result, waitForNextUpdate } = renderHook(() => useMemoForm(), {
      wrapper: RecoilRoot,
    });

    result.current.saveMemo();

    await waitForNextUpdate();

    expect(result.current.memoError).toEqual(Error('Fail Save'));
  });
});
