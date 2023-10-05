import axios from 'axios';
import { message as $message } from 'ant-design-vue';
import { uniqueSlash } from './urlUtils';
import type { AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { useUserStore } from '@/store/modules/user';

export interface RequestOptions {
  /** Mã quyền của giao diện hiện tại, bỏ qua các giao diện không cần xác thực, định dạng: sys:user:add */
  permCode?: string;
  /** Có nên lấy dữ liệu trực tiếp, bỏ qua message và các thông báo khác không */
  isGetDataDirectly?: boolean;
  /** Thông báo khi yêu cầu thành công */
  successMsg?: string;
  /** Thông báo khi yêu cầu thất bại */
  errorMsg?: string;
  /** Yêu cầu dữ liệu giả mạo */
  isMock?: boolean;
}

const UNKNOWN_ERROR = 'Đã có lỗi xảy ra, vui lòng thử lại sau!';
const baseApiUrl = process.env.VUE_APP_BASE_API;
const baseMockUrl = process.env.VUE_APP_MOCK_API;

const service = axios.create({
  timeout: 6000,
});

service.interceptors.request.use(
  (config) => {
    const token = Storage.get(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // Nếu mã tùy chỉnh không phải là 200, thì xem như là lỗi.
    if (res.code !== 200) {
      $message.error(res.message || UNKNOWN_ERROR);

      // Token không hợp lệ
      if (res.code === 11001 || res.code === 11002) {
        window.localStorage.clear();
        window.location.reload();
      }

      // Xử lý ngoại lệ khác
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      return res;
    }
  },
  (error) => {
    // Xử lý thông báo lỗi cho lỗi 422 hoặc 500
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
    $message.error({ content: errMsg, key: errMsg });
    error.message = errMsg;
    return Promise.reject(error);
  },
);

export type Response<T = any> = {
  code: number;
  message: string;
  data: T;
};

export type BaseResponse<T = any> = Promise<Response<T>>;

export const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const { successMsg, errorMsg, permCode, isMock, isGetDataDirectly = true } = options;
    // Nếu đây là giao diện yêu cầu xác thực và không có quyền, thì dừng yêu cầu.
    if (permCode && !useUserStore().perms.includes(permCode)) {
      return $message.error(
        'Bạn không có quyền truy cập giao diện này, vui lòng liên hệ quản trị viên!',
      );
    }
    const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
    config.url = uniqueSlash(fullUrl);
    const res = await service.request(config);
    successMsg && $message.success(successMsg);
    errorMsg && $message.error(errorMsg);
    return isGetDataDirectly ? res.data : res;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
