import { onUnmounted } from 'vue';
import mitt from 'mitt';

const emitter: mitt.Emitter = mitt();

// Tạo bộ phát tùy chỉnh
const customEmit = (eventName) => {
  emitter.emit(eventName);
};

// Tạo bộ thu tùy chỉnh
const customOn = (eventName, callback) => {
  emitter.on(eventName, () => callback());
};

// Thông báo làm mới dữ liệu bảng
const toRefreshTable = () => {
  emitter.emit('reload');
};

// Làm mới dữ liệu bảng
const reload = (callback) => {
  emitter.on('reload', () => callback());
};

// Thông báo làm mới dữ liệu cây cấu trúc
const toRefreshTree = () => {
  emitter.emit('refreshTree');
};

// Làm mới dữ liệu cây cấu trúc
const refreshTree = (callback) => {
  emitter.on('refreshTree', () => callback());
};

export const useEventbus = () => {
  onUnmounted(() => {
    emitter.all.clear();
  });
  return {
    customEmit,
    customOn,
    toRefreshTable,
    reload,
    toRefreshTree,
    refreshTree,
  };
};
