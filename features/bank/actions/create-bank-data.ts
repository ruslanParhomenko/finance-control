"use server";

import { BANK_ACTION_TAG } from "@/constants/action-tag";
import { updateTag } from "next/cache";
import { BankForm } from "../model/type";
import { getYearMonthDoc } from "@/lib/firebase-doc";

const actionTag = BANK_ACTION_TAG;

export async function createBank(data: BankForm) {
  const { year, month, dataBank, dataCurrency } = data;
  const docRef = getYearMonthDoc(actionTag, year, month);
  await docRef.set({ dataBank, year, month, dataCurrency });

  updateTag(actionTag);
  return docRef.id;
}
