/**
 * @description: Kết quả yêu cầu
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 10042,
  TYPE = 'success',
}

/**
 * @description: Phương thức yêu cầu
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description: Loại ContentType thường dùng
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data thường kết hợp với qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data tải lên
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
