import { useRecoilState } from 'recoil';
import { message } from 'antd';
import { formState, memoErrorState, memoState } from '../modules/memo';
import * as memoApi from '../lib/api/memo';
import { Form } from '../types';

const useMemoForm = (initForm?: Form) => {
  const [form, setForm] = useRecoilState(formState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [memoError, setMemoError] = useRecoilState(memoErrorState);

  if (initForm) {
    setForm(initForm);
  }

  const valiate = () => {
    if (!form.title || !form.content) {
      message.warning('제목 또는 내용을 입력하세요.');
      return false;
    }

    return true;
  };

  const saveMemo = async () => {
    try {
      if (!valiate()) {
        return;
      }

      const result = await memoApi.saveMemo(form);
      setMemo(result.data);
    } catch {
      setMemoError(new Error('Fail Save'));
    }
  };

  return {
    form,
    memo,
    memoError,
    setForm,
    saveMemo,
  };
};

export default useMemoForm;
