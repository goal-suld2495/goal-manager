import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemoForm from '../MemoForm';

describe('MemoForm', () => {
  it('render default ui', () => {
    render(<MemoForm onSubmit={() => {}} />);
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('내용을 입력해 주세요.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '생성' })).toBeInTheDocument();
  });

  it('타이틀 및 내용을 작성하지 않은 경우 전송 기능이 호출 되지 않는다.', () => {
    const fn = jest.fn();
    render(<MemoForm onSubmit={fn} />);

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(fn).not.toHaveBeenCalled();
  });

  it('전송 시 파라미터는 사용자가 입력한 타이틀과 내용입니다.', () => {
    const fn = jest.fn();
    render(<MemoForm onSubmit={fn} />);

    const form = {
      title: '여기는 제목입니다.',
      content: '여기는 내용입니다.',
    };

    const titleInput = screen.getByLabelText('제목');
    userEvent.type(titleInput, form.title);

    const contentInput = screen.getByPlaceholderText('내용을 입력해 주세요.');
    userEvent.type(contentInput, form.content);

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(fn).toHaveBeenCalledWith(form);
  });
});
