import { screen, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import userEvent from '@testing-library/user-event';
import MemoWriteContainer from '../MemoWriteContainer';
import renderWithRedux from '../../../utils/test/renderWithRedux';
import * as memoAPI from '../../../lib/api/memo';

jest.mock('../../../lib/api/memo');
const mockedMemoApi = mocked(memoAPI, true);

describe('MemoWriteContainer', () => {
  const setup = () => {
    return renderWithRedux(<MemoWriteContainer />);
  };

  it('render UI', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('생성 버튼을 클릭했을 때, 제목 또는 내용을 입력하지 않은 경우 경고창을 출력한다.', () => {
    global.alert = jest.fn();
    setup();

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('성공적으로 저장하는 경우 작성한 게시글 뷰어 페이지로 이동한다', async () => {
    mockedMemoApi.saveMemo.mockImplementation(() => {
      return Promise.resolve({
        data: {
          title: '제목',
          content: '내용',
          id: '100',
        },
        status: 200,
        statusText: '',
        headers: '',
        config: {},
      });
    });

    setup();

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');

    userEvent.type(titleInput, '제목');
    userEvent.type(contentInput, '내용');

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    await waitFor(() => {
      expect(global.location.pathname).toBe('/memos/100');
    });
  });
  // TODO
  // 저장 액션을 성공적으로 수행했다면 게시글 뷰어페이지로 이동

  // TODO
  // 저장 액션에 실패했다면 관련 된 모달 출력
});
