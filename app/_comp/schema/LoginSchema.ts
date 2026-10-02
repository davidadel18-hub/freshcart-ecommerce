import * as zod from 'zod'

export const LoginSchema = zod.object({
    email: zod.string().nonempty('Please enter your email address').email('Invalid email address').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address, Example: user@example.com'),
    password: zod.string().nonempty('Please enter your password').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character, Example: Password1!'),
  })
