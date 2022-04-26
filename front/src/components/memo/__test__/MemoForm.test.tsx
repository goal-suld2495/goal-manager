import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'jest-mock';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import MemoForm, { MemoFormProps } from '../MemoForm';
import useMemoForm from '../../../hooks/useMemoForm';

jest.mock('../../../hooks/useMemoForm');
const mockUseMemoForm = mocked(useMemoForm);

describe('MemoForm', () => {
  const initUseMemoForm = () => {
    const result = useMemoForm();
    const saveMemoFn = jest.fn();
    const setFormFn = jest.fn();

    return {
      ...result,
      setForm: setFormFn,
      saveMemo: saveMemoFn,
    };
  };

  const getInitForm = () => {
    return {
      title: '타이틀',
      content: '내용',
    };
  };

  const setup = ({ initForm }: MemoFormProps = {}) => {
    const result = useMemoForm();
    mockUseMemoForm.mockImplementation(() => ({
      ...result,
      form: initForm || { title: '', content: '' }
    }));
    return render(
      <RecoilRoot>
        <BrowserRouter>
          <MemoForm initForm={initForm} />
        </BrowserRouter>
      </RecoilRoot>
    );
  };

  it('render default ui', () => {
    setup();
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('내용을 입력해 주세요.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '생성' })).toBeInTheDocument();
  });

  it('사용자가 제목과 내용 인풋에 값을 입력하면 setForm 함수가 호출된다', () => {
    const result = initUseMemoForm();
    mockUseMemoForm.mockImplementation(() => ({ ...result }));

    setup();

    const title = '제목';
    const content = '제목';

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');

    userEvent.type(titleInput, title);
    userEvent.type(contentInput, content);

    expect(result.setForm).toHaveBeenCalledTimes(title.length + content.length);
  });

  it('받아온 폼 데이터를 인풋에 출력한다.', () => {
    const initForm = getInitForm();
    setup({ initForm });

    expect(screen.getByDisplayValue(initForm.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initForm.content)).toBeInTheDocument();
  });

  it('사용자가 생성 버튼을 클릭 시 전송 기능이 호출된다.', () => {
    const initForm = getInitForm();
    const result = initUseMemoForm();

    mockUseMemoForm.mockImplementation(() => ({ ...result }));
    setup({ initForm });

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(result.saveMemo).toHaveBeenCalledTimes(1);
  });

  it('생성 버튼을 클릭했을 때, 제목 또는 내용을 입력하지 않은 경우 경고창을 출력한다.', async () => {
    setup();

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(
      await screen.findByText('제목 또는 내용을 입력하세요.')
    ).toBeInTheDocument();
  });

  it('성공적으로 저장하는 경우 작성한 게시글 뷰어 페이지로 이동한다', async () => {
    const initForm = getInitForm();
    const result = initUseMemoForm();
    const fn = jest.fn();

    mockUseMemoForm.mockImplementation(() => ({
      ...result,
      saveMemo: fn,
      memo: {
        id: '100',
        content: '',
        title: ''
      }
    }));

    setup({ initForm });

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');

    userEvent.type(titleInput, '제목');
    userEvent.type(contentInput, '내용');

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    await waitFor(() => {
      expect(global.location.pathname).toBe('/memos/100');
    });
    expect(fn).toBeCalled();
  });

  // it('저장 액션에 실패했다면 실패와 관련된 에러 메시지를 출력한다.', async () => {
  //   const result = initUseMemoForm();

  //   mockUseMemoForm.mockImplementation(() => ({
  //     ...result,
  //     memoError: new Error('Fail Save')
  //   }));

  //   setup();

  //   const titleInput = screen.getByLabelText('제목');
  //   const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');

  //   userEvent.type(titleInput, '제목');
  //   userEvent.type(contentInput, '내용');

  //   const button = screen.getByRole('button', { name: '생성' });
  //   userEvent.click(button);

  //   expect(
  //     await screen.findByText('저장에 실패하였습니다.')
  //   ).toBeInTheDocument();
  //   expect(result.saveMemo).toBeCalled();
  // });
});
