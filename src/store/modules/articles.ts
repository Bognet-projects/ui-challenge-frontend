import {ArticleType, CreateArticleType} from "@/types/article";
import {ArticlesState} from "@/types/Vuex/States";
import {ArticlesMutations} from "@/types/Vuex/Mutations";
import {ArticlesGetters} from "@/types/Vuex/Getters";
import {ArticlesActions} from "@/types/Vuex/Actions";

const apiUrl = process.env.VUE_APP_API_URL

export const articles = {
    state: {
        articles: [],
        count: 0
    } as ArticlesState,
    mutations: {
        addArticle(state, article) {
            if (!state.articles.some((data) => {
                return data.id === article.id
            }))
                state.count = state.articles.push(article)
        },
        removeArticle(state, slug) {
            state.articles = state.articles.filter((article: ArticleType): boolean => {
                return article.slug !== slug
            })
            state.count = state.articles.length
        },
        addArticles(state, articles) {
            articles.forEach((article) => {
                if (!state.articles.some((data) => {
                    return data.id === article.id
                }))
                    state.count = state.articles.push(article)
            })
        },
        updateArticle(state, article) {
            state.articles.find((data) => {
                if (data.id === article.id) {
                    data = article
                }
                return false
            })
        }
    } as ArticlesMutations,
    getters: {
        getMyArticles: (state: ArticlesState) => (id: number) => {
            return state.articles.filter((article) => {
                if (article.author)
                    return article.author.id === id
            })
        },
        getArticleById: (state: ArticlesState) => (id: number): ArticleType | undefined => {
            return state.articles.find((article) => {
                return article.id === id
            })
        }
    } as ArticlesGetters,
    actions: {
        async loadArticles({commit}) {
            return fetch(apiUrl + "articles", {
                method: "GET",
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then((result: { articles: ArticleType[], articlesCount: number }) => {
                    if (result) {
                        commit("addArticles", result.articles)
                    } else {
                        return
                    }
                })
        },
        async deleteArticle({commit, rootGetters}, slug: string): Promise<string> {
            return fetch(apiUrl + "articles/" + slug, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'JWT ' + rootGetters.getToken
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.message) {
                        commit("removeArticle", slug)
                        return "The article has been successfully deleted."
                    } else {
                        return result.message
                    }
                })
        },
        async updateArticle({commit, rootGetters}, article: ArticleType): Promise<string> {
            return fetch(`${apiUrl}articles/${article.slug}`, {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'JWT ' + rootGetters.getToken
                },
                body: JSON.stringify({
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: article.tagList
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.message) {
                        commit("updateArticle", article)
                        return "The article has been successfully updated."
                    } else {
                        return result.message
                    }
                })
        },
        async createArticle({commit, rootGetters}, article: CreateArticleType): Promise<string> {
            return fetch(apiUrl + "articles/", {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'JWT ' + rootGetters.getToken
                },
                body: JSON.stringify({
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: article.tagList
                })
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.message) {
                        commit("addArticle", article)
                        return "The article has been successfully created."
                    } else {
                        return result.message
                    }
                })
        }
    } as ArticlesActions
}
