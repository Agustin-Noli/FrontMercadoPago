<template>
  <div class="container">
    <div class="row mt-6">
        <div class="col-md-6 offset-md-3">
            <div class="mb-4 card">
                <div class="p-3 card-body">
                    <div class="d-flex flex-column">
                        <img :src="notFoundImg" alt="Pagina no Encontrada" />
                        <h3 class="text-center">No hemos podido encontrar la pagina que buscas.</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import notFoundImg from '@/assets/img/404_2.svg'

export default {
    name:'not-found',
    data() {
        return {
            notFoundImg
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>