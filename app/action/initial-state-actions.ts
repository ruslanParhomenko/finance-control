"use server";

import { dbAdmin } from "@/lib/firebase";

import { unstable_cache, updateTag } from "next/cache";

export type GetInitialStateType = {
  initialState: {
    EUR: number;
    USD: number;
    MDL: number;
  };
};

export async function createInitialState(
  data: {
    EUR: number;
    USD: number;
    MDL: number;
  },
  year: string,
) {
  if (!year) return;
  await dbAdmin.collection("initialState").doc(year).set(
    {
      initialState: data,
    },
    { merge: false },
  );

  updateTag("initialState");
}
export const _getInitialState = async (year: string) => {
  const doc = await dbAdmin.collection("initialState").doc(year).get();

  if (!doc.exists) return { initialState: { EUR: 0, USD: 0, MDL: 0 } };
  const data = doc.data()!;

  return data as GetInitialStateType;
};
export const getInitialState = unstable_cache(
  _getInitialState,
  ["initialState"],
  {
    revalidate: false,
    tags: ["initialState"],
  },
);
