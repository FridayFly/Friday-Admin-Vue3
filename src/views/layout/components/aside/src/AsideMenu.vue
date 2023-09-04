<template>
    <div class="h-full border-r left-side">
        <div class="menu-wrap flex h-full flex-col">
            <div class="logo-title flex items-center w-full">
                <el-image :src="logoUrl" fit="cover" class="h-8 hover:scale-110 mx-3" />
                <span class="text-lg font-bold hover:brightness-125" v-show="!isCollapse">Friday Admin</span>
            </div>
            <el-scrollbar>
                <el-menu default-active="1" class="fr-vertical-menu h-full min-h-fit" :collapse="isCollapse"
                    style="border-width: 0;">
                    <menu-item :menu="menu" v-for="menu in commonInfo.menus" :key="menu.id" />
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { interfaceSettingStore } from '@/stores/modules/InterfaceSetting'
import logoUrl from '@/assets/images/logo.png'
import MenuItem from './MenuItem.vue'
import { customerCommonInfoStore } from '@/stores/modules/CommonInfo'
const commonInfo = customerCommonInfoStore()
const interfaceSetting = interfaceSettingStore()
const { isCollapse } = storeToRefs(interfaceSetting)

</script>

<style scoped lang="scss">
.el-aside {
    width: auto;

    .el-menu {
        &.el-menu--collapse {
            width: 60px;
        }
    }
}

.fr-vertical-menu:not(.el-menu--collapse) {
    width: 200px;
}

.logo-title {
    height: var(--fr-top-header-height);
    overflow: hidden;
    position: relative;
    display: flex;

    & span {
        position: absolute;
        left: 60px;
    }

}
</style>