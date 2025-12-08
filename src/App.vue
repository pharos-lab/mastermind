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
                                <p class=" font-bold text-white">{{ mastermind.profile.value.totalGames }}3</p>
                            </div>
                            <div class="w-px h-8 bg-white/20"></div>
                            <div class="text-center">
                                <p class="text-xs text-sky-100 font-medium">Victoires</p>
                                <p class=" font-bold text-green-300">{{ mastermind.profile.value.gamesWon }}1</p>
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

                        <!-- Avatar -->
                        <div class="relative group cursor-pointer">
                            <div class="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition"></div>
                            <div class="relative w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-base font-bold shadow-xl ring-2 ring-white/50 hover:scale-110 transition-transform">
                                {{ mastermind.profile.value.name.charAt(0).toUpperCase() }}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

        <div class="mastermind flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-4 p-4 lg:p-6 bg-slate-50 grow">
            <Info 
                :profile="mastermind.profile.value" 
                :game="mastermind.game"
                @new-game="mastermind.newGame"
                @abandon-game="mastermind.abandonGame"
            />

            <Commands 
                :game="mastermind.game" 
                @addColor="mastermind.addColor" 
                @resetColor="mastermind.resetGame" 
                @undoColor="mastermind.undoColor" 
                @submitColors="mastermind.submitColors"
            />



            <Board :game="mastermind.game" />

            <Boardd :game="mastermind.game"></Boardd>
        </div>
    </div>
</template>

<script setup lang="ts">
import Board from './components/Board.vue';
import Boardd from './components/Boardd.vue';
import Commands from './components/Commands.vue';
import Info from './components/Info.vue';
import { useMastermind } from './utils/useMastermind';


const mastermind = useMastermind()

mastermind.initiate()

console.log(mastermind.game.value.code);


</script>

<style scoped>

</style>
