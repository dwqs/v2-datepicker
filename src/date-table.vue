<template>
    <div class="v2-picker-panel__content v2-picker-panel__table v2-picker-panel__days-table" 
        @click="selectdCurDate"
        @mousemove="handleMouseMove">
        <div class="v2-picker-panel__table-row v2-picker-panel__week-label">
            <span v-for="day in weekDaysLabel" :key="day" v-text="day"></span>
        </div>
        <div class="v2-picker-panel__table-row" v-for="(row, j) in rows" :key="j">
            <span v-for="cell in row" :key="cell.index"
                    :class="getCellClasses(cell)"
                    :data-index="cell.index"
                >
                <span v-text="cell.text" :data-index="cell.index"></span>
            </span>
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

            lang: String,
            minDate: '',
            maxDate: '',
            selecting: {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                curDate: null,
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
                if (val) {
                    this.initDays();
                }
            },

            maxDate (val, oldVal) {
                if (val) {
                    this.markRange();
                }
            },

            minDate (val, oldVal) {
                if (val) {
                    this.markRange(val);
                }
            }
        },

        methods: {
            isInRange (date) {
                if (isDate(this.minDate) && isDate(this.maxDate)) {
                    const time = date.getTime();
                    return time >= getClearHoursTime(new Date(this.minDate).getTime()) && time <= getClearHoursTime(new Date(this.maxDate).getTime());
                }

                return false;
            },

            isStartDate (date) {
                if (isDate(this.minDate)) {
                    const time = date.getTime();
                    return time === getClearHoursTime(new Date(this.minDate).getTime());
                }
                return false;
            },

            isEndDate (date) {
                if (isDate(this.maxDate)) {
                    const time = date.getTime();
                    return time === getClearHoursTime(new Date(this.maxDate).getTime());
                }
                return false;
            },

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

                        cell.start = this.isStartDate(d);
                        cell.end = this.isEndDate(d);
                        cell.inRange = this.isInRange(d);

                        row.push(cell);
                    }
                    rows[i] = row;
                }
                this.rows = [].concat(rows);
            },

            getCellClasses (cell) {
                const classes = ['v2-picker-panel__table-cell', 'v2-picker-panel__range-day'];
                classes.push(cell.type);

                if (cell.type === 'normal') {
                    if (cell.isToday) {
                        classes.push('today');
                    }
                    if (cell.inRange) {
                        classes.push('in-range');
                    }
                    if (cell.start) {
                        classes.push('start-date');
                    }
                    if (cell.end) {
                        classes.push('end-date');
                    }

                    if (cell.isSelected) {
                        classes.push('selected');
                    }
                }
                return classes.join(' ');
            },

            getCellInfoByIndex (index) {
                const rowIndex = Math.floor(index / 7);
                const cellIndex = index % 7;
                return this.rows[rowIndex][cellIndex];
            },

            selectdCurDate (e) {
                if (e.target.dataset.index) {
                    const cell = this.getCellInfoByIndex(e.target.dataset.index);
                    if (cell.type === 'normal') {
                        const minTime = getClearHoursTime(this.minDate);
                        const maxTime = getClearHoursTime(cell.date.getTime());

                        if (maxTime < minTime && this.selecting) {
                            return;
                        }

                        this.curDate = cell.date;
                        this.selectedDate = formatDate(cell.date, this.format);
                        this.$emit('range-change', cell.date);
                    }
                }
            },

            markRange (maxDate) {
                if (!maxDate) {
                    maxDate = this.maxDate;
                }
                const maxTime = getClearHoursTime(maxDate);
                const minTime = getClearHoursTime(this.minDate);
                const rows = this.rows;

                for (let i = 0, l = rows.length; i < l; i++) {
                    const row = rows[i];
                    for (let j = 0; j < 7; j++) {
                        const cell = row[j];
                        const d = cell.date;
                        const time = d.getTime();

                        cell.start = time === minTime;
                        cell.end = time === maxTime && maxTime > minTime;
                        cell.inRange = time >= minTime && time <= maxTime;
                    }               
                    rows[i] = row;
                }
                this.rows = [].concat(rows);
            },

            handleMouseMove (e) {
                if (this.selecting) {
                    if (e.target.dataset.index) {
                        const index = e.target.dataset.index;
                        const cell = this.getCellInfoByIndex(index);
                        this.$emit('end-date-change', cell.date);
                    }
                }
            }
        },  

        created () {
            this.curDate = isDate(this.date) ? this.date : new Date();
        }
    };
</script>
