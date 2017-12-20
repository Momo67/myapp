<template lang="html">
  <div class="my-select">
    <vue-select ref="select"
      :options="dataOptions"
      :value="selectedValue"
      @input="onInput"
      :placeholder="placeholder"
      :searchable="searchable"
      :multiple="multiple"
    ></vue-select>
  </div>
</template>

<script>
import VueSelect from 'vue-select'
import axios from 'axios'
import orderBy from 'lodash/orderBy'

export default {
  name: 'my-select',
  components: {
    VueSelect
  },
  props: {
    value: null,
    options: {
      type: Array,
      required: false
    },
    src: {
      type: String,
      required: false
    },
    item: {
      type: String,
      required: false
    },
    params: {
      type: String,
      required: false
    },
    fieldName: {
      type: String,
      required: false
    },
    sort: {
      type: String,
      default: 'asc'
    },
    label: {
      type: String,
      default: 'label',
      required: false
    },
    trackBy: {
      type: String,
      default: '',
      required: false
    },
    placeholder: {
      type: String,
      default: 'Sélectionner un élément'
    },
    searchable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedValue () {
      return this.dataOptions.find(obj => obj.value === this.selectedId)
    }
  },
  data () {
    return {
      selectedId: null,
      dataOptions: []
    }
  },
  watch: {
    selectedId: {
      handler (val) {
        this.$emit('input', Number(val))
      },
      deep: true
    },
    value: {
      handler (val) {
        this.selectedId = this.value
      },
      deep: true
    },
    params: {
      handler (val) {
        this.fetchData()
      },
      deep: true
    }
  },
  methods: {
    onInput ({value}) {
      this.selectedId = value
    },
    computeOptions (options) {
      this.dataOptions = []
      this.dataOptions.push({value: -1, label: '- Tous -', order: 1})
      options.forEach(item => {
        if ((item.IsActive === undefined) || (item.IsActive !== '0')) {
          let data = (!this.fieldName) ? item.Data : item[this.fieldName]
          let value = (!this.trackBy) ? (item.Value !== undefined ? item.Value : item.Id) : item[this.trackBy]
          data = data.replace(/&nbsp;/g, ' ')
          let option = {}
          option.value = parseInt(value)
          option.label = data
          option.order = (item.SortOrder !== undefined) ? parseInt(item.SortOrder) : data
          this.dataOptions.push(option)
        }
      })
      this.dataOptions = orderBy(this.dataOptions, 'order', this.sort)
    },
    fetchData () {
      if (this.options === undefined) {
        axios.post(this.src, {query: {item: this.item, params: this.params}}).then(response => {
          this.computeOptions(response.data[this.item])
        }).catch(error => {
          if (error.response) {
            console.log('Error data: ', error.response.data, ' status: ', error.response.status, ' headers: ', error.response.headers)
          } else if (error.request) {
            console.log('Error request: ', error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      } else {
        this.computeOptions(this.options)
      }
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style lang="css" scoped>
</style>
