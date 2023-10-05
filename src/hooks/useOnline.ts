import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Kiểm tra xem người dùng có kết nối mạng không
 * */
export function useOnline() {
  const online = ref(true);

  const showStatus = (val) => {
    online.value = typeof val == 'boolean' ? val : val.target.online;
  };

  // Khi trang web được tải, đặt trạng thái mạng đúng
  navigator.onLine ? showStatus(true) : showStatus(false);

  onMounted(() => {
    // Bắt đầu theo dõi sự thay đổi trạng thái mạng
    window.addEventListener('online', showStatus);

    window.addEventListener('offline', showStatus);
  });
  onUnmounted(() => {
    // Loại bỏ việc theo dõi sự thay đổi trạng thái mạng
    window.removeEventListener('online', showStatus);

    window.removeEventListener('offline', showStatus);
  });

  return { online };
}
