import { message } from 'antd';
export function success (type)  {
  message.success(type);
};

export function error (type)  {
  message.error(type);
};