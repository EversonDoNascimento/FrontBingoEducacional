import { z } from "zod";

export const SchemaAddQuestions = z.object({
  question: z.string().min(4, "Digite alguma pergunta!"),
  answer: z.string().min(4, "Digite uma resposta!"),
  category: z.string().min(2, "Informe uma categoria!"),
});
