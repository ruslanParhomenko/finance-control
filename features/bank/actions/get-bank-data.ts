"use server";

import { BANK_ACTION_TAG } from "@/constants/action-tag";
import { unstable_cache } from "next/cache";
import { GetBankDataType } from "../model/type";
import { getYearMonthCollection } from "@/lib/firebase-doc";

const actionTag = BANK_ACTION_TAG;

export const _getBankByYear = async (
  year: string,
): Promise<GetBankDataType[]> => {
  const colRef = getYearMonthCollection(actionTag, year);

  const snap = await colRef.get();

  return snap.docs.map((doc) => {
    const raw = doc.data() as Omit<GetBankDataType, "id">;

    return {
      id: doc.id,
      ...raw,
    };
  });
};

export const getBankByYear = unstable_cache(_getBankByYear, [actionTag], {
  revalidate: false,
  tags: [actionTag],
});
