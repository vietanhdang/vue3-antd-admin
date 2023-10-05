declare namespace API {
  type Menu = {
    createTime: Date;
    updateTime: Date;
    id: number;
    parentId: number;
    name: string;
    router: string;
    perms: string;
    /** Loại menu hiện tại 0: Thư mục | 1: Menu | 2: Quyền hạn */
    type: 0 | 1 | 2;
    icon: string;
    orderNum: number;
    viewPath: string;
    keepalive: boolean;
    isShow: boolean;
    /** Có phải là liên kết ngoại không */
    isExt?: boolean;
    /** Chế độ mở liên kết ngoại
     * 1: Mở trong cửa sổ mới
     * 2: iframe
     */
    openMode?: 1 | 2;
  };

  type PermMenu = {
    menus: Menu[];
    perms: string[];
  };

  type AdminUserInfo = {
    createTime: Date;
    updateTime: Date;
    id: number;
    departmentId: number;
    name: string;
    username: string;
    password: string;
    psalt: string;
    nickName: string;
    headImg: string;
    loginIp: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
    roles: number[];
    departmentName: string;
  };
}
