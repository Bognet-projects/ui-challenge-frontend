<template>
  <v-container>
    <v-row no-gutters v-if="isAuth">
      <v-btn class="ml-auto" color="info" @click="$router.push({name: 'create'})">
        <v-icon left>
          fa-plus
        </v-icon>
        New
      </v-btn>
    </v-row>
    <p v-if="articles.length === 0">{{ message }}</p>
    <ArticleCard v-for="article in articles" :key="article.id" :article="article"></ArticleCard>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ArticleType} from "@/types/article";
import ArticleCard from "@/components/ArticleCard.vue";
import {Action, Getter, State} from "vuex-class";

@Component({
      components: {ArticleCard}
    }
)
export default class HomePage extends Vue {
  @State(state => state.articles.articles) articles: ArticleType[] | undefined
  @Getter('isAuth') isAuth!: boolean
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
