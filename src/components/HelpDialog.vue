<script setup lang="ts">
import Dialog from "./Dialog.vue"
import pencilImage from "@/assets/noted.png"

defineProps<{
    show: boolean
}>()


function closeDialog() {
    emit("close")
}

const emit = defineEmits(["close"])


</script>

<template>
    <Dialog title="About" :show="show" @close="closeDialog">
        <div class="relative">
            <p class="mb-3">I've been writing blogs for a while and wanted to create something that would make it easier for me to write. Sometimes, I just want to jot down random thoughts without needing to save them. Yes, I know I could use an app, but I'm usually on the browser and have used other random websites for this. However, I couldn't trust those sites not to track me or do anything shady, so I decided to make my own. I built this website in just a few days, so there might be some things missing or it might not be the most efficient. You can help improve it by opening a PR 😉.</p>
            <div class="text-right">
                <a href="https://sairashgautam.com.np/blog" target="_blank" class="border-b-2 pb-1 ">Read my blogs</a> <span class="mx-2 pt-1">•</span>
                <a href="https://github.com/sairash/notepeer" target="_blank" class="border-b-2 pb-1">Github Link</a>
            </div>
            <div class="mt-10 text-right">
                <button
                @click="closeDialog"
                class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer">Close</button>
            </div>
            <img :src="pencilImage" alt="pencil" class="h-30 absolute -bottom-7 -left-7">

        </div>
    </Dialog>
</template>