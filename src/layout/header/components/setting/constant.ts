export const themeStyle = [
  {
    label: 'Chủ đề Sáng',
    value: 'light',
  },
  {
    label: 'Chủ đề Tối',
    value: 'dark',
  },
  {
    label: 'Chế độ Tối Tuyệt',
    value: 'realDark',
  },
] as const;

/** Màu chủ đề */
export const themeColors = [
  {
    title: 'Xanh Bình Minh (Mặc định)',
    key: 'daybreak',
    value: 'rgb(24, 144, 255)',
  },
  {
    title: 'Bình minh nhạt',
    key: 'dust',
    value: 'rgb(245, 34, 45)',
  },
  {
    title: 'Núi lửa',
    key: 'volcano',
    value: 'rgb(250, 84, 28)',
  },
  {
    title: 'Hoàng hôn',
    key: 'sunset',
    value: 'rgb(250, 173, 20)',
  },
  {
    title: 'Xanh lam thanh khiết',
    key: 'cyan',
    value: 'rgb(19, 194, 194)',
  },
  {
    title: 'Xanh lá cây sáng',
    key: 'green',
    value: 'rgb(82, 196, 26)',
  },
  {
    title: 'Xanh cơ bản',
    key: 'geekblue',
    value: 'rgb(47, 84, 235)',
  },
  {
    title: 'Màu tím đậm',
    key: 'purple',
    value: 'rgb(114, 46, 209)',
  },
] as const;

/** Chế độ bố trí */
export const layouts = [
  {
    label: 'Bố trí Menu bên',
    value: 'sidemenu',
  },
  {
    label: 'Bố trí Menu trên',
    value: 'topmenu',
  },
] as const;
