<template>
    <section class="board-wrapper order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3 space-y-4">
        <div class="flex flex-col lg:items-center  gap-4">
            <div class="combination flex border rounded-lg shadow-lg overflow-hidden lg:w-96 bg-white">
                <div class="w-8"></div>
                <div 
                    v-show="game.value.showCode" 
                    class="code flex grow gap-8 justify-between items-center py-2 px-4"
                >
                    <div 
                        class="color size-8 xl:size-10 rounded-full" 
                        v-for="color in game.value.code" 
                        :class="getColorClass(color)"
                    >
                    </div>

                </div>

                <div 
                    v-show="!game.value.showCode" 
                    class="code flex grow gap-8 justify-between items-center py-2 px-4"
                >
                    <div 
                        class="color size-8 xl:size-10 rounded-full bg-slate-100 border border-slate-300 border-dashed" 
                        v-for="n in 4"
                    >
                    </div>

                </div>

                <div class="see-code w-11 flex items-center justify-center bg-emerald-500/50">
                    <Eye 
                        v-show="!game.value.showCode" 
                        class="text-white cursor-pointer size-7" 
                        @click="game.value.showCode = true"
                    />

                    <EyeOff 
                        v-show="game.value.showCode" 
                        class="text-white cursor-pointer size-7"
                        @click="game.value.showCode = false"
                    />
                </div>
            </div>

            <div class="board border rounded-lg shadow-lg divide-y divide-slate-200 lg:w-96 bg-white overflow-hidden">

                <!-- NOT ATTEMPT YET -->
                <div 
                    class="attempt flex" 
                    v-for="n in (game.value.maxAttempts - game.value.currentAttemptIndex )"
                    :class="{'border-b-sky-200': n === game.value.maxAttempts - game.value.currentAttemptIndex}"
                >
                    <div class="attempt-index flex justify-center items-center font-semibold text-slate-400 w-8">
                        {{ game.value.maxAttempts + 1 - n }}
                    </div>

                    <div class="code flex grow justify-between items-center py-2 px-4">
                        <div 
                            class="color size-8 xl:size-10 rounded-full bg-slate-100 border border-dashed border-slate-300" 
                            v-for="n in 4"
                        >
                        </div>
                    </div>

                    <div class="results p-2 grid grid-cols-2 gap-1 bg-slate-50">
                        <div 
                            class="result size-3 rounded-full bg-slate-300" 
                            v-for="n in 4"
                        ></div>
                    </div>
                </div>

                <!-- CURRENT ATTEMPT -->
                <div class="attempt flex bg-sky-50 border-b-2 border-t-1 border-sky-200">
                    <div class="attempt-index flex justify-center items-center font-semibold text-sky-700 w-8">
                        {{ game.value.currentAttemptIndex }}
                    </div>

                    <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                        <div 
                            class="color size-8 xl:size-10 rounded-full" 
                            v-for="color in game.value.currentAttempt" 
                            :class="getColorClass(color)"
                        >
                        </div>

                        <div 
                            class="color size-8 xl:size-10 rounded-full bg-white border border-dashed border-slate-300" 
                            v-for="n in 4 - game.value.currentAttempt.length"
                        >
                        </div>
                    </div>

                    <div class="results p-2 grid grid-cols-2 gap-1 bg-sky-100">
                        <div 
                            class="result size-3 rounded-full bg-slate-300" 
                            v-for="n in 4"
                        ></div>
                    </div>
                </div>

                <!-- ALREADY ATTEMPT -->
                <div class="attempt flex" v-for="(attempt, index) in game.value.attempts">
                    <div class="attempt-index flex justify-center items-center font-semibold text-slate-400 w-8">
                        {{ game.value.attempts.length - index }}
                    </div>

                    <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                        <div 
                            class="color size-8 xl:size-10 rounded-full" 
                            v-for="color in attempt.code"
                            :class="getColorClass(color)"
                        >
                            
                        </div>
                    </div>

                    <div class="results p-2 grid grid-cols-2 gap-1 bg-slate-50">
                        <div 
                            class="result size-3 rounded-full bg-slate-800" 
                            v-for="exactMatch in attempt.feedback.exactMatches"
                        >
                        </div>
                        <div 
                            class="result size-3 rounded-full bg-white border" 
                            v-for="colorMatch in attempt.feedback.colorMatches"
                        >
                        </div>

                        <div 
                            class="result size-3 rounded-full bg-slate-300" 
                            v-for="notMatch in (4 - attempt.feedback.colorMatches - attempt.feedback.exactMatches)"
                        >
                        </div>
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