<template>
  <div id="tiptap" class="divide-gray-400 h-screen w-screen flex flex-col overflow-hidden p-2">
    <div class="p-2 flex justify-between">
      <div class="text-[#a8b1ff] cursor-default flex gap-0.5">
        <RouterLink to="/" class="logo-link">Notepad</RouterLink>
        <IconPencilBolt class="h-6 w-6" />
      </div>
      <div class="flex gap-2">
        <div class="text-sm text-gray-500 mt-1">
          <div v-if="shared == ''">
            {{ editorInstance?.storage.characterCount.characters() }} c<span class="hidden sm:inline">haracters</span> ,
            {{ editorInstance?.storage.characterCount.words() }} w<span class="hidden sm:inline">ords</span>
          </div>
          <div v-else>
            Viewing Shared File
          </div>
        </div>
        <button class="p-1 rounded bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
          @click="showFileOperationDialog = true">
          <IconFile class="h-5 w-5" />
        </button>
        
        <button class="p-1 rounded bg-zinc-800 hover:bg-zinc-700 cursor-pointer" @click="showShareDialog = true">
          <IconShare2 class="h-5 w-5" />
        </button>

        <button class="p-1 rounded bg-zinc-800 hover:bg-zinc-700 cursor-pointer" @click="showHelpDialog = true">
          <IconQuestionMark class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div id="tiptap-toolbar" class="bg-zinc-900  mb-2 w-full flex">
      <div class="divide-x divide-gray-400 w-full overflow-x-auto overflow-hidden whitespace-nowrap style-2" v-if="shared == ''">
        <TiptapToolbarGroup>
          <TiptapToolbarButton label="Undo" @click="editorInstance?.chain().focus().undo().run()"
            :disabled="!editorInstance?.can().chain().focus().undo().run()">
            <IconArrowBackUp class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Redo" @click="editorInstance?.chain().focus().redo().run()"
            :disabled="!editorInstance?.can().chain().focus().redo().run()">
            <IconArrowForwardUp class="h-5 w-5" />
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
        <TiptapToolbarGroup>
          <TiptapToolbarButton label="Heading 1" :is-active="editorInstance?.isActive('heading', { level: 1 })" @click="
            editorInstance?.chain().focus().toggleHeading({ level: 1 }).run()
            ">
            <IconH1 class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Heading 2" :is-active="editorInstance?.isActive('heading', { level: 2 })" @click="
            editorInstance?.chain().focus().toggleHeading({ level: 2 }).run()
            ">
            <IconH2 class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Heading 3" :is-active="editorInstance?.isActive('heading', { level: 3 })" @click="
            editorInstance?.chain().focus().toggleHeading({ level: 3 }).run()
            ">
            <IconH3 class="h-5 w-5" />
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
        <TiptapToolbarGroup>
          <TiptapToolbarButton label="Bold" :is-active="editorInstance?.isActive('bold')"
            @click="editorInstance?.chain().focus().toggleBold().run()">
            <IconBold class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Italic" :is-active="editorInstance?.isActive('italic')"
            @click="editorInstance?.chain().focus().toggleItalic().run()">
            <IconItalic class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Underline" :is-active="editorInstance?.isActive('underline')"
            @click="editorInstance?.chain().focus().toggleUnderline().run()">
            <IconUnderline class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Strikethrough" :is-active="editorInstance?.isActive('strike')"
            @click="editorInstance?.chain().focus().toggleStrike().run()">
            <IconStrikethrough class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Code" :is-active="editorInstance?.isActive('code')"
            @click="editorInstance?.chain().focus().toggleCode().run()">
            <IconCode class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="code" :is-active="editorInstance?.isActive('codeBlock')"
            @click="editorInstance?.chain().focus().toggleCodeBlock().run()">
            <IconCodePlus class="h-5 w-5" />
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
        <TiptapToolbarGroup>
          <TiptapToolbarButton label="task list" :is-active="editorInstance?.isActive('taskList')"
            @click="editorInstance?.chain().focus().toggleTaskList().run()">
            <IconListCheck class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="bullet list" :is-active="editorInstance?.isActive('bulletList')"
            @click="editorInstance?.chain().focus().toggleBulletList().run()">
            <IconListDetails class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="odered list" :is-active="editorInstance?.isActive('orderedList')"
            @click="editorInstance?.chain().focus().toggleOrderedList().run()">
            <IconListNumbers class="h-5 w-5" />
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
        <TiptapToolbarGroup>
          <TiptapToolbarButton label="Link" @click="openLinkDialog" :is-active="editorInstance?.isActive('link')">
            <IconLink class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Image" @click="showAddImageDialog = true">
            <IconPhoto class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Blockquote" :is-active="editorInstance?.isActive('blockquote')"
            @click="editorInstance?.chain().focus().toggleBlockquote().run()">
            <IconBlockquote class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Table" @click="showAddTableDialog = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Youtube" @click="showAddYoutubeDialog = true">
            <IconMovie class="h-5 w-5" />
          </TiptapToolbarButton>
          <TiptapToolbarButton @click="editorInstance?.chain().focus().setHorizontalRule().run()"
            label="Horizontal Line">
            <IconMinus class="h-5 w-5" />
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
        <TiptapToolbarGroup v-if="editorInstance?.isActive('table')">
          <TiptapToolbarButton @click="editorInstance?.commands.deleteTable()" label="Remove table">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M15.46,15.88L16.88,14.46L19,16.59L21.12,14.46L22.54,15.88L20.41,18L22.54,20.12L21.12,21.54L19,19.41L16.88,21.54L15.46,20.12L17.59,18L15.46,15.88M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Add column before" @click="editorInstance?.commands.addColumnBefore()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M13,2A2,2 0 0,0 11,4V20A2,2 0 0,0 13,22H22V2H13M20,10V14H13V10H20M20,16V20H13V16H20M20,4V8H13V4H20M9,11H6V8H4V11H1V13H4V16H6V13H9V11Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Add column after" @click="editorInstance?.commands.addColumnAfter()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M11,2A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H2V2H11M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M15,11H18V8H20V11H23V13H20V16H18V13H15V11Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Remove column" @click="editorInstance?.commands.deleteColumn()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M4,2H11A2,2 0 0,1 13,4V20A2,2 0 0,1 11,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,10V14H11V10H4M4,16V20H11V16H4M4,4V8H11V4H4M17.59,12L15,9.41L16.41,8L19,10.59L21.59,8L23,9.41L20.41,12L23,14.59L21.59,16L19,13.41L16.41,16L15,14.59L17.59,12Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Add row before" @click="editorInstance?.commands.addRowBefore()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M22,14A2,2 0 0,0 20,12H4A2,2 0 0,0 2,14V21H4V19H8V21H10V19H14V21H16V19H20V21H22V14M4,14H8V17H4V14M10,14H14V17H10V14M20,14V17H16V14H20M11,10H13V7H16V5H13V2H11V5H8V7H11V10Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton @click="editorInstance?.commands.addRowAfter()" label="Add row after">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M22,10A2,2 0 0,1 20,12H4A2,2 0 0,1 2,10V3H4V5H8V3H10V5H14V3H16V5H20V3H22V10M4,10H8V7H4V10M10,10H14V7H10V10M20,10V7H16V10H20M11,14H13V17H16V19H13V22H11V19H8V17H11V14Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Remove row" @click="editorInstance?.commands.deleteRow()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M9.41,13L12,15.59L14.59,13L16,14.41L13.41,17L16,19.59L14.59,21L12,18.41L9.41,21L8,19.59L10.59,17L8,14.41L9.41,13M22,9A2,2 0 0,1 20,11H4A2,2 0 0,1 2,9V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V9M4,9H8V6H4V9M10,9H14V6H10V9M16,9H20V6H16V9Z" />
            </svg>
          </TiptapToolbarButton>
          <TiptapToolbarButton label="Merge or split cell" @click="editorInstance?.commands.mergeOrSplit()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
              <path
                d="M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z" />
            </svg>
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
        <TiptapToolbarGroup>
          <TiptapToolbarButton label="Clear Format" @click="clearFormatting()">
            <IconClearFormatting class="w-5 h-5" />
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
      </div>
      <div class="divide-x divide-gray-400 flex w-full overflow-x-auto overflow-hidden whitespace-nowrap style-2" v-else>
        <TiptapToolbarGroup>
          <button class="text-md py-1 font-bold text-gray-400 cursor-default">
            Reading mode
          </button>
        </TiptapToolbarGroup>

        <TiptapToolbarGroup>
          <TiptapToolbarButton label="Back" @click="goBackToEdit">
            <IconArrowLeft class="h-5 w-5" />
            <div class="pl-1"> <span class="hidden sm:inline">Go</span> Back</div>
          </TiptapToolbarButton>

          <TiptapToolbarButton label="Turn on Editing" @click="showStartEditingDialog = true">
            <IconEdit class="h-5 w-5" />
            <div class="pl-1">Edit <span class="hidden sm:inline">Shared File</span></div>
          </TiptapToolbarButton>
        </TiptapToolbarGroup>
      </div>

      <div class="block  p-2 ">
        <div class="bg-[#3e63dd] hover:bg-[#5c73e7] bg-opacity-80 p-1 rounded">
          <a href="https://github.com/sairash/notepad" style="color: oklch(92% 0.004 286.32) !important;" target="_blank"
            rel="noopener noreferrer">
            <IconBrandGithub class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>

    <EditorContent v-if="shared == ''" class="flex-1 overflow-y-auto py-2 style-1" :editor="editorInstance" />

    <ShareTipTapComponent v-else :value="shared_note_value" :show-dialog="showStartEditingDialog"
      @close="showStartEditingDialog = false" @update="replaceWithSharedData" />

    <HelpDialog v-if="showHelpDialog" :show="showHelpDialog" @close="showHelpDialog = false" />
    <ShareDialog v-if="showShareDialog" :entries="entries" :loading="loading" @store_entry="store_entry" @delete_entry="delete_entry" :show="showShareDialog" @open_shared_file="openSharedFile"
      @close="showShareDialog = false"
      :text-data="(editorInstance?.getText().substring(0, 50) || ' ').replace(/\s+/g, ' ')"
      :jsondata="JSON.stringify(editorInstance?.getJSON()) || ' '" />
      
    <FileOperations v-if="showFileOperationDialog" :show="showFileOperationDialog"
      @close="showFileOperationDialog = false" @action="onActionFileOperation" />


    <TiptapLinkDialog v-if="showLinkDialog" :show="showLinkDialog" dialog-title="Add Link"
      @close="showLinkDialog = false" @update="updateLink" />
    <TiptapVideoDialog v-if="showAddYoutubeDialog" :show="showAddYoutubeDialog" dialog-title="Add Video Youtube"
      lable-string="Youtube Embed Link" @insert="insertYoutubeVideo" @close="showAddYoutubeDialog = false" />
    <TiptapTableDialog v-if="showAddTableDialog" :show="showAddTableDialog" @close="showAddTableDialog = false"
      @insert="insertTable" />
    <TiptapLinkDialog v-if="showAddImageDialog" :show="showAddImageDialog" dialog-title="Add Image Link"
      @update="insertImage" @close="showAddImageDialog = false" />

  </div>
