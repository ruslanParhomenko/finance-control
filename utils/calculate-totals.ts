type Output = Record<string, number>;
type Input = Record<string, (number | string)[]>;

export function calculateTotals(data: Input): Output {
  const result: Output = {};

  for (const key in data) {
    const arr = data[key] ?? [];

    const total = arr.reduce<number>((sum, val) => {
      return sum + Number(val);
    }, 0);

    result[key] = total;
  }

  return result;
}
