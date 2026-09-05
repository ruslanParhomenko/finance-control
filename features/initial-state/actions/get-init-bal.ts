"use server";

import { INIT_BALANCE_ACTION_TAG } from "@/constants/action-tag";
import { dbAdmin } from "@/lib/firebase";
import { unstable_cache } from "next/cache";
import { GetInitialStateType } from "../model/type";

const actionTag = INIT_BALANCE_ACTION_TAG;

export const _getInitialState = async (year: string) => {
  const doc = await dbAdmin.collection(actionTag).doc(year).get();

  if (!doc.exists)
    return {
      initialState: { EUR: 0, USD: 0, MDL: 0 },
      currencyRates: { EUR: 0, USD: 0, MDL: 0 },
    };
  const data = doc.data()!;

  return data as GetInitialStateType;
};
export const getInitialState = unstable_cache(_getInitialState, [actionTag], {
  revalidate: false,
  tags: [actionTag],
});
