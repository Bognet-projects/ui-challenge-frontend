import {articles} from "@/store/modules/articles";
import {ArticlesState} from "@/types/Vuex/States";
import {dummyArticles, dummyAuthor} from "../../../../Helpers";

const {getArticleById, getMyArticles} = articles.getters

describe('Articles Getters', () => {
    it('getArticleByIs', () => {
        const state: ArticlesState = {articles: dummyArticles, count: dummyArticles.length}
        const getter = getArticleById(state)

        const result = getter(dummyArticles[0].id)

        expect(result).toMatchObject(dummyArticles[0])
    })

    it('getMyArticles', () => {
        const state: ArticlesState = {articles: dummyArticles, count: dummyArticles.length}
        const getter = getMyArticles(state)

        const result = getter(dummyAuthor.id)

        expect(result).toHaveLength(2)
        expect(result).toMatchObject(dummyArticles)
    })
})
