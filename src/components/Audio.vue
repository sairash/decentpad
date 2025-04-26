<script setup lang="ts">
import {
    IconMusicPlus,
    IconTrees,
    IconWind,
    IconCampfire,
    IconCup,
    IconDropletFilled,
    IconCloudFog,
    IconCloudStorm
} from "@tabler/icons-vue";
import { ref } from "vue";

// Initialize audio elements programmatically
const wind_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6toZgJnNnyciU06w7xkslLhGM2DZ3vBazQFypu'));
const forest_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tJRx9SAVBlE6tumDzfiKX2RrbsTLOPYUd4IV8'));
const campfire_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tcTEN9jajqaumdHJr2VfGkQSE9FveoltNhAM4'));
const cafe_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6to2Ate7yciU06w7xkslLhGM2DZ3vBazQFypuT'));
const stream_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tYVbWUjLr5NPLfyHCAXTI0wcDOVaRt3j1qU7e'));
const rain_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tEQ8ZAz9CJBlGwtFz0fbUoaVK5EOIYLA3nv7k'));
const storm_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tysQ7T1tCFTLsGa3mY8iJX6eSRWAn2HkNd70x'));

// Set audio properties
[wind_audio, forest_audio, campfire_audio, cafe_audio, stream_audio, rain_audio, storm_audio].forEach(audio => {
    audio.value.loop = true;
    audio.value.preload = 'auto';
});

const option_visible = ref(false);
</script>

<template>
    <div class="fixed pl-10 py-5 pr-5 right-0 bottom-0" v-on:mouseleave="option_visible = false">
        <div class="mb-4 flex flex-col gap-3" v-if="option_visible">
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="forest_audio.paused ? forest_audio.play() : forest_audio.pause()">
                <IconTrees class="w-6 h-6" />
            </button>
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="wind_audio.paused ? wind_audio.play() : wind_audio.pause()">
                <IconWind class="w-6 h-6" />
            </button>
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="campfire_audio.paused ? campfire_audio.play() : campfire_audio.pause()">
                <IconCampfire class="w-6 h-6" />
            </button>
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="cafe_audio.paused ? cafe_audio.play() : cafe_audio.pause()">
                <IconCup class="w-6 h-6" />
            </button>
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="stream_audio.paused ? stream_audio.play() : stream_audio.pause()">
                <IconDropletFilled class="w-6 h-6" />
            </button>
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="rain_audio.paused ? rain_audio.play() : rain_audio.pause()">
                <IconCloudFog class="w-6 h-6" />
            </button>
            <button class="bg-zinc-700 hover:opacity-100 cursor-pointer rounded-xl opacity-60 p-3"
                @click="storm_audio.paused ? storm_audio.play() : storm_audio.pause()">
                <IconCloudStorm class="w-6 h-6" />
            </button>
        </div>
        <button
            class="p-3 bg-zinc-800 hover:opacity-100 cursor-pointer hover:bg-zinc-700 rounded-xl cursor-pointer"
            @click="option_visible = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path
                    d="M14.5 4.5C14.5 5.88071 13.3807 7 12 7C10.6193 7 9.5 5.88071 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5Z"
                    stroke="white" stroke-width="1.5" />
                <path
                    d="M3 17L5.58887 15.6918C5.84084 15.5645 6 15.3043 6 15.0196C6 12.0802 8.1377 9.56573 11.0067 9.0825C11.6598 8.9725 12.3402 8.9725 12.9933 9.0825C15.8623 9.56573 18 12.0802 18 15.0196C18 15.3043 18.1592 15.5645 18.4111 15.6918L21 17"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9.5 16L8.45827 17.389C8.42647 17.4314 8.41057 17.4526 8.39456 17.4728C8.13149 17.8053 7.76956 18.0456 7.36102 18.1591C7.33616 18.166 7.31042 18.1724 7.25902 18.1852L5.77423 18.5564C4.7315 18.8171 4 19.754 4 20.8288C4 21.4757 4.52435 22 5.17116 22H6.72727C7.32654 22 7.62617 22 7.917 21.9658C8.59721 21.8859 9.25375 21.667 9.84589 21.3229C10.0991 21.1757 10.3388 20.9959 10.8182 20.6364L11 20.5M11 20.5L13 19M11 20.5L13.5397 21.4524C14.1491 21.6809 14.4539 21.7952 14.7688 21.8688C14.9318 21.9069 15.0966 21.9368 15.2625 21.9583C15.5832 22 15.9087 22 16.5596 22H18.8288C19.4757 22 20 21.4757 20 20.8288C20 19.754 19.2685 18.8171 18.2258 18.5564L16.741 18.1852C16.6896 18.1724 16.6638 18.166 16.639 18.1591C16.2304 18.0456 15.8685 17.8053 15.6054 17.4728C15.5895 17.4526 15.5735 17.4313 15.5417 17.389L14.5 16"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</template>