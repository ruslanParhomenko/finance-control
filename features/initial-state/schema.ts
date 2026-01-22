import { z } from "zod";

export const initialStateSchema = z.object({
  initialState: z.string().default("0"),
  currency: z.literal("EUR").default("EUR"),
});

export type InitialStateFormType = z.infer<typeof initialStateSchema>;
export const defaultInitialStateForm = initialStateSchema.parse({});
