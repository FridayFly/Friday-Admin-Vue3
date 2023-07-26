<template>
  <div class="flex flex-col h-screen login-container">
    <el-container>
      <el-main>
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-20 w-auto" src="@/assets/images/logo.png" alt="Friday Admin Logo">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Friday Admin 后台管理登录
            </h2>
          </div>
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-xs">
            <el-form :model="frmLoginData" ref="loginFormRef" size="large" :rules="validatorRules">
              <el-form-item label="" prop="loginAccount">
                <el-input v-model="frmLoginData.loginAccount" size="large" prefix-icon="User" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input v-model="frmLoginData.password" size="large" prefix-icon="Unlock" type="password"
                  placeholder="请输入密码" show-password />
              </el-form-item>
              <el-button type="primary" @click="submitLogin(loginFormRef)" class="flex px-3 py-1.5 w-full leading-6"
                size="large" :loading="isLoading">登 录</el-button>
            </el-form>
          </div>
        </div>
      </el-main>
      <el-footer class="text-center">
        <el-text class="mx-1" type="info">{{ siteConfig.getCopyright }}</el-text>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { siteConfigStore } from '@/stores/modules/SiteConfig'
import { login } from '@/api/permission/user'
import { useRouter } from 'vue-router'
import { userSessionStore } from '@/stores/modules/UserSessionInfo'

const router = useRouter()

const siteConfig = siteConfigStore()
const userSession = userSessionStore()
userSession.cleanSession()
interface FrmLoginData {
  loginAccount: string
  password: string
}
const loginFormRef = ref<FormInstance>()

const frmLoginData = reactive<FrmLoginData>({
  loginAccount: '',
  password: ''
})
const validatorRules = reactive<FormRules<FrmLoginData>>({
  loginAccount: [
    { required: true, message: '登录帐户不能为空', trigger: 'blur' },
    { min: 3, message: '长度必须大于3位字符', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
    { min: 6, max: 16, message: '密码长度必须是6-16位', trigger: 'blur' },
  ]
})
const isLoading = ref(false)

const submitLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true
      login(frmLoginData).then(
        (response) => {
          if (response.code == "0") {
            let userData = response.data
            userSession.accessToken = userData.accessToken
            userSession.accountName = userData.accountDisplayName
            router.push('/home')
            return
          }

          ElMessage({
            showClose: true,
            message: response.msg,
            type: 'error',
          })
          isLoading.value = false
        }
      ).catch(function () {
        isLoading.value = false
      })
    }
  })
}
</script>

<style scoped>
.login-container {
  background: #f0f2f5 url(@/assets/images/background.svg) no-repeat 50%;
}
</style>