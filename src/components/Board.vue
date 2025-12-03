<template>
    <section class="board-wrapper order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3">
        <div class="board w-96 mx-auto border rounded-lg shadow-lg divide-y">

            <!-- NOT ATTEMPT YET -->
            <div class="attempt flex" v-for="n in 11 - game.attempts.length">
                <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                    <div class="color size-8 rounded-full bg-slate-200" v-for="n in 4">

                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div class="result size-4 rounded-full bg-slate-300" v-for="n in 4"></div>
                </div>
            </div>

            <!-- CURRENT ATTEMPT -->
            <div class="attempt flex">
                <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                    <div class="color size-8 rounded-full" v-for="color in game.currentAttempt">
                        {{ color }}
                    </div>

                    <div class="color size-8 rounded-full bg-slate-200" v-for="n in 4 - game.currentAttempt.length">

                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div class="result size-4 rounded-full bg-slate-300" v-for="n in 4"></div>
                </div>
            </div>

            <!-- ALREADY ATTEMPT -->
            <div class="attempt flex" v-for="(attempt) in game.attempts">
                <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                    <div class="color size-8 rounded-full bg-slate-200" v-for="color in attempt.code">
                        {{  color }}
                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div class="result size-4 rounded-full bg-slate-300" v-for="n in 4"></div>
                </div>
            </div>
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