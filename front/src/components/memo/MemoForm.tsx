import React, { useState } from 'react';
import styled from 'styled-components';

const MemoFormBlock = styled.form``;

interface Memo {
  title: string;
  content: string;
}

type MemoFormProps = {
  onSubmit: (form: Memo) => void;
};

const MemoForm = ({ onSubmit }: MemoFormProps) => {
  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onClick = () => {
    if (!form.title || !form.content) {
      return;
    }

    onSubmit(form);
  };

  return (
    <MemoFormBlock>
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
        <button type="button" onClick={onClick}>
          생성
        </button>
      </div>
    </MemoFormBlock>
  );
};

export default MemoForm;
