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
    // TODO  获取参与列表
    // const data = await callApi({ api: "get_role_list" })
    // userList.value = data
    userList.value = [
      { id: 1, own: "光崽子", role: "无方", target: "" },
      { id: 2, own: "太奶", role: "药奶", target: "" },
      { id: 3, own: "夏夏", role: "丐帮", target: "" },
      { id: 4, own: "乐正秋柔", role: "刀宗", target: "" },
      { id: 5, own: "恋爱", role: "花间", target: "" },
      { id: 6, own: "气纯儿", role: "气纯", target: "" },
      { id: 7, own: "喵喵", role: "奶毒", target: "" },
      { id: 8, own: "多练练", role: "策T", target: "" },
      { id: 9, own: "咩崽", role: "奶秀", target: "" },
      { id: 10, own: "晚清", role: "毒经", target: "" },
      { id: 11, own: "春风为酒", role: "冰心", target: "" },
      { id: 12, own: "莫如絮", role: "毒经", target: "" },
      { id: 13, own: "林三三", role: "花间", target: "" },
      { id: 14, own: "太奶", role: "蓬莱", target: "" },
      { id: 15, own: "凉意", role: "藏剑", target: "" },
      { id: 16, own: "腊肠", role: "苍云T", target: "腊肠" },
      { id: 17, own: "晚安", role: "花间", target: "" },
      { id: 18, own: "绾绾", role: "万灵", target: "" },
      { id: 19, own: "光崽子", role: "剑纯", target: "" },
      { id: 20, own: "似星河", role: "傲血", target: "" },
      { id: 21, own: "剑藏", role: "藏剑", target: "" }
    ]
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
