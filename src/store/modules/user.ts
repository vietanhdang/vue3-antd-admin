import { defineStore } from 'pinia';
import { useWsStore } from './ws';
import type { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { login } from '@/api/login';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { logout, getInfo, permmenu } from '@/api/account';
import { generatorDynamicRouter } from '@/router/generator-router';
import { resetRouter } from '@/router';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.AdminUserInfo>;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    name: 'amdin',
    avatar: '',
    perms: [],
    menus: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    },
  },
  actions: {
    /** reset token */
    resetToken() {
      this.avatar = this.token = this.name = '';
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
      Storage.clear();
    },

    /** set token */
    setToken(token: string) {
      this.token = token ?? '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },

    /** login */
    async login(params: API.LoginParams) {
      try {
        const { data } = await login(params);
        this.setToken(data.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /** Hàm này sẽ được gọi sau khi login thành công */
    async afterLogin() {
      try {
        const wsStore = useWsStore();
        const [userInfo, { perms }] = await Promise.all([getInfo(), permmenu()]);
        this.perms = perms;
        this.name = userInfo.name;
        this.avatar = userInfo.headImg;
        this.userInfo = userInfo;
        // SỬA LẠI MENU Ở ĐÂY
        const menus = [
          {
            createTime: new Date('2020-08-28 10:09:26'),
            updateTime: new Date('2021-12-08 14:51:06'),
            id: 1,
            parentId: null,
            name: 'Hệ thống',
            router: '/sys',
            perms: null,
            type: 0,
            icon: 'icon-shezhi',
            orderNum: 255,
            viewPath: null,
            keepalive: true,
            isShow: true,
            isExt: false,
            openMode: 1,
          },
          {
            createTime: new Date('2020-08-01 00:00:00'),
            updateTime: new Date('2023-06-11 10:17:23'),
            id: 3,
            parentId: 1,
            name: 'Quản lý quyền',
            router: '/sys/quyen',
            perms: null,
            type: 0,
            icon: 'icon-quanxian',
            orderNum: 0,
            viewPath: '',
            keepalive: true,
            isShow: true,
            isExt: false,
            openMode: 1,
          },
          {
            createTime: new Date('2020-08-08 00:00:00'),
            updateTime: new Date('2023-06-11 10:16:02'),
            id: 4,
            parentId: 3,
            name: 'Danh sách người dùng',
            router: '/sys/quyen/nguoidung',
            perms: null,
            type: 1,
            icon: 'icon-yonghu',
            orderNum: 0,
            viewPath: 'system/permission/user/index.vue',
            keepalive: true,
            isShow: true,
            isExt: false,
            openMode: 1,
          },
          {
            createTime: new Date('2020-08-08 00:00:00'),
            updateTime: new Date('2023-06-11 10:16:02'),
            id: 7,
            parentId: 3,
            name: 'Danh sách menu',
            router: '/sys/quyen/menu',
            perms: null,
            type: 1,
            icon: 'icon-tiaoxingtu',
            orderNum: 0,
            viewPath: 'system/permission/menu/index.vue',
            keepalive: true,
            isShow: true,
            isExt: false,
            openMode: 1,
          },
          {
            createTime: new Date('2020-09-04 09:41:43'),
            updateTime: new Date('2023-06-11 10:16:02'),
            id: 23,
            parentId: 3,
            name: 'Danh sách vai trò',
            router: '/sys/quyen/vaitro',
            perms: '',
            type: 1,
            icon: 'icon-jiaosequanxian',
            orderNum: 0,
            viewPath: 'system/permission/role/index.vue',
            keepalive: true,
            isShow: true,
            isExt: false,
            openMode: 1,
          },
          {
            createTime: new Date('2023-09-28 16:09:25'),
            updateTime: new Date('2023-09-28 16:09:25'),
            id: 314,
            parentId: null,
            name: 'Nhật ký truy cập',
            router: '/sys2/nguoidung',
            perms: null,
            type: 1,
            icon: 'icon-yonghu',
            orderNum: 255,
            viewPath: 'system/monitor/login-log/index.vue',
            keepalive: true,
            isShow: true,
            isExt: false,
            openMode: 1,
          },
        ] as API.Menu[];
        const generatorResult = await generatorDynamicRouter(menus);
        this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu);
        !wsStore.client && wsStore.initSocket();

        return { menus, perms, userInfo };
      } catch (error) {
        return Promise.reject(error);
        // return this.logout();
      }
    },

    /** Hàm này sẽ được gọi để logout */
    async logout() {
      await logout();
      const wsStore = useWsStore();
      wsStore.closeSocket();
      this.resetToken();
      resetRouter();
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
