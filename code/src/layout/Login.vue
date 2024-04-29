<template>
  
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-5 col-lg-5 col-md-6 d-flex flex-column">
              <div class="card ">
                <div class="pb-0 card-header text-start">
                  <img :src="logoTlc" class="w-85 d-flex mx-auto mb-3" alt="">
                  <h3 class="font-weight-bolder text-primary text-center text-gradient">{{nombreAplicacion}}</h3>
                  <hr>
                  <p class="mb-0 text-center">Ingrese su Usuario y Contraseña</p>
                </div>
                <div class="card-body">
                  <div class="text-start">
                    <label>Usuario de red</label>
                    <div class="input-group">
                      <span class="input-group-text" style="background: none">
                        <i class="fa fa-user"></i>
                      </span>
                      <input
                        id="usuario"
                        v-model="usuario"
                        type="text"
                        class="form-control"
                        placeholder="Usuario"
                        @keypress.enter="login()"
                      />
                    </div>                    
                    <label>Contraseña</label>
                    <div class="input-group">
                      <span class="input-group-text" style="background: none">
                        <i class="fas fa-key"></i>
                      </span>
                      <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-control"
                        placeholder="Contraseña"
                        @keypress.enter="login()"
                      />
                    </div>
                    <div class="text-center">
                      <vsud-button class="my-4 mb-2" variant="gradient" color="primary" full-width :loading="loading" @click="login">
                        <span v-if="loading"><i class="fas fa-lg fa-spinner fa-spin"></i> </span>
                        <span v-else>Ingresar</span>
                      </vsud-button>
                    </div>
                    <!-- <div class="text-center mt-2">
                      <a @click="signup" class="btn-signup cursor-pointer text-secondary text-hover-primary">SOLICITAR ACCESO</a>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <footer class="py-5 login-footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mt-1 text-center">
          <p class="mb-0 text-secondary">
            {{"Proehtics - Version " + version}}
          </p>
        </div>
      </div>
    </div>
  </footer> -->
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import VsudButton from "@/components/Vsud/VsudButton.vue";
import logoTlc from "@/assets/img/mp.png"

export default {
  name: "UserLogin",
  components: {
    VsudButton
  },

  data() {
    return {
      usuario: null,
      password: null,
      logoTlc,
      version : import.meta.env.VITE_UI_VERSION.replace('{JV}', localStorage.getItem('MFE_VERSION')) ,
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