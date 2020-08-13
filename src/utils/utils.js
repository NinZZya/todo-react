export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getPathKeyValue = (path, key) => {
  const pathValues = path.split('/');
  const keyIndex = pathValues.indexOf(key);

  return keyIndex !== -1 ? pathValues[keyIndex + 1] : null;
};
