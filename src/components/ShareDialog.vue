<script setup lang="ts">
import Dialog from "./Dialog.vue"
import shareImage from "@/assets/share.png"
import { IconCopy, IconTrash } from "@tabler/icons-vue"
import {  ref, watch } from "vue";
import { sha256 } from 'js-sha256';
import type Entry from "@/models/Entry";

import {useToast} from 'vue-toast-notification';

const $toast = useToast();


const prop = defineProps<{
    show: boolean
    textData: string
    jsondata: string
    loading: boolean
    entries: Entry[]
}>()


const shared = ref(false);
const share_url = ref('https://note.sairashgautam.com.np/?share=');
let md_identifier = "";
let random_value = "";


function closeDialog() {
    emit("close")
}

function openSharedFile(id:string) {
    emit("open_shared_file", id)
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 36);
}


function share_url_update() {
    share_url.value += random_value + "-" + md_identifier
}

function storeEntry(random_value: string, md_identifier: string, text_data: string, json_data: string){
    emit("store_entry", random_value, md_identifier, text_data, json_data)
}

function deleteEntry(id: string){
    emit("delete_entry", id)
}

function share_note() {
    if (prop.textData == ' ' || prop.textData == '') {
        // Error empty document cannot be shared 
        return
    }

    share_url_update();
    storeEntry(random_value, md_identifier, prop.textData, prop.jsondata);
    shared.value = true

    $toast.default('Successfully generated Share Url', {position: 'top'});
}

function copy_share_url() {
    navigator.clipboard.writeText(share_url.value);
    $toast.default('Copied To Clipboard', {position: 'top'});
}


const emit = defineEmits(["close", "open_shared_file", "store_entry", "delete_entry"])



watch(()=> prop.loading, (n_data) => {
    if (!n_data) {
        md_identifier = sha256(encodeURIComponent(prop.jsondata))
        random_value = generateId()

        console.log(prop.entries)

        for (let index = 0; index < prop.entries.length; index++) {
            const element = prop.entries[index];
            if (element.hash == md_identifier) {
                random_value = element.rand
                shared.value = true
                share_url_update();
                break
            }
        }
    }
})


function deleteItem(id: string){
    deleteEntry(id)
    $toast.default('Deleted Shared Note Successfully', {position: 'top'});
}
</script>

<template>
    <Dialog title="Share Notes" :show="show" @close="closeDialog">
        <div class="relative">
            <div class="pt-5 pb-16  text-gray-500" v-if="loading">
                <div class="text-lg font-bold">Loading please wait...</div>
                <small>Connecting to Decentralized net!</small>
            </div>

            <div v-else>
                <div class="mb-4">
                    <div class="text-sm font-bold">Share:</div>
                    <button class="rounded-md bg-[#a8b1ff] hover:bg-[#b9c1ff] w-full  mt-2 px-4 py-3 text-sm font-medium text-black bg-opacity-40 cursor-pointer"
                        v-on:click="share_note()" v-if="!shared"> Share (Decentralized)</button>
                    <div class="flex justify-center rounded bg-zinc-800 mt-4 w-full" v-else>
                        <div class="py-2 px-1 w-full overflow-x-auto overflow-hidden whitespace-nowrap style-2">
                            {{ share_url }}
                        </div>
                        <div class="bg-zinc-700 hover:bg-zinc-600 text-white text-left rounded-r"
                            v-on:click="copy_share_url()">
                            <button class="pt-2 px-4 cursor-pointer" aria-label="Copy To Clipboard">
                                <IconCopy class="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
                <details class="text-sm text-gray-400 cursor-pointer">
                    <summary>What is sharing in Decentralized way?</summary>
                    <p class="cursor-default">This application doesn't have a backend or a database. Instead, it uses
                        your
                        browser to store data and WebRTC to share your notes with others. This means there are several
                        limitations (for example, if your browser is not active at the time of sharing excluding some
                        buffer
                        time enabled it will simply not work). This setup makes it very private, with data being offline
                        first. However, once the data is shared with others, they can share it further.</p>
                </details>
                <div class="mt-4 text-sm font-bold">Previously shared Notes:</div>
                <div class="previously-shared bg-zinc-800 w-full h-52 mt-2 rounded overflow-y-auto overflow-x-hidden style-1">
                    <div v-for="entry in entries" :key="entry.id" class="notes m-2 rounded bg-zinc-700 cursor-pointer hover:bg-zinc-600 flex">
                        <div class="w-full p-2" @click="openSharedFile(entry.id)">
                            <h3 class="">{{ entry.title.replace(/\s+/g, ' ').trim() }}</h3>
                            <small class="text-gray-400">Created At: {{ entry.createdAt }}</small>
                        </div>
                        <div class="grid items-center pr-2"> <IconTrash class="p-2 rounded bg-red-700 hover:bg-red-600 w-10 h-10"  @click="deleteItem(entry.id)"/></div>
                    </div>
                </div>
                <div class="pt-10">
                </div>
            </div>
            <div class="mt-10 text-right">
                <button @click="closeDialog"
                    class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer">Close</button>
            </div>
            <img :src="shareImage" alt="share" class="h-30 absolute -bottom-5 -left-5">

        </div>
    </Dialog>
</template>