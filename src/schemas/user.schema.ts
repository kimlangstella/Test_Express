import z from 'zod'
const userSchema = z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    // email:z.string().email()
})
export default userSchema;