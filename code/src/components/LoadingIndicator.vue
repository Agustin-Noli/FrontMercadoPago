<!-- LoadingIndicator.vue -->
<template>
  <div id="app-loading" :style="{ display: visible ? 'flex' : 'none' }">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
    <div id="app-loading-msg">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingIndicator',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Cargando...'
    }
  }
};
</script>

<style scoped>
#app-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Para alinear el mensaje de carga debajo del spinner */
  z-index: 1000;
}
.spinner-border {
  margin-bottom: 10px; /* Espacio entre el spinner y el mensaje */
}
</style>
