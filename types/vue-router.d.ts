import { type RouteMeta as VRouteMeta } from 'vue-router';
import { type PermissionType } from '@/core/permission/modules/types';
import { type LocaleType } from '@/locales/config';

declare global {
  type Title18n = {
    [p in LocaleType]: string;
  };
}

declare module 'vue-router' {
  interface RouteMeta extends VRouteMeta {
    /** Tiêu đề */
    title: string | Title18n;
    /** Loại menu hiện tại 0: Thư mục | 1: Menu | 2: Quyền hạn */
    type?: 0 | 1 | 2;
    /** Quyền hạn của tuyến đường hiện tại */
    perms?: PermissionType[];
    /** Có cần lưu trữ tạm thời hay không */
    keepAlive?: boolean;
    /** Danh sách tên của tuyến đường cấp cha */
    namePath?: string[];
    /** Đường dẫn đầy đủ của tuyến đường hiện tại */
    fullPath?: string;
    /** Cố định trên thanh thẻ */
    affix?: boolean;
    /** Biểu tượng của menu */
    icon?: string;
    /** Tên chuyển đổi khi chuyển trang */
    transitionName?: string | false;
    /** @name Ẩn các menu con trong menu */
    hideChildrenInMenu?: boolean;
    /** Ẩn khỏi menu */
    hideInMenu?: boolean;
    /** Ẩn khỏi dấu breadcrumb */
    hideInBreadcrumb?: boolean;
    /** Ẩn khỏi tab trên thanh thẻ */
    hideInTabs?: boolean;
    /** Đặt menu cha sẽ được tô đậm khi tuyến đường hiện tại được chọn, thường được sử dụng cho các trang chi tiết */
    activeMenu?: string;
    /** Số thứ tự của menu */
    orderNum?: number;
    /** Liên kết ngoại */
    isExt?: boolean;
    /** Chế độ mở liên kết ngoại
     * 1: Mở trong cửa sổ mới
     * 2: iframe
     */
    openMode?: 1 | 2;
  }
}
