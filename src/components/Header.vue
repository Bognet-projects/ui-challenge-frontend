<template>
  <header>
    <v-app-bar
        dark
        elevation="2"
        color="teal"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn
          rounded
          text
          class="mr-3"
          :to="{name: 'profile'}"
          v-if="this.isAuth"
      >{{ this.username }}
      </v-btn>
      <v-btn
          fab
          small
          color="pink"
          @click="logout"
          v-if="this.isAuth"
      >
        <v-icon color="white" small>fa-right-from-bracket</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="teal"
        dark
    >
      <v-list
          nav
          dense
      >
        <v-list-item link v-for="item in this.menu" :key="item.name" :to="{name: item.link}">
          <v-list-item-icon>
            <v-icon dense>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Action, Getter} from "vuex-class";
import {UserType} from "@/types/userType";

@Component
export default class HeaderComponent extends Vue {
  @Getter('getUserName') username!: string
  @Getter('getUser') user!: UserType;
  @Getter('isAuth') isAuth!: boolean;
  @Action('logout') logout!: () => void;

  drawer = false

  loggedInMenu = [
    {icon: "fa-user", name: "My Profile", link: "profile"},
    {icon: "fa-users", name: "Users list", link: "users"},
    {icon: "fa-newspaper", name: "Articles", link: "home"}
  ]
  logoutMenu = [
    {icon: "fa-newspaper", name: "Articles", link: "home"},
    {icon: "fa-right-to-bracket", name: "Login", link: "login"},
    {icon: "fa-user-plus", name: "Register", link: "register"}
  ]

  get menu() {
    return this.isAuth ? this.loggedInMenu : this.logoutMenu
  }
}
</script>
