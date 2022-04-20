import { useEffect } from 'react';
import { RecoilState, RecoilValueReadOnly, useRecoilValue } from 'recoil';

const RecoilObserver = <T>({
  node,
  onChange,
}: {
  node: RecoilState<T> | RecoilValueReadOnly<T>;
  onChange: (value: T) => void;
}) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

export default RecoilObserver;
