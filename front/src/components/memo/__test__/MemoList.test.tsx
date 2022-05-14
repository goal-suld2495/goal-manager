import { render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { mocked } from 'jest-mock';
import memoList from '../../../test_util/mock/memoList';
import MemoList from '../MemoList';
import * as memoApi from '../../../lib/api/memo';
import { memoListStateTrigger } from '../../../modules/memo';

jest.mock('../../../lib/api/memo');
const mockedMemoApi = mocked(memoApi, true);

describe('MemoList', () => {
  it('페이지 리스트를 출력한다.', async () => {
    mockedMemoApi.fetchMemoList.mockResolvedValue({
      data: memoList,
      status: 200,
      statusText: '',
      headers: '',
      config: {},
    });

    render(
      <RecoilRoot>
        <MemoryRouter>
          <Suspense fallback={<div>loading</div>}>
            <MemoList />
          </Suspense>
        </MemoryRouter>
      </RecoilRoot>
    );

    await waitFor(() => {
      memoList.forEach(({ title }) => {
        expect(screen.getByRole('link', { name: new RegExp(title) })).toBeInTheDocument();
      });
    });
  });

  it('페이지가 존재하지 않는 경우 페이지 생성 버튼을 출력한다.', async () => {
    mockedMemoApi.fetchMemoList.mockResolvedValue({
      data: [],
      status: 200,
      statusText: '',
      headers: '',
      config: {},
    });

    render(
      <RecoilRoot initializeState={(snapshot) => snapshot.set(memoListStateTrigger, 10)}>
        <MemoryRouter>
          <Suspense fallback={<div>loading</div>}>
            <MemoList />
          </Suspense>
        </MemoryRouter>
      </RecoilRoot>
    );

    await waitFor(() => {
      expect(screen.getByRole('link', { name: '메모 생성' })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  // it('페이지 생성 버튼을 클릭하면 페이지 생성 페이지로 이동한다.', () => {
  //   render(
  //     <BrowserRouter>
  //     </BrowserRouter>
  //   )
  // });
});
