"use server";

import { ExpenseFormType } from "@/features/month/schema";
import { dbAdmin } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type GetExpenseDataType = ExpenseFormType & {
  id: string;
};

// create
export async function createExpense(data: ExpenseFormType) {
  const docRef = await dbAdmin.collection("expense").add({
    uniqueKey: data.uniqueKey,
    year: data.year,
    month: data.month,
    rowExpenseData: data.rowExpenseData,
  });
  updateTag("expense");
  return docRef.id;
}

// update
export async function updateExpense(id: string, data: ExpenseFormType) {
  await dbAdmin.collection("expense").doc(id).update(data);
  updateTag("expense");
  return id;
}

// get by id
export const _getExpenseById = async (id: string) => {
  const doc = await dbAdmin.collection("expense").doc(id).get();
  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  } as GetExpenseDataType;
};

export const getExpenseById = unstable_cache(_getExpenseById, ["expense"], {
  revalidate: false,
  tags: ["expense"],
});

// get by filters
export const _getExpenseByUniqueKey = async (uniqueKey: string) => {
  const snapshot = await dbAdmin
    .collection("expense")
    .where("uniqueKey", "==", uniqueKey)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

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
    tags: ["expense"],
  }
);
