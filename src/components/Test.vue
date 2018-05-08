<template>
  <div class="test">
    <h1>{{title}}</h1>
    <span v-html="title"></span>
    <!--
    <p>{{creator.text}}</p>
  -->
    <p>
      {{creator}}
    </p>
    <!--
    <my-select ref="simpleselect"
      v-model="arbre.statut"
      src="http://localhost/goeland/objet/ajax/arbre_get_select.php"
      item="Validation"
      trackby="Id"
      fieldname="Data"
      sort="asc"
      placeholder="Sélectionner un statut"
      @onoptionsloaded="onOptionsLoaded"
    ></my-select>
    -->
    <!--
    <my-select
      v-model="arbre.statut"
      :options="options_statut"
      trackby="value"
      fieldname="label"
      sort="asc"
      placeholder="Sélectionner un statut"
      :multiple="multiple"
    ></my-select>
  -->
<!--
    <ul>
      <li v-for="arbre in arbres">
        {{arbre.IdObjet}} {{arbre.NomObjet}}
      </li>
    </ul>
  -->
  <!--
  <vue-good-table
    title="Arbres"
    :columns="[
      {
        label: 'Identifiant',
        field: 'IdObjet',
        type: 'number',
        html: true,
        filterable: true,
        filterDropdown: true,
        filterOptions: ['64', '65', '66'],
        filter: filterIdent,
        thClass: 'left-align'
      },
      {
        label: 'Nom',
        field: 'NomObjet',
        type: 'text',
        html: true,
        filterable: true
      }
    ]"
    :rows="arbres"
    :paginate="true"
    :lineNumbers="false"
    :defaultSortBy="{field: 'IdObjet', type: 'asc'}"
    :globalSearch="false"
    styleClass="table table-bordered">
    <template slot="table-column" scope="props">
      <span v-if="props.column.label == 'Identifiant'">
        <i class="red">{{props.column.label}}</i>
      </span>
      <span v-else><h3>{{props.column.label}}</h3></span>
      <span><h3>{{props.column.label}}</h3></span>
    </template>
    <template slot="table-row" scope="props">
      <td class="has-text-left">{{ props.row.IdObjet }}</td>
      <td class="has-text-left nom_column">{{ props.row.NomObjet }}</td>
    </template>
  </vue-good-table>
-->
<!--
  <code>query: {{query}}</code>
  <datatable
    tblClass="table-bordered"
    tblStyle="color: #666"
    :columns="columns"
    :data="rows"
    :total="total"
    :query="query">
  </datatable>
