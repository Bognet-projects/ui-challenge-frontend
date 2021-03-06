import {UserType, UserWithTokenType} from "@/types/userType";
import {ArticlesState, AuthState, UsersState} from "@/types/Vuex/States";
import {MutationTree} from "vuex";
import {ArticleType} from "@/types/article";

export interface UsersMutations<S = UsersState> extends MutationTree<S> {
    setUsers(state: S, payload: UserType[]): void,

    removeUser(state: S, payload: string): void
}

export interface ArticlesMutations<S = ArticlesState> extends MutationTree<S> {
    addArticle(state: S, article: ArticleType): void,

    removeArticle(state: S, slug: string): void,

    addArticles(state: S, articles: ArticleType[]): void,

    updateArticle(state: S, article: ArticleType): void
}

export interface AuthMutations<S = AuthState> extends MutationTree<S> {
    setUser(state: S, user: UserWithTokenType): void
}
