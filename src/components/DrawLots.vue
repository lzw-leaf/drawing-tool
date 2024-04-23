<template>
  <div class="draw-lots flex flex-col justify-center items-center">
    <div class="text-15">
      <div v-if="tempInfo.role">{{ tempInfo.own }}-{{ tempInfo.role }}</div>
      <div class="text-10" v-else>点击下方的按钮开始</div>
    </div>
    <el-button
      class="mt-15"
      type="danger"
      :disabled="drawed"
      @click="onDrawClick"
      >抽号</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { RoleInfo } from "../App.vue"

const emits = defineEmits(["success"])

const userList = ref(inject<RoleInfo[]>("userList")!)

// 实际抽中的值
const realIndex = ref(-1)
const drawed = ref(false)

// 过程变量
const currentIndex = ref(0)
const time = ref(0)
const tempInfo = ref<RoleInfo>({ id: 0, own: "", role: "", target: "" })
// 可抽取列表
const canDrawList = computed(() => {
  return userList.value.filter(role => !role.target)
})

const onDrawClick = () => {
  reSaveCurrentRoleInfo()
  startDrawingLots()
}

const getSpeedLevel = (timeNum: number) => {
  if (timeNum > 4000) return 300
  if (timeNum > 3000) return 200
  if (timeNum > 0) return 100
}

const startDrawingLots = () => {
  currentIndex.value =
    currentIndex.value < canDrawList.value.length - 1
      ? currentIndex.value + 1
      : 0
  time.value += 100
  tempInfo.value = canDrawList.value[currentIndex.value]
  if (time.value > 5000) {
    currentIndex.value = realIndex.value
    tempInfo.value = canDrawList.value[currentIndex.value]
    return setTimeout(
      () => emits("success", canDrawList.value[realIndex.value]),
      2000
    )
  }
  setTimeout(() => startDrawingLots(), getSpeedLevel(time.value))
}

const reSaveCurrentRoleInfo = async () => {
  const userName = localStorage.getItem("userName")
  try {
    drawed.value = true
    const id = await callApi({ api: "save_role", params: { userName } })
    const index = canDrawList.value.findIndex(role => role.id === id)
    realIndex.value = index
  } catch (error) {
    ElMessage.warning("抽取失败！当前用户已抽取角色！")
  }
}

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
