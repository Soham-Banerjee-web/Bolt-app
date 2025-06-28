import CryptoJS from 'crypto-js';

export class EncryptionService {
  static generateKey() {
    return CryptoJS.lib.WordArray.random(256/8).toString();
  }

  static createUserKey() {
    return this.generateKey();
  }

  static encrypt(data, key) {
    try {
      const encrypted = CryptoJS.AES.encrypt(data, key).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  static decrypt(encryptedData, key) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        throw new Error('Decryption resulted in empty string');
      }
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  static hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
  }

  static generateSalt() {
    return CryptoJS.lib.WordArray.random(128/8).toString();
  }
}