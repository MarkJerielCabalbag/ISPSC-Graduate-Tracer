export function displayYears(startYear: number, endYear: number) {
  let years = Array.from(
    { length: endYear - startYear + 1 },
    (v, i) => startYear + i
  );
  return years;
}
