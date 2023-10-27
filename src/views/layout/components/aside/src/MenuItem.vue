<template>
    <el-sub-menu :index="menu.id.toString()" v-if="menu.menuType == 'FOLDER' && menu.show">
        <template #title>
            <sys-icon :name="menu.ico" :size="16"></sys-icon> <span>{{ menu.menuName }}</span>
        </template>
        <menu-item :menu="menuItem" v-for="menuItem in menu.children" :key="menuItem.id" />
    </el-sub-menu>
    <app-link :to="menu.url" v-if="menu.menuType == 'PAGE' && menu.show">
        <el-menu-item :index="menu.id.toString()">
            <sys-icon :name="menu.ico"></sys-icon>
            <template #title>
                <span>{{ menu.menuName }}</span>
            </template>
        </el-menu-item>
    </app-link>
</template>

<script setup lang="ts">
export interface Menu {
    id: number
    menuName: string
    url: string
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