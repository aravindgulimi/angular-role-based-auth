export interface User {
    id: number,
    email: string,
    role : 'admin' | 'customer' | string,
}