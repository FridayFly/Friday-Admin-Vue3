<template>
    <header class="border-b flex items-center">
        <div class="header-nav-bar w-full h-full flex px-2">
            <div class="flex-1 flex">
                <div class="nav-item">
                    <div class="topbar-icon-nav" @click="toggleAsideMenu">
                        <el-tooltip class="box-item" effect="dark" :content="isCollapse ? '显示菜单' : '隐藏菜单'"
                            placement="bottom">
                            <sys-icon name="local-expand" :size="20" v-if="isCollapse"></sys-icon>
                            <sys-icon name="local-fold" :size="20" v-else></sys-icon>
                        </el-tooltip>
                    </div>
                </div>
                <div class="nav-item">
                    <div class="topbar-icon-nav">
                        <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
                            <el-icon>
                                <IEpRefreshRight />
                            </el-icon>
                        </el-tooltip>
                    </div>
                </div>
                <div class="flex items-center px-2">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for="nav in breadNavs" :key="nav.id">
                            {{ nav.title }}
                        </el-breadcrumb-item>

                    </el-breadcrumb>
                </div>
            </div>
            <div class="flex">
                <div class="nav-item">
                    <div class="topbar-icon-nav">
                        <a href="https://github.com/FridayFly/Friday-Admin-Vue3" style="line-height: 0;" target="_blank">
                            <el-tooltip class="box-item" effect="dark" content="访问GitHub" placement="bottom">
                                <sys-icon name="local-github" :size="24"></sys-icon>
                            </el-tooltip>
                        </a>
                    </div>
                </div>
                <div class="nav-item">
                    <div class="topbar-icon-nav" @click="toogleFullScreen">
                        <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
                            <sys-icon name="local-fullscreen-exit" :size="16" v-if="isFullscreen"></sys-icon>
                            <sys-icon name="local-fullscreen" :size="16" v-else></sys-icon>
                        </el-tooltip>
                    </div>
                </div>
                <div class="nav-item">
                    <el-dropdown class="mx-4">
                        <span class="el-dropdown-link">
                            <el-avatar shape="square" class="mr-2" :size="''" :src="squareUrl" /> {{ userSession.accountName
                            }}
                            <el-icon class="el-icon--right">
                                <IEpArrowDown />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人设置</el-dropdown-item>
                                <el-dropdown-item @click="logout()">退出登录 </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="nav-item">
                    <div class="topbar-icon-nav">
                        <el-tooltip class="box-item" effect="dark" content="界面配置" placement="bottom">
                            <sys-icon name="local-layout" :size="16"></sys-icon>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { interfaceSettingStore } from '@/stores/modules/InterfaceSetting'
import { useFullscreen } from '@vueuse/core'
import { userSessionStore } from '@/stores/modules/UserSessionInfo'
import { logout as logoutApi } from '@/api/permission/user'
import { useRouter } from 'vue-router'
import { customerCommonInfoStore } from '@/stores/modules/CommonInfo'

const router = useRouter()
const { isFullscreen, toggle: toogleFullScreen } = useFullscreen()

const state = reactive({
    squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})
const { squareUrl } = toRefs(state)
const interfaceSetting = interfaceSettingStore()
const commonInfo = customerCommonInfoStore()

const userSession = userSessionStore()
const { isCollapse } = storeToRefs(interfaceSetting)
const { breadNavs } = storeToRefs(commonInfo)

const toggleAsideMenu = () => {
    interfaceSetting.toggleMenuCollapse()
}

const logout = () => {
    logoutApi().then(
        (response) => {
            if (response.code == "0") {
                router.push('/login')
                return
            }
            ElMessage({
                showClose: true,
                message: response.msg,
                type: 'error',
            })
        }
    )

}
</script>

<style lang="postcss" scoped>
.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.el-dropdown-link:focus-visible {
    outline: none;
}

.header-nav-bar {
    height: var(--fr-top-header-height);
}

.header-nav-bar .nav-item {
    @apply h-full flex justify-center items-center;
}

.header-nav-bar .nav-item:hover {
    background-color: var(--el-color-info-light-9);
}

.topbar-icon-nav {
    @apply cursor-pointer px-2 flex items-center;
}
</style>