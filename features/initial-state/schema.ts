import { z } from "zod";

export const initialStateSchema = z.object({
  initialState: z.string(),
});

export type InitialStateFormType = z.infer<typeof initialStateSchema>;
