<template>
  <div>
    <DynamicTable
      row-key="id"
      header-title="Công việc theo định kỳ"
      :data-request="getSysTaskList"
      :columns="columns"
      :scroll="{ x: 2000 }"
      bordered
    >
      <template #toolbar>
        <a-button type="primary" :disabled="!$auth('sys.task.add')" @click="openTaskModal({})">
          Thêm mới
        </a-button>
      </template>
      <template #expandedRowRender="{ record }">
        <Descriptions :column="1">
          <Descriptions.Item label="Mã công việc"># {{ record.id }}</Descriptions.Item>
          <Descriptions.Item label="Số lần thực hiện">
            {{ record.limit > 0 ? `Chỉ ${record.limit} lần` : 'Không giới hạn lần thực hiện' }}
          </Descriptions.Item>
          <Descriptions.Item v-if="record.type === 1" label="Khoảng thời gian thực hiện">
            Mỗi {{ record.every }} mili giây thực hiện một lần
          </Descriptions.Item>
          <Descriptions.Item v-else label="Biểu thức Cron">
            <Tooltip>
              <template #title>Giây Phút Giờ Ngày Tháng Tuần Năm (tùy chọn)</template>
              {{ record.cron }}
            </Tooltip>
          </Descriptions.Item>
          <Descriptions.Item v-if="record.type === 0" label="Thời gian thực hiện">
            <span>{{ parseExecTime(record) }}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Thao tác thực hiện">
            <Popconfirm
              title="Xác nhận thực hiện công việc này một lần?"
              :disabled="!$auth('sys.task.once')"
              @confirm="handleOnce(record)"
            >
              <Button type="link" size="small" :disabled="!$auth('sys.task.once')">
                <template #icon><ToolOutlined /></template>Chỉ một lần
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xác nhận chạy công việc này?"
              :disabled="!$auth('sys.task.start') || !(record.status === 0)"
              @confirm="handleStart(record)"
            >
              <Button
                type="link"
                size="small"
                :disabled="!$auth('sys.task.start') || !(record.status === 0)"
              >
                <template #icon><CaretRightOutlined /></template>Chạy
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xác nhận dừng công việc này?"
              :disabled="!$auth('sys.task.stop') || !(record.status === 1)"
              @confirm="handleStop(record)"
            >
              <Button
                type="link"
                size="small"
                :disabled="!$auth('sys.task.stop') || !(record.status === 1)"
              >
                <template #icon><PoweroffOutlined /></template>Dừng
              </Button>
            </Popconfirm>
          </Descriptions.Item>
        </Descriptions>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { ToolOutlined, CaretRightOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
  import { Descriptions, Tooltip, Popconfirm, Button } from 'ant-design-vue';
  import { baseColumns } from './columns';
  import { taskSchemas } from './formSchemas';
  import type { TableListItem, TableColumnItem } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import {
    getSysTaskList,
    sysTaskUpdate,
    sysTaskAdd,
    sysTaskDelete,
    getSysTaskInfo,
    sysTaskOnce,
    sysTaskStart,
    sysTaskStop,
  } from '@/api/system/task';

  defineOptions({
    name: 'SystemScheduleTask',
  });

  const [DynamicTable, dynamicTableInstance] = useTable({
    search: false,
    size: 'small',
  });

  const [showModal] = useFormModal();

  const reload = () => dynamicTableInstance?.reload();

  /**
   * @description Mở cửa sổ thêm mới / chỉnh sửa
   */
  const openTaskModal = async (record: Partial<TableListItem>) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? 'Chỉnh sửa' : 'Thêm mới'} công việc`,
        width: 640,
        onFinish: async (values) => {
          const params = {
            ...values,
            id: record.id,
          };
          console.log('Thêm mới / chỉnh sửa công việc', params);
          await (record.id ? sysTaskUpdate : sysTaskAdd)(params);
          reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: taskSchemas,
      },
    });

    // Nếu là chỉnh sửa, cần lấy chi tiết công việc
    if (record.id) {
      const data = await getSysTaskInfo({ id: record.id });

      formRef?.setFieldsValue({
        ...record,
        ...data,
      });
    }
  };

  const delRowConfirm = async (id: number) => {
    await sysTaskDelete({ id });
    reload();
  };

  const handleOnce = async (record: TableListItem) => {
    await sysTaskOnce({ id: record.id });
    reload();
  };

  const handleStart = async (record: TableListItem) => {
    await sysTaskStart({ id: record.id });
    reload();
  };

  const handleStop = async (record: TableListItem) => {
    await sysTaskStop({ id: record.id });
    reload();
  };

  const parseExecTime = (record: TableListItem) => {
    if (!record.startTime && !record.endTime) {
      return 'Không giới hạn thời gian';
    }
    if (!record.startTime && record.endTime) {
      return `Không giới hạn thời gian bắt đầu - ${record.endTime}`;
    }
    if (record.startTime && !record.endTime) {
      return `${record.startTime} - Không giới hạn thời gian kết thúc`;
    }
    return `${record.startTime} - ${record.endTime}`;
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: 'Thao tác',
      width: 220,
      dataIndex: 'ACTION',
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: 'Chỉnh sửa',
          auth: {
            perm: 'sys.task.update',
            effect: 'disable',
          },
          onClick: () => openTaskModal(record),
        },
        {
          label: 'Xóa',
          auth: 'sys.task.delete',
          popConfirm: {
            title: 'Bạn có chắc chắn muốn xóa không?',
            onConfirm: () => delRowConfirm(record.id),
          },
        },
      ],
    },
  ];
</script>
