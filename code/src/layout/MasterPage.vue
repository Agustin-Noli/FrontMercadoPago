<template>
  <sidenav v-if="!userStore.framed" class="fixed-start" />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
    <navbar v-if="!userStore.framed" class="position-sticky blur mt-4 left-auto top-1 z-index-sticky px-0 mx-4 mt-4 bg-none" />
    <hr v-if="!userStore.framed" class="mt-3 horizontal dark" />
    <router-view />
  </main>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import Sidenav from "@/layout/Sidenav/index.vue";
import Navbar from "@/layout/Navbars/Navbar.vue";

export default {
  name: "MasterPage",
  components: {
    Sidenav,
    Navbar
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    versionado(){
      const lsName = 'MFE_VERSION';
      
      let JenkinsName = import.meta.env.VITE_JENKINS_NAME;

      // if(JenkinsName){
      //   this.$axiosMS.get('bss/crm/seguridad/v1/jenkins/' + JenkinsName + '/version').then((response) => {
      //       if(response.data && response.data.version){
      //         let LS = localStorage.getItem(lsName);

      //         if(!LS)
      //         {
      //           localStorage.setItem(lsName, response.data.version);
      //         } 
      //         else if(LS && response.data.version != LS) {
      //           localStorage.setItem(lsName, response.data.version);
      //           location.reload(true);
      //         }
      //       }
      //   });
      // }

    }
  },
  mounted(){
    this.versionado();
  }
};
</script>
