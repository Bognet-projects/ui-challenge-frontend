import {LoginUserType, RegisterUserType, UserType, UserWithTokenType} from "@/types/userType";
import {AuthState} from "@/types/Vuex/States";
import {AuthGetters} from "@/types/Vuex/Getters";
import {AuthMutations} from "@/types/Vuex/Mutations";
import {AuthActions} from "@/types/Vuex/Actions";

const apiUrl = process.env.VUE_APP_API_URL

export const auth = {
    state: {
        user: undefined
    } as AuthState,
    getters: {
        getUserName(state: AuthState): string {
            return state.user ? state.user.username : ""
        },
        getUser(state: AuthState): UserType | undefined {
            return state.user
        },
        getUserId(state: AuthState): number | null {
            return state.user ? state.user.id : null
        }
    } as AuthGetters,
    mutations: {
        setUser(state: AuthState, user: UserWithTokenType) {
            state.user = user;
        }
    } as AuthMutations,
    actions: {
        loadTokenFormSession({commit, dispatch, state}) {
            const token: string | null = sessionStorage.getItem("JWT")
            if (token && !state.user) {
                commit("setToken", token)
                return dispatch("loadUserFromToken")
            }
        },
        logout({commit}) {
            sessionStorage.removeItem("JWT")
            commit("setUser", undefined)
            commit("setToken", undefined)
        },
        async loadUserFromToken({commit, rootGetters, dispatch}) {
            return fetch(apiUrl + "user", {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'JWT ' + rootGetters.getToken
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.user) {
                        commit("setUser", result.user)
                    } else {
                        dispatch("logout")
                        return result.message
                    }
                })
        },
        async registerUser({commit}, regUser: RegisterUserType) {
            return fetch(apiUrl + "users", {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(regUser)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.user) {
                        sessionStorage.setItem("JWT", result.user.token)
                        commit("setUser", result.user)
                        commit("setToken", result.user.token)
                    }
                })
        },
        async loginUser({commit}, loginUser: LoginUserType) {
            return new Promise((resolve, reject) => {
                fetch(apiUrl + "login", {
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
                            commit("setToken", result.user.token)
                            commit("setUser", result.user)
                        }
                        resolve(result)
                    })
            })
        },
        async updateUser({commit, rootGetters}, user: UserType) {
            return fetch(apiUrl + "user", {
                method: "PUT",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + rootGetters.getToken
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    image: user.image
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        commit("setUser", user)
                        return "Update is successful."
                    }
                })
        }
    } as AuthActions
}
