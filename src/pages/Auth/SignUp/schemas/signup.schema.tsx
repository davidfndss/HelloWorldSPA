import { z } from "zod"

const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Nome de usuário muito curto" })
    .regex(/^[a-zA-Z0-9._]{3,}$/, { message: "Nome de usuário inválido. Use apenas letras, números, ponto (.) e sublinhado (_)"}),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/, {
        message: "A senha precisa conter pelo menos uma letra e um número", 
        // Password requirements:
        // Minimum of 6 characters
        // At least one uppercase or lowercase letter
        // At least one number
        // Symbols are accepted
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, { 
  message: "As senhas não correspondem",
  path: ["confirmPassword"]
})

export { signupSchema }