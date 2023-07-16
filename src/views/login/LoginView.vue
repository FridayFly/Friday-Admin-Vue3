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
            <el-form :model="frmLogin" ref="loginFormRef" size="large" :rules="validatorRules">
              <el-form-item label="" prop="loginAccount">
                <el-input v-model="frmLogin.loginAccount" size="large" prefix-icon="IEpUser" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input v-model="frmLogin.password" size="large" prefix-icon="IEpUnlock" type="password"
                  placeholder="请输入密码" show-password />
              </el-form-item>
              <el-button type="primary" @click="submitLogin(loginFormRef)" class="flex px-3 py-1.5 w-full leading-6"
                size="large">登 录</el-button>
            </el-form>
          </div>
        </div>
      </el-main>
      <el-footer class="text-center">
        <el-text class="mx-1" type="info">Copyright © 2023 Friday Admin</el-text>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

interface FrmLogin {
  loginAccount: string
  password: string
}
const loginFormRef = ref<FormInstance>()

const frmLogin = reactive<FrmLogin>({
  loginAccount: '',
  password: ''
})

const validatorRules = reactive<FormRules<FrmLogin>>({
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

const submitLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
      ElMessage({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'error',
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