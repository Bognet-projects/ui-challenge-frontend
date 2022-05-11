<template>
  <v-container class="my-4">
    <h1>Create new article</h1>
    <ArticleEdit :article="article"></ArticleEdit>
    <v-container fluid class="text-center">
      <v-btn color="info" large @click="publishArticle">Publish</v-btn>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ArticleEdit from "@/components/ArticleEdit.vue";
import {CreateArticleType} from "@/types/article";
import {Action} from "vuex-class";

@Component({
  components: {ArticleEdit}
})
export default class CreateArticle extends Vue {
  @Action('createArticle') createArticle!: (article: CreateArticleType) => Promise<string>;

  article: CreateArticleType = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  publishArticle(){
    this.createArticle(this.article).then(()=>{
      this.$router.push({name: "home"})
    })
  }
}
</script>

<style scoped lang="scss">
.v-main__wrap > .container{
  border-radius: 1rem;
  min-height: 95%;
  background-color: rgba(white, .54);
}
</style>
