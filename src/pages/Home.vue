<template>
  <v-container>
    <p v-if="articles.length === 0">{{ message }}</p>
    <ArticleCard v-for="article in articles" :key="article.id" :article="article"></ArticleCard>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ArticleType} from "@/types/article";
import {mapState} from "vuex";
import {storeState} from "@/store";
import ArticleCard from "@/components/ArticleCard.vue";

@Component({
  components: {ArticleCard},
  computed: mapState<storeState>({
        articles(state: storeState): ArticleType[] {
          return state.articles.articles
        }
      })
    }
)
export default class HomePage extends Vue {
  articles?: ArticleType[]
  message = ""

  created() {
    this.$store.dispatch("loadArticles")
        .then((result: string | ArticleType[]) => {
          if (typeof result === "string") {
            this.message = result
          }
        })
  }

}
</script>
