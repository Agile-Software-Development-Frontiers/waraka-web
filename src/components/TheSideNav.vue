<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from "vuex";
import AdminLinks from "@/components/routerLinks/AdminLinks.vue";
import StoreOwnerLinks from "@/components/routerLinks/StoreOwnerLinks.vue";
import TheMobileMenu from "@/components/TheMobileMenu.vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
};

const authData = JSON.parse(localStorage.getItem("authData"));

const navigateToSelectedPage = (index) => {
  let selectedParams;

  try {
    /**
     * Where data has been json parsed, then there a parameter is required
     */
    selectedParams = JSON.parse(index);
    router.push({ name: selectedParams.name, params: { id: selectedParams.id } });
  } catch {
    router.push({ name: index });
  }
};

const themeStyle = computed(() => {
  const lightMode = store.getters.getLightMode;
  return lightMode
      ? {
        '--background-color': 'transparent',
        '--text-color': '#fff',
        '--hover-background-color': '#666',
        '--active-background-color': '#666',
        '--active-text-color': '#ffd04b',
        '--menu-font-size': '4rem'
      }
      : {
        '--background-color': 'white',
        '--text-color': 'black',
        '--hover-background-color': '#f5f5f5',
        '--active-background-color': '#e0e0e0',
        '--active-text-color': '#ffd04b',
        '--menu-font-size': '4rem'
      };
});
</script>

<template>
  <div class="hidden md:flex flex-col justify-between gap-4 w-fit h-full border-r text-white" :style="themeStyle">
    <el-menu
        default-active="1"
        :class="{ 'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode }"
        class="el-menu-vertical-demo"
        :style="themeStyle"
        :active-text-color="store.getters.getLightMode ? 'blue' : '#ffd04b'"
        :background-color="store.getters.getLightMode ? 'white' : 'gray'"
        :text-color="themeStyle['--text-color']"
        :collapse="store.state.sideNavCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="navigateToSelectedPage"
    >
      <AdminLinks />
    </el-menu>

    <div class="h-[70px] md:flex items-center border-b hidden w-full justify-start px-6">
      <el-button class="w-[40px]" type="primary" @click="store.state.sideNavCollapse = !store.state.sideNavCollapse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
        </svg>
      </el-button>
    </div>
  </div>

  <!-- MOBILE NAV -->
  <div class="sm:flex md:hidden">
    <TheMobileMenu :class="{ 'light-mode': store.getters.getLightMode, 'dark-mode': !store.getters.getLightMode }" :style="themeStyle">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :style="themeStyle"
          :collapse="!store.state.ShowMobileMenu"
          @open="handleOpen"
          @close="handleClose"
          @select="navigateToSelectedPage"
      >
        <AdminLinks />
      </el-menu>

      <el-menu
          default-active="1"
          v-if="authData?.user?.user_type === 'store_owner'"
          class="el-menu-vertical-demo"
          :style="themeStyle"
          :collapse="!store.state.sideNavCollapse"
          @open="handleOpen"
          @close="handleClose"
      >
        <StoreOwnerLinks />
      </el-menu>
    </TheMobileMenu>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo {
  background-color: var(--background-color);
  color: var(--text-color);
}

.el-menu-vertical-demo .el-menu-item,
.el-menu-vertical-demo .el-submenu__title {
  font-size: var(--menu-font-size) !important;
}

.el-menu-vertical-demo .el-menu-item:hover,
.el-menu-vertical-demo .el-submenu__title:hover {
  background-color: var(--hover-background-color);
}

.el-menu-vertical-demo .el-menu-item.is-active,
.el-menu-vertical-demo .el-submenu__title.is-active {
  background-color: var(--active-background-color);
}
</style>
