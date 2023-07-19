<script setup lang="ts">
import { AsideMenu } from './components/aside'
import { TopHeader } from './components/header'
import { siteConfigStore } from '@/stores/modules/SiteConfig'
const siteConfig = siteConfigStore();
</script>
<template>
    <div class="flex h-screen w-full">
        <AsideMenu />
        <el-container>
            <TopHeader />
            <el-main>Main</el-main>
            <el-footer style="height: var(--fr-top-footer-height);" class="text-center">{{ siteConfig.getCopyright
            }}</el-footer>
        </el-container>
    </div>
</template>
<style scoped lang="scss"></style>
