<!--
An example of creating a reusable grid component and using it with external data.
-->

<script setup lang="ts">
import DemoGrid from './Grid.vue'
import data from "../data/data.json";
import { ref } from 'vue';
import { CForm, CFormInput, CAlert, CButton, CRow, CCol, CContainer, CHeader, CHeaderText } from '@coreui/vue';

const props = defineProps({
  liveErrorVisible: Boolean,
  liveOkVisible: Boolean,
})

const searchQuery = ref('')
const liveErrorVisible = ref(false)
const liveOkVisible = ref(false)
const errorMessage = ref('')

const gridColumns = ['Id', 'Empresa', 'RFC', 'Status']
const gridData = data;

const vars = {
  "font-size": "54px",
  "font-weight": "bold",
  "color": "#545454",
  "margin-left": "-1px"
}

const onKeyPressEnter = (event) => {
  console.log('onKeyPressEnter : ' + event)

  if (event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('prevent default')
  }
  search();
}

const search = () => {

  const valueToFind = searchQuery.value.trim();


  const allResults = data.filter((item) => item.RFC.toUpperCase() == valueToFind.toUpperCase())
  const activeResults = allResults.filter((item) => item.Status)

  if (valueToFind === '') {
    liveOkVisible.value = false;
    liveErrorVisible.value = true;
    errorMessage.value = `Debes ingresar un RFC a validar`
    return;
  }

  if (allResults.length > 0) {
    if (activeResults.length > 0) {
      liveOkVisible.value = true;
      liveErrorVisible.value = false;
      errorMessage.value = '';

    }
    else {
      errorMessage.value = `El RFC ${searchQuery.value} No esta activo`
      liveOkVisible.value = false;
      liveErrorVisible.value = true;
    }
  }
  else {
    liveOkVisible.value = false;
    liveErrorVisible.value = true;
    errorMessage.value = `El RFC ${searchQuery.value} No existe en el sistema`
  }




}

</script>

<template>
  <CHeader container='lg'>
    <CContainer fluid>
      <CHeaderText :style="vars"> Validación de la clave en el RFC
      </CHeaderText>
    </CContainer>
  </CHeader>

  <div class="cuadrado">

  </div>
  <hr id="separator" class="separadorConsultaRFC">

  <CForm @submit.prevent>

    <CAlert class="d-flex align-items-center" color="danger" :visible="liveErrorVisible" dismissible
      @close="() => { liveErrorVisible = false }">
      <CIcon icon="cil-warning" class="flex-shrink-0 me-2" width="24" height="24" />
      <div>
        {{ errorMessage }}
      </div>
    </CAlert>

    <CAlert class="d-flex align-items-center" color="success" :visible="liveOkVisible" dismissible
      @close="() => { liveOkVisible = false }">
      <CIcon icon="cil-check-circle" class="flex-shrink-0 me-2" width="24" height="24" />
      <div>
        Se ha enontrado el Proveedor con RFC {{ searchQuery }} validado y registrado en el sistema
      </div>
    </CAlert>

    <CRow class="g-3">
      <CCol xs>
        <CFormInput @keyup.enter="(e) => onKeyPressEnter(e)" type="text" id="searchInput" v-model="searchQuery"
          placeholder="Ingresa el RFC a validar" aria-describedby="searchInputHelpInline" />
      </CCol>
      <CCol xs>
        <CButton color="secondary" size="sm" @click="search">Buscar RFC</CButton>
      </CCol>
    </CRow>
    <CContainer lg fluid>
      <DemoGrid :data="gridData" :columns="gridColumns" :filter-key="searchQuery">
      </DemoGrid>
    </CContainer>





  </CForm>
</template>

<style scoped>
.separadorConsultaRFC {
  width: 713px;
  margin-left: 34px;
  margin-top: -4px;
  text-align: left;
  border: 1px solid #dddddd;
  opacity: 0.25;
}

.cuadrado {
  width: 35px;
  height: 6px;
  background: #d0021b;
  margin-left: -1px;
}
</style>