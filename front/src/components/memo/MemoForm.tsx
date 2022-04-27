import { FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import useMemoForm from '../../hooks/useMemoForm';

const MemoFormBlock = styled.form`
  height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  .title label {
    margin-bottom: 10px;
    font-size: var(--label-font-size);
    color: var(--label-color);
  }
  .title input {
    border: none;
    border-bottom: 1px solid #bbb;
    outline: none;
    transition: border 0.3s ease;
    font-size: var(--label-font-size);
  }
  .title input:focus {
    border-bottom: 1px solid #707070;
  }
  .content {
    flex: 1;
  }
  .content textarea {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    background: #e5e5e5;
    font-size: var(--label-font-size);
    outline: none;
    transition: border 0.3s ease;
    resize: none;
  }
  .content textarea:focus {
    border: 1px solid #a9a9a9;
  }
  .buttons {
    margin-top: 20px;
  }
`;

interface Memo {
  title: string;
  content: string;
}

export type MemoFormProps = {
  initForm?: Memo;
};

const MemoForm = ({ initForm }: MemoFormProps) => {
  const { form, memo, memoError, setForm, saveMemo } = useMemoForm(initForm);
  const navigate = useNavigate();

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      message.warning('제목 또는 내용을 입력하세요.');
      return;
    }

    saveMemo();
  };

  useEffect(() => {
    if (memoError) {
      message.error('저장에 실패하였습니다.');
    }
  }, [memoError]);

  useEffect(() => {
    if (memo && memo.id) {
      navigate(`/memos/${memo.id}`);
    }
  }, [memo]);

  return (
    <MemoFormBlock onSubmit={onSubmit}>
      <div className="title">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={onChange}
        />
      </div>
      <div className="content">
        <textarea
          name="content"
          placeholder="내용을 입력해 주세요."
          value={form.content}
          onChange={onChange}
        />
      </div>
      <div className="buttons">
        <button type="submit">생성</button>
      </div>
    </MemoFormBlock>
  );
};

export default MemoForm;
