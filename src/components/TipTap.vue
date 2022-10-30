<template>
  <editor-content :editor="editor" autofocus />
</template>

<script>
import {Editor, EditorContent} from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import {Link} from './extensions/link.js'

export default {
  components: {
    EditorContent
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
          Link,
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        this.$emit('json', this.editor.getJSON())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

