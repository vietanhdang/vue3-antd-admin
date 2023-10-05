/**
 * Giao diện chung cho một hàm (function).
 * @param T Kiểu dữ liệu đối số đầu vào (thường là các tham số).
 * @param R Kiểu dữ liệu kết quả trả về.
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

/**
 * Giao diện chung cho một hàm (function) trả về một Promise.
 * @param T Kiểu dữ liệu đối số đầu vào (thường là các tham số).
 * @param R Kiểu dữ liệu kết quả trả về trong Promise.
 */
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

/**
 * Kiểu dữ liệu tham chiếu có thể là một giá trị hoặc null.
 * @param T Kiểu dữ liệu của tham chiếu.
 */
declare type RefType<T> = T | null;

/**
 * Một mảng các tùy chọn với cấu trúc có chứa 'label' và 'value', cùng với các thuộc tính khác theo key-value pairs.
 */
declare type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

/**
 * Kiểu dữ liệu cho hàm gửi sự kiện (emit) có thể được sử dụng để gửi sự kiện trong ứng dụng.
 * @param event Tên của sự kiện.
 * @param args Các tham số khác (nếu có) cho sự kiện.
 */
declare type EmitType = (event: string, ...args: any[]) => void;

/**
 * Kiểu dữ liệu cho ngữ cảnh mục tiêu, ví dụ: '_self' hoặc '_blank'.
 */
declare type TargetContext = '_self' | '_blank';

/**
 * Giao diện chung cho tham chiếu đến một phần tử DOM (HTMLElement).
 * @param T Kiểu dữ liệu của phần tử DOM.
 */
declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

/**
 * Kiểu dữ liệu cho tham chiếu đến một phần tử DOM (HTMLElement) hoặc null.
 * @param T Kiểu dữ liệu của phần tử DOM.
 */
declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

/**
 * Kiểu dữ liệu cho tham chiếu đến một phần tử DOM (HTMLElement) hoặc null.
 * @param T Kiểu dữ liệu của phần tử DOM.
 */
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
