<script setup lang="ts">
import { AsideMenu } from './components/aside';
import { TopHeader } from './components/header'
</script>
<template>
    <div class="flex h-screen w-full overflow-hidden">
        <el-container>
            <AsideMenu />
            <el-container>
                <TopHeader />
                <el-main>Main</el-main>
                <el-footer style="height: var(--fr-top-footer-height);" class="text-center">Copyright © 2023 Friday
                    Admin</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped lang="scss"></style>
