'use client'

/* eslint-disable @next/next/no-location-assign-relative-destination */

import { useState, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    CheckIcon,
    ChevronDown,
    UploadCloud,
    X,
    BookOpen,
    GraduationCap,
    Laptop,
    Sparkles,
    KeyRound
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

// Role Selection Data
const roles = [
    {
        id: 'SUPER_ADMIN',
        name: 'Super Admin',
        fallback: 'SA',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
    },
    {
        id: 'ADMINISTRATOR',
        name: 'Administrator',
        fallback: 'AD',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png'
    },
    {
        id: 'PROFESSOR',
        name: 'Professor',
        fallback: 'PR',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png'
    },
    {
        id: 'STUDENT',
        name: 'Student',
        fallback: 'ST',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png'
    }
] as const

// Zod Schema for Signup
const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    role: z.string().min(1, { message: 'Please select a role.' }),
    photo: z.custom<File>((val) => val instanceof File, {
        message: 'Profile photo is required.'
    }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
})

type FormValues = z.infer<typeof formSchema>
type RoleOption = (typeof roles)[number]

export default function SignupForm() {
    const router = useRouter()

    // Step State: 'signup' | 'otp'
    const [step, setStep] = useState<'signup' | 'otp'>('signup')
    const [otp, setOtp] = useState<string>('123456') // Default OTP set to 123456
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [submittedEmail, setSubmittedEmail] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [selectedRole, setSelectedRole] = useState<RoleOption>(roles[0])
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            role: roles[0].id,
            password: ''
        }
    })

    // Profile Photo Handler
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setValue('photo', file, { shouldValidate: true })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImagePreview(null)
        setValue('photo', undefined as unknown as File, { shouldValidate: true })
    }

    // Signup Form Submission Handler -> Move to OTP Step
    const onSubmit = async (data: FormValues) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 800))
            console.log('Submitted Signup Data:', data)
            setSubmittedEmail(data.email)

            toast.success('OTP Sent!', {
                description: 'Please check your email for the verification code.'
            })

            // Switch to OTP step
            setStep('otp')
        } catch {
            toast.error('Sign up failed!', {
                description: 'Something went wrong. Please check your details.'
            })
        }
    }

    // OTP Verification Handler
    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!otp || otp.length < 6) {
            toast.error('Invalid OTP', { description: 'Please enter a valid 6-digit OTP.' })
            return
        }

        try {
            setIsVerifyingOtp(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (otp === '123456') {
                toast.success('OTP Verified Successfully!', {
                    description: 'Account created. Redirecting to sign in...'
                })
                // Redirect to sign-in page
                router.push('/sign-in')
            } else {
                toast.error('Verification Failed', {
                    description: 'Incorrect OTP code. Try using 123456.'
                })
            }
        } catch {
            toast.error('Error verifying OTP')
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    return (
        <div className='h-screen w-full flex bg-background text-foreground overflow-hidden'>

            {/* LEFT SIDE: Animated Virtual Classroom */}
            <div className='hidden lg:flex w-1/2 relative bg-white dark:bg-slate-950 text-white flex-col items-center justify-between p-10 overflow-hidden'>
                <div className='absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none' />
                <div className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none' />

                <div className='relative z-10 w-full max-w-lg flex flex-col items-center justify-center my-auto'>
                    <div className='relative w-full h-72 flex items-center justify-center'>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className='w-80 h-48 bg-slate-900/90 border border-slate-700/60 rounded-2xl shadow-2xl backdrop-blur-md p-4 flex flex-col justify-between relative overflow-hidden'
                        >
                            <div className='flex items-center justify-between border-b border-slate-800 pb-2'>
                                <div className='flex gap-1.5'>
                                    <span className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
                                    <span className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
                                    <span className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
                                </div>
                                <span className='text-[10px] text-indigo-400 font-mono'>Live Classroom #104</span>
                            </div>

                            <div className='space-y-2 my-auto font-mono text-xs text-slate-400'>
                                <motion.div
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className='h-2 bg-indigo-500/40 rounded w-3/4'
                                />
                                <div className='h-2 bg-slate-700/50 rounded w-1/2' />
                                <div className='h-2 bg-slate-700/50 rounded w-5/6' />
                            </div>

                            <div className='flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2'>
                                <span className='flex items-center gap-1 text-emerald-400'><Sparkles className='size-3' /> Interactive Lecture</span>
                                <span>32 Students Active</span>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [-8, 8, -8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className='absolute -top-4 left-8 p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md text-indigo-300 shadow-lg'
                        >
                            <GraduationCap className='size-6' />
                        </motion.div>

                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className='absolute bottom-2 left-4 p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 backdrop-blur-md text-blue-300 shadow-lg'
                        >
                            <BookOpen className='size-6' />
                        </motion.div>

                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                            className='absolute -bottom-2 right-6 p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 backdrop-blur-md text-purple-300 shadow-lg'
                        >
                            <Laptop className='size-6' />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* SEPARATOR */}
            <div className='hidden lg:block w-[1px] relative bg-gradient-to-b from-transparent via-slate-700 to-transparent opacity-50'>
                <div className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-12 bg-indigo-500/50 rounded-full blur-sm' />
            </div>

            {/* RIGHT SIDE FORM & OTP CONTAINER */}
            <div className='w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 bg-background overflow-y-auto lg:overflow-hidden'>
                <div className='w-full max-w-sm space-y-4'>

                    {step === 'signup' ? (
                        <>
                            {/* Header */}
                            <div className='space-y-1 text-center sm:text-left'>
                                <h1 className='text-2xl font-bold tracking-tight'>Create an Account</h1>
                                <p className='text-xs text-muted-foreground'>
                                    Enter your details below to sign up for AIT.
                                </p>
                            </div>

                            <div className='grid grid-cols-2 gap-3'>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => {
                                        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                                        window.location.assign(`${baseUrl}/api/v1/auth/login/google`);
                                    }}
                                    className='h-9 text-xs font-medium cursor-pointer border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg'
                                >
                                    <svg className='mr-2 size-4' viewBox='0 0 24 24'>
                                        <path
                                            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                            fill='#4285F4'
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                            fill='#34A853'
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z'
                                            fill='#FBBC05'
                                            fillRule='evenodd'
                                        />
                                        <path
                                            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
                                            fill='#EA4335'
                                            fillRule='evenodd'
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    type='button'
                                    variant='outline'
                                    className='h-9 text-xs font-medium cursor-pointer border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg'
                                >
                                    <svg className='mr-2 size-4 fill-current' viewBox='0 0 24 24'>
                                        <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                                    </svg>
                                    GitHub
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className='relative my-2'>
                                <div className='absolute inset-0 flex items-center'>
                                    <span className='w-full border-t border-border' />
                                </div>
                                <div className='relative flex justify-center text-[10px] uppercase'>
                                    <span className='bg-background px-2 text-muted-foreground'>or continue with</span>
                                </div>
                            </div>

                            {/* Signup Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2.5'>

                                {/* Name */}
                                <div>
                                    <Label htmlFor='name' className='text-xs font-medium'>Name</Label>
                                    <div className='relative mt-1'>
                                        <User className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
                                        <Input
                                            id='name'
                                            placeholder='Phillip George'
                                            className='pl-9 h-9 text-xs rounded-lg'
                                            {...register('name')}
                                        />
                                    </div>
                                    {errors.name && <p className='text-destructive text-[10px] mt-0.5'>{errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <Label htmlFor='email' className='text-xs font-medium'>Email</Label>
                                    <div className='relative mt-1'>
                                        <Mail className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
                                        <Input
                                            id='email'
                                            type='email'
                                            placeholder='example@aitspace.com'
                                            className='pl-9 h-9 text-xs rounded-lg'
                                            {...register('email')}
                                        />
                                    </div>
                                    {errors.email && <p className='text-destructive text-[10px] mt-0.5'>{errors.email.message}</p>}
                                </div>

                                {/* Role Dropdown */}
                                <div>
                                    <Label className='text-xs font-medium'>Role</Label>
                                    <Controller
                                        control={control}
                                        name='role'
                                        render={({ field }) => (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='w-full mt-1 bg-background border border-input flex items-center justify-between rounded-lg px-3 h-9 text-start'>
                                                    <div className='flex items-center gap-2'>
                                                        <Avatar className='h-5 w-5'>
                                                            <AvatarImage src={selectedRole.src} alt={selectedRole.name} />
                                                            <AvatarFallback className='text-[8px]'>{selectedRole.fallback}</AvatarFallback>
                                                        </Avatar>
                                                        <span className='text-xs font-medium'>{selectedRole.name}</span>
                                                    </div>
                                                    <ChevronDown className='size-3.5 text-muted-foreground' />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className='w-60'>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuLabel className='text-[10px]'>Select Role</DropdownMenuLabel>
                                                    </DropdownMenuGroup>
                                                    {roles.map((roleItem) => (
                                                        <DropdownMenuItem
                                                            key={roleItem.id}
                                                            onClick={() => {
                                                                setSelectedRole(roleItem)
                                                                field.onChange(roleItem.id)
                                                            }}
                                                            className='cursor-pointer flex items-center justify-between text-xs'
                                                        >
                                                            <div className='flex items-center gap-2'>
                                                                <Avatar className='h-6 w-6'>
                                                                    <AvatarImage src={roleItem.src} alt={roleItem.name} />
                                                                    <AvatarFallback className='text-[9px]'>{roleItem.fallback}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className='font-medium text-xs leading-none'>{roleItem.name}</p>
                                                                </div>
                                                            </div>
                                                            {selectedRole.id === roleItem.id && <CheckIcon className='size-3.5 text-primary' />}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    />
                                    {errors.role && <p className='text-destructive text-[10px] mt-0.5'>{errors.role.message}</p>}
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <Label className='text-xs font-medium'>Profile Photo</Label>
                                    <div className='mt-1 flex items-center gap-3'>
                                        {imagePreview ? (
                                            <div className='relative size-12 rounded-full overflow-hidden border border-border group'>
                                                <img src={imagePreview} alt='Preview' className='w-full h-full object-cover' />
                                                <button
                                                    type='button'
                                                    onClick={removeImage}
                                                    className='absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                                                >
                                                    <X className='size-4' />
                                                </button>
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor='photo-upload'
                                                className='w-full h-11 border border-dashed border-input rounded-lg flex items-center justify-center gap-2 cursor-pointer bg-muted/40 hover:bg-muted/70 transition-colors'
                                            >
                                                <UploadCloud className='size-4 text-muted-foreground' />
                                                <span className='text-xs text-muted-foreground'>Upload Photo</span>
                                                <input
                                                    id='photo-upload'
                                                    type='file'
                                                    accept='image/*'
                                                    className='hidden'
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    {errors.photo && <p className='text-destructive text-[10px] mt-0.5'>{errors.photo.message}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <Label htmlFor='password' className='text-xs font-medium'>Password</Label>
                                    <div className='relative mt-1'>
                                        <Lock className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
                                        <Input
                                            id='password'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='••••••••'
                                            className='pl-9 pr-9 h-9 text-xs rounded-lg'
                                            {...register('password')}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-3 top-2.5 text-muted-foreground hover:text-foreground'
                                        >
                                            {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                                        </button>
                                    </div>
                                    {errors.password && <p className='text-destructive text-[10px] mt-0.5'>{errors.password.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='w-full h-9 cursor-pointer text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow transition-colors mt-1'
                                >
                                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                                </Button>
                            </form>

                            {/* Footer Link */}
                            <p className='text-center text-[13px] text-muted-foreground pt-1'>
                                Already have an account?{' '}
                                <Link href='/sign-in' className='font-semibold text-primary hover:underline'>
                                    Sign in
                                </Link>
                            </p>
                        </>
                    ) : (
                        /* STEP 2: OTP VERIFICATION FORM */
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className='space-y-4'
                        >
                            <div className='space-y-1 text-center sm:text-left'>
                                <h1 className='text-2xl font-bold tracking-tight'>Verify OTP</h1>
                                <p className='text-xs text-muted-foreground'>
                                    We sent a verification code to <span className='font-medium text-foreground'>{submittedEmail || 'your email'}</span>.
                                </p>
                            </div>

                            <form onSubmit={handleVerifyOTP} className='space-y-4 pt-2'>
                                <div>
                                    <Label htmlFor='otp' className='text-xs font-medium'>
                                        Verification Code
                                    </Label>
                                    <div className='relative mt-1.5'>
                                        <KeyRound className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
                                        <Input
                                            id='otp'
                                            type='text'
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder='123456'
                                            className='pl-9 h-9 text-xs tracking-widest font-mono rounded-lg border-input bg-background focus-visible:ring-1'
                                        />
                                    </div>
                                    <p className='text-[10px] text-muted-foreground mt-1'>
                                        Default OTP is preset to <code className='font-mono font-bold text-primary'>123456</code>.
                                    </p>
                                </div>

                                <Button
                                    type='submit'
                                    disabled={isVerifyingOtp}
                                    className='w-full h-9 cursor-pointer text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow transition-colors'
                                >
                                    {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                                </Button>
                            </form>

                            <button
                                type='button'
                                onClick={() => setStep('signup')}
                                className='w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-2'
                            >
                                ← Back to Sign Up
                            </button>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    )
}
