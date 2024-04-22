<template>
  <div class="app h-full flex flex-col justify-center items-center">
    <Transition>
      <User v-if="currentStep === 0" @success="currentStep = 1" />
      <DrawLots v-else-if="currentStep === 1" @success="onDrawLotsSuccess" />
      <Result v-else-if="currentStep === 2" />
    </Transition>
  </div>
</template>

<style></style>

<script setup lang="ts">
import DrawLots from "./components/DrawLots.vue"
import Result from "./components/Result.vue"
import User from "./components/User.vue"

export interface RoleInfo {
  id: number
  own: string
  role: string
  target: string
}
const currentStep = ref(0)
const userList = ref<RoleInfo[]>([])

const onDrawLotsSuccess = () => {
  currentStep.value = 2
  reFindUserList()
}

const reFindUserList = async () => {
  try {
    const data = await callApi({ api: "get_role_list" })
    userList.value = data
    const userName = localStorage.getItem("userName")
    if (userName && userList.value.find(item => item.target === userName)) {
      currentStep.value = 2
    }
  } catch (error) {
    console.error("接口报错", error)
  }
}

provide("userList", userList)
provide("reFindUserList", reFindUserList)

onMounted(() => {
  reFindUserList()
})
</script>
