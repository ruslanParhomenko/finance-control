import { dbAdmin } from "./firebase";

export function getYearMonthDoc(
  collection: string,
  year: string,
  month: string,
) {
  return dbAdmin
    .collection(collection)
    .doc(year)
    .collection("months")
    .doc(month);
}

export function getYearMonthCollection(collection: string, year: string) {
  return dbAdmin.collection(collection).doc(year).collection("months");
}
