<script setup lang="ts">
import Dialog from "./Dialog.vue"
import Want from "@/assets/want.png"

defineProps<{
    show: boolean
}>()


function closeDialog() {
    emit("close")
}

function actionPerformed(op: number, format: string) {
    emit("action", op, format)
}

const emit = defineEmits(["close", "action"])
</script>

<template>
    <Dialog title="Download or Copy" :show="show" @close="closeDialog">
        <div class="relative">
            <p class="">Make a copy directly to your Clipbord or Download the file.</p>
            <div class="mt-10 mb-16">
                <div class="grid gap-4">
                    <button v-on:click="actionPerformed(1, 'txt')" class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer w-full">Copy Plain Text</button>
                    <button v-on:click="actionPerformed(1, 'md')" class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer w-full">Copy Markdown</button>
                    <div class="inline-flex items-center justify-center w-full">
                        <hr class="w-full h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <span class="absolute px-3 font-medium text-white -translate-x-1/2 left-1/2 ">or</span>
                    </div>
                    <button v-on:click="actionPerformed(2, 'txt')" class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer w-full">Download Plain Text</button>
                    <button v-on:click="actionPerformed(2, 'md')" class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer w-full">Download Markdown</button>
                </div>
            </div>
            <div class="mt-10 text-right">
                <button
                @click="closeDialog"
                class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer">Close</button>
            </div>
            <img :src="Want" alt="want" class="h-30 absolute -bottom-5 -left-5">

        </div>
    </Dialog>
</template>