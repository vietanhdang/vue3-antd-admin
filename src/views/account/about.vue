<template>
  <div>
    <Card>
      <Card.Meta title="Thông tin về Ứng dụng">
        <template #description>
          <BlankLink :url="pkg.author.url" :text="pkg.name" /> dự án frontend này được phát triển
          dựa trên Vue 3.x, Vue-CLI 5.x, Ant-Design-Vue 3.x và TypeScript 4.x. Nó đã tích hợp định
          tuyến động, xác thực quyền truy cập, và cung cấp các thành phần chức năng phổ biến để giúp
          bạn xây dựng nhanh chóng nguyên mẫu sản phẩm trung tâm và sau trung tâm dành cho doanh
          nghiệp. Về nguyên tắc, không giới hạn bất kỳ mã nào cho việc sử dụng thương mại.
        </template>
      </Card.Meta>
    </Card>
    <Card class="mt-3">
      <Descriptions title="Thông tin Dự án" :column="2" bordered>
        <Descriptions.Item label="Phiên bản">
          <Tag color="processing">{{ pkg.version }}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian biên dịch gần nhất">
          <Tag color="processing">{{ lastBuildTime }}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="GitHub">
          <BlankLink :url="pkg.repository.url" text="GitHub" />
        </Descriptions.Item>
        <Descriptions.Item label="Liên kết Xem trước">
          <BlankLink :url="pkg.homepage" text="Liên kết Xem trước" />
        </Descriptions.Item>
        <Descriptions.Item label="Nhóm trò chuyện QQ" label-align="left" align="left">
          <a
            href="https://qm.qq.com/cgi-bin/qm/qr?k=ID-KcAOdPUPWVgAnsPLF3gRdHLc8GURO&jump_from=webapi"
            target="_blank"
          >
            Nhấp vào liên kết để tham gia cuộc trò chuyện nhóm
          </a>
        </Descriptions.Item>
      </Descriptions>
    </Card>
    <Card class="mt-3">
      <Descriptions title="Phụ thuộc trong Môi trường Sản phẩm" bordered>
        <template v-for="(value, key) in pkg.dependencies" :key="key">
          <Descriptions.Item :label="key">
            <BlankLink :url="key" :text="value" />
          </Descriptions.Item>
        </template>
      </Descriptions>
    </Card>
    <Card class="mt-3">
      <Descriptions title="Phụ thuộc trong Môi trường Phát triển" bordered>
        <template v-for="(value, key) in pkg.devDependencies" :key="key">
          <Descriptions.Item :label="key">
            <BlankLink :url="key" :text="value" />
          </Descriptions.Item>
        </template>
      </Descriptions>
    </Card>
  </div>
</template>

<script setup lang="tsx">
  import { Descriptions, Card, Tag } from 'ant-design-vue';
  const { pkg, lastBuildTime } = __APP_INFO__;

  const BlankLink = ({ url = '', text }) => {
    const target = /^http(s)?:/.test(url) ? url : `https://www.npmjs.com/package/${url}`;
    return (
      <a href={target} target="_blank">
        {text}
      </a>
    );
  };
</script>
