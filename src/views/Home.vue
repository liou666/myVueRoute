<template>
  <div class="home">
    <h1>This is a home page</h1>
    <my-router-link to="/home/tab">Tab</my-router-link>
    <my-router-view></my-router-view>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {}
</script>
