<script lang="ts" setup>
import 'highlight.js/styles/pojoaque.min.css'
import { EditorContent, useEditor, VueNodeViewRenderer, type JSONContent } from "@tiptap/vue-3"

import pencilImage from "@/assets/red.png"
import Dialog from "./Dialog.vue"



import Paragraph from "@tiptap/extension-paragraph"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import History from "@tiptap/extension-history"
import Heading from "@tiptap/extension-heading"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import ListItem from "@tiptap/extension-list-item"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import Code from '@tiptap/extension-code'
import Link from "@tiptap/extension-link"
import { Blockquote } from "@tiptap/extension-blockquote"
import { HardBreak } from "@tiptap/extension-hard-break"
import { CharacterCount } from "@tiptap/extension-character-count"
import { Youtube } from "@tiptap/extension-youtube"
import Dropcursor from "@tiptap/extension-dropcursor"
import { HorizontalRule } from "@tiptap/extension-horizontal-rule"
import { Table } from "@tiptap/extension-table"
import { TableHeader } from "@tiptap/extension-table-header"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import Gapcursor from "@tiptap/extension-gapcursor"
import Image from "@tiptap/extension-image"
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Markdown } from 'tiptap-markdown'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import { all, createLowlight } from 'lowlight'

import CodeBlockComponent from '@/components/CodeBlock.vue'
import { onMounted, watch } from 'vue'


import { useShareStore } from "@/stores/share";

const shareStore = useShareStore();


defineProps<{
    showDialog: boolean
}>()

const lowlight = createLowlight(all)


const editorInstance = useEditor({
  content: "Loading...",
  editorProps: {
    attributes: {
      class: "blog",
    },
  },

  extensions: [
    Paragraph,
    Document,
    Text,
    History,
    Heading.configure({
      levels: [1, 2, 3],
    }),
    Bold,
    Italic,
    Underline,
    Strike,
    Code,
    ListItem,
    BulletList,
    OrderedList,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Link.configure({
      openOnClick: true,
    }),
    HardBreak,
    Blockquote,
    CharacterCount,
    Youtube,
    Dropcursor.configure({
      width: 2,
      color: "#2563eb",
    }),
    HorizontalRule,
    Table.configure({
      resizable: false,
      allowTableNodeSelection: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Gapcursor,
    Image,
    Markdown,
    CodeBlockLowlight
      .extend({
        addNodeView() {
          return VueNodeViewRenderer(CodeBlockComponent)
        },
      })
      .configure({ lowlight }),
  ],
  editable: false
});


onMounted(async()=>{
  editorInstance.value?.commands.setContent(shareStore.shareBuffer)
})


const emit = defineEmits(["close", "update"])

function closeDialog() {
    emit("close")
}

function update() {
    emit("update", editorInstance.value?.getJSON())
    emit("close")
}

watch(()=>shareStore.shareBuffer, (newVal) =>{ 
  editorInstance.value?.commands.setContent(newVal)
})

</script>

<template>
    <div class="">
        <Dialog title="Are you sure?" :show="showDialog" @close="closeDialog">
            <div class="relative">
                <p class="mb-3">Your previous note is going to be replaced with the contents of the shared note. This is a premanent change and cannot be undone, save your note if necessary.</p>
                
                <div class="mt-14 text-right flex flex-row justify-end space-x-3">
                    <button type="button"
                        class="rounded-md px-4 py-3 text-sm font-medium text-gray-200 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
                        @click="closeDialog">
                        Close
                    </button>
                    <button type="submit" @click="update"
                        class="rounded-md bg-[#a8b1ff] hover:bg-[#b9c1ff] px-4 py-3 text-sm font-medium text-black bg-opacity-40 cursor-pointer">
                        Yes
                    </button>
                </div>
                <img :src="pencilImage" alt="danger" class="h-30 absolute -bottom-7 -left-7">

            </div>
        </Dialog>
        <EditorContent class="flex-1 overflow-y-auto py-2 style-1" :editor="editorInstance" v-if="!showDialog" />
    </div>
</template>