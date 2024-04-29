<template>
  <router-link class="nav-link" :to="to" v-bind="$attrs">
    <div class="me-2 bg-gradient-primary text-white icon-font-1 text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text ms-1">{{ navText }}</span>
  </router-link>
</template>
<script>
export default {
  name: "SidenavCollapse",
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      
    };
  },
};
</script>

<style>

.icon-font-1 i{
  font-size: 0.95rem !important;
  color: #111111 !important;
}

</style>