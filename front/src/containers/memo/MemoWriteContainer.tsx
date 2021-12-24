import { useDispatch } from 'react-redux';
import MemoForm from '../../components/memo/MemoForm';
import { saveMemo } from '../../modules/memo';

const MemoWriteContainer = () => {
  const dispatch = useDispatch();
  const form = {
    title: '',
    content: '',
  };
  const onSubmit = () => {
    if (!form.title || !form.content) {
      alert('제목 또는 내용을 입력하세요.');
      return;
    }

    dispatch(saveMemo());
  };
  const onChange = () => {};
  return <MemoForm onSubmit={onSubmit} onChange={onChange} form={form} />;
};

export default MemoWriteContainer;
