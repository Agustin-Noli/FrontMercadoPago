import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '@/stores/user.js';
import Login from "@/layout/Login.vue";
import MasterPage from "@/layout/MasterPage.vue";
import Dashboard from "@/pages/Inicio/Dashboard.vue";
import NotFound from "@/pages/NotFound.vue";
import AccesoDenegado from "@/pages/AccesoDenegado.vue";
import Prueba from "@/pages/Prueba.vue";
import Monitoreo from "@/pages/Monitoreo.vue";
import MatrizdeRiesgo from "@/pages/MatrizdeRiesgo.vue";
import Clientes from "@/pages/Clientes.vue";

import CalculodeRiesgo from "@/pages/Inicio/Procesos/CalculodeRiesgo.vue";
import RiesgoporCliente from "@/pages/Inicio/Reportes/RiesgoporCliente.vue";
import AlertasCerradas from "@/pages/Inicio/Reportes/AlertasCerradas.vue";
import AlertasPendientes from "@/pages/Inicio/Reportes/AlertasPendientes.vue";
import AlertasTareasRealizadas from "@/pages/Inicio/Reportes/AlertasTareasRealizadas.vue";
import AlertasEstadosPorCierreMes from "@/pages/Inicio/Reportes/AlertasEstadosPorCierreMes.vue";
import AlertasPorDiasDeCorte from "@/pages/Inicio/Reportes/AlertasPorDiasDeCorte.vue";
import AlertasEntreFechas from "@/pages/Inicio/Reportes/AlertasEntreFechas.vue";
import RiesgoClienteDetallado from "@/pages/Inicio/Reportes/RiesgoClienteDetallado.vue";
import RiesgoClientesEntreFechas from "@/pages/Inicio/Reportes/RiesgoClientesEntreFechas.vue";
import RiesgoClasificadoAUnaFecha from "@/pages/Inicio/Reportes/RiesgoClasificadoAUnaFecha.vue";
import GenerarAlertas from "@/pages/Inicio/Procesos/GenerarAlertas.vue";
import Interfaces from "@/pages/Inicio/Procesos/Interfaces.vue";
import ProcesoUnificado from "@/pages/Inicio/Procesos/ProcesoUnificado.vue";


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
        path: "/monitoreo",
        name: "Monitoreo",
        component: Monitoreo,
      },
      {
        path: "/matrizderiesgo",
        name: "MatrizdeRiesgo",
        component: MatrizdeRiesgo,
      },
      {
        path: "/clientes",
        name: "Clientes",
        component: Clientes,
      },
      {
        path: "/calculoderiesgo",
        name: "CalculodeRiesgo",
        component: CalculodeRiesgo,
      },
      {
        path: "/riesgoporcliente",
        name: "RiesgoporCliente",
        component: RiesgoporCliente,
      },
      {
        path: "/riesgoclientedetallado",
        name: "RiesgoClienteDetallado",
        component: RiesgoClienteDetallado,
      },
      {
        path: "/riesgoclientesentrefechas",
        name: "RiesgoClientesEntreFechas",
        component: RiesgoClientesEntreFechas,
      },
      {
        path: "/riesgoClasificadoaunafecha",
        name: "RiesgoClasificadoAUnaFecha",
        component: RiesgoClasificadoAUnaFecha,
      },
      {
        path: "/alertascerradas",
        name: "AlertasCerradas",
        component: AlertasCerradas,
      },
      {
        path: "/alertaspendientes",
        name: "AlertasPendientes",
        component: AlertasPendientes,
      },
      {
        path: "/alertastareasrealizadas",
        name: "AlertasTareasRealizadas",
        component: AlertasTareasRealizadas,
      },
      {
        path: "/alertasestadosporcierremes",
        name: "AlertasEstadosPorCierreMes",
        component: AlertasEstadosPorCierreMes,
      },
      {
        path: "/alertaspordiasdecorte",
        name: "AlertasPorDiasDeCorte",
        component: AlertasPorDiasDeCorte,
      },
      {
        path: "/alertasentrefechas",
        name: "AlertasEntreFechas",
        component: AlertasEntreFechas,
      },
      {
        path: "/generaralertas",
        name: "GenerarAlertas",
        component: GenerarAlertas,
      },
      {
        path: "/interfaces",
        name: "Interfaces",
        component: Interfaces,
      },
      {
        path: "/procesounificado",
        name: "ProcesoUnificado",
        component: ProcesoUnificado,
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
    if(userStore.isAuthenticated)
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
