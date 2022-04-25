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
          v-if="this.$store.getters.isAuth"
      >{{ this.$store.getters.getUserName }}
      </v-btn>
      <v-btn
          fab
          small
          color="pink"
          @click="logout"
          v-if="this.$store.getters.isAuth"
      >
        <v-icon color="white" small>fa-right-from-bracket</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list v-if="this.$store.getters.isAuth">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/lego/8.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              {{ this.$store.getters.getUser.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ this.$store.getters.getUser.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
          nav
          dense
      >
        <v-list-item link v-for="item in this.menu" :key="item.name" :to="item.link">
          <v-list-item-icon>
            <v-icon dense>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </header>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
  drawer = false

  loggedInMenu = [
    {icon: "fa-user", name: "My Profile", link: ""},
    {icon: "fa-users", name: "Users list", link: ""},
    {icon: "fa-newspaper", name: "Articles", link: ""}
  ]
  logoutMenu = [
    {icon: "fa-right-to-bracket", name: "Login", link: "login"},
    {icon: "fa-user-plus", name: "Register", link: "register"}
  ]

  get menu(){
    return this.$store.getters.isAuth? this.loggedInMenu : this.logoutMenu
  }

  logout() {
    this.$store.dispatch("logout")
  }
}
</script>
