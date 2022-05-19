import {ArticlesState, AuthState, RootState, UsersState} from "@/types/Vuex/States";
import {ActionTree, Commit, Dispatch} from "vuex";
import {rootGetters} from "@/types/Vuex/Getters";
import {ArticleType, CreateArticleType} from "@/types/article";
import {LoginUserType, RegisterUserType, UserType} from "@/types/userType";

export interface UserActions<S = UsersState, R = RootState> extends ActionTree<S, R> {
    loadUsers({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }): void,

    deleteUser({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }, email: string): Promise<string>
}

export interface ArticlesActions<S = ArticlesState, R = RootState> extends ActionTree<S, R> {
    loadArticles({commit}: { commit: Commit }): Promise<string>,

    deleteArticle({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }, slug: string): Promise<string>,

    updateArticle({
                      commit,
                      rootGetters
                  }: { commit: Commit, rootGetters: rootGetters }, article: ArticleType): Promise<string>,

    createArticle({
                      commit,
                      rootGetters
                  }: { commit: Commit, rootGetters: rootGetters }, article: CreateArticleType): Promise<string>
}

export interface AuthActions<S = AuthState, R = RootState> extends ActionTree<S, R> {
    logout({commit}: { commit: Commit }): void,

    loadTokenFormSession({commit, dispatch, state}: { commit: Commit, dispatch: Dispatch, state: S }): Promise,

    loadUserFromToken({commit, rootGetters, dispatch}: { commit: Commit, rootGetters: rootGetters, dispatch: Dispatch }): Promise,

    loginUser({commit}: { commit: Commit }, loginUser: LoginUserType): Promise,

    updateUser({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }, user: UserType): Promise,

    registerUser({commit}: { commit: Commit }, regUser: RegisterUserType): Promise
}
