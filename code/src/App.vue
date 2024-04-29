<template>
  <div>
      <router-view />
      <custom-toast />
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import CustomToast from '@/components/Toasts/ToastCustom.vue'

export default {
  name: "App",
  components: {
    CustomToast,
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    loginQueryToken(){
      let qstring = this.getQueryString();
      
      if(qstring.token)
      {
        this.userStore.setToken(qstring.token);

        let BaseURL = import.meta.env.VITE_APIGW_BASE;

        this.axios.get(BaseURL + 'bss/crm/seguridad/v1/usuario/claims', { headers: { 'Authorization': 'Bearer ' + qstring.token}}).then((response) => {
          let data = response.data;
          data.token = qstring.token; 

          this.userStore.login(data, (qstring.framed === 'true'), window.location.hash.split('?')[0].substring(1));
          this.validateSesion();
        });
      } else{
        this.validateSesion();
      }
    },
    getQueryString() {
      const queryString = window.location.href.split("?")[1];
      let obj = {};
      if (queryString) {
        queryString.split("&").map(item => {
          const k = item.substr(0, item.indexOf("="));
          const v = item.substr(item.indexOf("=") + 1);
          v ? (obj[k] = decodeURIComponent(v)) : null;
        });
      }
      return obj;
    },
    validateSesion(){
      if(this.userStore.isAuthenticated){
        let tokenExp = this.dayjs(this.userStore.tokenExp);
        
        if(tokenExp.isSameOrBefore(this.dayjs())){
          this.userStore.logOut();
        }
      }

    }
  },
  created(){    
    this.loginQueryToken();
  }
};
</script>
