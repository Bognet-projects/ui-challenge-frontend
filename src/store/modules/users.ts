import {UserType} from "@/types/userType";
import {Commit} from "vuex";

export type usersState = {
    users: UserType[]
}

export default {
    state: {
        users: []
    },
    mutations: {
        setUsers(state: usersState, users: UserType[]) {
            state.users = users
        },
        removeUser(state: usersState, email: string) {
            state.users = state.users.filter((user) => {
                return user.email !== email
            })
        }
    },
    getters: {
        usersLoaded(state: usersState): boolean {
            return state.users.length > 0
        },
        getAllUser(state: usersState): UserType[] {
            return state.users
        },
        getAllUsersExceptMe(state: usersState, rootGetters: any): UserType[] {
            return state.users.filter((user) => {
                return user.id !== rootGetters['getUserId']
            })
        }
    },
    actions: {
        async loadUsers({commit, rootGetters}: { commit: Commit, rootGetters: any }) {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/api/users", {
                    method: "GET",
                    credentials: 'same-origin',
                    headers: {
                        'Authorization': 'JWT ' + rootGetters['getToken']
                    }
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result) {
                            commit("setUsers", result)
                        } else {
                            reject(result)
                        }
                        resolve(result)
                    })
            })
        },
        async deleteUser({commit, rootGetters}: { commit: Commit, rootGetters: any }, email: string) {
            return new Promise((resolve, reject) => {
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
                            }else if (response.status === 400){
                                reject("The user can't delete itself.")
                            }else {
                                reject("Unauthorized!")
                            }
                        }
                    )
            })
        }
    }
}
