<script setup lang="ts">
import {
    IconBeach,
    IconTrees,
    IconWind,
    IconCampfire,
    IconCup,
    IconDropletFilled,
    IconCloudFog,
    IconCloudStorm
} from "@tabler/icons-vue";
import { ref, reactive, onMounted, watch } from "vue";

type AudioKey = 'wind' | 'forest' | 'campfire' | 'cafe' | 'stream' | 'rain' | 'storm';

const wind_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6toZgJnNnyciU06w7xkslLhGM2DZ3vBazQFypu'));
const forest_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tJRx9SAVBlE6tumDzfiKX2RrbsTLOPYUd4IV8'));
const campfire_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tcTEN9jajqaumdHJr2VfGkQSE9FveoltNhAM4'));
const cafe_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6to2Ate7yciU06w7xkslLhGM2DZ3vBazQFypuT'));
const stream_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tYVbWUjLr5NPLfyHCAXTI0wcDOVaRt3j1qU7e'));
const rain_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tEQ8ZAz9CJBlGwtFz0fbUoaVK5EOIYLA3nv7k'));
const storm_audio = ref(new Audio('https://akocdw82ai.ufs.sh/f/Jk6mQ2VBlE6tysQ7T1tCFTLsGa3mY8iJX6eSRWAn2HkNd70x'));

[wind_audio, forest_audio, campfire_audio, cafe_audio, stream_audio, rain_audio, storm_audio].forEach(audio => {
    audio.value.loop = true;
    audio.value.preload = 'auto';
});

const isPlaying = reactive({
    wind: false,
    forest: false,
    campfire: false,
    cafe: false,
    stream: false,
    rain: false,
    storm: false
});

const audios: { ref: typeof wind_audio; key: AudioKey }[] = [
    { ref: wind_audio, key: 'wind' },
    { ref: forest_audio, key: 'forest' },
    { ref: campfire_audio, key: 'campfire' },
    { ref: cafe_audio, key: 'cafe' },
    { ref: stream_audio, key: 'stream' },
    { ref: rain_audio, key: 'rain' },
    { ref: storm_audio, key: 'storm' }
];

onMounted(() => {
    audios.forEach(({ ref, key }) => {
        ref.value.addEventListener('play', () => {
            isPlaying[key] = true;
        });
        ref.value.addEventListener('pause', () => {
            isPlaying[key] = false;
        });
    });
});


const option_visible = ref(false);
</script>

<template>
    <div class="fixed pl-10 py-5 pr-5 right-0 bottom-0" v-on:mouseleave="option_visible = false">
        <div class="mb-4 flex flex-col gap-3" v-if="option_visible">
            <Popper content="Forest" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.forest ? 'bg-[#5c73e7]' : 'opacity-60 bg-zinc-700 hover:bg-zinc-600 '"
                    @click="forest_audio.paused ? forest_audio.play() : forest_audio.pause()">
                    <IconTrees class="w-6 h-6" />
                </button>
            </Popper>
            <Popper content="Wind" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.wind ? 'bg-[#5c73e7]' : 'opacity-60 bg-zinc-700 hover:bg-zinc-600 '"
                    @click="wind_audio.paused ? wind_audio.play() : wind_audio.pause()">
                    <IconWind class="w-6 h-6" />
                </button>
            </Popper>
            <Popper content="Campfire" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.campfire ? 'bg-[#5c73e7]' : 'bg-zinc-700 hover:bg-zinc-600 '"
                    @click="campfire_audio.paused ? campfire_audio.play() : campfire_audio.pause()">
                    <IconCampfire class="w-6 h-6" />
                </button>
            </Popper>
            <Popper content="Cafe" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.cafe ? 'bg-[#5c73e7]' : 'opacity-60 bg-zinc-700 hover:bg-zinc-600 '"
                    @click="cafe_audio.paused ? cafe_audio.play() : cafe_audio.pause()">
                    <IconCup class="w-6 h-6" />
                </button>
            </Popper>
            <Popper content="Stream" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.stream ? 'bg-[#5c73e7]' : 'opacity-60 bg-zinc-700 hover:bg-zinc-600 '"
                    @click="stream_audio.paused ? stream_audio.play() : stream_audio.pause()">
                    <IconDropletFilled class="w-6 h-6" />
                </button>
            </Popper>
            <Popper content="Rain" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.rain ? 'bg-[#5c73e7]' : 'opacity-60 bg-zinc-700 hover:bg-zinc-600 '"
                    @click="rain_audio.paused ? rain_audio.play() : rain_audio.pause()">
                    <IconCloudFog class="w-6 h-6" />
                </button>
            </Popper>
            <Popper content="Storm" placement="left" arrow="true" hover="true">
                <button class="cursor-pointer opacity-60 hover:opacity-100 rounded-full p-4.5 transition-colors"
                    :class="isPlaying.storm ? 'bg-[#5c73e7]' : 'opacity-60 bg-zinc-700 hover:bg-zinc-600 '"
                    @click="storm_audio.paused ? storm_audio.play() : storm_audio.pause()">
                    <IconCloudStorm class="w-6 h-6" />
                </button>
            </Popper>
        </div>
        <Popper content="Zen mode" placement="left" arrow="true" hover="true">
            <button class="p-4 hover:bg-zinc-600 bg-zinc-700 rounded-full cursor-pointer text-white transition-colors"
                @click="option_visible = !option_visible">
                <IconBeach class="w-7 h-7" />
            </button>
        </Popper>
    </div>
</template>