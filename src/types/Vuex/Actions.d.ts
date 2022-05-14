import {RootState, UsersState} from "@/types/Vuex/States";
import {ActionTree, Commit} from "vuex";
import {rootGetters} from "@/types/Vuex/Getters";

export interface UserActions<S = UsersState, R = RootState> extends ActionTree<S, R>{
    loadUsers({commit, rootGetters}: {commit: Commit, rootGetters: rootGetters}): void,
    deleteUser({commit, rootGetters}: {commit: Commit, rootGetters: rootGetters}, email: string): Promise<string>
}
