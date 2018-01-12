<template>
    <div class="v2-datepicker-demo">
        <v2-datepicker v-model="selectedDate"></v2-datepicker>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selectedDate: ''
            };
        },

        watch: {
            selectedDate (val) {
                console.log('111111--------selectedDate', val);
            }
        }
    };
</script>