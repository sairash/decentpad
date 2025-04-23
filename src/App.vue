<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useShareStore } from './stores/share';
import { onMounted } from 'vue';


const share = useShareStore()

onMounted(async ()=>{
  await share.init()
})
</script>

<template>

  <RouterView />
</template>
