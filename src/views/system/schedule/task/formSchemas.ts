import type { FormSchema } from '@/components/core/schema-form/';

export const taskSchemas: FormSchema<API.SysTaskAddParams>[] = [
  {
    field: 'type',
    component: 'RadioGroup',
    label: 'Loại',
    defaultValue: 0,
    rules: [{ required: true, type: 'number' }],
    componentProps: {
      options: [
        {
          label: 'Cron',
          value: 0,
        },
        {
          label: 'Khoảng thời gian',
          value: 1,
        },
      ],
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: 'Tên công việc',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'service',
    component: 'Input',
    label: 'Đường dẫn dịch vụ',
    rules: [{ required: true, type: 'string' }],
    componentProps: {
      placeholder: 'Nhập đường dẫn dịch vụ cần gọi',
    },
  },
  {
    field: 'data',
    component: 'Input',
    label: 'Tham số công việc',
    componentProps: {
      placeholder: 'Nhập tham số công việc (không bắt buộc)',
    },
  },
  {
    field: 'limit',
    component: 'InputNumber',
    label: 'Số lần thực hiện',
    defaultValue: -1,
    componentProps: {
      min: -1,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'cron',
    component: 'Input',
    label: 'Cron',
    rules: [{ required: true, type: 'string' }],
    vIf: ({ formModel }) => formModel.type === 0,
    componentProps: {
      placeholder: 'Nhập biểu thức Cron',
    },
  },
  {
    field: 'every',
    component: 'InputNumber',
    label: 'Khoảng thời gian thực hiện',
    defaultValue: 60000,
    vIf: ({ formModel }) => formModel.type === 1,
    rules: [{ required: true, type: 'number' }],
    componentProps: {
      min: 100,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'startTime',
    component: 'DatePicker',
    label: 'Thời gian bắt đầu',
    vIf: ({ formModel }) => formModel.type === 0,
    componentProps: {
      showTime: true,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'endTime',
    component: 'DatePicker',
    label: 'Thời gian kết thúc',
    vIf: ({ formModel }) => formModel.type === 0,
    componentProps: {
      showTime: true,
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: 'Ghi chú',
  },
  {
    field: 'status',
    component: 'RadioGroup',
    defaultValue: 1,
    label: 'Trạng thái',
    componentProps: {
      options: [
        {
          label: 'Đang chạy',
          value: 1,
        },
        {
          label: 'Dừng',
          value: 0,
        },
      ],
    },
  },
];
