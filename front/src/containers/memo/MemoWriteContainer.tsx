import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import MemoForm from '../../components/memo/MemoForm';
import { saveMemoAsync, setForm } from '../../modules/memo';
import { RootState } from '../../modules/store';

const MemoWriteContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    form,
    memo: result,
    memoError,
  } = useSelector(({ memo }: RootState) => ({
    form: memo.form,
    memo: memo.memo,
    memoError: memo.memoError,
  }));

  const onSubmit = () => {
    if (!form.title || !form.content) {
      message.warning('제목 또는 내용을 입력하세요.');
      return;
    }

    dispatch(saveMemoAsync.request(form));
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  useEffect(() => {
    if (memoError) {
      message.error('저장에 실패하였습니다.');
    }
  }, [memoError]);

  useEffect(() => {
    navigate(`/memos/${result.id}`);
  }, [result]);

  return <MemoForm onSubmit={onSubmit} onChange={onChange} form={form} />;
};

export default MemoWriteContainer;
