import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { getMemoListState, memoListStateTrigger } from '../../modules/memo';
import { Memo } from '../../types';

type MemoItemProps = {
  memo: Memo
};

const MemoListBlock = styled.ul``;

const MemoItem = ({ memo }: MemoItemProps) => {
  return (
    <Link to={`/memos/${memo.id}`}>{memo.title}</Link>
  );
};

const MemoList = () => {
  const memoList = useRecoilValue(getMemoListState);
  const setMemoListStateTrigger = useSetRecoilState(memoListStateTrigger);

  useEffect(() => {
    setMemoListStateTrigger((trigger) => {
      return trigger + 1;
    });
  }, []);

  return (
    <MemoListBlock>
      {memoList.length ? (
        memoList.map((memo) => (
          <MemoItem memo={memo} key={memo.id} />
        ))
      ) : (
        <Link to="/write">메모 생성</Link>
      )}
    </MemoListBlock>
  );
};

export default MemoList;
