<template>
    <div class="flex flex-col h-screen">
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

        <div class="mastermind flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-4 p-8 bg-slate-50 grow">
            <div class="info order-1 p-4 ring ring-slate-500 shadow-lg rounded-lg">1</div>

            <div class="commands order-3 lg:order-2 lg:order-none lg:row-start-2  lg:row-span-2 p-4 ring ring-slate-500 shadow-lg rounded-lg">
                2
            </div>

            <div class="board order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3 p-4 ring ring-slate-500 shadow-lg rounded-lg grow">3</div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
