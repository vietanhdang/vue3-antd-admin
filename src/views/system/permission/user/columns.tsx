import { Avatar, Space, Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.UserListPageResultItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: 'Ảnh đại diện',
    width: 80,
    dataIndex: 'headImg',
    hideInSearch: true,
    customRender: ({ record }) => <Avatar src={record.headImg} />,
  },
  {
    title: 'Họ và tên',
    width: 120,
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Tên người dùng',
    width: 120,
    align: 'center',
    dataIndex: 'username',
  },
  {
    title: 'Bộ phận',
    dataIndex: 'departmentName',
    hideInSearch: true,
    align: 'center',
    width: 180,
  },
  {
    title: 'Vai trò',
    dataIndex: 'roleNames',
    align: 'center',
    hideInSearch: true,
    width: 220,
    customRender: ({ record }) => (
      <Space>
        {record.roleNames.map((item) => (
          <Tag color={'success'} key={item}>
            {item}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'Biệt danh',
    width: 120,
    align: 'center',
    hideInSearch: true,
    dataIndex: 'nickName',
  },
  {
    title: 'Email',
    width: 120,
    align: 'center',
    dataIndex: 'email',
  },
  {
    title: 'Điện thoại',
    width: 120,
    align: 'center',
    dataIndex: 'phone',
  },
  {
    title: 'Ghi chú',
    width: 120,
    align: 'center',
    dataIndex: 'remark',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 100,
    hideInSearch: true,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'Kích hoạt',
            value: 1,
          },
          {
            label: 'Tắt',
            value: 0,
          },
        ],
      },
    },
    customRender: ({ record }) => {
      const isEnable = record.status === 1;
      return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? 'Kích hoạt' : 'Tắt'}</Tag>;
    },
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
    width: 120,
    hideInSearch: true,
    formItemProps: {
      component: 'DatePicker',
      componentProps: {
        class: 'w-full',
      },
    },
  },
  {
    title: 'Thời gian sửa',
    dataIndex: 'updatedAt',
    width: 120,
    hideInSearch: true,
    formItemProps: {
      component: 'DatePicker',
      componentProps: {
        class: 'w-full',
      },
    },
  },
];
