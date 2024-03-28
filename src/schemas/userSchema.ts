import z from 'zod'
const movieSchema = z.object({
    name:z.string().min(3),
    email:z.string().email()
    // email:z.string().email()
})
export default movieSchema;