import { useRecoilState } from 'recoil';
import { formState, memoErrorState, memoState } from '../modules/memo';
import * as memoApi from '../lib/api/memo';

const useMemoForm = () => {
  const [form, setForm] = useRecoilState(formState);
  const [memo, setMemo] = useRecoilState(memoState);
  const [memoError, setMemoError] = useRecoilState(memoErrorState);

  const saveMemo = async () => {
    try {
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
