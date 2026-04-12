import { z } from "zod";

export const initialStateSchema = z.object({
  initialState: z.string(),
  currency: z.literal("EUR"),
});

export type InitialStateFormType = z.infer<typeof initialStateSchema>;
