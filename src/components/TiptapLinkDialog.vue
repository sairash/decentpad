<template>
    <Dialog :title="dialogTitle" :show="show" @close="closeDialog">
      <form @submit.prevent="update">
        <div class="flex flex-col space-y-5 text-white">
          <InputContainer>
            <Input type="text" id="input-text" class="mb-4" placeholder="Title" v-model="inputTitleRef" />
            <Input type="url" id="input-link-url" placeholder="Url *" v-model="inputLinkRef" required />
          </InputContainer>
  
          <div class="flex flex-row justify-end space-x-3">
            <button
              type="button"
              class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
              @click="closeDialog"
            >
              Close
            </button>
            <button
              type="submit"
              class="rounded-md bg-[#a8b1ff] hover:bg-[#b9c1ff] px-4 py-3 text-sm font-medium text-black bg-opacity-40 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue"
  import Dialog from "./Dialog.vue"
  import Input from "./Input.vue"
  import InputContainer from "./InputContainer.vue"
  
  const props = defineProps<{ show: boolean; dialogTitle: string }>()
  const emit = defineEmits(["close", "update"])
  const inputTitleRef = ref<string>()
    const inputLinkRef = ref<string>()
  
  function closeDialog() {
    emit("close")
  }
  
  function update() {
    emit("update", {Name: inputTitleRef.value == ""? inputLinkRef.value: inputTitleRef.value, Url: inputLinkRef.value})
    emit("close")
  }
  
  onMounted(() => {
    inputTitleRef.value = ""
    inputLinkRef.value = ""
  })
  </script>