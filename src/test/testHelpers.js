export const syncPromiseOf = v => ({
  then(f) {
    return f(v);
  }
});

export default syncPromiseOf;
