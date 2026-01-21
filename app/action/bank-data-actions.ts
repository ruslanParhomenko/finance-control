"use server";

import { BankFormData } from "@/features/bank/schema";
import { ExpenseFormType } from "@/features/month/schema";
import { dbAdmin } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

export type GetBankDataType = BankFormData & {
  id: string;
};

// create
export async function createBank(data: BankFormData) {
  const docRef = await dbAdmin.collection("bank").add({
    uniqueKey: data.uniqueKey,
    year: data.year,
    month: data.month,
    bank: data.bank,
  });
  updateTag("bank");
  return docRef.id;
}

// update
export async function updateBank(id: string, data: BankFormData) {
  await dbAdmin.collection("bank").doc(id).update(data);
  updateTag("bank");
  return id;
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
  const snapshot = await dbAdmin
    .collection("bank")
    .where("uniqueKey", "==", uniqueKey)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

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

  if (snapshot.empty) return null;

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
