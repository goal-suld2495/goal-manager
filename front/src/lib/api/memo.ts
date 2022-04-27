import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { Form, Memo } from '../../types';

export const saveMemo = (form: Form): Promise<AxiosResponse<Memo>> => {
  return apiClient.post('api/memos', form);
};

export const fetchMemo = (id: string): Promise<AxiosResponse<Memo>> => {
  return apiClient.post(`api/memos/${id}`);
};

export default {};
