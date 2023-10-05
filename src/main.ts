// Import các polyfills và thư viện cần thiết
import 'core-js/stable'; // Import polyfills cho các tính năng ECMAScript mới
import 'regenerator-runtime/runtime'; // Import runtime cho generator functions

// Import hàm createApp từ Vue
import { createApp } from 'vue';
import App from './App.vue'; // Import component chính của ứng dụng
import { setupRouter } from './router'; // Import cấu hình router
import { setupStore } from '@/store'; // Import cấu hình Vuex store
import { setupI18n } from '@/locales'; // Import cấu hình đa ngôn ngữ
import { setupAntd, setupAssets, setupGlobalMethods, setupCustomComponents } from '@/plugins'; // Import các plugins tùy chỉnh

// Kiểm tra nếu ứng dụng đang chạy trong môi trường production
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('./mock'); // Import hàm mockXHR từ module mock (chỉ trong production)
  mockXHR();
}

const app = createApp(App); // Tạo ứng dụng Vue

// Thiết lập các plugins
function setupPlugins() {
  // Đăng ký các thành phần ant-design-vue phổ biến vào ứng dụng
  setupAntd(app);
  // Import tài nguyên tĩnh như hình ảnh, biểu tượng
  setupAssets();
  // Đăng ký các thành phần tùy chỉnh toàn cục, ví dụ: <svg-icon />
  setupCustomComponents(app);
  // Đăng ký các phương thức toàn cục, ví dụ: app.config.globalProperties.$message = message
  setupGlobalMethods(app);
}

// Thiết lập ứng dụng Vue
async function setupApp() {
  // Kết nối Vuex store với ứng dụng
  setupStore(app);
  // Cấu hình đa ngôn ngữ
  // Trường hợp bất đồng bộ: các tệp ngôn ngữ có thể được lấy từ máy chủ
  await setupI18n(app);
  // Thiết lập cấu hình router
  await setupRouter(app);

  app.mount('#app'); // Gắn ứng dụng vào phần tử có id là 'app'
}

setupPlugins(); // Gọi hàm thiết lập plugins
setupApp(); // Gọi hàm thiết lập ứng dụng Vue
