<template>
    <section class="info order-1 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <!-- Header avec nom -->
        <div class="p-2 lg:p-3 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-slate-200">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {{ profile.value.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-slate-800">{{ profile.value.name }}</p>
                        <p class="text-xs text-slate- hidden lg:block">Joueur</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Edit class="w-4 h-4 text-sky-500 hover:text-sky-600 cursor-pointer transition-colors" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Modifier le nom</DialogTitle>
                        <input 
                            type="text" 
                            v-model="profile.value.name" 
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Votre nom"
                        />
                        <DialogClose>
                            <Button class="w-full mt-2">Valider</Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            </div>
        </div>

        <!-- Partie en cours -->
        <div class="p-2 lg:p-3">
            <!-- Stats en jeu -->
            <div class="grid grid-cols-2 gap-2">
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 px-3 py-1 lg:p-2 rounded-lg border border-amber-200 flex justify-between items-center lg:block">
                    <p class="text-xs text-amber-700 font-medium">Score</p>
                    <p class="lg:text-xl font-bold text-amber-900">{{ game.value.score }}</p>
                </div>
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-1 lg:p-2 rounded-lg border border-blue-200 flex justify-between items-center lg:block">
                    <p class="text-xs text-blue-700 font-medium">Tentative</p>
                    <p class="lg:text-xl font-bold text-blue-900">
                        {{ game.value.currentAttemptIndex }}<span class="text-sm text-blue-600">/{{ game.value.maxAttempts }}</span>
                    </p>
                </div>
            </div>

            <!-- Barre de progression -->
            <div class="hidden lg:block mt-4">
                <div class="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Progression</span>
                    <span>{{ Math.round((game.value.currentAttemptIndex / game.value.maxAttempts) * 100) }}%</span>
                </div>

                <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                        class="h-full transition-all duration-300 rounded-full"
                        :class="game.value.currentAttemptIndex >= game.value.maxAttempts - 2 ? 'bg-red-500' : 'bg-sky-500'"
                        :style="{ width: `${(game.value.currentAttemptIndex / game.value.maxAttempts) * 100}%` }"
                    />
                </div>
            </div>
        </div>

        <!-- Statut de fin / Abandonner -->
        <div class="p-2 hidden lg:block">
            <div v-if="game.value.status !== 'playing'" 
                class="p-3 rounded-lg text-center"
                :class="game.value.status === 'won' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'"
            >
                <p class="font-bold text-sm mb-2"
                    :class="game.value.status === 'won' ? 'text-green-700' : 'text-red-700'"
                >
                    {{ game.value.status === 'won' ? '🎉 Victoire !' : '😔 Défaite' }}
                </p>
                <Button 
                    variant="outline" 
                    size="sm"
                    class="w-full border-green-500 text-green-700 hover:bg-green-50"
                    @click="$emit('newGame')"
                >
                    🎮 Nouvelle partie
                </Button>
            </div>

            <Dialog v-else>
                <DialogTrigger class="w-full">
                    <Button variant="outline" size="sm" class="w-full text-red-600 border-red-300 hover:bg-red-50">
                        🚫 Abandonner
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Abandonner la partie</DialogTitle>
                    <p class="text-sm text-slate-600">Êtes-vous sûr de vouloir abandonner la partie en cours ? Cette action comptera comme une défaite.</p>
                    <div class="flex gap-2 justify-end mt-4">
                        <DialogClose>
                            <Button variant="outline" size="sm">Annuler</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant="destructive" size="sm" @click="$emit('abandonGame')">
                                Abandonner
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Edit } from 'lucide-vue-next';
import type { Profile, Game } from '../types'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import type { Ref } from 'vue';

interface Props {
    profile: Ref<Profile>;
    game: Ref<Game>;
}

defineProps<Props>();
</script>