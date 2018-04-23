/* eslint-disable import/prefer-default-export */

export const syncPromiseOf = v => ({
  then(f) {
    return f(v);
  }
});

export const buildMockResponse = jsonBody => ({ json: () => jsonBody });
