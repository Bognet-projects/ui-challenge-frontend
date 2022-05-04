import {ArticleType} from "@/types/article";
import {Commit} from "vuex";

export type articlesState = {
    articles: ArticleType[],
    count: number
}

export default {
    state: {
        articles: [],
        count: 0
    } as articlesState,
    mutations: {
        addArticle(state: articlesState, article: ArticleType) {
            if (!state.articles.some((data) => {
                return data.id === article.id
            }))
                state.count = state.articles.push(article)
        },
        removeArticle(state: articlesState, id: number) {
            state.articles = state.articles.filter((article: ArticleType): boolean => {
                return article.id !== id
            })
            state.count = state.articles.length
        },
        addArticles(state: articlesState, articles: ArticleType[]) {
            articles.forEach((article) => {
                if (!state.articles.some((data) => {
                    return data.id === article.id
                }))
                    state.count = state.articles.push(article)
            })
        }
    },
    getters: {
        getMyArticles: (state: articlesState) => (id: number) => {
            return state.articles.filter((article)=>{
                return article.author.id === id
            })
        },
        articlesCount(state: articlesState): number {
            return state.count
        }
    },
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
        }
    }
}
