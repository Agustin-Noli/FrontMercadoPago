<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-100 d-flex align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-5 col-md-8">
              <div class="card">
                <div class="card-header text-center pb-0">
                  <img :src="logoTlc" class="w-50 mx-auto mb-3" alt="Logo">
                  <h3 class="font-weight-bold text-primary">{{ nombreAplicacion }}</h3>
                  <hr>
                  <p class="mb-0">Ingrese su Usuario y Contraseña</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <label for="usuario" class="form-label">Usuario de red</label>
                      <div class="input-group">
                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                        <input v-model="usuario" type="text" class="form-control" placeholder="Usuario" required>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Contraseña</label>
                      <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                        <input v-model="password"  type="password" class="form-control" placeholder="Contraseña" required>
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                        <span v-if="loading"><i class="fas fa-spinner fa-spin"></i> </span>
                        <span v-else>Ingresar</span>
                      </button>
                    </div>
                  </form>
                  <!-- Opcional: Enlace para solicitar acceso -->
                  <!-- <div class="text-center mt-2">
                    <a href="#" @click="signup" class="btn btn-link text-secondary">SOLICITAR ACCESO</a>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <footer class="py-5 login-footer text-center">
    <div class="container">
      <p class="mb-0 text-secondary">{{ "Mercado Pago Conciliator - Version " + version }}</p>
    </div>
  </footer> -->
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user.js'
//import VsudButton from "@/components/Vsud/VsudButton.vue";
import logoTlc from "@/assets/img/mp.png"

export default {
  name: "UserLogin",
  components: {
    //VsudButton
  },

  data() {
    return {
      usuario: null,
      password: null,
      logoTlc,
      //version : import.meta.env.VITE_UI_VERSION.replace('{JV}', localStorage.getItem('MFE_VERSION')) ,
      loading: false,
      nombreAplicacion: import.meta.env.VITE_NOMBRE_APLICACION
    }
  },
    computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    login() {

      if(!this.usuario){
        
        this.$notify({
          title: "Formulario incompleto",
          text: "Debe ingresar su usuario de Proehtics.",
          type: "warn"
        });
        return;
      }

      if(!this.password){
        this.$notify({
          title: "Formulario incompleto",
          text: "Debe ingresar una contraseña.",
          type: "primary"
        });
        return;
      }

      let request = {
        UserName : this.usuario,
        Password : this.password
      };
      this.loading = true;

      this.$axiosMS.post('/api/account/Login',request)
        .then(response => {
          console.log(response);
   
        this.userStore.login(response.data);
        })
        .catch(() => {
          // Maneja cualquier error que ocurra durante la solicitud
         this.$notify({
           title: 'Error.',
           text: 'Usuario / Contraseña incorrectos',
           type: 'error'
         });
        })
        .finally( () => {
          // Maneja cualquier error que ocurra durante la solicitud
           this.loading = false;
        })


      //axios.post
      // this.$axiosMS.post('/api/account/Login', request).then((response) => {
      //   console.log(response);
      //   this.userStore.login(response.data);
      // }).finally( () => {
      //   this.loading = false;
      // });
    }
    // signup(){
    //   this.$router.push({name:'Signup'})
    // }
  },
};
</script>

<style>

.login-footer{
  position: fixed;
  bottom: 1px;
  width: 100%;
}

</style>