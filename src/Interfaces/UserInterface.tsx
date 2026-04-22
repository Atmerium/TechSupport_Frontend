export interface User {
    userName: string
    userEmail: string
    userPassword: string
    userConfirmPassword: string
}

export interface ListedUser {
    id: number;
    userName: string;
    userEmail: string;
    userRole: string;
}