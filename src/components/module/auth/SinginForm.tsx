'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    CheckIcon,
    ChevronDown,
    ShieldCheck,
    BarChart3,
    Zap,
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
import { useSearchParams } from 'next/navigation'

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

// Zod Schema (Only Email, Password, and Role)
const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    role: z.string().min(1, { message: 'Please select a role.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' })
})

type FormValues = z.infer<typeof formSchema>
type RoleOption = (typeof roles)[number]

export default function SinginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [selectedRole, setSelectedRole] = useState<RoleOption>(roles[0])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            role: roles[0].id,
            password: ''
        }
    })

    const onSubmit = async (data: FormValues) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1200))
            console.log('Submitted Data:', data)

            toast.success('Successfully signed in!', {
                description: 'Welcome to the system.'
            })
        } catch {
            toast.error('Sign in failed!', {
                description: 'Please check your credentials and try again.'
            })
        }
    }

    const searchParams = useSearchParams()
    // URL-এ ?redirect=/xyz থাকলে সেটা নেবে, না থাকলে ডিফল্ট '/dashboard'
    const redirectPath = searchParams.get('redirect') || '/dashboard'

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

    const handleSocialLogin = (provider: 'google' | 'github') => {
        window.location.href = `${BACKEND_URL}/api/v1/auth/login/${provider}?redirect=${encodeURIComponent(redirectPath)}`
    }

    return (
        <div className='h-screen w-full flex bg-background text-foreground overflow-hidden'>

            {/* LEFT SIDE: Dynamic Light/Dark Dashboard & Security Animation */}
            <div className='hidden lg:flex w-1/2 relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex-col items-center justify-between p-10 overflow-hidden border-r border-border/40 transition-colors duration-300'>

                {/* Background Glows (Adjusted for Light & Dark mode) */}
                <div className='absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-blue-500/10 dark:bg-blue-600/20 blur-[130px] rounded-full pointer-events-none' />
                <div className='absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none' />

                {/* Animated Graphic Centerpiece */}
                <div className='relative z-10 w-full max-w-lg flex flex-col items-center justify-center my-auto'>
                    <div className='relative w-full h-80 flex items-center justify-center'>

                        {/* Animated Glass Card / Analytics Widget */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className='w-84 bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative z-10 space-y-4'
                        >
                            <div className='flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3'>
                                <div className='flex items-center gap-2'>
                                    <div className='p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'>
                                        <ShieldCheck className='size-5' />
                                    </div>
                                    <span className='text-xs font-semibold text-slate-800 dark:text-slate-200'>Secure Authentication</span>
                                </div>
                                <span className='text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono'>Active</span>
                            </div>

                            {/* Simulated Activity Chart Lines */}
                            <div className='space-y-2 py-2'>
                                <div className='flex justify-between text-[11px] text-slate-500 dark:text-slate-400'>
                                    <span>System Encrypted</span>
                                    <span>99.9%</span>
                                </div>
                                <div className='w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-1.5 overflow-hidden'>
                                    <motion.div
                                        className='bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full'
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1'>
                                <span className='flex items-center gap-1 text-indigo-600 dark:text-indigo-400'>
                                    <Zap className='size-3.5' /> Realtime Sync
                                </span>
                                <span className='font-mono text-slate-400 dark:text-slate-500'>v2.4.0</span>
                            </div>
                        </motion.div>

                        {/* Floating Cards / Icons around main widget */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                            className='absolute -top-2 right-6 p-3.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-500/30 backdrop-blur-md text-indigo-600 dark:text-indigo-300 shadow-xl'
                        >
                            <KeyRound className='size-6' />
                        </motion.div>

                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className='absolute -bottom-2 left-6 p-3.5 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-md text-blue-600 dark:text-blue-300 shadow-xl'
                        >
                            <BarChart3 className='size-6' />
                        </motion.div>

                    </div>
                </div>

            </div>

            {/* RIGHT SIDE: Compact & Dark Mode Supported Form */}
            <div className='w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 bg-background text-foreground overflow-y-auto'>
                <div className='w-full max-w-sm space-y-5'>

                    {/* Header */}
                    <div className='space-y-1.5 text-center sm:text-left'>
                        <h1 className='text-2xl font-bold tracking-tight'>Welcome Back</h1>
                        <p className='text-xs text-muted-foreground'>
                            Please sign in to access your dashboard.
                        </p>
                    </div>

                    {/* Google & GitHub Social Login Buttons */}
                    <div className='grid grid-cols-2 gap-3'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => handleSocialLogin('google')}
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
                            onClick={() => handleSocialLogin('github')}
                            className='h-9 text-xs font-medium cursor-pointer border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg'
                        >
                            <svg className='mr-2 size-4 fill-current' viewBox='0 0 24 24'>
                                <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                            </svg>
                            GitHub
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className='relative flex items-center justify-center my-2'>
                        <div className='w-full border-t border-border' />
                        <span className='absolute bg-background px-2 text-[10px] text-muted-foreground uppercase tracking-wider'>
                            Or continue with
                        </span>
                    </div>

                    {/* Main Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

                        {/* Role Dropdown */}
                        <div>
                            <Label className='text-xs font-medium text-foreground'>Login with Role</Label>
                            <Controller
                                control={control}
                                name='role'
                                render={({ field }) => (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='w-full mt-1.5 bg-background border border-input flex items-center justify-between rounded-lg px-3 h-9 text-start focus:outline-none focus:ring-1 focus:ring-ring'>
                                            <div className='flex items-center gap-2'>
                                                <Avatar className='h-5 w-5'>
                                                    <AvatarImage src={selectedRole.src} alt={selectedRole.name} />
                                                    <AvatarFallback className='text-[8px]'>
                                                        {selectedRole.fallback}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className='text-xs font-medium'>{selectedRole.name}</span>
                                            </div>
                                            <ChevronDown className='size-3.5 text-muted-foreground' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='w-60 bg-popover text-popover-foreground border-border'>
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel className='text-[10px] text-muted-foreground'>
                                                    Select Role
                                                </DropdownMenuLabel>
                                            </DropdownMenuGroup>
                                            {roles.map((roleItem) => (
                                                <DropdownMenuItem
                                                    key={roleItem.id}
                                                    onClick={() => {
                                                        setSelectedRole(roleItem)
                                                        field.onChange(roleItem.id)
                                                    }}
                                                    className='cursor-pointer flex items-center justify-between text-xs focus:bg-accent focus:text-accent-foreground'
                                                >
                                                    <div className='flex items-center gap-2'>
                                                        <Avatar className='h-6 w-6'>
                                                            <AvatarImage src={roleItem.src} alt={roleItem.name} />
                                                            <AvatarFallback className='text-[9px]'>
                                                                {roleItem.fallback}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <p className='font-medium text-xs leading-none'>
                                                            {roleItem.name}
                                                        </p>
                                                    </div>
                                                    {selectedRole.id === roleItem.id && (
                                                        <CheckIcon className='size-3.5 text-primary' />
                                                    )}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            />
                            {errors.role && (
                                <p className='text-destructive text-[10px] mt-1'>{errors.role.message}</p>
                            )}
                        </div>

                        {/* Divider */}
                        <div className='relative flex items-center justify-center my-2'>
                            <div className='w-full border-t border-border' />
                            <span className='absolute bg-background px-2 text-[10px] text-muted-foreground uppercase tracking-wider'>
                                Or
                            </span>
                        </div>

                        {/* Email Field */}
                        <div>
                            <Label htmlFor='email' className='text-xs font-medium text-foreground'>
                                Email
                            </Label>
                            <div className='relative mt-1.5'>
                                <Mail className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='example@domain.com'
                                    className='pl-9 h-9 text-xs rounded-lg border-input bg-background focus-visible:ring-1'
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && (
                                <p className='text-destructive text-[10px] mt-1'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password' className='text-xs font-medium text-foreground'>
                                    Password
                                </Label>
                                <Link
                                    href='/forgot-password'
                                    className='text-[11px] font-medium text-primary hover:underline'
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className='relative mt-1.5'>
                                <Lock className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
                                <Input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='••••••••'
                                    className='pl-9 pr-9 h-9 text-xs rounded-lg border-input bg-background focus-visible:ring-1'
                                    {...register('password')}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors'
                                >
                                    {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className='text-destructive text-[10px] mt-1'>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full h-9 cursor-pointer text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow transition-colors mt-2'
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Registration Redirect Link */}
                    <p className='text-center text-xs text-muted-foreground pt-2'>
                        Don&apos;t have an account?{' '}
                        <Link href='/sign-up' className='font-semibold text-primary hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
