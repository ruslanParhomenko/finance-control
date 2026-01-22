import { getInitialState } from "@/app/action/initial-state-actions";
import InitialForm from "@/features/initial-state/initial-form";

export default async function Page() {
  const initialState = await getInitialState();
  return <InitialForm initialState={initialState} />;
}
