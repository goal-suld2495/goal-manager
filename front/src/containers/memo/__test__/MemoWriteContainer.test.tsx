import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'jest-mock';
import MemoWriteContainer from '../MemoWriteContainer';
import * as MemoStore from '../../../modules/memo';
import renderWithRedux from '../../../utils/renderWithRedux';

jest.mock('../../../modules/Memo');
const mockedMemoStore = mocked(MemoStore, true);

describe('MemoWriteContainer', () => {
  const setup = () => {
    return renderWithRedux(<MemoWriteContainer />, null);
  };

  it('render UI', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('생성 버튼을 클릭했을 때, 제목 또는 내용을 입력하지 않은 경우 경고창을 출력한다.', () => {
    global.alert = jest.fn();
    setup();

    mockedMemoStore.saveMemo.mockImplementation(() => {});

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(mockedMemoStore.saveMemo).not.toHaveBeenCalled();
  });

  it('제목과 내용을 입력 후 생성 버튼을 클릭 시, 메모 저장 액션을 호출한다.', () => {
    setup();

    mockedMemoStore.saveMemo.mockImplementation(() => {});

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');

    userEvent.type(titleInput, '제목');
    userEvent.type(contentInput, '내용');

    expect(mockedMemoStore.saveMemo).toHaveBeenCalledTimes(1);
  });
  // TODO
  // 저장에 관련 된 리덕스 액션 호출 여부 확인

  // TODO
  // 저장 액션을 성공적으로 수행했다면 게시글 뷰어페이지로 이동

  // TODO
  // 저장 액션에 실패했다면 관련 된 모달 출력
});
