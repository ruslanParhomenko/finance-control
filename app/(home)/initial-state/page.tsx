import { getInitialState } from "@/app/action/initial-state-actions";
import InitialForm from "@/features/initial-state/initial-form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { year } = await searchParams;
  if (!year) return;
  const initialState = await getInitialState(year);
  return <InitialForm initialState={initialState} year={year} />;
}
