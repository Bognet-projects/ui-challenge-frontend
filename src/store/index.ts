import Vue from 'vue'
import Vuex from 'vuex'
import auth, {authState} from "@/store/modules/auth";
import users, {usersState} from "@/store/modules/users";
import articles, {articlesState} from "@/store/modules/articles";

Vue.use(Vuex)

export type storeState = {
  auth: authState,
  users: usersState,
  articles: articlesState
}

export default new Vuex.Store<storeState>({
  modules: {
    auth,
    users,
    articles
  }
})
