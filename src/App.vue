<template>
  <div id="app">
    <TipTap v-model="html" @json="setContent" />

    <pre class="ProseMirror">{{ json }}</pre>
    <pre class="ProseMirror">{{ html }}</pre>
  </div>
</template>

<script>
import TipTap from './components/TipTap.vue'

export default {
  name: 'App',
  components: {
    TipTap,
  },
  data() {
    return {
      html: '',
      json: null,
    }
  },
  methods: {
    setContent(value) {
      this.json = value
    }
  }
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
  border: .1rem solid #ccc;
  padding: 1rem;
  border-radius: 1rem;
  margin: 4rem;
}
</style>
