class InfoService {
  add(key, data) {
    const privateKey = Symbol(key);

    this[privateKey] = _.cloneDeep(data);
    Object.defineProperty(this, key, {get: () => _.cloneDeep(this[privateKey])});
  }
  remove(key) {
    delete this[key];
  }
}

export default new InfoService();
