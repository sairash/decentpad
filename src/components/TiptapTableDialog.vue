<template>
    <Dialog title="Add Tabel" :show="show" @close="closeDialog">
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col space-y-5">
          <div class="flex flex-row space-x-5">
            <InputContainer class="w-full flex-1">
              <Label for="input-table-columns">Columns</Label>
              <Input
                v-model="inputColumnsRef"
                id="input-table-columns"
                required
                type="number"
                min="1"
                class="w-full"
              />
            </InputContainer>
            <InputContainer class="w-full flex-1">
              <Label for="input-table-rows">Rows</Label>
              <Input
                v-model="inputRowsRef"
                id="input-table-rows"
                required
                type="number"
                min="1"
                class="w-full"
              />
            </InputContainer>
          </div>
          <SwitchGroup>
            <div class="flex flex-row items-center space-x-3">
              <Switch
                v-model="inputWithHeaderRef"
                :class="inputWithHeaderRef ? 'bg-[#5c73e7]' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span
                  :class="inputWithHeaderRef ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </Switch>
              <SwitchLabel class="select-none text-sm text-gray-600"
                >Tabel Header</SwitchLabel
              >
            </div>
          </SwitchGroup>
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
  import type Table from "@/models/table"
  import InputContainer from "./InputContainer.vue"
  import Input from "./Input.vue"
  import { Switch, SwitchLabel, SwitchGroup } from "@headlessui/vue"
  
  defineProps<{
    show: boolean
  }>()
  
  const emit = defineEmits<{
    (e: "close"): void
    (e: "insert", table: Table): void
  }>()
  
  const inputColumnsRef = ref<number>(3)
  const inputRowsRef = ref<number>(3)
  const inputWithHeaderRef = ref<boolean>(true)
  
  function closeDialog() {
    emit("close")
  }
  
  function onSubmit() {
    emit("insert", {
      rows: inputRowsRef.value,
      columns: inputColumnsRef.value,
      withHeader: inputWithHeaderRef.value,
    })
    closeDialog()
  }
  </script>