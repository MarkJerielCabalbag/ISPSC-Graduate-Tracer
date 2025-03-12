export const formatData = <T, U>(data: T[], mapFn: (item: T) => U[]): U[] => {
  return data.flatMap(mapFn);
};
