<template>
  <div class="inline-flex flex-col items-center">
    <div class="mb-15 text-32px">你是谁？</div>
    <el-input
      v-model="userName"
      placeholder="请输入昵称"
      @change="onNameChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { RoleInfo } from "../App.vue"

const userList = ref<RoleInfo[]>(inject("userList")!)
const emits = defineEmits(["success"])

const userName = ref("")

const onNameChange = (value: string) => {
  console.log("userList", userList)

  if (userList.value.every(role => role.own !== value)) {
    return ElMessage.warning("当前不是参与人员哦！")
  }
  localStorage.setItem("userName", userName.value)
  emits("success", value)
}
</script>

<style lang="scss" scoped></style>
