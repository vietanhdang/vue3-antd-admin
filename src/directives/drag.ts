import type { ObjectDirective } from 'vue';

export const vDrag: ObjectDirective = {
  mounted(el: HTMLDivElement, binding) {
    // Không thể gắn chỉ thị cho a-modal, vì vậy ta không sử dụng chỉ thị để kiểm soát kéo thả.
    console.log('v-drag', el, binding);
  },
};
