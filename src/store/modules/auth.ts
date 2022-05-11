import {LoginUserType, RegisterUserType, UserType, UserWithTokenType} from "@/types/userType";
import {ActionTree, Commit, Dispatch, GetterTree, Module, MutationTree} from "vuex";
import router from "@/router";
import {AuthState, RootState} from "@/types/Vuex";

export const auth: Module<AuthState, RootState> = {
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
    } as GetterTree<AuthState, RootState>,
    mutations: {
        setUser(state: AuthState, user: UserWithTokenType) {
            state.user = user;
        }
    } as MutationTree<AuthState>,
    actions: {
        loadTokenFormSession({commit, dispatch, state}: { commit: Commit, dispatch: Dispatch, state: AuthState }) {
            const token: string | null = sessionStorage.getItem("JWT")
            if (token && !state.user) {
                commit("setToken", sessionStorage.getItem("JWT"))
                return dispatch("loadUserFromToken")
            }
        },
        logout({commit}: { commit: Commit }) {
            commit("setUser", undefined)
            commit("setToken", undefined)
            sessionStorage.removeItem("JWT")
            router.push({name: "login"})
        },
        async loadUserFromToken({
                                    commit,
                                    rootState,
                                    dispatch
                                }: { commit: Commit, rootState: RootState, dispatch: Dispatch }) {
            return new Promise((resolve) => {
                fetch("http://localhost:3000/api/user", {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': 'JWT ' + rootState.token
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
                            commit("setToken", result.user.token)
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
                            commit("setToken", result.user.token)
                            commit("setUser", result.user)
                        }
                        resolve(result)
                    })
            })
        },
        async updateUser({commit, rootState}: { commit: Commit, rootState: RootState }, user: UserType) {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/api/user", {
                    method: "PUT",
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + rootState.token
                    },
                    body: JSON.stringify({
                        username: user.username,
                        email: user.email,
                        bio: user.bio,
                        image: user.image
                    })
                })
                    .then(async response => {
                        const data = await response.json()
                        if (response.status === 200) {
                            commit("setUser", user)
                            resolve("Update is successful.")
                        } else {
                            reject(data)
                        }
                    })
            })
        }
    } as ActionTree<AuthState, RootState>
}
