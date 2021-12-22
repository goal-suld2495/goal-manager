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

  it('생성 버튼을 클릭 시 전송 기능이 호출 된다.', () => {
    const fn = jest.fn();
    render(<MemoForm onSubmit={fn} />);

    const button = screen.getByRole('button', { name: '생성' });
    userEvent.click(button);

    expect(fn).toHaveBeenCalled();
  });
});
