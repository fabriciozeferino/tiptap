<template>
  <div id="app">
    <TipTap />
  </div>
</template>

<script>
import TipTap from './components/TipTap.vue'

export default {
  name: 'App',
  components: {
    TipTap,
  },
}
</script>

<style>
/* dark theme */
#app[data-theme="dark"] {
  --bg-color: #1e1e1e;
  --text-color: #fff;
  --border-color: #444;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #1e1e1e;
  min-width: 100%;
  height: 100%;
}

.ProseMirror {
  min-height: 200px;
  border: 1px solid #ccc;
  padding: 10px;

}
</style>
