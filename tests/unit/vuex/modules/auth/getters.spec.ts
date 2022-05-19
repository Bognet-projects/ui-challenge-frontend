import {auth} from "@/store/modules/auth";
import {AuthState} from "@/types/Vuex/States";
import {UserWithTokenType} from "@/types/userType";
import {dummyAuthor} from "../../../../Helpers";

const {getUser, getUserId, getUserName} = auth.getters

describe('Auth Getters', () => {
    it('getUser', () => {
        const user: UserWithTokenType = {...dummyAuthor, token: "Token"}
        const state: AuthState = {user}

        const result = getUser(state)

        expect(result).toMatchObject(user)
    })

    it('getUserId', () => {
        const user: UserWithTokenType = {...dummyAuthor, token: "Token"}
        const state: AuthState = {user}

        const result = getUserId(state)

        expect(result).toBe(user.id)
    })

    it('getUserName', () => {
        const user: UserWithTokenType = {...dummyAuthor, token: "Token"}
        const state: AuthState = {user}

        const result = getUserName(state)

        expect(result).toBe(user.username)
    })

})
