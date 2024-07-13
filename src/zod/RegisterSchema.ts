import { z } from "zod";

const RegisterSchema = z.object({
  is_teacher: z.enum(["0", "1"]),
  name: z.string().min(9, "Digite seu nome completo!"),
  email: z.string().email("Email inválido!"),
  // .regex(
  //   /@(docente\.ifpe.edu\.br)$/,
  //   "Você deve logar com o email institucional!"
  // )
  confirm_email: z.string().email("Email inválido!"),
  // .regex(
  //   /@(docente\.ifpe.edu\.br)$/,
  //   "Você deve logar com o email institucional!"
  // ),
  password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres!"),
  confirm_password: z
    .string()
    .min(4, "Senha deve conter no mínimo 4 caracteres!"),
});

export default RegisterSchema;
