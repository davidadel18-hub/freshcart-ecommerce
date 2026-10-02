import * as zod from 'zod'

export const RegisterSchema = zod.object({
    name: zod.string().nonempty('Please enter your full name').min(3, 'Name must be at least 3 characters long').max(50, 'Name must be at most 50 characters long'),
    email: zod.string().nonempty('Please enter your email address').email('Invalid email address').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address, Example: user@example.com'),
    password: zod.string().nonempty('Please enter your password').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character, Example: Password1!'),
    rePassword: zod.string().nonempty('Please confirm your password'),
    phone: zod.string().nonempty('Please enter your phone number').regex(/^(?:\+20|0020|0)?1[0125]\d{8}$/, 'Please enter a valid Egyptian phone number, Example: +201234567890'),
}).refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Passwords do not match',
})
