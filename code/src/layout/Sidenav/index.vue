<template>
   <aside
    id="sidenav-main"
    class="mt-3 mb-0 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl "
    :class="'ms-3'"
    style="z-index:30"
    :data-color="sidenavActiveBgColors"
  > 
  
    <div class="sidenav-header">
      <i
        id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
      ></i>
      <a class="m-0 navbar-brand" style="padding: 0rem 2rem !important" href="/">
        <img :src="logoTlc" class="navbar-brand-img" style="object-fit: contain; max-height: 200px; max-width: 100%;" alt="main_logo" />
        <!-- <span class="ms-2 font-weight-bold">  {{nombreAplicacion}}</span> -->
      </a>
    </div>
    <hr class="mt-2 horizontal dark" />
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logoTlc from "@/assets/img/logoAS.png";

export default {
  name: "IndexComponent",
  components: {
    SidenavList,
  },
  data() {
    return {
      logoTlc,
      sidenavActiveBgColors: 'primary',
      nombreAplicacion: import.meta.env.VITE_NOMBRE_APLICACION
    };
  },
};
</script>
