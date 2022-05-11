<template>
  <v-container>
    <v-card
        max-width="450px"
        elevation="2"
        class="mx-auto"
    >
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-alert
            dense
            v-if="alert.type"
            :type="alert.type"
        >{{ alert.text }}
        </v-alert>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="login"
        >
          <v-text-field
              prepend-icon="fa-envelope"
              v-model="formData.email"
              label="Email"
              type="email"
              required
              :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
              prepend-icon="fa-lock"
              v-model="formData.password"
              type="password"
              label="Password"
              required
              :rules="[rules.required]"
          ></v-text-field>
          <v-btn
              block
              large
              :disabled="!valid"
              type="submit"
              color="primary"
              elevation="2"
          >Login
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <small class="ml-auto">Don't have an account yet?</small>
        <v-btn
            small
            color="secondary"
            class="mx-2"
            to="register"
        >Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from 'vue-property-decorator'
import {VForm} from "@/types/VForm";
import {LoginUserType} from "@/types/userType";
import {Action} from "vuex-class";

@Component
export default class LoginPage extends Vue {
  @Action('loginUser') loginUser!: (loginUser: LoginUserType) => Promise<string>;
  @Ref("form") readonly form!: VForm;
  valid = false
  alert = {
    type: '',
    text: ''
  }
  formData: LoginUserType = {
    email: '',
    password: ''
  }
  rules = {
    required: (value: string): boolean | string => !!value || 'Required!',
    email: (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail!'
    }
  }

  async login() {
    this.form.validate()
    if (this.valid) {
      this.loginUser(this.formData)
          .then(() => {
            this.alert.type = "success"
            this.alert.text = "Successful login!"
            this.$router.push({name: 'home'})
          })
          .catch((data: string) => {
            this.alert.type = "error"
            this.alert.text = "User " + data
          })

    }
  }
}
</script>
