<template>
  <div>
    <v-container>
      {{ article.body }}
    </v-container>
    <v-row no-gutters>
      <v-chip v-for="tag in article.tagList" :key="tag" color="pink" dark class="mx-1">{{ tag }}</v-chip>
    </v-row>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {ArticleType} from "@/types/article";

@Component
export default class ArticleShow extends Vue {
  @Prop({required: true}) article!: ArticleType
}
</script>
