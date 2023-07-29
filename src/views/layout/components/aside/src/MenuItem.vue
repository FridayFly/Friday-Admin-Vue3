<template>
    <!--目录菜单-->
    <el-sub-menu :index="menu.id.toString()" v-if="menu.menuType == 'FOLDER' && menu.show">
        <template #title>
            <sys-icon :name="menu.ico" :size="16"></sys-icon> <span>{{ menu.menuName }}</span>
        </template>
        <menu-item :menu="menuItem" v-for="menuItem in menu.children" :key="menuItem.id" />
    </el-sub-menu>
    <!--可点击的菜单-->
    <el-menu-item :index="menu.id.toString()" v-if="menu.menuType == 'PAGE' && menu.show">
        <sys-icon :name="menu.ico"></sys-icon> <span>{{ menu.menuName }}</span>
    </el-menu-item>
</template>

<script setup lang="ts">
export interface Menu {
    id: number
    menuName: string
    url?: string | null
    target?: string | null
    ico?: string | null
    menuType: string
    show?: boolean
    children?: Menu[] | null
}

defineProps<{
    menu: Menu
}>()
</script>

<style scoped></style>