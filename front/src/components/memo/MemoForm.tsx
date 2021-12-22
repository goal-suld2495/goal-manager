import React, { ChangeEvent, EventHandler, useState } from 'react';
import styled from 'styled-components';

const MemoFormBlock = styled.form``;

interface Memo {
  title: string;
  content: string;
}

type MemoFormProps = {
  onSubmit: (form: Memo) => void;
  onChange: EventHandler<ChangeEvent>;
  form: Memo;
};

const MemoForm = ({ onSubmit, form, onChange }: MemoFormProps) => {
  const onClick = () => {
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
