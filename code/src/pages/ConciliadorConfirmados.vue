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
                <!-- <template #item-acciones="item">
                  <span @click="UpdateRegistro(item)">
                    <i style="color: verde; cursor: pointer;" class="far fa-2x fa-check-square" title="Conciliar"></i>
                  </span>
                </template> -->
              </EasyDataTable>
            </div>
          </div>
        </div>

        
<!-- <div id="modalMP" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="modalMPLabel">
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
        <h6 style="padding-left: 8px;">Transferencia: {{transeferencia}}</h6>
        <h6 style="padding-left: 8px;">Cantidad pesos $: {{cantidad}}</h6>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div> -->



      </div>
    </div>
  </div>
</template>

<script>
//import { ref } from 'vue';

import EasyDataTable from "vue3-easy-data-table";
import FrameMixins from "../common/mixin";
export default {
  name: 'ConciliadorConfirmados',
 
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
      transeferencia:"",
      cantidad:"",
    }
  },
  
  created(){
   //this.datosMp.datos = this.data;
this.SearchInfo()

   
  },
    
  methods:{

    ActualizarGrilla(){
      this.SearchInfo()
    },
    SearchInfo(){
       this.$axiosCRM.get('/internal/concilliation/searchsearch?status=CONCILLED')
        .then(response => {

          console.log(response);
   
        this.datosMp.datos = response.data
        })
        .catch(() => {
          // Maneja cualquier error que ocurra durante la solicitud
         this.$notify({
           title: 'Error.',
           text: 'No se pudo cargar los pagos conciliados',
           type: 'error'
         });
        })
        .finally( () => {
          // Maneja cualquier error que ocurra durante la solicitud
           this.loading = false;
        })
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
  // {
  //   value: "acciones",
  //   text: "",
  //   sortable: false,
  // },
];

</script>