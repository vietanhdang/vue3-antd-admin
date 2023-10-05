<template>
  <DynamicTable
    ref="dynamicTableRef"
    header-title="Người dùng trực tuyến"
    title-tooltip="Đây là hoạt động thực sự, vui lòng không đuổi người dùng khác ra ngoài mạng một cách bất hợp pháp."
    :data-request="getOnlineList"
    :columns="columns"
  />
</template>

<script setup lang="tsx">
  import { Tag } from 'ant-design-vue';
  import type { TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { getOnlineList, kickUser } from '@/api/system/online';
  import { useSocket } from '@/core/socket/useSocket';

  defineOptions({
    name: 'SystemMonitorOnline',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  useSocket({
    connect() {
      // Kết nối tự động làm tải lại
      dynamicTableInstance?.reload();
    },
    online() {
      // Sự kiện trực tuyến tự động làm tải lại
      dynamicTableInstance?.reload();
    },
    offline() {
      dynamicTableInstance?.reload();
    },
  });

  type TableListItem = API.OnlineUserListItem;

  const columns: TableColumn<TableListItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      width: 80,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      align: 'center',
      customRender: ({ record }) => (
        <div>
          <span class="pr-16px">{record.username}</span>
          {record.isCurrent && <Tag color={'red'}>Hiện tại</Tag>}
        </div>
      ),
    },
    {
      title: 'Địa chỉ IP đăng nhập',
      dataIndex: 'ip',
      width: 140,
      align: 'center',
    },
    {
      title: 'Thời gian đăng nhập',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: 'Hệ điều hành',
      dataIndex: 'os',
      align: 'center',
    },
    {
      title: 'Trình duyệt',
      dataIndex: 'browser',
      align: 'center',
    },
    {
      title: 'Hành động',
      dataIndex: 'ACTION',
      align: 'center',
      actions: ({ record }) => [
        {
          label: 'Đuổi ra ngoài',
          auth: 'sys.online.kick',
          disabled: record.disable,
          popConfirm: {
            title: 'Bạn có chắc muốn đuổi người dùng này ra khỏi mạng không?',
            onConfirm: () => handleKick(record),
          },
        },
      ],
    },
  ];

  const handleKick = async (record: TableListItem) => {
    await kickUser({ id: record.id });
  };
</script>
