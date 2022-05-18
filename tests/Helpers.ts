import DoneCallback = jest.DoneCallback;
import {Commit} from "vuex";
import {rootGetters} from "@/types/Vuex/Getters";
import {ArticleType} from "@/types/article";
import {UserType} from "@/types/userType";

/**
 * Testing action with expected mutations
 * @param action - The tested action
 * @param payload - The tested actions extra payload
 * @param {rootGetters} rootGetters - A collection off all the vuex getters
 * @param expectedMutations - A list of Mutations witch should be called during the test
 * @param {DoneCallback} done - Jest callback function
 * @return {(void | unknown)} - By default the function returns with void, but it can be changed to anything when declared.
 */
export const testActionWithMutations = <P = null, R = void>(
    action: ({commit, rootGetters}: { commit: Commit, rootGetters: rootGetters }, payload: P) => R,
    payload: P,
    rootGetters: rootGetters,
    expectedMutations: { type: string, payload: unknown }[],
    done: DoneCallback
): R => {
    let count = 0
    const commit = (type: string, payload: unknown) => {
        const mutation = expectedMutations[count]

        expect(type).toEqual(mutation.type)
        if (payload) {
            expect(payload).toEqual(mutation.payload)
        }

        count++
        if (count >= expectedMutations.length) {
            done()
        }
    }
    if (expectedMutations.length === 0) {
        expect(count).toBe(0)
        done()
    }
    return action({commit, rootGetters}, payload)
}

export const dummyAuthor: UserType = {
    id: 0,
    username: 'name_0',
    email: 'email@email.com',
    image: 'image_0',
    bio: 'bio_0'
}

export const dummyArticles: ArticleType[] = [
    {
        id: 0,
        slug: 'slug_0',
        title: 'title_0',
        description: 'description_0',
        body: 'body_0',
        created: 10000,
        updated: 10001,
        tagList: ['tag_0', 'tag_1'],
        favoriteCount: 0,
        author: dummyAuthor
    },
    {
        id: 1,
        slug: 'slug_1',
        title: 'title_1',
        description: 'description_1',
        body: 'body_1',
        created: 10002,
        updated: 10004,
        tagList: ['tag_0', 'tag_3'],
        favoriteCount: 0,
        author: dummyAuthor
    }
]
