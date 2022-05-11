<template>
  <v-container>
    <p v-if="articles.length === 0">{{ message }}</p>
    <ArticleCard v-for="article in articles" :key="article.id" :article="article"></ArticleCard>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ArticleType} from "@/types/article";
import ArticleCard from "@/components/ArticleCard.vue";
import {Action, State} from "vuex-class";

@Component({
      components: {ArticleCard}
    }
)
export default class HomePage extends Vue {
  @State(state => state.articles.articles) articles: ArticleType[] | undefined
  @Action('loadArticles') loadArticles!: () => Promise<ArticleType[] | string>

  message = ""

  mounted() {
    this.loadArticles()
        .then((result: string | ArticleType[]) => {
          if (typeof result === "string") {
            this.message = result
          }
        })
  }

}
</script>
