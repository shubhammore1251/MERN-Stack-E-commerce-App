import CryptoJS from 'crypto-js';

const secretKey = 'secret-key';

export const encrypt = (value) => {
  const encryptedValue = CryptoJS.AES.encrypt(value.toString(), secretKey).toString();
  return encryptedValue;
};

export const decrypt = (encryptedValue) => {
  const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedValue;
};