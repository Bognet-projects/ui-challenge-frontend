import {articles} from "@/store/modules/articles";
import {dummyArticles, testActionWithMutations} from "../../../../Helpers";
import {rootGetters} from "@/types/Vuex/Getters";
import clearAllMocks = jest.clearAllMocks;
import {ArticleType} from "@/types/article";

const {loadArticles, deleteArticle, updateArticle, createArticle} = articles.actions

describe('Articles Actions', () => {
    let getTokenMock: () => string
    let rootGetters: rootGetters

    beforeEach(() => {
        getTokenMock = jest.fn(() => "token")
        rootGetters = {getToken: getTokenMock()}
    })

    afterEach(() => {
        clearAllMocks()
    })

    it('loadArticles', (done) => {
        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                status: 200,
                json: () => ({
                    articles: dummyArticles,
                    articlesCount: dummyArticles.length
                })
            })
        })

        testActionWithMutations(loadArticles, null, {}, [{type: "addArticles", payload: dummyArticles}], done)
    })

    it('deleteArticle', (done) => {
        const message = "Test Message"
        const slug = dummyArticles[0].slug
        let result: Promise<string>

        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    json: () => ({
                        raw: []
                    })
                })
            })
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 401,
                    json: () => ({message})
                })
            })

        result = testActionWithMutations<string, Promise<string>>(deleteArticle, slug, rootGetters, [{
            type: "removeArticle",
            payload: slug
        }], done)

        expect(getTokenMock).toBeCalledTimes(1)
        result.then(text => {
            expect(text).toBe("The article has been successfully deleted.")
        })

        result = testActionWithMutations<string, Promise<string>>(deleteArticle, slug, rootGetters, [{
            type: "removeArticle",
            payload: slug
        }], done)

        expect(getTokenMock).toBeCalledTimes(1)
        result.then(text => {
            expect(text).toBe(message)
        })
    })

    it('updateArticle', (done) => {
        const message = "Test Message"
        const updatedArticle = dummyArticles[0]
        updatedArticle.title = "Updated Title"
        let result: Promise<string>

        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    json: () => ({
                        raw: []
                    })
                })
            })
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 401,
                    json: () => ({message})
                })
            })

        result = testActionWithMutations<ArticleType, Promise<string>>(updateArticle, updatedArticle, rootGetters, [{
            type: "updateArticle",
            payload: updatedArticle
        }], done)

        expect(getTokenMock).toBeCalledTimes(1)
        result.then(text => {
            expect(text).toBe("The article has been successfully updated.")
        })

        result = testActionWithMutations<ArticleType, Promise<string>>(updateArticle, updatedArticle, rootGetters, [{
            type: "updateArticle",
            payload: updatedArticle
        }], done)

        expect(getTokenMock).toBeCalledTimes(1)
        result.then(text => {
            expect(text).toBe(message)
        })
    })

    it('createArticle', (done) => {
        const message = "Test Message"
        let result: Promise<string>

        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    json: () => ({
                        raw: []
                    })
                })
            })
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 401,
                    json: () => ({message})
                })
            })

        result = testActionWithMutations<ArticleType, Promise<string>>(createArticle, dummyArticles[0], rootGetters, [{
            type: "addArticle",
            payload: dummyArticles[0]
        }], done)

        expect(getTokenMock).toBeCalledTimes(1)
        result.then(text => {
            expect(text).toBe("The article has been successfully created.")
        })

        result = testActionWithMutations<ArticleType, Promise<string>>(createArticle, dummyArticles[0], rootGetters, [{
            type: "addArticle",
            payload: dummyArticles[0]
        }], done)

        expect(getTokenMock).toBeCalledTimes(1)
        result.then(text => {
            expect(text).toBe(message)
        })
    })
})
