/**
 * Local Storage mock class
 */
export class LocalStorageMock {
  /**
   * Constructor
   */
  constructor() {
    this.store = {};
  }
  /**
   * Clears the storage
   */
  clear() {
    this.store = {};
  }
  /**
   *Returns value for the key
   * @param {string} key
   * @returns {*}
   */
  getItem(key) {
    return this.store[key] || null;
  }
  /**
   * sets the key value to storage
   * @param {string} key
   * @param {*} value
   */
  setItem(key, value) {
    this.store[key] = String(value);
  }
  /**
   * Removes the key from storage
   * @param {string} key
   */
  removeItem(key) {
    delete this.store[key];
  }
}
