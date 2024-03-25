import z from 'zod'
const userSchema = z.object({
    name:z.string().min(3),
    released_on: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    }),
    // email:z.string().email()
})
export default userSchema;