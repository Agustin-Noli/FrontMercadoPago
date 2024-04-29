<template>
    <notifications width="420" :duration="5000" :ignoreDuplicates="true">
      <template #body="props">
        <div class="vue-custom-notification " :class="props.item.type" @click="props.close">
          <div class="toast-header bg-transparent border-0 title">
            <i class="me-2 text-white" :class="setIcon(props.item.type)"></i>
            <span class="me-auto font-weight-bold text-white">{{ props.item.title }}</span>
            <i class="fas fa-times text-md ms-3 cursor-pointer text-white" aria-hidden="true"></i>
          </div>
          <hr class="horizontal light m-0">
          <div class="toast-body text-white" v-html="props.item.text">

          </div>
        </div>
      </template>
    </notifications>
</template>

<script>
export default {
    name :'custom-toast',
    data() {
        return {
            
        }
    },
    methods: {
        setIcon(type){ 
            switch (type) {
                case 'error':
                return 'fas fa-times fa-lg';
                case 'warn':
                return 'fas fa-exclamation-triangle fa-lg'; 
                case 'success':
                return 'fas fa-thumbs-up fa-lg';
                case 'info':     
                default:
                return 'ni ni-bell-55 ni-lg';
            }
        }
    },
}
</script>

<style lang="scss">

.vue-custom-notification {
    margin-top: 1rem;
    margin-right: 1.5rem;
    padding: 7px;
    font-family: "Open Sans";
    font-size: 15px;
    color: #ffffff;
    box-shadow: 0 .25rem .375rem -.0625rem hsla(0,0%,8%,.12),0 .125rem .25rem -.0625rem hsla(0,0%,8%,.07);
    border-radius: .5rem;
    width: 400px;
    cursor: pointer;
  
    background-image: linear-gradient(310deg,#2152ff,#40C2F3);
  
    &.info {
        background-image: linear-gradient(310deg,#2152ff,#40C2F3);
    }

    &.secondary {
        background-image: linear-gradient(310deg,#627594,#a8b8d8);
    }

    &.success {
        background-image: linear-gradient(310deg,#17ad37,#98ec2d);
    }
  
    &.warn {
        background-image: linear-gradient(310deg,#ffd22f,#f55f39);
    }
  
    &.error {
        background-image: linear-gradient(310deg,#ea0606,#b82e24)
    }
  }


</style>