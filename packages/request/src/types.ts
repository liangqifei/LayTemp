import type { AxiosRequestConfig } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {}

export interface UploadFileConfig extends AxiosRequestConfig {
  file: File | Blob;
  fieldName?: string;
  extraData?: Record<string, any>;
} 