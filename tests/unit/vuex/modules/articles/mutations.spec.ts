import {ArticlesState} from "@/types/Vuex/States";
import {ArticleType} from "@/types/article";
import {articles} from "@/store/modules/articles";
import {dummyArticles} from "../../../../Helpers";


const {addArticle, removeArticle, addArticles, updateArticle} = articles.mutations

describe('articles mutations', () => {
    it('addArticle', () => {
        const state: ArticlesState = {articles: [], count: 0}

        //Adding to an empty state
        addArticle(state, dummyArticles[0])

        expect(state.articles).toHaveLength(1)
        expect(state.count).toBe(1)
        expect(state.articles).toMatchObject([dummyArticles[0]])

        //Adding to a not empty state
        addArticle(state, dummyArticles[1])

        expect(state.articles).toHaveLength(2)
        expect(state.count).toBe(2)
        expect(state.articles).toMatchObject(dummyArticles)
    })

    it("removeArticle", () => {
        const slug = dummyArticles[0].slug
        let state: ArticlesState = {articles: dummyArticles, count: dummyArticles.length}

        //Removing from a not empty state
        removeArticle(state, slug)

        expect(state.articles).toHaveLength(1)
        expect(state.count).toBe(1)
        expect(state.articles).toMatchObject([dummyArticles[1]])

        //Removing from an empty state
        state = {articles: [], count: 0}
        removeArticle(state, slug)

        expect(state.articles).toHaveLength(0)
        expect(state.count).toBe(0)
        expect(state.articles).toMatchObject([])

        //TODO: Router test is missing
    })

    it("addArticles", () => {
        const state: ArticlesState = {articles: [], count: 0}

        addArticles(state, dummyArticles)

        expect(state.articles).toHaveLength(2)
        expect(state.count).toBe(2)
        expect(state.articles).toMatchObject(dummyArticles)
    })

    it("updateArticle", () => {
        const state: ArticlesState = {articles: [dummyArticles[0]], count: dummyArticles.length}
        const edited: ArticleType = dummyArticles[0]
        edited.title = "Edited Article"

        updateArticle(state, edited)

        expect(state.articles[0]).toMatchObject(edited)
        expect(state.articles[0].title).toMatch("Edited Article")
    })
});
