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
                <template #item-acciones="item">
                  <span @click="UpdateRegistro(item)">
                    <i
                      style="color: green; cursor: pointer"
                      class="far fa-2x fa-check-square"
                    ></i>
                  </span>
                </template>
                <template #item-money_release_date="item">
                  {{ DateFormat(item.money_release_date, "DD/MM/YYYY  hh:mm") }}
                </template>

                <template #item-transaction_amount="item">
                  {{ formatCurrency(item.transaction_amount) }}
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>

        <div
          id="modalMP"
          class="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalMPLabel"
        >
          <div
            class="modal-dialog modal-xl modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title">Pago / Transferencia</h5>
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <p class="fs-5">
                  ¿Estás seguro de que deseas conciliar este pago?
                </p>
                <div class="mt-3">
                  <p class="fw-bold mb-0">Transferencia:</p>
                  <p>{{ transeferencia }}</p>
                </div>
                <div class="mt-3">
                  <p class="fw-bold mb-0">Cantidad en pesos:</p>
                  <p>$ {{ formatCurrency(cantidad) }}</p>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="Confirm()"
                >
                  Confirmar
                </button>
              </div>
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
  name: "ConciliadorMp",

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
    UpdateRegistro(item) {
      this.transeferencia = item.payment_id;
      this.cantidad = item.transaction_amount;
      //this.CerrarPopUp('modalReasignacionPersonas');
      this.AbrirPopUp("modalMP");
    },
    Confirm() {
      this.$axiosCRM
        .put(`/internal/concilliation/${this.transeferencia}/save`)
        .then(() => {})
        .catch(() => {
          // Maneja cualquier error que ocurra durante la solicitud
          this.$notify({
            title: "Error.",
            text: "No se pudo cargar los pagos a conciliar",
            type: "error",
          });
          // type: 'success', // other types: 'warn', 'error', 'info'
        })
        .finally(() => {
          // Maneja cualquier error que ocurra durante la solicitud
          this.loading = false;

          this.$notify({
            title: "Conciliado .",
            text: "Exisoto",
            type: "success",
          });

          this.CerrarPopUp("modalMP");
          this.SearchInfo();
        });
    },
    ActualizarGrilla() {
      this.isLoading = true;
      this.loadingMessage = "Cargando datos...";
      this.SearchInfo();
    },
    SearchInfo() {
      this.$axiosCRM
        .get("/internal/concilliation/search?status=PENDING")
        .then((response) => {
          this.datosMp.datos = response.data;
        })
        .catch(() => {
          // Maneja cualquier error que ocurra durante la solicitud
          this.$notify({
            title: "Error.",
            text: "No se pudo cargar los pagos a conciliar",
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