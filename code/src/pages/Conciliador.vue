<template>
  <div>

    <br>
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-md-6 offset-md-6">
                <div class="bar-box-wo-botton v-centered-items">
                    <div class="input-group">
                        <input v-model="searchValue" type="text" class="form-control" placeholder="Buscar">
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col pl-0 pr-0 mr-0 ml-0">
                <EasyDataTable
                :headers="datosMp.headers" 
                :items="datosMp.datos"
                 :search-field="searchField"
                               :search-value="searchValue" vacio-message="Sin resultados"
                               filas-por-page-message="Registros por página" rows-of-page-separator-message="de">
                    <template #item-acciones="item">
                        <span @click="UpdateRegistro(item)">
                            <i estilo="color: verde; cursor: pointer;" class="far fa-2x fa-check-square" title="Seleccionar"></i>
                        </span>
                    </template>
                </EasyDataTable>
            </div>
        </div>
    </div>
</div>


<div id="modalMP" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="modalMPLabel">
  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Conciliar Pago / Transferencia</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        ¿Estás seguro que desea conciliar este pago?
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div>


<button type="button" class="btn btn-primary" @click="UpdateRegistro()">Click me</button>
  </div>




</template>

<script>
//import { ref } from 'vue';

import EasyDataTable from "vue3-easy-data-table";
import FrameMixins from "../common/mixin";
export default {
  name: 'ConciliadorMp',
 
  components: {

    EasyDataTable,// Registra el componente EasyDataTable localmente
  },
   mixins:[FrameMixins],
  data() {
    return {
        datosMp:{datos:[],headers:struct},
      modalMP:false
    };
  },
  methods:{
    UpdateRegistro(item){
        console.log(item)
     //this.CerrarPopUp('modalReasignacionPersonas');
      this.AbrirPopUp('modalMP');

    }
  }
};

const struct = [
  {
    value: "CLIENTEID",
    text: "Cliente",
    sortable: true,
  },
  {
    value: "NOMBRE",
    text: "Razon Social",
    sortable: true,
  },
  {
    value: "DOCUMENTO",
    text: "Documento",
    sortable: true,
  },
  {
    value: "DOMICILIO",
    text: "Domicilio",
    sortable: true,
  },
  {
    value: "LOCALIDAD",
    text: "Localidad",
    sortable: true,
  },
  {
    value: "PARTIDO",
    text: "Partido",
    sortable: true,
  },
  {
    value: "ESTADO",
    text: "Estado",
    sortable: true,
  },
  {
    value: "acciones",
    text: "",
    sortable: false,
  },
];

</script>