<template>
    <node-view-wrapper class="code-block px-2 rounded" spellcheck="false" style="background-color: #0d0e0f !important; ">
        <div class="py-5">
            <pre><code class="bg-zinc-900"><node-view-content /></code></pre>
        </div>

        <div class="flex justify-end">
            <select contenteditable="false" class="rounded" v-model="selectedLanguage">
                <option :value="null">
                    auto
                </option>
                <option disabled>
                    —
                </option>
                <option v-for="(language, index) in languages" :value="language" :key="index">
                    {{ language }}
                </option>
            </select>
        </div>
    </node-view-wrapper>
</template>

<script lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },

    props: nodeViewProps,

    data() {
        return {
            languages: this.extension.options.lowlight.listLanguages(),
        }
    },

    computed: {
        selectedLanguage: {
            get() {
                return this.node.attrs.language
            },
            set(language: string) {
                this.updateAttributes({ language })
            },
        },
    },
}
</script>

<style>
select {
    background-color: #fff !important;
    color: black;
}
</style>