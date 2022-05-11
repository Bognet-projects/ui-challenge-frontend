<template>
  <v-form
      class="mt-5"
  >
    <v-row>
      <v-col cols="12" sm="2">
        <v-subheader>Title</v-subheader>
      </v-col>
      <v-col>
        <v-text-field
            color="teal"
            v-model="article.title"
            :rules="[rules.required]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2">
        <v-subheader>Description</v-subheader>
      </v-col>
      <v-col>
        <v-textarea
            rows="1"
            auto-grow
            color="teal"
            v-model="article.description"
            :rules="[rules.required]"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-subheader>Content</v-subheader>
    <v-container>
      <v-textarea
          outlined
          auto-grow
          color="teal"
          v-model="article.body"
          :rules="[rules.required]"
      ></v-textarea>
      <v-combobox
          solo-inverted
          background-color="teal"
          color="teal darken-4"
          label="Tags"
          v-model="article.tagList"
          chips
          dark
          multiple
          :hide-no-data="!search"
          :search-input.sync="search"
      >
        <template v-slot:no-data>
          <v-list-item>
            <span class="subheading mr-1">Create</span>
            <v-chip
                label
                small
                dark
            >
              {{ search }}
            </v-chip>
          </v-list-item>
        </template>
      </v-combobox>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {CreateArticleType} from "@/types/article";

@Component
export default class ArticleEdit extends Vue {
  @Prop({required: true}) article!: CreateArticleType
  search: string | null = null

  rules = {
    required: (value: string): boolean | string => !!value || 'Required!',
  }
}
</script>

