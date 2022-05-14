import {UserType} from "@/types/userType";
import {UsersState} from "@/types/Vuex/States";
import {MutationTree} from "vuex";

export interface UsersMutations<S = UsersState> extends MutationTree<UsersState>{
    setUsers(state: S, payload: UserType[]): void,
    removeUser(state: S, payload: string): void
}
