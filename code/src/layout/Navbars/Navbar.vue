<template>
  <nav
    v-bind="$attrs"
    id="navbarBlur"
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl blur bg-none"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <nav aria-label="breadcrumb">
        <h6 class="mb-0 font-weight-bolder">{{ currentRouteName }}</h6>
      </nav>
      <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4 justify-content-end" >
        <div class="pe-md-3 d-flex align-items-center ms-md-auto" >
          <ul class="navbar-nav justify-content-end">
            <li class="nav-item d-flex align-items-center">
              <div class="px-3 nav-link font-weight-bold" >
                <i class="fa fa-user" :class="'me-sm-1'"></i>
                <span class="d-sm-inline d-none">{{ userStore.usuario }}</span>
              </div>
                <div class="px-0 nav-link font-weight-bold" >
             <i class="fa-solid fa-user-pen" :class="'me-sm-1'"></i>
                <span class="d-sm-inline d-none">{{ userStore.rol }}</span>
              </div>
            </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link logout" @click="logOut">
              <i class="cursor-pointer fas fa-power-off fixed-plugin-button-nav lo-text"></i>
              <span class="cursor-pointer font-weight-bold d-sm-inline d-none lo-text"> Cerrar sesión</span>
            </a>
          </li>
            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              id="iconNavbarSidenav"
              class="p-0 nav-link text-body"
              @click="toggleSidebar"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user.js'

export default {
  name: "NavbarComponent",
  data() {
    return {
      isPinned: true
    };
  },
  computed: {    
    ...mapStores(useUserStore),
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
  },
  updated() {
    const navbar = document.getElementById("navbarBlur");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        navbar.classList.add("position-sticky");
        navbar.classList.remove("bg-none");
      } else {
        navbar.classList.remove("position-sticky");
        navbar.classList.add("bg-none");
      }
    });
  }, methods: {
    toggleSidebar() {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        this.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        this.isPinned = false;
      }
    },
    logOut() {
      this.userStore.logOut();
    },
  },
};
</script>

<style>

.logout span, .logout i{
  color:#344767;
}

.logout:hover .lo-text{
  color:#ea0606 !important;
}

</style>
