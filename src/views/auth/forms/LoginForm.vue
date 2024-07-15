<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    class="w-full flex flex-col gap-4"
    label-position="top"
  >
    <div class="flex gap-2 items-center ">
      <h1 class="font-bold text-4xl ">Mabarua</h1>
    </div>

    <h2 class="font-bold text-xl text-gray-400">Sign In</h2>

    <el-form-item  prop="username"
         :rules="[
            {
              required: true,
              message: 'Please input your username',
              trigger: 'blur',
            }
         ]"
    >
      <el-input
        v-model="form.username"
        :prefix-icon="UserIcon"
        placeholder="username"
        size="large"
      />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="form.password"
        :prefix-icon="LockClosedIcon"
        placeholder="password"
        show-password
        size="large"
        type="password"
      />
    </el-form-item>
    <!--            <el-input-->
    <div class="flex w-full ">
      <el-button
        :loading="loginLoading"
        class="w-fit "
        size="large"
        style="border-radius: 4px"
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        <!--                @click="submitForm(loginFormRef)"-->

        Login
      </el-button>
    </div>
    <div class="text-sm hidden">
      <span class="text-gray-400"> Don't have an Account ? </span>
      <router-link :to="{name:'register'}" class="text-blue-400 hover:text-blue-500 hover:font-bold"> Register </router-link>
    </div>

  </el-form>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import {ElNotification, FormInstance, FormRules} from "element-plus";
import store from "@/store/index";
import router from "@/router/index"
const loading = ref(false);
const form = reactive({
});


const loginLoading = ref(false);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username:{
    required: true,
    trigger: "blur",
    message: "Please enter username",
  },
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  }
});
const submitForm = async (formEl: FormInstance | undefined) => {
  loginLoading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
        .dispatch("postData", {
          url: "login",
          data: form
        })
        .then((resp) => {
          localStorage.setItem("authData", JSON.stringify(resp.data));
          loginLoading.value = false;

          /**
           * Redirect based on user type
           *
           */
          const user = resp.data?.user;


          if (user.user_type == 'sales' || user.user_type == 'marketing' || user.user_type == 'project_manager' && user.branch !== null) {
            router.push({name: 'moves'});
          }else if (user.user_type == 'sales' || user.user_type == 'marketing' || user.user_type == 'project_manager' && user.branch == null) {

            ElNotification({
              title: 'Error',
              type: "error",
              position: "top-right",
              message: 'No Branch Associated.'
            })
          }

          if (user.user_type == 'super_admin' || user.user_type == 'firm_owner') {
            if (user.user_type == 'firm_owner' && user.firm == null) {4
              ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'No Firm Associated'
              })

              return;
            }

            router.push({name: 'welcome'});
          }

          if (user.user_type == 'branch_manager' && user.branch !== null) {
            router.push({name: 'branch-view', params: {
              id: user?.branch}});
          }
          else if (user.user_type == 'branch_manager' && user.branch == null){
            ElNotification({
              title: 'Error',
              type: "error",
              position: "top-right",
              message: 'No Branch Associated'
            })
          }

        })
          .catch((err)=>{
            loginLoading.value = false;
          })
      ;
    } else {
      loginLoading.value = false;
    }
    loading.value = false;
  });
};

</script>

<style scoped></style>