const convertToMap = (values) => {
  const valuesMap = {};
  values.forEach((value) => valuesMap[value.id] = value);
  return valuesMap;
};

export const convertToBoards = (boards) => convertToMap(boards);
