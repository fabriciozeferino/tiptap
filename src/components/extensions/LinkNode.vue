<template>
  <node-view-wrapper :href="node.attrs.href" as="a" contenteditable="true" @click="edit" @focus="edit">
    {{ node.attrs.text.trim() }}
  </node-view-wrapper>
</template>

<script>
import {nodeViewProps, NodeViewWrapper} from '@tiptap/vue-2'

export default {
  name: "LinkNode",

  components: {
    NodeViewWrapper,
  },

  props: {
    ...nodeViewProps,
  },

  watch: {
    selected(newSelectedStatus, OldSelectedStatus) {
      if (newSelectedStatus && newSelectedStatus !== OldSelectedStatus) {
        this.edit()
      }
    },
  },

  methods: {
    edit() {
      this.editor
          .chain()
          .focus()
          .setNodeSelection(this.getPos())
          .unsetLink({...this.node})
          .run();
    }
  }
}
</script>

<style scoped>

</style>