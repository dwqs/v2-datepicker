<template>
    <div class="v2-datepicker-demo">
        <h3>日期选择：{{selectedDate}}</h3>
        <v2-datepicker v-model="selectedDate"></v2-datepicker>
        <h3>日期区间选择：{{dateRange}}</h3>
        <v2-datepicker-range v-model="dateRange"></v2-datepicker-range>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selectedDate: '',
                dateRange: []
            };
        },

        watch: {
            selectedDate (val) {
                console.log('111111--------selectedDate', val);
            },
            dateRange (val) {
                console.log('222222--------dateRange', val);
            }
        }
    };
</script>