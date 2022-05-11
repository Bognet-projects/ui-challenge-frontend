<template>
  <v-app>
    <HeaderComponent />
    <v-main class="background">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import HeaderComponent from "@/components/Header.vue";

@Component({
  components: {
    HeaderComponent
  }
})
export default class App extends Vue{

}
</script>
