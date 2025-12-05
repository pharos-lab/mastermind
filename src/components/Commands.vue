<template>
    <section class="commands order-3 lg:order-2 lg:order-none lg:row-start-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- Header -->
        <div class="p-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
            <h3 class="text-sm font-semibold text-slate-800">Commandes</h3>
            <p class="text-xs text-slate-500 mt-1">Sélectionnez vos couleurs</p>
        </div>

        <div class="p-4 space-y-6">
            <!-- Palette de couleurs -->
            <div>
                <label class="text-xs font-medium text-slate-600 uppercase tracking-wider block mb-3">
                    Palette
                </label>
                <div class="grid grid-cols-3 lg:grid-cols-6 gap-3">
                    <button 
                        class="aspect-square rounded-xl bg-red-500 hover:scale-110 active:scale-95 transition-transform shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'red')"
                        aria-label="Rouge"
                    />
                    <button 
                        class="aspect-square rounded-xl bg-orange-500 hover:scale-110 active:scale-95 transition-transform shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'orange')"
                        aria-label="Orange"
                    />
                    <button 
                        class="aspect-square rounded-xl bg-yellow-400 hover:scale-110 active:scale-95 transition-transform shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'yellow')"
                        aria-label="Jaune"
                    />
                    <button 
                        class="aspect-square rounded-xl bg-green-500 hover:scale-110 active:scale-95 transition-transform shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'green')"
                        aria-label="Vert"
                    />
                    <button 
                        class="aspect-square rounded-xl bg-blue-500 hover:scale-110 active:scale-95 transition-transform shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'blue')"
                        aria-label="Bleu"
                    />
                    <button 
                        class="aspect-square rounded-xl bg-purple-500 hover:scale-110 active:scale-95 transition-transform shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('addColor', 'purple')"
                        aria-label="Violet"
                    />
                </div>
            </div>

            <!-- Tentative actuelle -->
            <div>
                <label class="text-xs font-medium text-slate-600 uppercase tracking-wider block mb-3">
                    Tentative actuelle
                </label>
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border-2 border-dashed border-slate-300">
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
            <div class="space-y-2">
                <div class="grid grid-cols-2 gap-2">
                    <button 
                        class="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 border border-slate-300" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('resetColor')"
                    >
                        🔄 Effacer
                    </button>
                    <button 
                        class="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-100 border border-slate-300" 
                        :disabled="game.value.status != 'playing'" 
                        @click="$emit('undoColor')"
                    >
                        ↶ Annuler
                    </button>
                </div>
                <button 
                    class="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-base transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:from-green-500 disabled:to-emerald-500 disabled:shadow-md" 
                    :disabled="game.value.status != 'playing'" 
                    @click="$emit('submitColors')"
                >
                    ✓ Valider la tentative
                </button>
            </div>
        </div>

        <!-- Aide -->
        <div class="border-t border-slate-200 bg-slate-50 p-4">
            <div class="flex gap-2 items-center text-xs text-slate-600">
                <span class="font-semibold">💡 Astuce:</span>
                <div class="">
                    <p>Pion noir = bonne position</p>
                    <p>pion blanc = mauvaise position</p>
                </div>
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