</template>

<script setup lang="ts">

import 'highlight.js/styles/pojoaque.min.css'
import 'vue-toast-notification/dist/theme-sugar.css';


import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import {useToast} from 'vue-toast-notification';

import { EditorContent, useEditor, VueNodeViewRenderer, type JSONContent } from "@tiptap/vue-3"
import type DataTable from "@/models/table"
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconLink,
  IconListDetails,
  IconListNumbers,
  IconMovie,
  IconPhoto,
  IconStrikethrough,
  IconUnderline,
  IconMinus,
  IconCode,
  IconCodePlus,
  IconPencilBolt,
  IconQuestionMark,
  IconShare2,
  IconFile,
  IconClearFormatting,
  IconListCheck,
  IconBrandGithub,
  IconArrowLeft,
  IconEdit
} from "@tabler/icons-vue"

import HelpDialog from "@/components/HelpDialog.vue"
import FileOperations from "@/components/FileOperations.vue"
import TiptapToolbarButton from "@/components/TiptapToolbarButton.vue"
import TiptapToolbarGroup from "@/components/TiptapToolbarGroup.vue"
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

import TiptapLinkDialog from "@/components/TiptapLinkDialog.vue"
import TiptapVideoDialog from "@/components/TiptapVideoDialog.vue"
import TiptapTableDialog from "@/components/TiptapTableDialog.vue"
import type LinkType from "@/models/link"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { useRoute, useRouter } from 'vue-router'



