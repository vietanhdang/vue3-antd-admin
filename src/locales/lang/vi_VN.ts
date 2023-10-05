import antdLocale from 'ant-design-vue/es/locale/vi_VN';
import { genMessage } from '../helper';

const modulesFiles = require.context('./vi-VN', true, /\.ts$/);

export default {
  message: {
    ...genMessage(modulesFiles, 'vi-VN'),
    antdLocale,
  },
};
