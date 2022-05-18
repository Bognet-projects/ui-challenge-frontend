import {ArticlesState, RootState, UsersState} from "@/types/Vuex/States";
import {ActionTree, Commit} from "vuex";
import {rootGetters} from "@/types/Vuex/Getters";
import {ArticleType, CreateArticleType} from "@/types/article";

export interface UserActions<S = UsersState, R = RootState> extends ActionTree<S, R> {
    loadUsers({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }): void,

    deleteUser({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }, email: string): Promise<string>
}

export interface ArticlesActions<S = ArticlesState, R = RootState> extends ActionTree<S, R> {
    loadArticles({commit}: { commit: Commit }): Promise<string>,
    deleteArticle({commit, rootGetters}: {commit: Commit, rootGetters: rootGetters}, slug: string): Promise<string>,
    updateArticle({commit, rootGetters}: {commit: Commit, rootGetters: rootGetters}, article: ArticleType): Promise<string>,
    createArticle({commit, rootGetters}: {commit: Commit, rootGetters: rootGetters}, article: CreateArticleType): Promise<string>
}