import { all, createLowlight } from 'lowlight'

import CodeBlockComponent from '@/components/CodeBlock.vue'
import ShareDialog from './ShareDialog.vue'
import ShareTipTapComponent from './ShareTipTapComponent.vue'
import { useGunStore } from "@/stores/gun";

const { entries, loading ,getEntryById, storeEntry, deleteEntry } = useGunStore();


// create a lowlight instance
const lowlight = createLowlight(all)

const router = useRouter()
const route = useRoute()
const $toast = useToast();



const showLinkDialog = ref<boolean>()
const showAddYoutubeDialog = ref<boolean>(false)
const showAddTableDialog = ref<boolean>(false)
const showAddImageDialog = ref<boolean>(false)
const showHelpDialog = ref<boolean>(false)
const showFileOperationDialog = ref<boolean>(false)
const showShareDialog = ref<boolean>(false)
const showStartEditingDialog = ref<boolean>(false)


const shared = ref("")
const shared_note_value = ref('{"type": "doc", "content": []}')


const editorInstance = useEditor({
  content: JSON.parse(localStorage.getItem('notes-content') || '{"type": "doc", "content": []}') as JSONContent,
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
  onUpdate: ({ editor }) => {
    localStorage.setItem('notes-content', JSON.stringify(editor.getJSON()))
  },
  editable: true
})


