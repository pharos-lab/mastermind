<template>
    <section class="board-wrapper order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3 space-y-4">
        <div class="combination flex w-96 mx-auto ring ring-slate-500/50 rounded-lg shadow-lg overflow-hidden">
            <div 
                v-show="game.value.showCode" 
                class="code flex grow gap-2 justify-between items-center py-2 px-4"
            >
                <div 
                    class="color size-8 rounded-full" 
                    v-for="color in game.value.code" 
                    :class="getColorClass(color)"
                >
                </div>

            </div>

            <div 
                v-show="!game.value.showCode" 
                class="code flex grow gap-2 justify-between items-center py-2 px-4"
            >
                <div 
                    class="color size-8 rounded-full bg-slate-200" 
                    v-for="n in 4"
                >
                </div>

            </div>

            <div class="see-code size-14 flex items-center justify-center bg-emerald-500/50">
                <Eye 
                    v-show="!game.value.showCode" 
                    class="text-white cursor-pointer size-8" 
                    @click="game.value.showCode = true"
                />

                <EyeOff 
                    v-show="game.value.showCode" 
                    class="text-white cursor-pointer size-8"
                    @click="game.value.showCode = false"
                />
            </div>
        </div>

        <div class="board w-96 mx-auto ring ring-slate-500/50 rounded-lg shadow-lg divide-y divide-slate-500/50">

            <!-- NOT ATTEMPT YET -->
            <div 
                class="attempt flex" 
                v-for="n in 11 - game.value.attempts.length"
            >
                <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                    <div 
                        class="color size-8 rounded-full bg-slate-200" 
                        v-for="n in 4"
                    >
                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div 
                        class="result size-4 rounded-full bg-slate-300" 
                        v-for="n in 4"
                    ></div>
                </div>
            </div>

            <!-- CURRENT ATTEMPT -->
            <div class="attempt flex">
                <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                    <div 
                        class="color size-8 rounded-full" 
                        v-for="color in game.value.currentAttempt" 
                        :class="getColorClass(color)"
                    >
                    </div>

                    <div 
                        class="color size-8 rounded-full bg-slate-200" 
                        v-for="n in 4 - game.value.currentAttempt.length"
                    >
                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div 
                        class="result size-4 rounded-full bg-slate-300" 
                        v-for="n in 4"
                    ></div>
                </div>
            </div>

            <!-- ALREADY ATTEMPT -->
            <div class="attempt flex" v-for="(attempt) in game.value.attempts">
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
import { Eye, EyeOff } from 'lucide-vue-next';
import type { Color, Game } from '../types'
import type { Ref } from 'vue';

interface Props {
    game: Ref<Game>;
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