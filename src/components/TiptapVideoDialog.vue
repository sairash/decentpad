<template>
  <Dialog :title="dialogTitle" :show="show" @close="closeDialog">
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col space-y-5">
        <InputContainer>
          <Input
            type="url"
            id="input-add-youtube-url"
            v-model="inputUrlRef"
            :placeholder="lableString"
            required
          />
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
import { ref } from "vue"
import Dialog from "./Dialog.vue"
import InputContainer from "./InputContainer.vue"
import Input from "./Input.vue"

defineProps<{
  show: boolean
  dialogTitle: string
  lableString: string
}>()

const emit = defineEmits(["close", "insert"])

const inputUrlRef = ref<string>("")

function closeDialog() {
  emit("close")
}

function onSubmit() {
  emit("insert", inputUrlRef.value)
  inputUrlRef.value = ""
  closeDialog()
}
</script>