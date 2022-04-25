import {LoginUserType, RegisterUserType, UserType, UserWithTokenType} from "@/types/userType";
import {Commit, Dispatch} from "vuex";
import router from "@/router";

type authState = {
    user: UserWithTokenType
}

export default {
    state: {
        user: {
            id: null,
            username: null,
            email: null,
            image: null,
            token: null,
            bio: null
        }
    },
    mutations: {
        setToken(state: authState, token: string) {
            state.user.token = token
        },
        setUser(state: authState, user: UserWithTokenType) {
            state.user = user;
        }
    },
    getters: {
        isAuth(state: authState): boolean {
            return !!state.user.token
        },
        getUserName(state: authState): string{
          return state.user.username
        },
        getUser(state: authState): UserType{
            return state.user
        }
    },
    actions: {
        loadTokenFormSession({commit, dispatch, state}: { commit: Commit, dispatch: Dispatch, state: authState }) {
            const token: string | null = sessionStorage.getItem("JWT")
            if (token && !state.user.token) {
                commit("setToken", sessionStorage.getItem("JWT"))
                return dispatch("loadUserFromToken")
            }
        },
        logout({commit}: { commit: Commit }) {
            commit("setUser",{
                id: null,
                username: null,
                email: null,
                image: null,
                token: null,
                bio: null
            })
            sessionStorage.removeItem("JWT")
            router.push({name: "login"})
        },
        async loadUserFromToken({commit, state, dispatch}: { commit: Commit, state: authState, dispatch: Dispatch }) {
            return new Promise((resolve) => {
                fetch("http://localhost:3000/api/user", {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': 'JWT ' + state.user.token
                    }
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.user && result.user.token) {
                            commit("setUser", result.user)
                        } else {
                            dispatch("logout")
                        }
                        resolve(result)
                    })
            })
        },
        async registerUser({commit}: { commit: Commit }, regUser: RegisterUserType) {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/api/users", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(regUser)
                })
                    .then(async response => {
                        const data = await response.json()
                        if (response.status !== 201) {
                            reject(data.errors.username)
                        }
                        return data
                    })
                    .then((result: { user: UserWithTokenType }) => {
                        if (result.user) {
                            sessionStorage.setItem("JWT", result.user.token)
                            commit("setUser", result.user)
                        }
                        resolve(result)
                    })
            })
        },
        async loginUser({commit}: { commit: Commit }, loginUser: LoginUserType) {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginUser)
                })
                    .then(async response => {
                        const data = await response.json()
                        if (response.status !== 201) {
                            reject(data.errors.User)
                        }
                        return data
                    })
                    .then((result: { user: UserWithTokenType }) => {
                        if (result.user) {
                            sessionStorage.setItem("JWT", result.user.token)
                            commit("setUser", result.user)
                        }
                        resolve(result)
                    })
            })
        }
    }
}
