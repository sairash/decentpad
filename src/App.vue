<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useGunStore } from './stores/gun';
import { onMounted } from 'vue';


const gunStore = useGunStore()

onMounted(async ()=>{
  await gunStore.init()
})
</script>

<template>

  <RouterView />
</template>
