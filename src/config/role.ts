// Role Selection Data with Credentials
export const roles = [
    {
        id: 'SUPER_ADMIN',
        name: 'Super Admin',
        fallback: 'SA',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
        email: 'rafsun@ait.com',
        password: '12345678'
    },
    {
        id: 'ADMINISTRATOR',
        name: 'Administrator',
        fallback: 'AD',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
        email: 'anhaf@ait.com',
        password: '12345678'
    },
    {
        id: 'PROFESSOR',
        name: 'Professor',
        fallback: 'PR',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        email: 'tanvir@ait.com',
        password: '12345678'
    },
    {
        id: 'STUDENT',
        name: 'Student',
        fallback: 'ST',
        src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        email: 'anhaf@ait.com',
        password: '12345678'
    }
] as const

