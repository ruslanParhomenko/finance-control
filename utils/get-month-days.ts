export const MONTHS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export const YEAR = ["2025", "2026", "2027", "2028", "2029", "2030"];

export type MonthDayType = {
  day: number;
  weekday: string;
};

export const getMonthDays = ({
  month,
  year,
}: {
  month: string;
  year: string;
}) => {
  if (!month) return [];

  const monthIndex = MONTHS.findIndex(
    (m) => m.toLowerCase() === month.toLowerCase()
  );
  if (monthIndex < 0) return [];

  const daysInMonth = new Date(Number(year), monthIndex + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(Number(year), monthIndex, i + 1);
    return {
      day: i + 1,
      weekday: date
        .toLocaleDateString("ru-RU", { weekday: "short" })
        .replace(".", ""),
    };
  });
};
