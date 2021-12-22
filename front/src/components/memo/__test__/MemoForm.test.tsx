import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemoForm from '../MemoForm';

describe('MemoForm', () => {
  const emptyFn = () => {};
  const form = {
    title: '',
    content: '',
  };

  it('render default ui', () => {
    render(<MemoForm onSubmit={emptyFn} onChange={emptyFn} form={form} />);
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('내용을 입력해 주세요.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '생성' })).toBeInTheDocument();
  });

  it('사용자가 제목과 내용 인풋에 값을 입력하면 onChnage 함수가 호출된다', () => {
    const fn = jest.fn();
    render(<MemoForm onSubmit={emptyFn} onChange={fn} form={form} />);

    const title = '제목';
    const content = '제목';

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');

    userEvent.type(titleInput, title);
    userEvent.type(contentInput, content);

    expect(fn).toHaveBeenCalledTimes(title.length + content.length);
  });

  it('받아온 폼 데이터를 인풋에 출력한다.', () => {
    const inputForm = {
      title: '타이틀',
      content: '내용',
    };

    render(<MemoForm onSubmit={emptyFn} onChange={emptyFn} form={inputForm} />);

    expect(screen.getByDisplayValue(inputForm.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(inputForm.content)).toBeInTheDocument();
  });

  it('사용자가 생성 버튼을 클릭 시 전송 기능이 호출된다.', () => {
    const fn = jest.fn();
    render(<MemoForm onSubmit={fn} onChange={emptyFn} form={form} />);

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
