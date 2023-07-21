<template>
    <svg aria-hidden="true" :style="styles">
        <use :xlink:href="symbolId" fill="color" />
    </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'local',
        },
        size: {
            type: [Number, String],
            default: 16
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: '#333',
        },
    },
    setup (props) {
        const addUnit = (value: string | number, unit = 'px') => {
            return !Object.is(Number(value), NaN) ? `${value}${unit}` : value;
        };

        const symbolId = computed(() => `#${props.name}`)
        const styles = computed<CSSProperties>(() => {
            return {
                width: addUnit(props.size),
                height: addUnit(props.size),
                color: props.color
            }
        })
        return { symbolId, styles }
    }
})
</script>