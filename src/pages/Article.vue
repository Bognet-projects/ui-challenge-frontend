<template>
  <v-container class="mt-4">
    <v-row no-gutters>
      <h1>{{ article.title }}</h1>
      <v-flex align-self-center class="d-flex justify-end" v-if="loggedIn && article.author.id === userId">
        <v-btn fab small color="info" class="mx-1" depressed>
          <v-icon small>fa-pen-to-square</v-icon>
        </v-btn>
        <v-btn fab small color="error" depressed>
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
    <v-container>
      {{ article.body }}
    </v-container>
    <v-row no-gutters>
      <v-chip v-for="tag in article.tagList" :key="tag" color="pink" dark>{{ tag }}</v-chip>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ArticleType} from "@/types/article";
import {Getter, Action} from "vuex-class"

@Component
export default class ArticlePage extends Vue {
  @Getter('isAuth') loggedIn!: boolean;
  @Getter('getUserId') userId!: number;
  @Getter('getArticleById') getArticleById!: (id: number) => ArticleType;
  @Action('loadArticles') loadArticles!: () => Promise<string | ArticleType[]>;

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
