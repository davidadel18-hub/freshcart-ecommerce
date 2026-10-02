'use client'
import { registerUser } from '@/app/_comp/actions/register.action'
import { RegisterSchema } from '@/app/_comp/schema/RegisterSchema'
import { FieldError, FieldLabel, Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
 import { ToastContainer, toast } from 'react-toastify';
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export type User = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export default function Register() {

  const router = useRouter()

  const {  handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, mode: 'all'
    , resolver: zodResolver(RegisterSchema)
  })

 async function createUser(data: User) {
    console.log(data);
    const result = await registerUser(data)
    console.log(result);

     

    if (result) {
        toast.success('User registered successfully!', {   autoClose: 5000, }) 
  
        router.push('/login')
  } else {
      toast.error('Failed to register user. Please try again.', {
       
        autoClose: 5000,
      });
    }



  }






  return (
    <>
    
      <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <section className="w-full max-w-md">
          <div className="rounded-none bg-white p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-12 w-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-black">Create Account</h1>
              <p className="text-sm text-gray-600">Join us today and get started with your account</p>
            </div>
            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit(createUser)}>
              <div className="grid  gap-4">


                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your name"
                        autoComplete="on"
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="on"
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your phone number"
                        autoComplete="on"
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your phone password"
                        autoComplete="on"
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm your password"
                        autoComplete="on"
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />






              </div>
              <button type="submit" className="w-full bg-[#10B981] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#359E5A]">Create Account</button>
            </form>
         
           
            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link href="/login" className="font-medium text-black transition-colors hover:text-gray-700">Sign in</Link>
              </p>
            </div>
          </div>
        </section>


      </div>

    </>
  )
}