-->
    <my-select
      v-model="statutArray"
      :options="options_statut"
      trackby="value"
      fieldname="label"
      sort="asc"
      placeholder="Sélectionner un statut"
      :multiple="multiple"
      @onoptionsloaded="onOptionsLoaded"
    ></my-select>
  <!--
    <my-select
      v-model="arbre.statut"
      :options="options_statut"
      trackby="value"
      fieldname="label"
      sort="asc"
      placeholder="Sélectionner un statut"
      :multiple="false"
      @onoptionsloaded="onOptionsLoaded"
    ></my-select>
  -->
    <code>{{arbre}}</code><br />
    <code>{{statutArray}}</code><br />
    <!--
    <vue-select
      :options="options_pays"
      :multiple="true"
      v-model="selectedValue"
      @input="onInput"
    ></vue-select>
    <span>{{selectedValue}}</span>
  -->
  </br/>
    <button @click="setValue">Set</button>&nbsp;<button @click="resetValue">Reset</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import orderBy from 'lodash/orderBy'
  import Operation from './Operation'
  import Arbre from './Arbre.vue'
  import Hello from './Hello'
  import MySelect from './MySelect'
  import MyTest from './MyTest'
  import VueSelect from 'vue-select'
  import { ARBRE } from '../config'

  export default {
    name: 'test',
    components: {
      Operation,
      Arbre,
      Hello,
      MySelect,
      MyTest,
      VueSelect
    },
    // props: ['creator'],
    props: {
      creator: {
        type: String,
        default: ''
      },
      myObject: {
        type: Object
      }
    },
    data () {
      return {
        statut: '',
        statutArray: [],
        selectedId: 2,
        arbre: {},
        title: '<h1>Hello World!</h1>',
        user: {
          firstName: 'John',
          lastName: 'Doe'
        },
        arbres: [],
        rows: [],
        columns: [
          {
            title: 'Identifiant',
            field: 'IdObjet',
            sortable: true,
            tdStyle: {textAlign: 'left'}
          },
          {
            title: 'Nom',
            field: 'NomObjet',
            sortable: true,
            tdStyle: {textAlign: 'left'}
          },
          {
            title: 'Operation',
            tdComp: 'Operation',
            visible: true
          }
        ],
        total: 0,
        query: {
          limit: 20,
          order: 'desc',
          sort: 'IdObjet',
          offset: 0
        },
        xprops: {
          eventbus: new Vue()
        },
        options_pays: [
          {value: -1, label: '-Tous-'},
          {value: 'CA', label: 'Canada'},
          {value: 'CH', label: 'Switzerland'},
          {value: 'FR', label: 'France'}
        ],
        options_statut: [
          {value: 4, label: 'A replanter', SortOrder: 80, IsActive: 0},
          {value: 3, label: 'A repositionner', SortOrder: 90, IsActive: 0},
          {value: 9, label: 'A surveiller', SortOrder: 70, IsActive: 1},
          {value: 6, label: 'En attente d\'abattage', SortOrder: 40, IsActive: 1},
          {value: 7, label: 'En attente de remplacement', SortOrder: 50, IsActive: 1},
          {value: 5, label: 'En attente de soins', SortOrder: 30, IsActive: 1},
          {value: 8, label: 'En attente de tomographie', SortOrder: 60, IsActive: 1},
          {value: 10, label: 'En demande d\'abattage', SortOrder: 39, IsActive: 1},
          {value: 1, label: 'Existant', SortOrder: 10, IsActive: 1},
          {value: 2, label: 'Supprimé', SortOrder: 20, IsActive: 1}
        ],
        multiple: true
      }
    },
    computed: {
      /*
      statut:  () => {
        return 'Toto'
      }
      */
      /*
      total:  function () {
        console.log('total:  ', this.arbres.length)
        return this.arbres !== 'undefined' ? this.arbres.length :  0
      }
      */
    },
    watch: {
      query: {
        handler: function (val) {
          console.log('offset:  %d, limit:  %d', val.offset, val.limit)
          this.rows = this.arbres
          if (this.query.sort) {
            this.rows = orderBy(this.rows, this.query.sort, this.query.order)
          }
          this.rows = this.rows.slice(this.query.offset, this.query.offset + this.query.limit)
        },
        deep: true
      },
      statutArray: {
        handler: function (val) {
          if (Array.isArray(val)) {
            let __array = []
            val.forEach(elem => {
              __array.push(elem.value)
            })
            this.arbre.statut = __array
          }
        },
        deep: true
      }
    },
    methods: {
      spanOnClick: function () {
        this.statut = 'Toto'
      },
      filterIdent: function (data, filterString) {
        console.log('filterString: ', filterString)
        return (data.indexOf(filterString) !== -1)
      },
      onInput (value) {
        /*
        let value = []
        val.forEach(elem => {
          value.push(elem.value)
        })
        console.log('value:  ', value)
        */
        console.log('onInput:  ', value)
        this.selectedId = value
        // this.statutArray = value
      },
      setValue () {
        if (this.multiple) {
          this.statutArray = [{value: 10, label: 'En demande d\'abattage', SortOrder: 39, IsActive: 1}]
        } else {
          this.arbre.statut = 10
        }
        this.selectedValue = [{value: 'CA', label: 'Canada'}, {value: 'FR', label: 'France'}]
      },
      resetValue () {
        if (this.multiple) {
          this.statutArray = [{value: -1, label: '- Tous -', order: 1}]
        } else {
          this.arbre.statut = 2
        }
        this.selectedValue = []
      },
      onOptionsLoaded () {
        console.log('### onOptionsLoaded ###')
        if (this.multiple) {
          this.statutArray = [{value: 5, label: 'En attente de soins', SortOrder: 30, IsActive: 1}]
        } else {
          this.arbre.statut = 5
        }
      }
    },
    created: function () {
      // this.arbre = {...ARBRE}
      /*
      // var payload = '<Requete><Name>*</Name><IdObjet>101357</IdObjet></Requete>'
      var payload = '<Requete><NomObjet>%</NomObjet><Validation><Id>2</Id></Validation></Requete>'
      this.$http.post('http://localhost/goeland/objet/ajax/arbre_liste2.php', payload, {
        // headers:  {'Content-type':  'application/x-www-form-urlencoded'}
        // headers:  {'X-Requested-With':  'XMLHttpRequest'}
      }).then(response => {
        if (response.data.Objet !== 'undefined') {
          // console.log(response.data.Objet.slice(1, 2)[0])
          // this.arbres.push(response.data.Objet[0])
          // this.arbres = response.data.Objet
          this.arbres = response.data.Objet
          this.arbres.forEach(arbre => {
            arbre.IdObjet = parseInt(arbre.IdObjet)
          })
          // this.rows = this.arbres
          this.total = response.data.Objet.length
          if (this.query.sort) {
            this.rows = orderBy(this.arbres, this.query.sort, this.query.order)
          }
          this.rows = this.rows.slice(this.query.offset, this.query.offset + this.query.limit)
        }
        // console.log(response)
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
      */
    },
    mounted () {
      // this.multiple = false
      this.arbre = {...ARBRE}
      /*
      this.arbre.statut = [{value: -1, label: '- Tous -', order: 1}]
      // this.statutArray = [{value: -1, label: '- Tous -', order: 1}]
      // this.statutArray = [{value: 10, label: 'En demande d\'abattage', order: 2}]

      if (this.multiple) {
        this.arbre.statut = [{value: -1, label: '-Tous-'}]
      } else {
        this.arbre.statut = 4
      }
      */
    }
  }
</script>

<style scoped>
  .test{
    max-width:  50%;
    margin:  0 auto;
  }
  .has-text-left
  {
    text-align:  left;
  }
  .nom_column
  {
    width:  80%;
  }
  .red {
    color:  "red"
  }
</style>
