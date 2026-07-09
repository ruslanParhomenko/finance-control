"use server";

import { BankFormData } from "@/features/bank/schema";
import { dbAdmin } from "@/lib/firebase";
import { cacheLife, cacheTag,  updateTag } from "next/cache";

const actionTag = "bank-data";

type BankForm = {
  year: string;
  month: string;
  dataBank: BankFormData;
};

export type GetBankDataType = {
  id: string;

  dataBank: BankFormData;
};

// create
export async function createBank(data: BankForm) {
  const { year, month, dataBank } = data;
  const docRef = dbAdmin
    .collection(actionTag)
    .doc(year)
    .collection("months")
    .doc(month);
  await docRef.set({ dataBank });

  updateTag(actionTag);
  return docRef.id;
}

// get by year
export const getBankByYear = async (year: string): Promise<GetBankDataType[]> => {
  "use cache";

  cacheTag(actionTag);
   cacheLife("max");
  
  
  const colRef = await dbAdmin
    .collection(actionTag)
    .doc(year)
    .collection("months");

  const snapshot = await colRef.get();

  if (snapshot.empty) return [];

  const doc = snapshot.docs;

  return doc.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GetBankDataType[];
};

