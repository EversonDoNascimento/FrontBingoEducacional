import { z } from "zod";

export const SchemaAddQuestions = z
  .object({
    question: z.string().min(4, "Digite alguma pergunta!"),
    answer: z.string().min(4, "Digite uma resposta!"),
    category: z.string(),
  })
  .refine(
    (data) => {
      if (
        data.category === "default" ||
        data.category === "Selecione uma categoria" ||
        data.category.trim() === ""
      ) {
        return false;
      }
      return true;
    },
    { message: "Escolha uma categoria!", path: ["category"] }
  );
