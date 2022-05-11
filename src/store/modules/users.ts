import {UserType} from "@/types/userType";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {RootState, UsersState} from "@/types/Vuex";

export const users: Module<UsersState, RootState> = {
    state: {
        users: []
    } as UsersState,
    mutations: {
        setUsers(state: UsersState, users: UserType[]) {
            state.users = users
        },
        removeUser(state: UsersState, email: string) {
            state.users = state.users.filter((user) => {
                return user.email !== email
            })
        }
    } as MutationTree<UsersState>,
    getters: {
        getAllUser(state: UsersState): UserType[] {
            return state.users
        },
        getAllUsersExceptMe(state: UsersState, rootGetters): UserType[] {
            return state.users.filter((user) => {
                return user.id !== rootGetters.getUserId
            })
        }
    } as GetterTree<UsersState, RootState>,
    actions: {
        async loadUsers({commit, rootGetters}): Promise<UserType[] | string> {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/api/users", {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': 'JWT ' + rootGetters.getToken
                    }
                })
                    .then(response => response.json())
                    .then((result: UserType[] | string) => {
                        if (result) {
                            commit("setUsers", result)
                        } else {
                            reject(result)
                        }
                        resolve(result)
                    })
            })
        },
        async deleteUser({commit, rootGetters}, email: string): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                fetch("http://localhost:3000/api/users/" + email, {
                    method: "DELETE",
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': 'JWT ' + rootGetters['getToken']
                    }
                })
                    .then(response => {
                            if (response.status === 200) {
                                resolve("The user has been successfully deleted.")
                                commit("removeUser", email)
                            } else if (response.status === 400) {
                                reject("The user can't delete itself.")
                            } else {
                                reject("Unauthorized!")
                            }
                        }
                    )
            })
        }
    } as ActionTree<UsersState, RootState>
}
