<template>
    <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
        <slot />
    </a>
    <router-link v-else :to="to">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'AppLink',
    props: {
        to: {
            type: String, required: true
        },
    },
    setup (props) {
        const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'))
        return { isExternalLink }
    }
})
</script>