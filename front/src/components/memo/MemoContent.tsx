import styled from 'styled-components';
import { Memo } from '../../types';

const MemoContentBlock = styled.div``;

type MemoContentProps = {
  memo: Memo;
};

const MemoContent = ({ memo }: MemoContentProps) => {
  return (
    <MemoContentBlock>
      <h1>{memo.title}</h1>
      <div>{memo.content}</div>
    </MemoContentBlock>
  );
};

export default MemoContent;
