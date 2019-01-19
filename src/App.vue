<template>
  <div id="container">
    <div class="page-header">
      <h1 class="text-center">게시판</h1>
    </div>
    <component :is="currentView"></component>
    <ContentsList></ContentsList>
  </div>
</template>

<script>
import ContentsList from './components/ContentsList'
import Contents from './components/Contents'
import FileUpload from './components/FileUpload'

import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    ContentsList, Contents, FileUpload
  },
  computed: mapState(['currentView'])
}
</script>

<style scoped>
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
