export interface LoginUserType {
    email: string,
    password: string
}

export interface RegisterUserType extends LoginUserType{
    username: string
}

export interface UserInfoType{
    username: string,
    email: string,
    image: string,
    bio: string
}

export interface UserType extends UserInfoType{
    id: number
}

export interface UserWithTokenType extends UserType{
    token: string
}
