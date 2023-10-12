<template>
    <el-table :data="tableData.dataRows" style="width: 100%"
        :highlight-current-row="selectionType === SelectType.SingleSelect">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(column, index) in columns" :key="index" :width="column.width"
            :sortable="column.orderable ? 'customer' : false" v-bind="column">
            <template #default="scope" v-if="$slots[column.prop]">
                <slot :name="column.prop" v-bind="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination flex justify-end mt-4">
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
            :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>
<script setup lang="ts">
import http from '@/utils/http'

type Column = {
    prop: string
    [proName: string]: any
}

type Ajax = {
    url: string
}
enum SelectType {
    SingleSelect, MultipleSelect, Default
}

interface Props {
    columns: Column[],
    ajax: Ajax,
    selectionType?: SelectType
}

const props = withDefaults(defineProps<Props>(), {
    ajax: () => ({
        url: ''
    }),
    selectionType: SelectType.Default
})

let tableData = reactive({
    dataRows: []
})
const queryTableData = async () => {
    http.post({
        url: props.ajax.url,
        data: {}
    }).then(function (response) {
        tableData.dataRows = response.data.dataList
    })
}
queryTableData()

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

