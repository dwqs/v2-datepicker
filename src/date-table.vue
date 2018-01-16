<template>
    <div class="v2-picker-panel__content">
        <div class="v2-picker-panel__week-label">
            <span v-for="day in weekDaysLabel" :key="day" v-text="day"></span>
        </div>
        <div class="v2-picker-panel__table v2-picker-panel__days-table">
            <div class="v2-picker-panel__table-row" v-for="(row, index) in rows" :key="index">
                <span v-for="cell in row" :key="cell.index"
                        :class="getCellClasses(cell)"
                        @click="selectdCurDate(cell)"
                    >
                    <span v-text="cell.text"></span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import locals from './locals';

    import { 
        nextDate, daysOfMonth, isDate, nextYear, nextMonth,
        getDaysOfMonth, getFirstDateOfMonth, getLastDateOfMonth,
        getClearHoursTime, formatDate, contains
    } from './utils';

    export default {
        props: {
            date: {

            },

            lang: String
        },

        data () {
            return {
                curDate: '',
                selectedDate: '',
                rows: [[], [], [], [], [], []]
            };
        },

        computed: {
            weekDaysLabel () {
                return locals[this.lang] ? locals[this.lang].days : locals['cn'].days;
            }
        },

        watch: {
            date (val) {
                this.curDate = val;
            },
            curDate (val) {
                this.initDays();
            }
        },

        methods: {
            initDays () {
                const date = this.curDate;

                const curYear = date.getFullYear();
                const curMonth = date.getMonth();
                const curDate = date.getDate();
                const curDay = date.getDay();

                const firstDateOfMonth = getFirstDateOfMonth(date);
                const firstWeekDay = firstDateOfMonth.getDay();
                const daysOfMonth = getDaysOfMonth(curYear, curMonth + 1);
                const lastDateOfMonth = getLastDateOfMonth(date);
                const mod = firstWeekDay === 0 ? 7 : firstWeekDay % 7;

                const panelStartDate = new Date(curYear, curMonth, firstDateOfMonth.getDate() - mod);
         
                const rows = [[], [], [], [], [], []];
                const minTime = firstDateOfMonth.getTime();
                const maxTime = lastDateOfMonth.getTime();
                let index = 0;

                console.log('ppppppsss', panelStartDate);
                console.log('start and end', firstDateOfMonth, lastDateOfMonth);

                for (let i = 0, l = rows.length; i < l; i++) {
                    const row = rows[i];
                    for (let j = 0; j < 7; j++) {
                        const cell = {};
                        index = i * 7 + j;
                        const d = nextDate(panelStartDate, index);
                        const time = d.getTime();
                        cell.index = index;
                        cell.text = d.getDate();
                        cell.type = time < minTime ? 'prev-month' : time > maxTime ? 'next-month' : 'normal';
                        cell.isToday = time === getClearHoursTime(Date.now());
                        cell.isSelected = isDate(this.selectedDate) ? time === getClearHoursTime(new Date(this.selectedDate).getTime()) : false;
                        cell.date = d;
                        row.push(cell);
                    }
                    rows[i] = row;
                }
                this.rows = [].concat(rows);
            },

            getCellClasses (cell) {
                const classes = ['v2-picker-panel__table-cell', 'v2-picker-panel__range-day'];
                classes.push(cell.type);
                if (cell.isToday && !this.selectedDate) {
                    classes.push('today');
                }
                if (cell.isSelected) {
                    classes.push('selected');
                }
                return classes.join(' ');
            },

            selectdCurDate (cell) {

            }
        },  

        created () {
            this.curDate = isDate(this.date) ? new Date(this.date) : new Date();
        }
    };
</script>
