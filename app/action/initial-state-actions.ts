"use server";

import { InitialStateFormType } from "@/features/initial-state/schema";
import { dbAdmin } from "@/lib/firebase";

import { unstable_cache, updateTag } from "next/cache";

export async function createInitialState(
  data: InitialStateFormType,
  year: string,
) {
  if (!year) return;
  await dbAdmin.collection("initialState").doc(year).set(
    {
      initialState: data.initialState,
      currency: data.currency,
    },
    { merge: false },
  );

  updateTag("initialState");
}
export const _getInitialState = async (year: string) => {
  const doc = await dbAdmin.collection("initialState").doc(year).get();

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
