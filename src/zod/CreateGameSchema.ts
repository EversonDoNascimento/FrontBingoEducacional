import { z } from "zod";

const SchemaCreateGame = z.object({
  content_question: z.string(),
  answer_question: z.string(),
  category: z.string(),
});

export default SchemaCreateGame;
