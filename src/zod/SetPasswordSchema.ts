import { z } from "zod";

const SetPasswordSchema = z.object({
  password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres!"),
});

export default SetPasswordSchema;
