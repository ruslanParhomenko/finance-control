"use server";

import { InitialStateFormType } from "@/features/initial-state/schema";
import { dbAdmin } from "@/lib/firebase";

import { unstable_cache, updateTag } from "next/cache";

const INITIAL_STATE_DOC_ID = "singleton";

export async function createInitialState(data: InitialStateFormType) {
  await dbAdmin.collection("initialState").doc(INITIAL_STATE_DOC_ID).set(
    {
      initialState: data.initialState,
      currency: data.currency,
    },
    { merge: false },
  );

  updateTag("initialState");
}
export const _getInitialState = async () => {
  const doc = await dbAdmin.collection("initialState").doc("singleton").get();

  if (!doc.exists) {
    return {
      initialState: "0",
      currency: "EUR",
    } as InitialStateFormType;
  }

  const data = doc.data()!;

  return {
    initialState: data.initialState ?? "",
    currency: data.currency ?? "",
  } as InitialStateFormType;
};
export const getInitialState = unstable_cache(
  _getInitialState,
  ["initialState"],
  {
    revalidate: false,
    tags: ["initialState"],
  },
);
