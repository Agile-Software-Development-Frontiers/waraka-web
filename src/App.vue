<script setup>
import { useStore } from "vuex"
import TheDashboardView from "@/components/TheDashboardView.vue";

const store = useStore()

</script>

<template>
  <div style="font-size: 1.3rem"
      :class="{'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode} "  class="h-screen w-full ">

    <router-view/>

  </div>

</template>

<style scoped>

</style>
