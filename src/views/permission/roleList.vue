<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
                <el-form-item label="用户信息">
                    <el-input class="w-[280px]" v-model="queryParams.keyword" placeholder="用户编号/昵称/手机号码" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="startSearch">查询</el-button>
                    <el-button @click="resetFrm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="!border-none mt-2" shadow="never">
            <fr-datatable v-bind="tblConfig">
                <template #operate="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
                </template>
            </fr-datatable>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
const tblConfig = {
    columns: [
        { prop: "id", label: "id" },
        { prop: "roleName", label: "角色名称" },
        { prop: "roleCode", label: "角色编码", width: 180 },
        { prop: "internalRole", label: "系统角色" },
        { prop: "disabled", label: "状态" },
        { prop: "description", label: "描述", width: 320 },
        { prop: "sortOrder", label: "排序" },
        { prop: "lastUpdate", label: "最后更新", width: 320 },
        { prop: "operate", label: "操作", fixed: "right" }
    ],
    ajax: {
        url: "manage/role/page"
    }
}

const queryParams = reactive({
    keyword: '',
    startTime: '',
    endTime: ''
})
function startSearch () {

}
function resetFrm () {

}
const handleEdit = (index: number, row: any) => {
    console.log(row)
}
</script>
