<template>
    <button
      type="button"
      :class="[
        'inline-flex py-1 px-2 shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-zinc-700 cursor-pointer',
        isActive
          ? 'bg-zinc-700 text-gray-200 hover:bg-opacity-80'
          : 'text-gray-400 hover:bg-zinc-800',
      ]"
      :aria-label="label"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    label: string
    isActive?: boolean
  }>()
  </script>