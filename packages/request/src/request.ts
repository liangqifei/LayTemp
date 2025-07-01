import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosProgressEvent } from 'axios';
import type { RequestConfig, UploadFileConfig } from './types';

const instance = axios.create({
  // 可根据需要配置 baseURL、timeout 等
  timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
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

// 通用 request 方法，支持进度回调
export function request<T = any>(config: RequestConfig & {
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}): Promise<AxiosResponse<T>> {
  return instance.request<T>({
    ...config,
    onUploadProgress: config.onUploadProgress,
    onDownloadProgress: config.onDownloadProgress,
  });
}

// get/post/put/del 基于 request 实现
export function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig) {
  return request<T>({ ...(config || {}), method: 'get', url, params });
}

export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return request<T>({ ...(config || {}), method: 'post', url, data });
}

export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
  return request<T>({ ...(config || {}), method: 'put', url, data });
}

export function del<T = any>(url: string, config?: AxiosRequestConfig) {
  return request<T>({ ...(config || {}), method: 'delete', url });
}

// 上传文件，支持进度
export function uploadFile<T = any>(config: UploadFileConfig & {
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}): Promise<AxiosResponse<T>> {
  const formData = new FormData();
  formData.append(config.fieldName || 'file', config.file);
  if (config.extraData) {
    Object.entries(config.extraData).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
  }
  return request<T>({
    ...(config as any),
    method: 'post',
    url: config.url,
    data: formData,
    headers: {
      ...(config.headers || {}),
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: config.onProgress,
  });
}

// 下载文件，支持进度
export function downloadFile(url: string, params?: any, config?: AxiosRequestConfig & {
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
}): Promise<Blob> {
  return request<Blob>({
    ...(config || {}),
    method: 'get',
    url,
    params,
    responseType: 'blob',
    onDownloadProgress: config?.onProgress,
  }).then(res => res.data);
}

export default {
  request,
  get,
  post,
  put,
  delete: del,
  uploadFile,
  downloadFile,
};


