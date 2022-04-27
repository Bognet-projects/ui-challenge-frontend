<template>
  <v-container>
    <v-row
        no-gutters
        align="center"
    >
      <h1>Users List</h1>
      <v-btn
          class="ml-auto"
          small
          dark
          color="blue"
          elevation="2"
          @click="updateUsers"
      >
        Update
        <v-icon x-small class="ml-2">fa-arrows-rotate</v-icon>
      </v-btn>
    </v-row>
    <v-alert
        dense
        dismissible
        v-if="alert.type"
        :type="alert.type"
    >{{ alert.text }}
    </v-alert>
    <v-list two-line>
      <v-container v-if="users.length===0">No User Found</v-container>
      <template v-for="(user, index) in users">
        <v-list-item :key="user.id">
          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ user.bio }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
                icon
                fab
                color="red"
                @click="deleteUser(user.email)"
            >
              <v-icon>fa-trash</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider
            v-if="index < users.length - 1"
            :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {UserType} from "@/types/userType";

@Component
export default class UsersPage extends Vue {
  users: UserType[] = []
  alert: { type: string, text: string } = {
    type: '',
    text: ''
  }

  created() {
    if (!this.$store.getters.usersLoaded) {
      this.$store.dispatch("loadUsers").then(() => {
        this.users = this.$store.getters.getAllUsersExceptMe
      })
    } else {
      this.users = this.$store.getters.getAllUsersExceptMe
    }
  }

  updateUsers(){
    this.$store.dispatch("loadUsers").then(() => {
      this.users = this.$store.getters.getAllUsersExceptMe
    })
  }
  deleteUser(email: string): void {
    this.$store.dispatch("deleteUser", email).then((text: string) => {
      this.alert.type = 'success'
      this.alert.text = text
      this.users = this.$store.getters.getAllUsersExceptMe
      window.setInterval(() => {
        this.alert.type = ''
      }, 3000)
    }).catch((text: string) => {
      this.alert.type = 'alert'
      this.alert.text = text
    })
  }
}
</script>
