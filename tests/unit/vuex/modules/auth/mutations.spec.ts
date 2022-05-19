import {auth} from "@/store/modules/auth";
import {AuthState} from "@/types/Vuex/States";
import {dummyAuthor} from "../../../../Helpers";
import {UserWithTokenType} from "@/types/userType";

const {setUser} = auth.mutations

describe('Auth Mutations', () => {
    it('setUser', () => {
        const state: AuthState = {user: undefined}
        const dummyUser: UserWithTokenType = {...dummyAuthor, token: "Token"}

        setUser(state, dummyUser)

        expect(state.user).toMatchObject(dummyUser)
    })
})
