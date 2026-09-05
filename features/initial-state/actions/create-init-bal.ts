"use server";

import { dbAdmin } from "@/lib/firebase";
import { updateTag } from "next/cache";
import { InitialStateForm } from "../model/type";
import { INIT_BALANCE_ACTION_TAG } from "@/constants/action-tag";

const actionTag = INIT_BALANCE_ACTION_TAG;

export async function createInitialState(data: InitialStateForm, year: string) {
  if (!year) return;
  const { balanceByCurrency, currencyRates } = data;
  await dbAdmin.collection(actionTag).doc(year).set(
    {
      initialState: balanceByCurrency,
      currencyRates: currencyRates,
    },
    { merge: false },
  );

  updateTag(actionTag);
}
