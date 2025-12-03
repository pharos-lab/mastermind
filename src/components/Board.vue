<template>
    <section class="board-wrapper order-2 lg:order-3 lg:col-start-2 lg:col-span-2 lg:row-span-3">
        <div class="board w-96 mx-auto border rounded-lg shadow-lg divide-y">
            <div class="attempt flex" v-for="n in 12">
                <div class="code flex grow gap-2 justify-between items-center py-2 px-4">
                    <div class="color size-8 rounded-full bg-slate-200" v-for="n in 4">

                    </div>
                </div>

                <div class="results p-2 grid grid-cols-2 gap-2">
                    <div class="result size-4 rounded-full bg-slate-300" v-for="n in 4"></div>
                </div>
            </div>
        </div>
    </section>
</template>