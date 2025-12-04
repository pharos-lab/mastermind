<template>
    <section class="board-wrapper order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3">
        <div class="board w-96 mx-auto ring ring-slate-500/50 rounded-lg shadow-lg divide-y divide-slate-500/50">

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
                    <div class="color size-8 rounded-full" v-for="color in game.currentAttempt" :class="getColorClass(color)">
                        
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
                    <div 
                        class="color size-8 rounded-full" 
                        v-for="color in attempt.code"
                        :class="getColorClass(color)"
                    >
                        
                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div 
                        class="result size-4 rounded-full bg-slate-800" 
                        v-for="exactMatch in attempt.feedback.exactMatches"
                    >
                    </div>
                    <div 
                        class="result size-4 rounded-full bg-white border" 
                        v-for="colorMatch in attempt.feedback.colorMatches"
                    >
                    </div>

                    <div 
                        class="result size-4 rounded-full bg-slate-300" 
                        v-for="notMatch in (4 - attempt.feedback.colorMatches - attempt.feedback.exactMatches)"
                    >
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Color, Game } from '../types'

interface Props {
    game: Game;
}

defineProps<Props>();

const colorMap: Record<Color, string> = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-400',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
};

function getColorClass(color: Color): string {
    return colorMap[color] || 'bg-slate-200';
}

</script>