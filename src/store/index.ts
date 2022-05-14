import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import {auth} from "@/store/modules/auth";
import {users} from "@/store/modules/users";
import {articles} from "@/store/modules/articles";
import {RootState} from "@/types/Vuex/States";

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    state: {
        token: undefined
    },
    mutations: {
        setToken(state: RootState, token: string) {
            state.token = token
        }
    },
    getters: {
        getToken(state: RootState): string | undefined {
            return state.token
        },
        isAuth(state: RootState): boolean {
            return !!state.token
        }
    },
    modules: {
        auth,
        users,
        articles
    }
}

export default new Vuex.Store<RootState>(store)
