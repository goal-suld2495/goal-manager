import React, { EventHandler } from 'react';
import styled from 'styled-components';

const MemoFormBlock = styled.form``;

type MemoFormProps = {
  onSubmit: EventHandler<React.MouseEvent>;
};

const MemoForm = ({ onSubmit }: MemoFormProps) => {
  return (
    <MemoFormBlock>
      <div className="title">
        <label htmlFor="title">제목</label>
        <input id="title" type="text" />
      </div>
      <div className="content">
        <textarea placeholder="내용을 입력해 주세요." />
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
