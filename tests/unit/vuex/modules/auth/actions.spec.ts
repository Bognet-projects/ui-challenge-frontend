import {auth} from "@/store/modules/auth";
import {dummyAuthor, localStorageMock, testActionWithMutations} from "../../../../Helpers";
import {AuthState} from "@/types/Vuex/States";
import {Commit, Dispatch} from "vuex";
import {rootGetters} from "@/types/Vuex/Getters";
import {LoginUserType, RegisterUserType, UserType} from "@/types/userType";

const {loadTokenFormSession, loadUserFromToken, registerUser, updateUser, loginUser, logout} = auth.actions;

Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
})

describe('Auth Actions', () => {
    let getTokenMock: () => string
    let rootGetters: rootGetters

    beforeEach(() => {
        window.localStorage.clear()
        jest.restoreAllMocks()

        getTokenMock = jest.fn(() => "token")
        rootGetters = {getToken: getTokenMock()}
    })

    it('loadTokenFormSession', () => {
        const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem')
        const state: AuthState = {user: undefined}
        const dispatch: Dispatch = jest.fn()
        const commit: Commit = jest.fn()

        window.sessionStorage.setItem('JWT', 'Token')

        loadTokenFormSession({commit, dispatch, state})

        expect(getItemSpy).toBeCalledTimes(1)
        expect(getItemSpy).toBeCalledWith('JWT')
        expect(commit).toHaveBeenCalledWith('setToken', 'Token')
        expect(dispatch).toHaveBeenCalledWith('loadUserFromToken')
    })

    it('loadUserFromToken', async () => {
        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200,
                    json: () => ({
                        user: {
                            ...dummyAuthor,
                            token: "Token"
                        }
                    })
                })
            })
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 401,
                    json: () => ({
                        statusCode: 401,
                        message: "Not authorized."
                    })
                })
            })
        const dispatch: Dispatch = jest.fn()
        const commit: Commit = jest.fn()

        await loadUserFromToken({commit, dispatch, rootGetters})

        expect(commit).toBeCalledTimes(1)
        expect(dispatch).toBeCalledTimes(0)
        expect(commit).toHaveBeenCalledWith('setUser', {...dummyAuthor, token: "Token"})
        expect(getTokenMock).toBeCalledTimes(1)

        const result = await loadUserFromToken({commit, dispatch, rootGetters})

        expect(dispatch).toBeCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith('logout')
        expect(getTokenMock).toBeCalledTimes(1)
        expect(result).toBe("Not authorized.")
    })

    it('registerUser', (done) => {
        const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem')
        const dummyUser: RegisterUserType = {
            username: dummyAuthor.username,
            email: dummyAuthor.email,
            password: "Password"
        }
        const errorMessage = "Error Message"
        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 201,
                    json: () => ({
                        user: {
                            ...dummyAuthor,
                            token: "Token"
                        }
                    })
                })
            })
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 400,
                    json: () => ({
                        statusCode: 401,
                        message: errorMessage
                    })
                })
            })

        const result = testActionWithMutations<RegisterUserType, Promise<string>>(registerUser, dummyUser, {}, [
            {type: "setUser", payload: {...dummyAuthor, token: "Token"}},
            {type: "setToken", payload: "Token"}
        ], done)

        result.then(() => {
            expect(setItemSpy).toBeCalledTimes(1)
            expect(setItemSpy).toHaveBeenCalledWith("JWT", "Token")
        })

    })

    it('updateUser', (done) => {
        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 200
                })
            })

        testActionWithMutations<UserType, Promise<string>>(updateUser, dummyAuthor, rootGetters, [{
            type: 'setUser',
            payload: dummyAuthor
        }], done)
            .then((text) => {
                expect(getTokenMock).toBeCalledTimes(1)
                expect(text).toBe('Update is successful.')
            })
    })

    it('loginUser', (done) => {
        const setItemSpy = jest.spyOn(window.sessionStorage, 'setItem')
        const dummyUser: LoginUserType = {email: dummyAuthor.email, password: "Password"}
        global.fetch = jest.fn()
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    status: 201,
                    json: () => ({user: {...dummyAuthor, token: "Token"}})
                })
            })

        testActionWithMutations<LoginUserType, Promise<string>>(loginUser, dummyUser, {}, [
            {type: "setToken", payload: "Token"},
            {type: "setUser", payload: {...dummyAuthor, token: "Token"}}
        ], done)
            .then(() => {
                expect(setItemSpy).toBeCalledTimes(1)
                expect(setItemSpy).toHaveBeenCalledWith("JWT", "Token")
            })
    })

    it('logout', (done) => {
        const removeItemSpy = jest.spyOn(window.sessionStorage, 'removeItem')

        testActionWithMutations(logout, null, {}, [
            {type: "setUser", payload: undefined},
            {type: "setToken", payload: undefined}
        ], done)

        expect(removeItemSpy).toBeCalledTimes(1)
        expect(removeItemSpy).toHaveBeenCalledWith('JWT')
    })
});
