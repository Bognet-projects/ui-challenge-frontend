import {UserType, UserWithTokenType} from "@/types/userType";
import {ArticleType} from "@/types/article";
import {Getter, GetterTree} from "vuex";

export interface RootState {
    token?: string
}

export interface AuthState {
    user?: UserWithTokenType
}

export interface ArticlesState {
    articles: ArticleType[],
    count: number
}

export interface UsersState {
    users: UserType[]
}
