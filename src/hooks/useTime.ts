import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Lấy thời gian cục bộ
 */
export function useTime() {
  let timer; // Định thời
  const year = ref(0); // Năm
  const month = ref(0); // Tháng
  const week = ref(''); // Thứ trong tuần
  const day = ref(0); // Ngày
  const hour = ref<number | string>(0); // Giờ
  const minute = ref<number | string>(0); // Phút
  const second = ref(0); // Giây

  // Cập nhật thời gian
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    week.value = 'Chủ nhật,Thứ hai,Thứ ba,Thứ tư,Thứ năm,Thứ sáu,Thứ bảy'.split(',')[date.getDay()];
    day.value = date.getDate();
    hour.value =
      `${date.getHours()}`?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours());
    minute.value =
      `${date.getMinutes()}`?.padStart(2, '0') ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
    second.value = date.getSeconds();
  };

  // Định dạng thời gian ban đầu
  // new Intl.DateTimeFormat('vi', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false
  // }).format(new Date())

  updateTime();

  onMounted(() => {
    clearInterval(timer);
    timer = setInterval(() => updateTime(), 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { month, day, hour, minute, second, week };
}
