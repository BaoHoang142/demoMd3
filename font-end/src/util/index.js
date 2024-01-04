/* 
    Những file js dùng chung như định dạng tiền tệ

*/
 export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

