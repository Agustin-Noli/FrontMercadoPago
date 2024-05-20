/* eslint-disable no-undef */
/*jshint esversion: 6 */
import { useUserStore } from '../stores/user';

let mixin = {
  data() {
    return { 
      //LE PONGO ESTE NAME PARA QUE NO SE SUPERPONGA FACIL CON OTRA DECLARACION
      // get CurrentUsuarioId() { 
      //   const userStore = useUserStore();
      //   return userStore.usuarioID;    
      // }
    }
  },  
  methods: {      
    CloseAllTooltips() {
      const elements = document.getElementsByClassName('tooltip');
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];    
        element.parentNode.removeChild(element);    
        //element.remove()
      }    
    },
    // PARA QUE FUNCIONE, EN EL AXIOS DE LA SOLICITUD DEL ARCHIVO, DEBE TENER: responseType: 'blob'
    SaveData(data, fileName, ext) {
      var a = document.createElement("a");
       document.body.appendChild(a);
       a.style = "display: none";    
       var url = window.URL.createObjectURL(data);
       a.href = url;
       const rdm = a.href.split('/').pop();
       a.download = fileName + '_' + rdm + '.' + ext;
       a.click();
       window.URL.revokeObjectURL(url);
    },
    formatCurrency(amount) {
      // Convertir la cadena a un número
      amount = parseFloat(amount.replace(",", "."));
  
      // Verificar si amount es un número válido
      if (isNaN(amount) || typeof amount !== 'number') {
          return "NaN"; // o alguna otra indicación de error
      }
  
      // Formatear el número utilizando el método toLocaleString()
      var formattedAmount = amount.toLocaleString('es-AR', { minimumFractionDigits: 2 });
  
      return formattedAmount;
  }
  ,
    DateFormat(date, format = "DD/MM/YYYY") {
      if (!date) return "";

      let fecha = this.dayjs(date).format(format);
      return fecha.includes("0001") ? "" : fecha;
    },
    CerrarPopUp(id) {
      const element = document.getElementById(id);      
      const modalIns = bootstrap.Modal.getOrCreateInstance(element);
      modalIns.hide();
    },
    MonthToDate(monthPmt) {
      const year = monthPmt.substring(0, 4);
      const month = monthPmt.substring(5, 7);
      const dateTime = new Date(year, month, 0);
      return dateTime;
    },
    AbrirPopUp(id) {
      const element = document.getElementById(id);
      const modalIns = bootstrap.Modal.getOrCreateInstance(element);
      modalIns.show();
    },
    ResponseIsOk(resp) {
      return resp && resp.status >= 200 && resp.status < 300;
    },
    RouteBase(path = this.$route.href, newTab = false) {      
      const base = import.meta.env.VITE_UIURL_BASE;
      const url = base + "/" + (path.replace(/¬/g,'&'));
      this.LoadingTLC();      
      if (newTab) {
        this.LoadingTLC(false);
        var win = window.open(url, "_blank");
        win.focus();
      } else {
        window.top.location.href = url;
      }
    },
  }
};
  
  export default mixin;