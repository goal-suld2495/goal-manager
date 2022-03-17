import React, { EventHandler } from 'react';
import styled from 'styled-components';

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
  onSubmit: EventHandler<React.MouseEvent>;
  onChange: EventHandler<
    React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  >;
  form: Memo;
};

const MemoForm = ({ onSubmit, form, onChange }: MemoFormProps) => {
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
        <button type="button" onClick={onSubmit}>
          생성
        </button>
      </div>
    </MemoFormBlock>
  );
};

export default MemoForm;
