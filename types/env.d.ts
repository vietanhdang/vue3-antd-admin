/**
 * @description Định nghĩa kiểu dữ liệu cho biến môi trường
 */
declare namespace NodeJS {
  interface Process {
    env: {
      ENV: 'development' | 'production'; // Kiểu dữ liệu cho biến môi trường ENV, có thể là 'development' hoặc 'production'

      /** Địa chỉ gốc của trang web */
      BASE_URL: string;

      /** Đường dẫn cho các yêu cầu API */
      VUE_APP_BASE_API: string;

      /** Đường dẫn cho kết nối socket */
      VUE_APP_BASE_SOCKET_PATH: string;

      /** Namespace cho kết nối socket */
      VUE_APP_BASE_SOCKET_NSP: string;

      /** Đường dẫn cho yêu cầu API giả lập (mock) */
      VUE_APP_MOCK_API: string;

      /** Mã xác thực cho GitHub (GitHub Authentication Token) */
      GITHUB_AUTH_TOKEN: string;

      /** Môi trường node (Node Environment), có thể là 'development' hoặc 'production' */
      NODE_ENV: 'development' | 'production';

      /** Cổng (Port) cho ứng dụng (tùy chọn) */
      PORT?: string;

      /** Đường dẫn hiện tại (Present Working Directory) */
      PWD: string;
    };
  }
}