function saveAsFile(string_to_save: string, format: string) {

  const blob = new Blob([string_to_save], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'note.' + format
  a.click()
  window.URL.revokeObjectURL(url)
}


function onActionFileOperation(op: number, format: string) {
  var text_to_perferom_op = "";

  switch (format) {
    case "md":
      text_to_perferom_op = editorInstance.value?.storage.markdown.getMarkdown()
      break;
    case "txt": // plain text
      text_to_perferom_op = editorInstance.value?.getText() || "";
      break;
    default:
      break;
  }

  // 1 for copy and 2 for download
  switch (op) {
    case 1:
      $toast.default('Copied To Clipboard', {position: 'top'});
      navigator.clipboard.writeText(text_to_perferom_op)
      break;
    case 2:
      $toast.default('Downloading file', {position: 'top'});
      saveAsFile(text_to_perferom_op, format)
      break;
    default:
      break;
  }
}

function openLinkDialog() {
  showLinkDialog.value = true
}

function updateLink(value: LinkType) {
  const pos = editorInstance.value?.state.selection.to as number;
  const endPos = pos + value.Name.length;
  editorInstance.value?.chain

  editorInstance.value
    ?.chain()
    .focus()
    .insertContentAt(pos, value.Name)
    .setTextSelection({ from: pos, to: pos + endPos })
    .extendMarkRange("link")
    .setLink({ href: value.Url })
    .setTextSelection(endPos)
    .unsetMark('link')
    .run()
}

function insertImage(value: LinkType) {
  editorInstance.value?.chain().focus().setImage({ src: value.Url, alt: value.Name}).run()
}

function insertYoutubeVideo(url: string) {
  editorInstance.value?.commands.setYoutubeVideo({
    src: url,
    width: 400,
    height: 300,
  })
}

function insertTable(table: DataTable) {
  editorInstance.value
    ?.chain()
    .focus()
    .insertTable({
      rows: table.rows,
      cols: table.columns,
      withHeaderRow: table.withHeader,
    })
    .run()
}



onMounted(async () => {
  shared.value = route.query.share as string | undefined || ""
})


function clearFormatting() {
  editorInstance.value?.chain().focus()
    .clearNodes()
    .unsetAllMarks()
    .run()
}

onBeforeUnmount(() => {
  editorInstance.value?.destroy()
})

watch(() => route.query.share, (newVal) => {
  shared.value = newVal as string || ""
})

watch(()=> shared.value, async (newVal)=>{
  if(newVal == ""){
        return
  }

  shared_note_value.value = (await getEntryById(newVal))?.body || '{"type": "doc", "content": []}'
})

function openSharedFile(id: string) {
  router.push({
    query: {
      ...route.query,
      share: id
    }
  })

  showShareDialog.value = false
}

function goBackToEdit() {
  router.push({
    query: {
      ...route.query,
      share: undefined
    }
  })
}

function replaceWithSharedData(sharedCont: JSONContent) {
  localStorage.setItem('notes-content', JSON.stringify(sharedCont))
  editorInstance.value?.commands.setContent(sharedCont)
  goBackToEdit()

}

async function store_entry(random_value: string, md_identifier: string, text_data: string, json_data: string){
  await storeEntry(random_value, md_identifier, text_data, json_data)
}

async function delete_entry(id: string){
  await deleteEntry(id)
}

</script>