<template>
    <el-icon :size="props.size" :color="props.color" v-if="isElIcon">
        <component :is="icoName"></component>
    </el-icon>
    <el-icon :size="size" v-else>
        <svg-icon :name="icoName" :size="size" :color="color" />
    </el-icon>
</template>
<script setup lang="ts">
import { EL_ICON_PREFIX, LOCAL_ICON_PREFIX } from '../index'

export interface Props {
    size?: string | number
    name: string | null
    color?: string
}
const props = withDefaults(defineProps<Props>(), {
    size: '14px',
    color: 'inherit',
    name: ''
})

const preProcessName = (name: string | null): string => {
    if (name == null) { return '' }
    return name
}

const isElIcon = computed(() => {
    return preProcessName(props.name).indexOf(EL_ICON_PREFIX) === 0
})

const icoName = computed(() => {
    let name = preProcessName(props.name)
    if (isElIcon) {
        return name.replace(EL_ICON_PREFIX, '')
    }
    return name.replace(LOCAL_ICON_PREFIX, '')
})

</script>

<style scoped></style>
