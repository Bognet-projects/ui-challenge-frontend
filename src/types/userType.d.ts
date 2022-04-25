export interface RegisterUserType {
    username: string,
    email: string,
    password: string
}

export interface LoginUserType {
    email: string,
    password: string
}

export interface UserType {
    id: number,
    username: string,
    email: string,
    image: string,
    bio: string
}

export interface UserWithTokenType extends UserType{
    token: string
}
