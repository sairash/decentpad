<script setup lang="ts">
import Dialog from "./Dialog.vue"
import shareImage from "@/assets/share.png"
import { IconCopy, IconTrash, IconSparkles } from "@tabler/icons-vue"
import { onMounted, ref, watch } from "vue";
import { sha256 } from 'js-sha256';
import type Entry from "@/models/Entry";

import {useGunStore} from "@/stores/gun"

import { paragraph } from 'txtgen'

import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const {init} = useGunStore();


const prop = defineProps<{
    show: boolean
    textData: string
    jsondata: string
    loading: boolean
    entries: Entry[]
}>()


const shared = ref(false);
const share_url = ref('https://note.sairashgautam.com.np/?share=');
const user_pass = ref("");
const password = ref("");

let md_identifier = "";
let random_value = "";


function closeDialog() {
    emit("close")
}

function openSharedFile(id: string) {
    emit("open_shared_file", id)
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 36);
}


function share_url_update() {
    share_url.value += random_value + "-" + md_identifier
}

function storeEntry(random_value: string, md_identifier: string, text_data: string, json_data: string) {
    emit("store_entry", random_value, md_identifier, text_data, json_data)
}

function deleteEntry(id: string) {
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

    $toast.default('Successfully generated Share Url', { position: 'top' });
}

function copy_share_url() {
    navigator.clipboard.writeText(share_url.value);
    $toast.default('Copied To Clipboard', { position: 'top' });
}


const emit = defineEmits(["close", "open_shared_file", "store_entry", "delete_entry"])



watch(() => prop.loading, (n_data) => {
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


onMounted(()=>{
    user_pass.value = localStorage.getItem("userpass_sai_note") || ''
})

function random_phrase_generator() {
    password.value = paragraph(3)
}

function deleteItem(id: string) {
    deleteEntry(id)
    $toast.default('Deleted Shared Note Successfully', { position: 'top' });
}


function save_userpass(){
    if(password.value == ''){
        return 
    }

    localStorage.setItem("userpass_sai_note", sha256(password.value));
    init();
}
</script>

<template>
    <Dialog title="Share Notes" :show="show" @close="closeDialog">
        <div class="relative">
            <div class="before_share pb-7" v-if="user_pass == ''">
                <div class="text-gray-400">
                    Please use a secret phrase before share feature. This is done to keep the shared notes private and
                    also help get old data (if present in decentralized net).
                </div>
                <div class="text-sm text-red-300 mt-6 ">Remeber this phrase, It can't be recoverd later on.</div>
                <div class="flex w-full ">
                    <textarea class="w-full style-1 border border-gray-700 px-3 py-2 rounded-l focus:ring-blue-800 outline-none" placeholder="Secret Phrase... (Required only once)" row="4" v-model="password"></textarea>
                    <button class="text-gray-200 bg-zinc-800 hover:bg-zinc-700 p-1 rounded-r cursor-pointer"  @click="random_phrase_generator()">
                        <IconSparkles class="w-7 h-7" />
                    </button>
                </div>
                <div class="mt-2 mb-4">
                    <button @click="save_userpass()" class="p-2 rounded  w-full" :class="password != ''?'bg-[#3e63dd] hover:bg-[#5c73e7] cursor-pointer':'bg-zinc-800 hover:bg-zinc-700 cursor-not-allowed'" :disabled="password == ''"> {{ password != ''? 'Share Note (Decentralized)': 'Provide Secret Phrase to Share'}} </button>
                </div>
            </div>
            <div class="share_thing" v-else>
                <div class="pt-5 pb-16  text-gray-500" v-if="loading">
                    <div class="text-lg font-bold">Loading please wait...</div>
                    <small>Connecting to Decentralized net!</small>
                </div>

                <div v-else>
                    <div class="mb-4">
                        <div class="text-sm font-bold">Share:</div>
                        <button
                            class="rounded-md bg-[#3e63dd] hover:bg-[#5c73e7] w-full  mt-2 px-4 py-3 text-sm font-medium cursor-pointer"
                            v-on:click="share_note()" v-if="!shared"> Share Note (Decentralized)</button>
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
                        <p class="cursor-default">This application doesn't have a backend or a database. Instead, it
                            uses
                            your
                            browser to store data and WebRTC to share your notes with others. This means there are
                            several
                            limitations (for example, if your browser is not active at the time of sharing excluding
                            some
                            buffer
                            time enabled it will simply not work). This setup makes it very private, with data being
                            offline
                            first. However, once the data is shared with others, they can share it further.</p>
                    </details>
                    <div class="mt-4 text-sm font-bold">Previously shared Notes:</div>
                    <div
                        class="previously-shared bg-zinc-800 w-full h-52 mt-2 rounded overflow-y-auto overflow-x-hidden style-1">
                        <div v-for="entry in entries" :key="entry.id"
                            class="notes m-2 rounded bg-zinc-700 cursor-pointer hover:bg-zinc-600 flex">
                            <div class="w-full p-2" @click="openSharedFile(entry.id)">
                                <h3 class="">{{ entry.title.replace(/\s+/g, ' ').trim() }}</h3>
                                <small class="text-gray-400">Created At: {{ entry.createdAt }}</small>
                            </div>
                            <div class="grid items-center pr-2">
                                <IconTrash class="p-2 rounded bg-red-700 hover:bg-red-600 w-10 h-10"
                                    @click="deleteItem(entry.id)" />
                            </div>
                        </div>
                    </div>
                    <div class="pt-10">
                    </div>
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