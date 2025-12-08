<template>
    <section class="board-wrapper order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3 space-y-2">
        <!-- Code secret -->
        <div class="combination max-w-xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div class="flex items-center">
                <div 
                    v-show="game.value.showCode" 
                    class="code flex grow gap-1.5 items-center py-2 px-3 bg-gradient-to-r from-emerald-50 to-teal-50"
                >
                    <span class="text-xs font-semibold text-emerald-700 uppercase tracking-wider mr-1">Solution:</span>
                    <div 
                        class="color w-7 h-7 rounded-full shadow-sm ring-1 ring-white" 
                        v-for="(color, index) in game.value.code"
                        :key="index"
                        :class="getColorClass(color)"
                    />
                </div>

                <div 
                    v-show="!game.value.showCode" 
                    class="code flex grow gap-1.5 items-center py-2 px-3 bg-gradient-to-r from-slate-50 to-slate-100"
                >
                    <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Solution:</span>
                    <div 
                        class="color w-7 h-7 rounded-full bg-slate-300 shadow-inner" 
                        v-for="n in 4"
                        :key="n"
                    />
                </div>

                <button 
                    class="see-code w-12 h-full flex items-center justify-center transition-colors"
                    :class="game.value.showCode ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'"
                    @click="game.value.showCode = !game.value.showCode"
                >
                    <Eye v-show="!game.value.showCode" class="text-white w-5 h-5" />
                    <EyeOff v-show="game.value.showCode" class="text-white w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Plateau de jeu -->
        <div class="board max-w-xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <!-- Header compact -->
            <div class="px-3 py-1.5 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200 flex items-center justify-between">
                <h3 class="text-xs font-semibold text-slate-700">Tentatives</h3>
                <span class="text-xs text-slate-500 font-medium">{{ game.value.currentAttemptIndex }}/{{ game.value.maxAttempts }}</span>
            </div>

            <div class="divide-y divide-slate-100">
                <!-- Tentatives non effectuées -->
                <div 
                    class="attempt flex items-center hover:bg-slate-50/50 transition-colors" 
                    v-for="n in Math.max(0, game.value.maxAttempts - game.value.attempts.length - 1)"
                    :key="`empty-${n}`"
                >
                    <div class="flex-1 flex gap-1.5 items-center py-1.5 px-3">
                        <span class="text-xs font-medium text-slate-400 w-4">{{ game.value.maxAttempts - n + 1 - game.value.attempts.length }}</span>
                        <div 
                            class="color w-6 h-6 rounded-full bg-slate-100 border border-dashed border-slate-300" 
                            v-for="i in 4"
                            :key="i"
                        />
                    </div>

                    <div class="results w-16 p-1.5 grid grid-cols-2 gap-1 bg-slate-50">
                        <div class="result w-3 h-3 rounded-full bg-slate-200" v-for="i in 4" :key="i" />
                    </div>
                </div>

                <!-- Tentative actuelle -->
                <div class="attempt flex items-center bg-sky-50 border-y border-sky-200">
                    <div class="flex-1 flex gap-1.5 items-center py-1.5 px-3">
                        <span class="text-xs font-bold text-sky-700 w-4">{{ game.value.currentAttemptIndex + 1 }}</span>
                        <div 
                            v-for="(color, index) in game.value.currentAttempt"
                            :key="`current-${index}`"
                            class="color w-6 h-6 rounded-full shadow-sm ring-1 ring-sky-400" 
                            :class="getColorClass(color)"
                        />
                        <div 
                            class="color w-6 h-6 rounded-full bg-white border border-sky-300 border-dashed" 
                            v-for="n in 4 - game.value.currentAttempt.length"
                            :key="`empty-current-${n}`"
                        />
                    </div>

                    <div class="results w-16 p-1.5 grid grid-cols-2 gap-1 bg-sky-100">
                        <div class="result w-3 h-3 rounded-full bg-slate-200" v-for="i in 4" :key="i" />
                    </div>
                </div>

                <!-- Tentatives déjà effectuées -->
                <div 
                    class="attempt flex items-center hover:bg-slate-50/50 transition-colors" 
                    v-for="(attempt, index) in game.value.attempts"
                    :key="`attempt-${index}`"
                >
                    <div class="flex-1 flex gap-1.5 items-center py-1.5 px-3">
                        <span class="text-xs font-medium text-slate-600 w-4">{{ index + 1 }}</span>
                        <div 
                            class="color w-6 h-6 rounded-full shadow-sm" 
                            v-for="(color, i) in attempt.code"
                            :key="i"
                            :class="getColorClass(color)"
                        />
                    </div>

                    <div class="results w-16 p-1.5 grid grid-cols-2 gap-1 bg-slate-50">
                        <div class="result w-3 h-3 rounded-full bg-slate-800 shadow-sm" v-for="i in attempt.feedback.exactMatches" :key="`exact-${i}`" />
                        <div class="result w-3 h-3 rounded-full bg-white border border-slate-400 shadow-sm" v-for="i in attempt.feedback.colorMatches" :key="`color-${i}`" />
                        <div class="result w-3 h-3 rounded-full bg-slate-200" v-for="i in (4 - attempt.feedback.colorMatches - attempt.feedback.exactMatches)" :key="`empty-${i}`" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Légende compacte -->
        <div class="max-w-xl mx-auto bg-slate-50 rounded-lg border border-slate-200 px-3 py-2">
            <div class="flex items-center justify-center gap-4 text-xs">
                <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-slate-800"></div>
                    <span class="text-slate-600">Bonne pos.</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-white border border-slate-400"></div>
                    <span class="text-slate-600">Mauvaise pos.</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-slate-200"></div>
                    <span class="text-slate-600">Absent</span>
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