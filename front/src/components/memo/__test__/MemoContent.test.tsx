import { render, screen } from '@testing-library/react';
import { Memo } from '../../../types';
import MemoContent from '../MemoContent';

describe('MemoContent', () => {
  describe('render default ui', () => {
    it('제목과 내용을 받아서 화면에 출력한다.', () => {
      const memo: Memo = {
        id: '아이디',
        title: '제목입니다.',
        content: '내용입니다.',
      };
      render(<MemoContent memo={memo} />);

      const title = screen.getByRole('heading', { name: memo.title });
      const content = screen.getByText(memo.content);

      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });
});
