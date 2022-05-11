<template>
  <v-card
      class="my-2"
  >
    <v-card-title>{{ article.title }}</v-card-title>
    <v-card-subtitle>Written by {{ article.author.username }} at {{ article.created | dateFormat }}</v-card-subtitle>
    <v-card-text>{{ article.description }}</v-card-text>
    <v-card-actions>
      <v-btn
          text
          class="ml-auto"
          color="indigo darken-4"
          :to="{name: 'article', params: {id: article.id}}"
      >
        Read More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {ArticleType} from "@/types/article";

@Component({
  filters: {
    dateFormat: (value: number): string => {
      return new Date(value).toLocaleString()
    }
  }
})
export default class ArticleCard extends Vue {
  @Prop({required: true}) article!: ArticleType
}
</script>
