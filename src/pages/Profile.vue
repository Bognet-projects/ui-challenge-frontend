<template>
  <v-container class="my-4">
    <h1>My Profile</h1>
    <v-row no-gutters align="center">
      <h3>Information</h3>
      <v-btn
          class="ml-auto mb-2"
          small
          color="secondary"
          @click="edit"
      >
        {{ editable ? 'Save' : 'Edit' }}
        <v-icon small class="ml-2">{{ editable ? 'fa-floppy-disk' : 'fa-pen-to-square' }}</v-icon>
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-form
        ref="form"
        v-model="valid"
    >
      <v-container>
        <v-alert
            dense
            v-if="alert.type"
            :type="alert.type"
        >{{ alert.text }}
        </v-alert>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                color="teal"
                label="Username"
                v-model="user.username"
                :readonly="!editable"
                dense filled
                rounded
                :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                rounded
                color="teal"
                label="Email"
                v-model="user.email"
                :readonly="!editable"
                dense filled
                :rules="[rules.required, rules.email]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
                color="teal"
                label="Bio"
                auto-grow
                rounded
                v-model="user.bio"
                :readonly="!editable"
                dense filled
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <h3>My Articles</h3>
    <v-divider></v-divider>
    <ArticleCard v-for="article in articles" :key="article.id" :article="article"></ArticleCard>
  </v-container>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";
import {UserType} from "@/types/userType";
import {VForm} from "@/types/VForm";
import {ArticleType} from "@/types/article";
import ArticleCard from "@/components/ArticleCard.vue";
import {Action, Getter} from "vuex-class";

@Component({
  components: {ArticleCard}
})
export default class ProfilePage extends Vue {
  @Getter('getUserId') userId!: number;
  @Getter('getUser') user!: UserType;
  @Getter('getMyArticles') getMyArticles!: (id: number) => ArticleType[];
  @Action('loadArticles') loadArticles!: () => Promise<string>;
  @Action('updateUser') updateUser!: (user: UserType)=> Promise<string>;
  @Ref("form") readonly form!: VForm;

  valid = false
  editable = false
  alert: { type: string, text: string } = {
    type: '',
    text: ''
  }
  rules = {
    required: (value: string): boolean | string => !!value || 'Required!',
    email: (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail!'
    }
  }

  mounted() {
    this.loadArticles()
  }

  get articles(): ArticleType[] {
    return this.getMyArticles(this.userId)
  }

  async edit() {
    this.form.validate()
    if (this.editable && this.valid) {
      this.updateUser(this.user)
          .then((message) => {
            this.alert.type = 'success'
            this.alert.text = message
            this.editable = !this.editable
            window.setInterval(() => {
              this.alert.type = ''
            }, 3000)
          })
          .catch((error) => {
            this.alert.type = 'error'
            this.alert.text = error
          })
    } else if (this.valid) {
      this.editable = !this.editable
    }
  }
}
</script>

<style lang="scss" scoped>
.v-main__wrap > .container{
  padding: 10px 20px;
  border-radius: 1rem;
  min-height: 95%;
  background-color: rgba(white, .54);
}
</style>
