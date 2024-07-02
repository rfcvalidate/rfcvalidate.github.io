<script setup lang="ts">
import { ref, computed } from 'vue'
import { CTable, CTableCaption, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/vue';
import type { PropType, Ref } from 'vue'

interface Company  {
  Id: string
  Empresa: string
  RFC: string
  Status: string
}

const ACTIVO = "Activo"
const INACTIVO = "Inactivo"
const ID: string = "Id"
const EMPRESA: string = "Empresa"
const RFC: string = "RFC"
const STATUS: string = "Status"

type column = "Id" | "Empresa"| "RFC" |  "Status" ;
const listColumnkeys = [ID, EMPRESA, RFC, STATUS ] ;

const props = defineProps({
  data: Array as PropType<Company[]>,
  columns: {
    type: Array as PropType<column[]>,
    required: true
  },
  filterKey: String
});


const controlColumns = {
    "Id" : 1,
    "Empresa": 1,
    "RFC": 1,
    "Status" : 1
  }


const sortKey: Ref<column> = ref('Id')
const sortOrders = ref(
  controlColumns
)


const filteredData = computed(() => {
  let { data , filterKey } = props

  if (data === undefined) return [];

  if (filterKey && filterKey !== undefined) {
    filterKey = filterKey.toLowerCase()
    data = data.filter((row: Company) => {
      return Object.keys(row).some((key) => {
        if (key === "Empresa" || key === "RFC" || key === "Id")
        return String(row[key]).toLowerCase().indexOf(filterKey || "") > -1
      })
    })
  }
  const key: column = sortKey.value
  if (key) {
    const order = sortOrders.value[key]
    data = data.slice().sort((a, b) => {
      const aKey:string = a[key]
      const bKey:string = b[key]
      return (aKey === bKey ? 0 : aKey > bKey ? 1 : -1) * order
    })
  }

  data.map((item: Company) => {
    item.Empresa = item.Empresa.toUpperCase();
    return { ...item };
  })

  return data
})

function sortBy(key: column) {
  sortKey.value = key
   sortOrders.value[key] *= -1
}

function capitalize(str: column) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}



</script>

<template>
  <CTable v-if="filteredData.length" caption="top" color="light" :tableHeadProps="{ color: 'dark' }" striped hover>
    <CTableHead color="dark">
      <CTableRow>
        <CTableHeaderCell v-for="  key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
          {{ capitalize(key) }}
          <!-- :class="sortOrders[key] > 0 ? 'asc' : 'dsc'" -->
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'" >
          </span>
        </CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableRow v-for="entry in filteredData">
      <CTableDataCell v-for="key in columns">
        <CIcon v-if="key === STATUS && entry[key] == ACTIVO" icon="cil-toggle-on" size="sm" style="color:green" />
        <CIcon v-else-if="key === STATUS && entry[key] == INACTIVO" icon="cil-toggle-off" size="sm" style="color:red" />

        <span v-else>{{ entry[key] }}</span>

      </CTableDataCell>

    </CTableRow>

    <CTableCaption>Lista de empresas dadas de Alta y con RFC validado</CTableCaption>
  </CTable>
  <p v-else>No matches found.</p>
</template>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #000000;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>