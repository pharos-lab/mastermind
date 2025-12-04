<template>
    <div class="flex flex-col h-screen text-slate-800">
        <header class="flex items-center gap-4 p-4 border-b-4 border-sky-500 shadow-lg">
            <div class="brand">Mastermind</div>
            <div class="links grow flex justify-end">
                <nav>
                    <ul>
                        <li>
                            <a href="">Règles</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="actions">
                Avatar
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
        </div>
    </div>
</template>

<script setup lang="ts">
import Board from './components/Board.vue';
import Commands from './components/Commands.vue';
import Info from './components/Info.vue';
import { useMastermind } from './utils/useMastermind';


const mastermind = useMastermind()

mastermind.initiate()

console.log(mastermind.game.value.code);


</script>

<style scoped>

</style>
