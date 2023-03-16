export const isNumber = (item: string | number): boolean =>
  !isNaN(Number(item));
