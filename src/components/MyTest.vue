<template lang="html">
  <div class="my-test">
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
  name: 'my-test',
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
    selectedValueBak () {
      /*
      console.log('Computed selectedValue selectedId: ', this.selectedId)
      console.log('Computed selectedValue typeof this.selectedId: ', typeof (this.selectedId))
      console.log('Computed selectedValue isArray(this.selectedId): ', Array.isArray(this.selectedId))
      if (this.multiple) {
        let __array = []
        if ((this.selectedId !== undefined) && (this.selectedId !== null)) {
          this.selectedId.forEach((elem) => {
            console.log('elem: ', elem)
            __array.push(this.dataOptions.find(obj => obj.value === elem.value))
          })
        }
        console.log('Computed selectedValue __array: ', __array)
        return __array
        // return [{value: -1, label: '-Tous-'}]
      } else {
        return this.dataOptions.find(obj => obj.value === this.selectedId)
      }
      */
      /*
      if (!this.multiple) {
        console.log('Appel de computed selectedValue')
        return this.dataOptions.find(obj => obj.value === this.selectedId)
      }
      */
      // return this.dataOptions.find(obj => obj.value === this.selectedId)
    }
  },
  data () {
    return {
      selectedId: undefined,
      dataOptions: [],
      selectedValue: undefined
    }
  },
  watch: {
    selectedId: {
      handler (val) {
        console.log('Watch selectedId: ', val)
        if (this.multiple) {
          let elemToDelete = val.find(elem => elem.value === -1)
          if ((val.length > 1) && (elemToDelete !== undefined)) {
            if (val.indexOf(elemToDelete) === 0) {
              val.splice(val.indexOf(elemToDelete), 1)
            } else {
              val.splice(0, val.length - 1)
            }
          } else if (val.length === 0) {
            val.push(this.dataOptions.find(elem => elem.value === -1))
          }
          this.$emit('input', val)
        } else {
          this.selectedValue = this.dataOptions.find(obj => obj.value === this.selectedId)
          this.$emit('input', Number(val))
        }
      },
      deep: true
    },
    value: {
      handler (val) {
        console.log('Watch value: ', val, ' selectedId: ', this.selectedId)
        if (this.multiple) {
          this.selectedId = val
          this.$refs.select.mutableValue = val
        } else {
          this.selectedId = val
          this.$refs.select.mutableValue = this.dataOptions.find(obj => obj.value === val)
        }
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
    /*
    onInput ([value]) {
      console.log('onInput value: ', value)
      if (!this.multiple) {
        this.selectedId = value
      }
    },
    */
    onInput (val) {
      if (this.multiple) {
        this.onInputArray(val)
      } else {
        this.onInputValue(val)
      }
    },
    onInputArray (value) {
      console.log('Appel de onInputArray selectedId: ', this.selectedId, ' value: ', value)
      this.selectedId = value
    },
    onInputValue ({value}) {
      console.log('Appel de onInputValue selectedId: ', this.selectedId, ' value: ', value)
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
