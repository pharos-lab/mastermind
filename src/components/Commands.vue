<template>
    <section class="commands order-3 lg:order-2 lg:order-none lg:row-start-2 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <!-- Header -->
        <div class="hidden lg:block p-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
            <h3 class="text-sm font-semibold text-slate-800">Commandes</h3>
        </div>

        <div class="p-2 lg:p-3 space-y-3">
            <!-- Palette de couleurs -->
            <div>
                <label class="hidden lg:block text-xs font-medium text-slate-600 uppercase tracking-wider block mb-2">
                    Palette
                </label>
                <div class="grid grid-cols-6 gap-2">
                    <button 
                        class="aspect-square rounded-lg bg-red-500 hover:scale-105 active:scale-95 transition-transform shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'red')"
                        aria-label="Rouge"
                    />
                    <button 
                        class="aspect-square rounded-lg bg-orange-500 hover:scale-105 active:scale-95 transition-transform shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'orange')"
                        aria-label="Orange"
                    />
                    <button 
                        class="aspect-square rounded-lg bg-yellow-400 hover:scale-105 active:scale-95 transition-transform shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'yellow')"
                        aria-label="Jaune"
                    />
                    <button 
                        class="aspect-square rounded-lg bg-green-500 hover:scale-105 active:scale-95 transition-transform shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'green')"
                        aria-label="Vert"
                    />
                    <button 
                        class="aspect-square rounded-lg bg-blue-500 hover:scale-105 active:scale-95 transition-transform shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'blue')"
                        aria-label="Bleu"
                    />
                    <button 
                        class="aspect-square rounded-lg bg-purple-500 hover:scale-105 active:scale-95 transition-transform shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'purple')"
                        aria-label="Violet"
                    />
                </div>
            </div>

            <!-- Tentative actuelle -->
            <div class="hidden lg:block">
                <label class="text-xs font-medium text-slate-600 uppercase tracking-wider block mb-2">
                    Tentative actuelle
                </label>
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 p-3 rounded-lg border border-dashed border-slate-300">
                    <div class="flex gap-2 justify-center">
                        <div 
                            v-for="color in game.value.currentAttempt" 
                            :key="'current-attempt-' + color"
                            class="w-12 h-12 rounded-full border-2  shadow-inner"
                            :class="getColorClass(color)"
                        />

                        <div 
                            v-for="n in 4 - (game.value.currentAttempt.length)" 
                            :key="'current-attempt-' + n"
                            class="w-12 h-12 rounded-full border-2 bg-white border-slate-300 shadow-inner"
                        />
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 lg:block lg:space-y-2">
                <div class="hidden lg:grid grid-cols-2 gap-2">
                    <button 
                        class="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 border border-slate-300" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('resetColor')"
                    >
                        🔄 Effacer
                    </button>
                    <button 
                        class="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 border border-slate-300" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('undoColor')"
                    >
                        ↶ Annuler
                    </button>
                </div>
                <button 
                    class="lg:hidden px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 border border-slate-300" 
                    :disabled="game.value.status != 'playing'" 
                    @click="$emit('undoColor')"
                >
                    ↶ Annuler
                </button>

                <button 
                    class="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:from-green-500 disabled:to-emerald-500 disabled:shadow-sm" 
                    :disabled="game.value.status != 'playing'" 
                    @click="$emit('submitColors')"
                >
                    ✓ Valider
                </button>
            </div>
        </div>

        <!-- Aide -->
        <div class="hidden lg:block border-t border-slate-200 bg-slate-50 p-2">
            <div class="flex gap-2 text-xs text-slate-600 items-center">
                <span class="font-semibold">💡</span>
                <p class="flex items-center gap-2">
                    <span class="block size-4 bg-black rounded-full"></span> = bonne position., 
                    <span class="block size-4 bg-white rounded-full border"></span> = mauvaise position.</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { Color, Game } from '../types'

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