import {AuthState, RootState, UsersState} from "@/types/Vuex/States";
import {UserType} from "@/types/userType";
import {GetterTree} from "vuex";

export interface UsersGetters<S = UsersState> extends GetterTree<UsersState, RootState>{
    getAllUsersExceptMe(state: S, rootGetters: rootGetters): UserType[]
}

export interface AuthGetters<S = AuthState> extends GetterTree<AuthState, RootState>{
    getUserName(state: S): string,

    getUser(state: S): UserType | undefined,

    getUserId(state: S): number | null
}

//TODO: Temporary needs some research for a better solution!
interface rootGetters {
    getUser?: UserType | undefined,
    getUserName?: string,
    getUserId?: number | null,
    getAllUsersExceptMe?: UserType[],
    getToken?: string | undefined
}
