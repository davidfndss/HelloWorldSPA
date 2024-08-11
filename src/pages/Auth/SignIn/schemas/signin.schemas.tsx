import { z } from "zod";

// E-mail field validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "O e-mail precisa ser válido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/, {
      message: "A senha precisa conter pelo menos uma letra e um número"
    })
    // Password requirements:
    // Minimum of 6 characters
    // At least one uppercase or lowercase letter
    // At least one number
    // Symbols are accepted
});

export { signinSchema };
