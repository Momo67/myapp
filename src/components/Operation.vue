<template>
  <div class="operation">
    <button class="btn btn-default" title="Display arbre"
    :class="{ '-nested-comp-open-btn': true }"
    @click="toggleNestedComp('Arbre')">
    <i class="fa fa-list-ul"></i>
  </button>
  <span>{{row.IdObjet}}</span>
  </div>
</template>

<script>
export default {
  name: 'operation',
  /*
  props: {
    field: '',
    row: {}
  },
  */
  props: ['row', 'nested'],
  methods: {
    toggleNestedComp (comp) {
      const { nested } = this
      console.log('nested: ', nested)
      if (nested.comp === comp) return nested.$toggle()
      nested.$toggle(comp, true)
    }
  },
  created () {
    console.log('nested: ', this.nested)
  }
}
</script>

<style scoped="" lang="css">
</style>
