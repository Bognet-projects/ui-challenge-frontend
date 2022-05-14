import {ArticleType, CreateArticleType} from "@/types/article";
import {ActionTree, Commit, GetterTree, Module, MutationTree} from "vuex";
import {ArticlesState, RootState} from "@/types/Vuex/States";
import router from "@/router";

export const articles: Module<ArticlesState, RootState> = {
    state: {
        articles: [],
        count: 0
    } as ArticlesState,
    mutations: {
        addArticle(state: ArticlesState, article: ArticleType) {
            if (!state.articles.some((data) => {
                return data.id === article.id
            }))
                state.count = state.articles.push(article)
        },
        removeArticle(state: ArticlesState, slug: string) {
            state.articles = state.articles.filter((article: ArticleType): boolean => {
                return article.slug !== slug
            })
            state.count = state.articles.length
        },
        addArticles(state: ArticlesState, articles: ArticleType[]) {
            articles.forEach((article) => {
                if (!state.articles.some((data) => {
                    return data.id === article.id
                }))
                    state.count = state.articles.push(article)
            })
        },
        updateArticle(state: ArticlesState, article: ArticleType) {
            state.articles.find((data) => {
                if (data.id === article.id) {
                    data = article
                }
                return false
            })
        }
    } as MutationTree<ArticlesState>,
    getters: {
        getMyArticles: (state: ArticlesState) => (id: number) => {
            return state.articles.filter((article) => {
                return article.author.id === id
            })
        },
        articlesCount(state: ArticlesState): number {
            return state.count
        },
        getArticleById: (state: ArticlesState) => (id: number): ArticleType | undefined => {
            return state.articles.find((article) => {
                return article.id === id
            })
        }
    } as GetterTree<ArticlesState, RootState>,
    actions: {
        async loadArticles({commit}: { commit: Commit }) {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/api/articles", {
                    method: "GET",
                    credentials: 'same-origin'
                })
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json()
                        } else {
                            reject()
                        }
                    })
                    .then((result: { articles: ArticleType[], articlesCount: number }) => {
                        if (result.articlesCount > 0) {
                            commit("addArticles", result.articles)
                            resolve(result.articles)
                        } else if (result.articlesCount === 0) {
                            resolve("No article found!")
                        }
                    })
            })
        },
        async deleteArticle({commit, rootGetters}, slug: string): Promise<string> {
            return fetch(`http://localhost:3000/api/articles/${slug}`, {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'JWT ' + rootGetters.getToken
                }
            })
                .then(async response => {
                    const data = await response.json()
                    if (response.status === 200) {
                        commit("removeArticle", slug)
                        await router.push({name: "home"})
                    }
                    return data.message
                })
        },
        async updateArticle({commit, rootGetters}, article: ArticleType): Promise<string> {
            return fetch(`http://localhost:3000/api/articles/${article.slug}`, {
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
                .then(async response => {
                    const data = await response.json()
                    if (response.status === 200) {
                        commit("updateArticle", article)
                    }
                    return data.message
                })
        },
        async createArticle({commit, rootGetters}, article: CreateArticleType): Promise<string> {
            return fetch("http://localhost:3000/api/articles/", {
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
                .then(async response => {
                    const data = await response.json()
                    if (response.status === 200) {
                        commit("addArticle", article)
                    }
                    return data.message
                })
        }
    } as ActionTree<ArticlesState, RootState>
}
