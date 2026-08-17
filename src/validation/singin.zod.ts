import * as z from 'zod'

// Zod Schema (Only Email, Password, and Role)
export const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    role: z.string().min(1, { message: 'Please select a role.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' })
})
