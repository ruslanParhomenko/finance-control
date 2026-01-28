"use server";

import { ExpenseFormType } from "@/features/month/schema";
import { dbAdmin } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

const EXPENSE_ACTION_TAG = "expense";

export type GetExpenseDataType = ExpenseFormType & {
  id: string;
};

// create
export async function createExpense(data: ExpenseFormType) {
  const docId = `${data.year}-${data.month}`;
  if (!docId) return;
  const docRef = dbAdmin.collection(EXPENSE_ACTION_TAG).doc(docId);
  const snapshot = await docRef.get();
  if (snapshot.exists) throw new Error("KEY_EXISTS");
  await docRef.set({
    uniqueKey: data.uniqueKey,
    year: data.year,
    month: data.month,
    rowExpenseData: data.rowExpenseData,
  });
  updateTag(EXPENSE_ACTION_TAG);
  return docRef.id;
}

// update
export async function updateExpense(docId: string, data: ExpenseFormType) {
  if (!docId) throw new Error("KEY_REQUIRED");
  const docRef = dbAdmin.collection(EXPENSE_ACTION_TAG).doc(docId);

  await docRef.update(data);
  updateTag(EXPENSE_ACTION_TAG);
  return docRef.id;
}

// get by filters
export const _getExpenseByUniqueKey = async (uniqueKey: string) => {
  const snapshot = await dbAdmin
    .collection(EXPENSE_ACTION_TAG)
    .doc(uniqueKey)
    .get();

  if (!snapshot.exists) return null;

  const doc = snapshot;

  return {
    id: doc.id,
    ...doc.data(),
  } as GetExpenseDataType;
};

export const getExpenseByUniqueKey = unstable_cache(
  _getExpenseByUniqueKey,
  ["expense"],
  {
    revalidate: false,
    tags: [EXPENSE_ACTION_TAG],
  },
);

// get by year
export const _getExpenseByYear = async (year: string) => {
  const snapshot = await dbAdmin
    .collection(EXPENSE_ACTION_TAG)
    .where("year", "==", year)
    .get();

  if (snapshot.empty) return [];

  const doc = snapshot.docs;

  return doc.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GetExpenseDataType[];
};

export const getExpenseByYear = unstable_cache(
  _getExpenseByYear,
  [EXPENSE_ACTION_TAG],
  {
    revalidate: false,
    tags: [EXPENSE_ACTION_TAG],
  },
);
