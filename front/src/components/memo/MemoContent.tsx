import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CurrentMemoState } from '../../modules/memo';
import { Memo } from '../../types';

const MemoContentBlock = styled.div``;

const MemoContent = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  let memo: Memo | null;

  try {
    memo = useRecoilValue(CurrentMemoState(id));
  } catch {
    return <div>메모를 불러오는데 실패하였습니다.</div>;
  }

  return (
    <MemoContentBlock>
      <>
        <h1>{memo.title}</h1>
        <div>{memo.content}</div>
      </>
    </MemoContentBlock>
  );
};

export default MemoContent;
