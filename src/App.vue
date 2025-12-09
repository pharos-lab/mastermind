<template>
    <div class="flex flex-col h-screen text-slate-800">
        <header class="relative bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 shadow-lg">
            <!-- Effet de texture subtile -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            
            <div class="relative max-w-7xl mx-auto px-4 lg:px-8 py-2">
                <div class="flex items-center justify-between">
                    <!-- Logo et titre -->
                    <div class="flex items-center gap-4">
                        <div class="relative group">
                            <div class="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition"></div>
                            <div class="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl">
                                <svg class="w-7 h-7 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="6" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="9" stroke-width="2"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white tracking-tight">Mastermind</h1>
                            <p class="text-xs text-sky-100 font-medium">Décodez la combinaison secrète</p>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <nav class="flex items-center gap-3">
                        <!-- Stats rapides (desktop) -->
                        <div class="hidden lg:flex items-center gap-4 mr-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <div class="text-center">
                                <p class="text-xs text-sky-100 font-medium">Parties</p>
                                <p class=" font-bold text-white">{{ mastermind.profile.value.totalGames }}</p>
                            </div>
                            <div class="w-px h-8 bg-white/20"></div>
                            <div class="text-center">
                                <p class="text-xs text-sky-100 font-medium">Victoires</p>
                                <p class=" font-bold text-green-300">{{ mastermind.profile.value.gamesWon }}</p>
                            </div>
                            <div class="w-px h-8 bg-white/20"></div>
                            <div class="text-center">
                                <p class="text-xs text-sky-100 font-medium">Win rate</p>
                                <p class=" font-bold text-amber-300">
                                    {{ mastermind.profile.value.totalGames > 0 ? Math.round((mastermind.profile.value.gamesWon / mastermind.profile.value.totalGames) * 100) : 0 }}%
                                </p>
                            </div>
                        </div>

                        <!-- Bouton Règles -->
                        <a 
                            href="#" 
                            class="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium text-sm transition-all border border-white/20 hover:border-white/30"
                        >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="hidden sm:inline">Règles</span>
                        </a>

                        <!-- Avatar
                        <div class="relative group cursor-pointer">
                            <div class="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition"></div>
                            <div class="relative w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-base font-bold shadow-xl ring-2 ring-white/50 hover:scale-110 transition-transform">
                                {{ mastermind.profile.value.name.charAt(0).toUpperCase() }}
                            </div>
                        </div> -->

                        <!-- Avatar avec popover -->
                        <Popover>
                            <PopoverTrigger as-child>
                                <div class="relative group cursor-pointer">
                                    <div class="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition"></div>
                                    <div class="relative w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm lg:text-base font-bold shadow-xl ring-2 ring-white/50 hover:scale-110 transition-transform">
                                        {{ mastermind.profile.value.name.charAt(0).toUpperCase() }}
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent class="w-80 p-0 overflow-hidden" align="end">
                                <!-- Profil -->
                                <div class="bg-gradient-to-r from-sky-50 to-blue-50 p-3 border-b border-slate-200">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <div class="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {{ mastermind.profile.value.name.charAt(0).toUpperCase() }}
                                            </div>
                                            <div>
                                                <p class="font-semibold text-slate-800">{{ mastermind.profile.value.name }}</p>
                                                <p class="text-xs text-slate-500">Joueur</p>
                                            </div>
                                        </div>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Edit class="w-4 h-4 text-sky-500 hover:text-sky-600 cursor-pointer" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Modifier le nom</DialogTitle>
                                                <input 
                                                    type="text" 
                                                    v-model="mastermind.profile.value.name" 
                                                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                                                />
                                                <DialogClose>
                                                    <Button class="w-full mt-2">Valider</Button>
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>

                                <!-- Stats -->
                                <div class="p-3">
                                    <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Statistiques</p>
                                    <div class="grid grid-cols-3 gap-2 text-center">
                                        <div class="bg-slate-50 p-2 rounded-lg">
                                            <p class="text-lg font-bold text-slate-800">{{ mastermind.profile.value.totalGames }}</p>
                                            <p class="text-xs text-slate-500">Parties</p>
                                        </div>
                                        <div class="bg-green-50 p-2 rounded-lg">
                                            <p class="text-lg font-bold text-green-600">{{ mastermind.profile.value.gamesWon }}</p>
                                            <p class="text-xs text-slate-500">Victoires</p>
                                        </div>
                                        <div class="bg-red-50 p-2 rounded-lg">
                                            <p class="text-lg font-bold text-red-600">{{ mastermind.profile.value.gamesLost }}</p>
                                            <p class="text-xs text-slate-500">Défaites</p>
                                        </div>
                                    </div>
                                    <div class="mt-3 pt-3 border-t border-slate-200">
                                        <div class="flex justify-between text-sm">
                                            <span class="text-slate-600">Win rate</span>
                                            <span class="font-bold text-slate-800">
                                                {{ mastermind.profile.value.totalGames > 0 ? Math.round((mastermind.profile.value.gamesWon / mastermind.profile.value.totalGames) * 100) : 0 }}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Progression -->
                                <div class="px-3 pb-3">
                                    <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Partie en cours</p>
                                    <div class="flex justify-between text-xs text-slate-600 mb-1">
                                        <span>Progression</span>
                                        <span>{{ Math.round((mastermind.game.value.currentAttemptIndex / mastermind.game.value.maxAttempts) * 100) }}%</span>
                                    </div>
                                    <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div 
                                            class="h-full transition-all duration-300 rounded-full"
                                            :class="mastermind.game.value.currentAttemptIndex >= mastermind.game.value.maxAttempts - 2 ? 'bg-red-500' : 'bg-sky-500'"
                                            :style="{ width: `${(mastermind.game.value.currentAttemptIndex / mastermind.game.value.maxAttempts) * 100}%` }"
                                        />
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div class="border-t border-slate-200 p-3">
                                    <Dialog>
                                        <DialogTrigger as-child>
                                            <Button variant="outline" size="sm" class="w-full text-red-600 border-red-300 hover:bg-red-50">
                                                🚫 Abandonner
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Abandonner la partie</DialogTitle>
                                            <p class="text-sm text-slate-600">Êtes-vous sûr ? Cela comptera comme une défaite.</p>
                                            <div class="flex gap-2 justify-end mt-4">
                                                <DialogClose><Button variant="outline" size="sm">Annuler</Button></DialogClose>
                                                <DialogClose><Button variant="destructive" size="sm" @click="mastermind.abandonGame">Abandonner</Button></DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </nav>
                </div>
            </div>
        </header>

        <div class="mastermind flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-4 p-4 lg:p-6 bg-slate-50 grow">
            <Info 
                :profile="mastermind.profile" 
                :game="mastermind.game"
                @new-game="mastermind.newGame"
                @abandon-game="mastermind.abandonGame"
            />

            <Commands 
                :game="mastermind.game" 
                @addColor="mastermind.addColor" 
                @resetColor="mastermind.resetColor" 
                @undoColor="mastermind.undoColor" 
                @submitColors="mastermind.submitColors"
            />



            <Board :game="mastermind.game" />

        </div>
    </div>

    <!-- Dialog fin de partie -->
    <Dialog :open="mastermind.game.value.status !== 'playing'">
        <DialogContent>
            <DialogTitle class="text-center text-2xl">
                {{ mastermind.game.value.status === 'won' ? '🎉 Victoire !' : '😔 Défaite' }}
            </DialogTitle>
            
            <div class="py-6 space-y-4">
                <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="text-center">
                        <p class="text-sm text-slate-600">Score final</p>
                        <p class="text-2xl font-bold text-amber-600">{{ mastermind.game.value.score }}</p>
                    </div>

                    <div class="text-center">
                        <p class="text-sm text-slate-600">Tentatives</p>
                        <p class="text-2xl font-bold text-slate-800">{{ mastermind.game.value.currentAttemptIndex }}</p>
                    </div>
                </div>

                <!-- Code secret révélé -->
                <div class="bg-slate-50 p-4 rounded-lg">
                    <p class="text-xs text-center text-slate-600 mb-2">Code secret</p>
                    <div class="flex gap-2 justify-center">
                        <div 
                            v-for="(color, index) in mastermind.game.value.code"
                            :key="index"
                            class="w-10 h-10 rounded-full shadow-md"
                            :class="getColorClass(color)"
                        />
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="space-y-2">
                <Button @click="mastermind.newGame" class="w-full bg-green-500 hover:bg-green-600 text-lg py-6">
                    🎮 Rejouer
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import Board from './components/Board.vue';
import Commands from './components/Commands.vue';
import Info from './components/Info.vue';
import { useMastermind } from './utils/useMastermind';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from './components/ui/dialog';
import { Button } from './components/ui/button';
import type { Color } from './types';
import { Edit } from 'lucide-vue-next';


const mastermind = useMastermind()

mastermind.initiate()

console.log(mastermind.game.value.code);

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

<style scoped>

</style>
