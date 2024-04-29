<template>
  <div class="container">
    <div class="row mt-6">
        <div class="col-md-6 offset-md-3">
            <div class="mb-4 card">
                <div class="p-3 card-body">
                    <div class="d-flex align-items-center flex-column">
                        <img class="w-75" :src="ForbiddenImg" alt="Acceso denegado" />
                        <h3 class="text-center">No tiene permisos para acceder a esta pantalla.</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import ForbiddenImg from '@/assets/img/403_1.svg'

    export default {
        name:'acceso-denegado',
        data() {
            return {
                ForbiddenImg
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>