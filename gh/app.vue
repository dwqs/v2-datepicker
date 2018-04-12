<template>
    <div class="v2-datepicker-demo">
        <v-header></v-header>
        <!-- <v-start></v-start> -->
        <v-main></v-main>
    </div>
</template>

<script>
    import Header from './components/header/index.vue';
    import Start from './components/start/index.vue';
    import Main from './components/main/index.vue';

    export default {
        components: {
            'v-header': Header,
            'v-start': Start,
            'v-main': Main
        }
    };
</script>

<style>
    .v2-datepicker-demo {
        width: 960px;
        height: 200px;
        margin: 0 auto;
    }
</style>