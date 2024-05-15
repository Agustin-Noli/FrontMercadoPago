<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <!-- Botón de actualización -->
            <button type="button" class="btn btn-primary mb-3" @click="ActualizarGrilla()">Actualizar</button>
            
            <!-- Barra de búsqueda -->
            <div class="input-group mb-3">
              <input v-model="searchValue" type="text" class="form-control" placeholder="Buscar">
            </div>
            
            <!-- EasyDataTable centrada y con más altura -->
            <div class="table-container" >
              <EasyDataTable
                :headers="datosMp.headers" 
                :items="datosMp.datos"
                :search-field="searchField"
                :search-value="searchValue"
                :rows-per-page="20"
                vacio-message="Sin resultados"
                filas-por-page-message="Registros por página"
                rows-of-page-separator-message="de"
              >
                <template #item-acciones="item">
                  <span @click="UpdateRegistro(item)">
                    <i style="color: verde; cursor: pointer;" class="far fa-2x fa-check-square" title="Seleccionar"></i>
                  </span>
                </template>
              </EasyDataTable>
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



      </div>
    </div>
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
      searchField: ['payment_id','payer_identification_number','payer_email'], // El campo por el cual quieres filtrar
        searchValue: '', // El valor de búsqueda
        datosMp:{datos:[],headers:struct},
      modalMP:false,
      data:[
	{
		"payment_id": 77036068037,
		"money_release_date": "2024-04-29T18:56:42Z",
		"payment_status": "approved",
		"payer_email": "agustin.noli7@gmail.com",
		"payer_identification_type": "CUIT",
		"payer_identification_number": "20366260170",
		"currency_id": "ARS",
		"transaction_amount": "1"
	},
	{
		"payment_id": 77041553685,
		"money_release_date": "2024-04-29T20:26:05Z",
		"payment_status": "approved",
		"payer_email": "recayte_lp@hotmail.com.ar",
		"payer_identification_type": "CUIL",
		"payer_identification_number": "27357562630",
		"currency_id": "ARS",
		"transaction_amount": "1"
	},
	{
		"payment_id": 77041589489,
		"money_release_date": "2024-04-29T20:26:24Z",
		"payment_status": "approved",
		"payer_email": "marascodamian@gmail.com",
		"payer_identification_type": "CUIT",
		"payer_identification_number": "20293921181",
		"currency_id": "ARS",
		"transaction_amount": "1"
	}
]
    };
  },
  methods:{
    UpdateRegistro(item){
        console.log(item)
     //this.CerrarPopUp('modalReasignacionPersonas');
      this.AbrirPopUp('modalMP');

    },
    ActualizarGrilla(){


      this.datosMp.datos = this.data;
    }
  }
};

const struct = [
  {
    value: "payment_id",
    text: "Id Transferencia",
    sortable: true,
  },
  {
    value: "money_release_date",
    text: "Fecha",
    sortable: true,
  },
  {
    value: "currency_id",
    text: "Moneda",
    sortable: true,
  },
  {
    value: "transaction_amount",
    text: "Cantidad $",
    sortable: true,
  },
  {
    value: "payment_status",
    text: "Estado",
    sortable: true,
  },
  {
    value: "payer_email",
    text: "Email",
    sortable: true,
  },

  {
    value: "payer_identification_number",
    text: "CUIL/CUIT",
    sortable: true,
  },
  {
    value: "acciones",
    text: "",
    sortable: false,
  },
];

</script>