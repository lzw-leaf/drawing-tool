<template>
  <Transition>
    <div v-if="resultVisible">
      <div class="flex items-center justify-between">
        <el-button class="my-5" type="primary" @click="resultVisible = false"
          >返回</el-button
        >
        <div>
          <span class="text-hex-999"> 使用情况：</span>
          <el-select class="!w-100px" v-model="currentFilter">
            <el-option label="全部" value="0" />
            <el-option label="已使用" value="1" />
            <el-option label="未使用" value="2" />
          </el-select>
        </div>
      </div>
      <el-table-v2
        :columns="columnList"
        :data="filterList"
        :width="400"
        :height="400"
        fixed
      />
    </div>
    <div class="flex flex-col justify-center items-center" v-else>
      <div class="text-10 text-center">
        <div>
          恭喜你抽中了
          <span class="text-red-500 font-bold">{{ targetInfo?.role }}!</span>
          ,诶呦不错哦！
        </div>
        <div class="mt-10px text-6">
          号主是<span class="text-blue-400">{{ targetInfo?.own }}</span
          >,别忘了改配置！
        </div>
      </div>
      <el-button class="mt-10" type="primary" @click="resultVisible = true"
        >查看结果</el-button
      >
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { RoleInfo } from "../App.vue"

const userName = ref("未知")
const columnList = [
  { dataKey: "own", title: `号主`, width: 120, align: "center" },
  { dataKey: "role", title: `职业`, width: 120, align: "center" },
  { dataKey: "target", title: `使用人`, width: 120, align: "center" }
]
const currentFilter = ref("0")

const userList = ref<RoleInfo[]>(inject("userList")!)
const resultVisible = ref(false)
const targetInfo = computed(() => {
  return userList.value.find(item => item.target === userName.value)
})

const filterList = computed(() => {
  const filterMap: Record<string, (key: any) => any> = {
    0: item => item,
    1: item => item.target !== "" && item.target !== "未知",
    2: item => item.target === "" || item.target === "未知"
  }
  return userList.value.filter(item => {
    return filterMap[currentFilter.value](item)
  })
})

onMounted(() => {
  userName.value = localStorage.getItem("userName") || "未知"
})
</script>

<style lang="scss" scoped></style>
