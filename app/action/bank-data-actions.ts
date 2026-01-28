"use server";

import { BankFormData } from "@/features/bank/schema";
import { dbAdmin } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type GetBankDataType = BankFormData & {
  id: string;
};

// create
export async function createBank(data: BankFormData) {
  const docId = `${data.year}-${data.month}`;
  if (!docId) return;
  const docRef = dbAdmin.collection("bank").doc(docId);
  const snapshot = await docRef.get();
  if (snapshot.exists) throw new Error("KEY_EXISTS");

  await docRef.set({
    uniqueKey: data.uniqueKey,
    year: data.year,
    month: data.month,
    bank: data.bank,
    totals: data.totals,
  });
  updateTag("bank");
  return docRef.id;
}

// update
export async function updateBank(docId: string, data: BankFormData) {
  if (!docId) throw new Error("KEY_REQUIRED");
  const docRef = dbAdmin.collection("bank").doc(docId);

  await docRef.update(data);
  updateTag("bank");
  return docRef.id;
}

// get by id
export const _getBankById = async (id: string) => {
  const doc = await dbAdmin.collection("bank").doc(id).get();
  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
  } as GetBankDataType;
};

export const getBankById = unstable_cache(_getBankById, ["bank"], {
  revalidate: false,
  tags: ["bank"],
});

// get by filters
export const _getBankByUniqueKey = async (uniqueKey: string) => {
  const snapshot = await dbAdmin.collection("bank").doc(uniqueKey).get();

  if (!snapshot.exists) return null;

  const doc = snapshot;

  return {
    id: doc.id,
    ...doc.data(),
  } as GetBankDataType;
};

export const getBankByUniqueKey = unstable_cache(
  _getBankByUniqueKey,
  ["bank"],
  {
    revalidate: false,
    tags: ["bank"],
  },
);

// get by year
export const _getBankByYear = async (year: string) => {
  const snapshot = await dbAdmin
    .collection("bank")
    .where("year", "==", year)
    .get();

  if (snapshot.empty) return [];

  const doc = snapshot.docs;

  return doc.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GetBankDataType[];
};

export const getBankByYear = unstable_cache(_getBankByYear, ["bank"], {
  revalidate: false,
  tags: ["bank"],
});
