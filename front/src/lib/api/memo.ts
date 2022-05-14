import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { Form, Memo } from '../../types';

export const saveMemo = (form: Form): Promise<AxiosResponse<Memo>> => {
  return apiClient.post('api/memos', form);
};

export const fetchMemo = (id: string): Promise<AxiosResponse<Memo>> => {
  return Promise.resolve({
      data: { title: '제목', content: '내용', id },
      status: 200,
      statusText: '',
      headers: '',
      config: {},
    });
  // return apiClient.post(`api/memos/${id}`);
};

export const fetchMemoList = (): Promise<AxiosResponse<Memo[]>> => {
  return apiClient.get('api/memos');
};

export default {};
