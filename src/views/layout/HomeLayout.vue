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
            <el-main>
                <el-scrollbar>
                    <div class="p-2">
                        <RouterView />
                    </div>
                </el-scrollbar>
            </el-main>
            <el-footer style="height: var(--fr-top-footer-height);" class="flex justify-center items-center">
                <span class="text-sm text text-neutral-400">{{
                    siteConfig.getCopyright }}</span>
            </el-footer>
        </el-container>
    </div>
</template>
<style scoped lang="scss">
.el-main {
    --el-main-padding: 0px;
    background-color: var(--el-bg-color-page);
}
</style>
