/**
 * Lấy giá trị trả về từ Promise
 */
type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

/**
 * Chuyển đổi kiểu liên kết thành kiểu giao của chúng
 */
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * Ví dụ: type result = StringToUnion<'abc'> Kết quả: 'a'|'b'|'c'
 */
type StringToUnion<S extends string> = S extends `${infer S1}${infer S2}`
  ? S1 | StringToUnion<S2>
  : never;

/**
 * Thay thế chuỗi, tương tự như phương thức replace trong JavaScript
 */
type Replace<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${Right}` : Str;

/**
 * Thay thế tất cả các chuỗi, tương tự như phương thức replaceAll trong JavaScript
 */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? Replace<Replace<`${Left}${To}${Right}`, From, To>, From, To>
  : Str;

/**
 * Ví dụ: type result = CamelCase<'foo-bar-baz'>, Kết quả: fooBarBaz
 */
type CamelCase<S extends string> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S;

/**
 * Ví dụ: type result = StringToArray<'abc'>, Kết quả: ['a', 'b', 'c']
 */
type StringToArray<S extends string, T extends any[] = []> = S extends `${infer S1}${infer S2}`
  ? StringToArray<S2, [...T, S1]>
  : T;

/**
 * `RequiredKeys` là để lấy tất cả các trường bắt buộc và kết hợp chúng thành một kiểu liên kết
 */
type RequiredKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? P : never;
}[keyof T];

/**
 * `OptionalKeys` là để lấy tất cả các trường tùy chọn và kết hợp chúng thành một kiểu liên kết
 */
type OptionalKeys<T> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];

/**
 * `GetRequired` là để lấy một kiểu mới gồm tất cả các trường bắt buộc và kiểu của chúng
 */
type GetRequired<T> = {
  [P in RequiredKeys<T>]-?: T[P];
};

/**
 * `GetOptional` là để lấy một kiểu mới gồm tất cả các trường tùy chọn và kiểu của chúng
 */
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P];
};

/**
 * Ví dụ: type result = Includes<[1, 2, 3, 4], '4'> Kết quả: false; type result2 = Includes<[1, 2, 3, 4], 4> Kết quả: true
 */
type Includes<T extends any[], K> = K extends T[number] ? true : false;

/**
 * Ví dụ: type result = MyConcat<[1, 2], [3, 4]>  Kết quả: [1, 2, 3, 4]
 */
type MyConcat<T extends any[], U extends any[]> = [...T, ...U];

/**
 * Ví dụ: type result1 = MyPush<[1, 2, 3], 4> Kết quả: [1, 2, 3, 4]
 */
type MyPush<T extends any[], K> = [...T, K];

/**
 * Ví dụ: type result3 = MyPop<[1, 2, 3]>  Kết quả: [1, 2]
 */
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never; // eslint-disable-line
