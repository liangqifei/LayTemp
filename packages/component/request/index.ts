import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type { RequestConfig, UploadFileConfig } from './types';

const instance = axios.create({
  // 可根据需要配置 baseURL、timeout 等
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 例如自动添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 全局错误处理函数
function handleError(error: AxiosError) {
  // 你可以在这里弹窗、上报日志等
  // alert(error.message);
  // console.error(error);
  return Promise.reject(error);
}

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可在此统一处理返回数据结构
    return response;
  },
  (error: AxiosError) => {
    return handleError(error);
  }
);

export function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.get<T>(url, { params, ...config });
}

export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.post<T>(url, data, config);
}

export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.put<T>(url, data, config);
}

export function del<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.delete<T>(url, config);
}

export function uploadFile<T = any>(config: UploadFileConfig): Promise<AxiosResponse<T>> {
  const formData = new FormData();
  formData.append(config.fieldName || 'file', config.file);
  if (config.extraData) {
    Object.entries(config.extraData).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
  }
  return instance.post<T>(config.url, formData, {
    ...config,
    headers: {
      ...(config.headers || {}),
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function downloadFile(url: string, params?: any, config?: AxiosRequestConfig): Promise<Blob> {
  return instance.get(url, {
    params,
    responseType: 'blob',
    ...config,
  }).then((res: { data: Blob }) => res.data);
}

export default {
  get,
  post,
  put,
  delete: del,
  uploadFile,
  downloadFile,
};
