<template>
    <div class="h-full border-r left-side">
        <div class="menu-wrap flex h-full flex-col">
            <div class="logo-title flex items-center w-full">
                <el-image :src="logoUrl" fit="cover" class="h-8 hover:-translate-y-1 hover:scale-110 mx-3" />
                <span class="text-lg font-bold hover:brightness-125" v-show="!isCollapse">Friday Admin</span>
            </div>
            <el-scrollbar>
                <el-menu default-active="2" class="fr-vertical-menu h-full min-h-fit" :collapse="isCollapse"
                    style="border-width: 0;">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <IEpMemo />
                            </el-icon> <span>组织机构</span>
                        </template>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>系统账户</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>组织管理</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>岗位管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <IEpLock />
                            </el-icon> <span>权限控制</span>
                        </template>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>接口管理</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>菜单管理</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>角色管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>系统管理</span>
                        </template>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>字典管理</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>在线用户</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>系统配置</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>缓存管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>系统管理</span>
                        </template>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>字典管理</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>在线用户</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>系统配置</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>缓存管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="5">
                        <template #title>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>最下面管理</span>
                        </template>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>字典管理</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>在线用户</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>系统配置</span>
                        </el-menu-item>
                        <el-menu-item>
                            <el-icon>
                                <IEpSetting />
                            </el-icon> <span>缓存管理</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { interfaceSettingStore } from '@/stores/modules/InterfaceSetting'
import logoUrl from '@/assets/images/logo.png'


export default defineComponent({
    setup () {
        const interfaceSetting = interfaceSettingStore()
        const { isCollapse } = storeToRefs(interfaceSetting)

        return { logoUrl, isCollapse }
    }
})
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