import DoneCallback = jest.DoneCallback;
import {Commit} from "vuex";
import {rootGetters} from "@/types/Vuex/Getters";

//Testing action with expected mutations
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
