import {UsersState} from "@/types/Vuex/States";
import {UsersMutations} from "@/types/Vuex/Mutations";
import {UsersGetters} from "@/types/Vuex/Getters";
import {UserActions} from "@/types/Vuex/Actions";

const apiUrl = process.env.VUE_APP_API_URL

export const users = {
    state: {
        users: []
    } as UsersState,
    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        removeUser(state, email) {
            state.users = state.users.filter((user) => {
                return user.email !== email
            })
        }
    } as UsersMutations,
    getters: {
        getAllUsersExceptMe(state, rootGetters) {
            return state.users.filter((user) => {
                return user.id !== rootGetters.getUserId
            })
        }
    } as UsersGetters,
    actions: {
        async loadUsers({commit, rootGetters}) {
            fetch(apiUrl + "users", {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'JWT ' + rootGetters.getToken
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.message)
                        commit("setUsers", result)
                })
        },
        async deleteUser({commit, rootGetters}, email) {
            return fetch(apiUrl + "users/" + email, {
                method: "DELETE",
                credentials: 'same-origin',
                headers: {
                    'Authorization': 'JWT ' + rootGetters.getToken
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.message) {
                        commit("removeUser", email)
                        return "The user has been successfully deleted."
                    } else {
                        return result.message
                    }
                })
        }
    } as UserActions
}
