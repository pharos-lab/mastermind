<template>
    <section class="info order-1 p-4 ring ring-slate-500 shadow-lg rounded-lg">
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="text-center">
                <p class="text-sm text-slate-600">Joueur</p>
                <p class="font-semibold text-lg">{{ profile.name }}</p>
            </div>
            <div class="text-center">
                <p class="text-sm text-slate-600">Score</p>
                <p class="font-semibold text-lg">{{ game.score }}</p>
            </div>
        </div>

        <!-- <div v-if="isPlaying" class="border-t pt-4">
            <div class="flex justify-between items-center text-sm">
                <span class="text-slate-600">Tentatives restantes</span>
                <span class="font-bold text-lg" :class="attemptsRemaining <= 2 ? 'text-red-600' : 'text-slate-800'">
                    {{ attemptsRemaining }}
                </span>
            </div>
        </div> -->

        <div v-if="game.status" class="border-t pt-4">
            <div class="text-center">
                <p v-if="game.status === 'won'" class="text-green-600 font-bold">
                    🎉 Victoire !
                </p>
                <p v-else class="text-red-600 font-bold">
                    😔 Défaite
                </p>
            </div>
        </div>

        <!-- <div class="border-t pt-4 mt-4 text-sm text-slate-600">
            <div class="flex justify-between">
                <span>Parties jouées</span>
                <span class="font-semibold">{{ profile.totalGames }}</span>
            </div>
            <div class="flex justify-between mt-1">
                <span>Victoires</span>
                <span class="font-semibold text-green-600">{{ profile.gamesWon }}</span>
            </div>
            <div class="flex justify-between mt-1">
                <span>Défaites</span>
                <span class="font-semibold text-red-600">{{ profile.gamesLost }}</span>
            </div>
        </div> -->
    </section>
</template>

<script setup lang="ts">
import type { Profile, Game } from '../types'

interface Props {
    profile: Profile;
    game: Game;
    // isPlaying: boolean;
    // attemptsRemaining: number;
}

defineProps<Props>();
</script>