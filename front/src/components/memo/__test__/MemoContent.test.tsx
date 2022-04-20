import { render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { mocked } from 'jest-mock';
import React from 'react';
import { Route, MemoryRouter, Routes } from 'react-router-dom';
import { CurrentMemoState } from '../../../modules/memo';
import RecoilObserver from '../../../test_util/RecoilObserver';
import { Memo } from '../../../types';
import MemoContent from '../MemoContent';
import * as memoApi from '../../../lib/api/memo';

jest.mock('../../../lib/api/memo');
const mockedMemoApi = mocked(memoApi, true);

describe('MemoContent', () => {
  it('제목과 내용을 받아서 화면에 출력한다.', async () => {
    const memo: Memo = {
      id: '아이디',
      title: '제목입니다.',
      content: '내용입니다.',
    };

    mockedMemoApi.fetchMemo.mockResolvedValue({
      data: memo,
      status: 200,
      statusText: '',
      headers: '',
      config: {},
    });

    const onChange = jest.fn();

    render(
      <MemoryRouter initialEntries={[`/memos/${memo.id}`]}>
        <Routes>
          <Route
            path="/memos/:id"
            element={(
              <RecoilRoot>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <RecoilObserver
                    node={CurrentMemoState(memo.id)}
                    onChange={onChange}
                  />
                  <MemoContent />
                </React.Suspense>
              </RecoilRoot>
            )}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: memo.title });
      const content = screen.getByText(memo.content);

      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledWith(memo);
    });
  });

  it('메모를 불러오는데 실패한다.', async () => {
    mockedMemoApi.fetchMemo.mockRejectedValue({
      data: {
        error: true,
      },
      status: 400,
    });

    render(
      <MemoryRouter initialEntries={['/memos/1']}>
        <Routes>
          <Route
            path="/memos/:id"
            element={(
              <RecoilRoot>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <MemoContent />
                </React.Suspense>
              </RecoilRoot>
            )}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('메모를 불러오는데 실패하였습니다.')
    ).toBeInTheDocument();
  });
});
