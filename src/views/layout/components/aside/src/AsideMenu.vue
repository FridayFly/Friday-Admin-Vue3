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
                    <menu-item :menu="menu" v-for="menu in menuList" :key="menu.id" />
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

const menuList = [
    {
        "id": 1,
        "menuName": "工作台",
        "url": 'home',
        "target": null,
        "pid": 0,
        "ico": 'local-screen',
        "menuType": "PAGE",
    },
    {
        "id": 99,
        "menuName": "关于我们",
        "url": '/about',
        "target": null,
        "pid": 0,
        "ico": 'local-screen',
        "menuType": "PAGE",
    },
    {
        "id": 6,
        "menuName": "权限控制",
        "url": null,
        "target": null,
        "pid": 0,
        "ico": 'el-lock',
        "menuType": "FOLDER",
        "children": [
            {
                "id": 13,
                "menuName": "象感构市",
                "url": "http://enzy.ki/kswr",
                "target": "_self",
                "pid": 6,
                "ico": "minim labore reprehenderit anim deserunt",
                "menuType": "PAGE",
                "children": null
            },
            {
                "id": 4,
                "menuName": "角色管理",
                "url": null,
                "target": "_self",
                "pid": 6,
                "ico": 'el-medal',
                "menuType": "PAGE",
                "children": null
            },
            {
                "id": 7,
                "menuName": "菜单管理",
                "url": null,
                "target": "_self",
                "pid": 6,
                "ico": null,
                "menuType": "PAGE",
                "children": null
            },
            {
                "id": 8,
                "menuName": "接口列表",
                "url": null,
                "target": "_self",
                "pid": 6,
                "ico": null,
                "menuType": "PAGE",
                "children": null
            }
        ]
    },
    {
        "id": 1,
        "menuName": "组织架构",
        "url": null,
        "target": null,
        "pid": 0,
        "ico": null,
        "menuType": "FOLDER",
        "children": [
            {
                "id": 2,
                "menuName": "组织管理",
                "url": null,
                "target": "_self",
                "pid": 1,
                "ico": null,
                "menuType": "PAGE",
                "children": null
            },
            {
                "id": 3,
                "menuName": "用户管理",
                "url": null,
                "target": "_self",
                "pid": 1,
                "ico": null,
                "menuType": "PAGE",
                "children": null
            },
            {
                "id": 5,
                "menuName": "岗位管理",
                "url": null,
                "target": "_self",
                "pid": 1,
                "ico": null,
                "menuType": "PAGE",
                "children": null
            }
        ]
    }
]
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