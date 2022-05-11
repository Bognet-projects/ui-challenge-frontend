<template>
  <v-container class="mt-4">
    <v-alert
        dense
        dismissible
        :type="messageType"
        v-if="message"
    >{{ message }}
    </v-alert>
    <v-row no-gutters>
      <h1>{{ article.title }}</h1>
      <v-flex align-self-center class="d-flex justify-end" v-if="loggedIn && article.author.id === userId">
        <v-btn fab small color="info" class="mx-1" depressed @click="edit = !edit" v-if="!edit">
          <v-icon small>fa-pen-to-square</v-icon>
        </v-btn>
        <v-btn fab small color="info" class="mx-1" depressed @click="updateArticle" v-if="edit">
          <v-icon small>fa-floppy-disk</v-icon>
        </v-btn>
        <v-btn
            v-if="!edit"
            fab
            small
            color="error"
            depressed
            @click="deleteArticle"
        >
          <v-icon small>fa-trash-can</v-icon>
        </v-btn>
      </v-flex>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-avatar
            class="mb-1"
        >
          <v-img src="https://randomuser.me/api/portraits/lego/8.jpg"
                 :alt="article.author.username + 'profile picture'"></v-img>
        </v-avatar>
        {{ article.author.username }}
      </v-col>
      <v-col
          class="text-right date"
          align-self="end"
      >{{ date }}
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <ArticleShow :article="article" v-if="!edit"></ArticleShow>
    <ArticleEdit :article="article" v-if="edit"></ArticleEdit>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ArticleType} from "@/types/article";
import {Getter, Action} from "vuex-class"
import ArticleShow from "@/components/ArticleShow.vue";
import ArticleEdit from "@/components/ArticleEdit.vue";

@Component({
  components: {ArticleEdit, ArticleShow}
})
export default class ArticlePage extends Vue {
  @Getter('isAuth') loggedIn!: boolean;
  @Getter('getUserId') userId!: number;
  @Getter('getArticleById') getArticleById!: (id: number) => ArticleType;
  @Action('loadArticles') loadArticles!: () => Promise<string | ArticleType[]>;
  @Action('deleteArticle') deleteArticleBySlug!: (slug: string) => Promise<string>;
  @Action('updateArticle') updateArticleAfterEdit!: (article: ArticleType) => Promise<string>;

  message = ""
  messageType = "error"
  edit = false

  mounted() {
    this.loadArticles()
  }

  get date(): string {
    if (this.article.created !== this.article.updated) {
      return new Date(this.article.updated).toLocaleString()
    } else {
      return new Date(this.article.created).toLocaleString()
    }
  }

  get article(): ArticleType {
    const id: number = parseInt(this.$route.params.id)
    return this.getArticleById(id)
  }

  deleteArticle() {
    this.deleteArticleBySlug(this.article.slug)
        .then(message => {
          this.message = message
        })
  }

  updateArticle() {
    this.updateArticleAfterEdit(this.article).then(response=>{
      if (response){
        this.message = response
        this.messageType = "error"
      } else {
        this.message = "The article has been successfully updated."
        this.messageType = "success"
      }
      this.edit = !this.edit
    })
  }
}
</script>

<style scoped lang="scss">
.date{
  font-size: 0.9em;
  color: gray;
}

.v-main__wrap > .container{
  border-radius: 1rem;
  min-height: 95%;
  background-color: rgba(white, .54);
}
</style>
