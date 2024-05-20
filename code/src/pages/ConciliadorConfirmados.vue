<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <!-- Botón de actualización -->
            <button
              type="button"
              class="btn btn-primary mb-3"
              @click="ActualizarGrilla()"
            >
              <i class="fas fa-sync-alt me-2"></i> Actualizar
            </button>

            <!-- Barra de búsqueda -->
            <div class="input-group mb-3">
              <input
                v-model="searchValue"
                type="text"
                class="form-control"
                placeholder="Buscar"
              />
            </div>

            <!-- EasyDataTable centrada y con más altura -->
            <div class="table-container">
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
                <template #item-money_release_date="item">
                  {{ DateFormat(item.money_release_date, "DD/MM/YYYY  hh:mm") }}
                </template>
                <template #item-concillied_date="item">
                  {{ DateFormat(item.concillied_date, "DD/MM/YYYY  hh:mm") }}
                </template>
                <template #item-transaction_amount="item">
                  {{ formatCurrency(item.transaction_amount) }}
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>
        <LoadingIndicator :visible="isLoading" :message="loadingMessage" />
      </div>
    </div>
  </div>
</template>

<script>
//import { ref } from 'vue';

import EasyDataTable from "vue3-easy-data-table";
import FrameMixins from "../common/mixin";
import LoadingIndicator from "../components/LoadingIndicator.vue";
export default {
  name: "ConciliadorConfirmados",

  components: {
    EasyDataTable,
    LoadingIndicator, // Registra el componente EasyDataTable localmente
  },
  mixins: [FrameMixins],
  data() {
    return {
      searchField: ["payment_id", "payer_identification_number", "payer_email"], // El campo por el cual quieres filtrar
      searchValue: "", // El valor de búsqueda
      datosMp: { datos: [], headers: struct },
      modalMP: false,
      transeferencia: "",
      cantidad: "",
      isLoading: false,
      loadingMessage: "",
    };
  },

  created() {
    this.isLoading = true;
    this.loadingMessage = "Cargando datos...";

    this.SearchInfo();
  },

  methods: {
    ActualizarGrilla() {
      this.isLoading = true;
      this.loadingMessage = "Cargando datos...";
      this.SearchInfo();
    },
    SearchInfo() {
      this.$axiosCRM
        .get("/internal/concilliation/search?status=CONCILLIED")
        .then((response) => {
          this.datosMp.datos = response.data;
        })
        .catch(() => {
          // Maneja cualquier error que ocurra durante la solicitud
          this.$notify({
            title: "Error.",
            text: "No se pudo cargar los pagos conciliados",
            type: "error",
          });
        })
        .finally(() => {
          // Maneja cualquier error que ocurra durante la solicitud
          this.isLoading = false;
        });
    },
  },
};

const struct = [
  {
    value: "payment_id",
    text: "Id transferencia",
    sortable: false,
  },
  {
    value: "concillied_date",
    text: "Fecha de confirmacion",
    sortable: true,
  },
  {
    value: "concillied_status",
    text: "Estado",
    sortable: true,
  },
  {
    value: "concillied_user",
    text: "Usuario ",
    sortable: true,
  },
  {
    value: "currency_id",
    text: "Moneda",
    sortable: true,
  },
  {
    value: "transaction_amount",
    text: "Transaccion",
    sortable: true,
  },

  {
    value: "money_release_date",
    text: "Fecha de transaccion",
    sortable: true,
  },
  {
    value: "payer_email",
    text: "Email",
    sortable: true,
  },

  {
    value: "payer_identification_type",
    text: "CUIL/CUIT",
    sortable: true,
  },
  {
    value: "payment_status",
    text: "Estado MP",
    sortable: false,
  },
];
</script>