"use server";

import { getYearMonthCollection } from "@/lib/firebase-doc";
import { ExpenseFormData } from "./create-expense";
import { EXPENSE_ACTION_TAG } from "@/constants/action-tag";
import { unstable_cache } from "next/cache";

const actionTag = EXPENSE_ACTION_TAG;

export type GetExpenseDataType = {
  data: ExpenseFormData;
  id: string;
};

export const _getExpenseByYear = async (
  year: string,
): Promise<GetExpenseDataType[]> => {
  const colRef = getYearMonthCollection(actionTag, year);
  const snap = await colRef.get();

  return snap.docs.map((doc) => {
    const raw = doc.data();
    return {
      id: doc.id,
      data: raw.data as ExpenseFormData,
    };
  });
};
export const getExpenseByYear = unstable_cache(_getExpenseByYear, [actionTag], {
  revalidate: false,
  tags: [actionTag],
});
