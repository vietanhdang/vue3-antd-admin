<template>
  <DynamicTable
    header-title="Nhật ký đăng nhập"
    auto-height
    :data-request="loadTableData"
    :columns="columns"
  />
</template>

<script setup lang="ts">
  import type { LoadDataParams, TableColumn } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { getLoginLogList } from '@/api/system/log';

  defineOptions({
    name: 'SystemMonitorLoginLog',
  });

  const [DynamicTable] = useTable();

  const loadTableData = async ({ page, limit }: LoadDataParams) => {
    const data = await getLoginLogList({ page, limit });
    return data;
  };

  const columns: TableColumn[] = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      width: 280,
      align: 'center',
    },
    {
      title: 'Địa chỉ IP đăng nhập',
      dataIndex: 'ip',
      width: 150,
      align: 'center',
    },
    {
      title: 'Địa điểm đăng nhập',
      dataIndex: 'loginLocation',
      align: 'center',
    },
    {
      title: 'Thời gian đăng nhập',
      dataIndex: 'time',
      align: 'center',
      formItemProps: {
        component: 'DatePicker',
        componentProps: {
          class: 'w-full',
        },
      },
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
  ];
</script>
