<template>
  <div class="container">
    <div class="row mt-6">
        <div class="col-md-6 offset-md-3">
            <div class="mb-4 card">
                <div class="p-3 card-body">
                    <div class="d-flex flex-column align-items-center">
                        <h3 class="text-center">Hola.</h3>
                        <button class="btn bg-gradient-primary w-50 mt-3" @click="$router.push('/prueba')">Ir a Prueba</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DashboardDefault",
  data() {
    return {
      
    };
  },
    created(){
  },
  methods: {
    
  },

};
</script>
