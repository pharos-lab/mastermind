<template>
    <section class="commands order-3 lg:order-2 lg:order-none lg:row-start-2 p-4 ring ring-slate-500 shadow-lg rounded-lg space-y-8">
        <div class="colors flex gap-2 justify-between">
            <button class="size-6 lg:size-10 bg-red-500 rounded cursor-pointer" @click="$emit('addColor', 'red')"></button>
            <button class="size-6 lg:size-10 bg-orange-500 rounded cursor-pointer" @click="$emit('addColor', 'orange')"></button>
            <button class="size-6 lg:size-10 bg-yellow-500 rounded cursor-pointer" @click="$emit('addColor', 'yellow')"></button>
            <button class="size-6 lg:size-10 bg-green-500 rounded cursor-pointer"  @click="$emit('addColor', 'green')"></button>
            <button class="size-6 lg:size-10 bg-blue-500 rounded cursor-pointer" @click="$emit('addColor', 'blue')"></button>
            <button class="size-6 lg:size-10 bg-purple-500 rounded cursor-pointer"  @click="$emit('addColor', 'purple')"></button>
        </div>

        <div class="actions flex justify-between">
            <button class="cursor-pointer rounded bg-slate-500 px-4 py-2 text-white" @click="$emit('resetColor')">Reset</button>
            <button class="cursor-pointer rounded bg-slate-500 px-4 py-2 text-white" @click="$emit('undoColor')">Undo</button>
            <button class="cursor-pointer rounded bg-green-500 px-4 py-2 text-white" @click="$emit('submitColors')">Submit</button>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Game } from '../types'

interface Props {
    game: Game;
}

defineProps<Props>();
</script>