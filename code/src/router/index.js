import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '@/stores/user.js';
import Login from "@/layout/Login.vue";
import MasterPage from "@/layout/MasterPage.vue";
import Dashboard from "@/pages/Inicio/Dashboard.vue";
import NotFound from "@/pages/NotFound.vue";
import AccesoDenegado from "@/pages/AccesoDenegado.vue";
import Prueba from "@/pages/Prueba.vue";
import Conciliador from "@/pages/Conciliador.vue";


const routes = [  
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/login",
    name: "/",
    component: MasterPage,
    children  : [
      {
        path: "/inicio",
        name: "Inicio",
        component: Dashboard,
      },
      {
        path: "/prueba",
        name: "Prueba",
        component: Prueba,
      },
      {
        path: "/conciliador",
        name: "Conciliador",
        component: Conciliador,
      }
       ],

  },
  {
      path: "/AccesoDenegado",
      name: "Acceso Denegado",
        component: AccesoDenegado
  },
  {
      path: "/NotFound",
      name: "Página no encontrada",
        component: NotFound
  },
  { 
      path: '/:pathMatch(.*)*', 
      component: NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from) => { 
  
  const userStore = useUserStore();
  
  if(to.name !== 'Login' && to.name !== 'Signup')
  { 
    if(!userStore.isAuthenticated)
    {
      return true;
    }
    else
    {
      return { path: '/login', query : { returnTo: to.path } }
    }
  }
  else {
    return true;
  }
})

export default router;
