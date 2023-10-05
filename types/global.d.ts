import packageJSON from '../package.json'; // Import package.json file

// Định nghĩa một số kiểu dữ liệu và sửa đổi cho kiểu dữ liệu có sẵn

declare global {
  const __APP_INFO__: {
    pkg: typeof packageJSON;
    lastBuildTime: string;
  };

  // Khai báo một số biến toàn cục

  // declare interface Window {
  //   // Global vue app instance
  //   __APP__: App<Element>;
  // }

  // Khai báo kiểu dữ liệu của biến toàn cục __APP__

  // Vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  // Định nghĩa kiểu dữ liệu PropType và VueNode

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  // Định nghĩa một kiểu dữ liệu Writable để bỏ đi readonly từ các thuộc tính

  type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
  };

  // Định nghĩa một kiểu dữ liệu RemoveIndex để loại bỏ các kiểu có index không phù hợp

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;

  // Định nghĩa kiểu dữ liệu Nullable cho kiểu dữ liệu có thể null và NonNullable để loại bỏ null và undefined

  declare type Recordable<T = any> = Record<string, T>;

  // Định nghĩa kiểu dữ liệu Recordable là một kiểu dữ liệu ghi chú thường sử dụng cho đối tượng có các thuộc tính chuỗi

  declare type Key = string | number;

  // Định nghĩa kiểu dữ liệu Key là một kiểu dữ liệu có thể là chuỗi hoặc số

  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };

  // Định nghĩa kiểu dữ liệu ReadonlyRecordable là một kiểu dữ liệu ghi chú chỉ đọc cho đối tượng có các thuộc tính chuỗi

  declare type Indexable<T = any> = {
    [key: string]: T;
  };

  // Định nghĩa kiểu dữ liệu Indexable cho đối tượng có các thuộc tính chuỗi

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  // Định nghĩa kiểu dữ liệu DeepPartial cho việc sửa đổi một đối tượng thành một phiên bản "một phần" của nó

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  // Định nghĩa kiểu dữ liệu TimeoutHandle và IntervalHandle cho việc quản lý thời gian và các bộ đếm

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  // Định nghĩa giao diện ChangeEvent cho sự kiện thay đổi với một mục tiêu là một phần tử đầu vào HTML

  declare interface WheelEvent {
    path?: EventTarget[];
  }

  // Định nghĩa giao diện WheelEvent cho sự kiện cuộn với một mảng đường dẫn sự kiện

  declare function parseInt(s: string | number, radix?: number): number;
  declare function parseFloat(string: string | number): number;

  // Khai báo các hàm parseInt và parseFloat

  declare type EmitFn<E = EmitsOptions> = SetupContext<E>['emit'];

  // Định nghĩa kiểu dữ liệu EmitFn cho việc gửi sự kiện trong Vue

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}
