<template>
  <div id="sidenav-collapse-main" class="w-auto collapse navbar-collapse" >
    <ul class="navbar-nav">
      <li v-for="men in menu" :key="men.name" :class="men.to == null ? 'mt-3 nav-item' : 'nav-item'">
        <h6 v-if="men.to == null" class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2">{{men.name}}</h6>
        <sidenav-collapse v-else :nav-text="men.name" :to="{ name: men.to }">
          <template #icon>
            <i :class="men.icon"></i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <!-- <div class="d-flex justify-content-center" >
    <small>Version {{version}}</small>
  </div> -->
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user.js'

import SidenavCollapse from "./SidenavCollapse.vue";
import { pantallas } from "@/router/pantallas.js"

export default {
  name: "SidenavList",
  components: {

    SidenavCollapse
  },

  data() {
    return {
      isActive: "active" ,
      version : import.meta.env.VITE_UI_VERSION.replace('{JV}', localStorage.getItem('CM_VERSION')) ,
      menu : pantallas
    };
  },
    computed: {    
    ...mapStores(useUserStore)
  },
    created(){
    
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  },

};

</script>
