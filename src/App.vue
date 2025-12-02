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

        <div class="mastermind flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-4 p-4 lg:p-8 bg-slate-50 grow">
            <Info />

            <Commands />

            <Board />
        </div>
    </div>
</template>

<script setup lang="ts">
import Board from './components/Board.vue';
import Commands from './components/Commands.vue';
import Info from './components/Info.vue';


</script>

<style scoped>

</style>
