<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
    value : {
        top: number
        bottom: number
        left: number
        right: number
    }
}>()

const windowEl = ref<HTMLElement>()
const isMounted = ref(false)
const adjustedX = ref(0)
const adjustedY = ref(0)

const calculatePosition = () => {
    if (!windowEl.value) return

    const viewportWidth = window.innerWidth
    const { offsetWidth: windowWidth, offsetHeight: windowHeight } = windowEl.value

    const new_top = props.value.top - windowHeight;
    const new_left = props.value.left + windowWidth;

    adjustedY.value = new_top < 0? props.value.bottom:props.value.top - windowHeight;
    adjustedX.value = new_left > viewportWidth? props.value.left - (new_left - viewportWidth): props.value.left;
}

const updatePosition = () => {
    calculatePosition()
    isMounted.value = true
}

onMounted(() => {
    updatePosition()
})

watch(()=>props.value, ()=>{
    calculatePosition()
})


const emit = defineEmits(["close"])

function close_emit(){
    emit("close")
}
</script>

<template>
    <div ref="windowEl" id="menu" :style="{
        position: 'fixed',
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
        visibility: isMounted ? 'visible' : 'hidden'
    }">
        <slot />
    </div>
</template>
