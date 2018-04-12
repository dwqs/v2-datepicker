<template>
    <transition name="zoom-in-top">
        <div class="v2-picker-panel-wrap" v-show="shown" :style="position">
            <short-cuts v-if="shownSideBar" :shortcuts="pickerOptions.shortcuts" @shortcut-click="handleShortcutPick"></short-cuts>
            <div class="v2-picker-panel" :style="{marginLeft: shownSideBar ? '110px' : '0'}">
                <div class="v2-picker-panel__header">
                    <div class="v2-picker-header__label">
                        <span class="v2-picker-header__label-text" v-html="formatYearMonthText()"></span>
                    </div>
                    <div class="v2-picker-header__toggle v2-picker-header__toggle-prev">
                        <i class="v2-toggle-icon v2-toggle-icon__prev-year" @click="changeYear(-1)"></i>
                        <i class="v2-toggle-icon v2-toggle-icon__prev-month" @click="changeMonth(-1)"></i>
                    </div>
                    <div class="v2-picker-header__toggle v2-picker-header__toggle-next">
                        <i class="v2-toggle-icon v2-toggle-icon__next-month" @click="changeMonth(1)"></i>
                        <i class="v2-toggle-icon v2-toggle-icon__next-year" @click="changeYear(1)"></i>
                    </div>
                </div>
                <div class="v2-picker-panel__content v2-picker-panel__table v2-picker-panel__days-table" @click="selectdCurDate">
                    <div class="v2-picker-panel__table-row v2-picker-panel__week-label">
                        <span v-for="day in weekDaysLabel" :key="day" v-text="day"></span>
                    </div>
                    <div class="v2-picker-panel__table-row" v-for="(row, index) in rows" :key="index">
                        <span v-for="cell in row" :key="cell.index"
                                :class="getCellClasses(cell)"
                                :data-index="cell.index"
                            >
                            <span v-text="cell.text" :data-index="cell.index"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import locals from '../../src/locals';

    import { 
        nextDate, daysOfMonth, isDate, nextYear, nextMonth,
        getDaysOfMonth, getFirstDateOfMonth, getLastDateOfMonth,
        getClearHoursTime, formatDate, contains, getPanelPosition
    } from '../../src/utils';

    import ShortCuts from '../../src/shortcuts.vue';

    export default {
        data () {
            return {
                shown: false,
                position: {
                    top: 0,
                    left: 0
                },

                shownSideBar: false,
                date: new Date(), // 用于初始面板
                displayDate: null, // 日期显示
                rows: [],
                pickerOptions: null,
                lang: 'cn',
                renderRow: 7,
                format: 'yyyy/MM/dd'
            };
        },

        computed: {
            weekDaysLabel () {
                return locals[this.lang] ? locals[this.lang].days : locals['cn'].days;
            }
        },

        watch: {
            date (val) {
                this.initDays();
            }
        },

        methods: {
            initRenderRows () {
                if (this.renderRow === 6) {
                    return [[], [], [], [], [], []];
                } else {
                    return [[], [], [], [], [], [], []];
                }
            },

            initDays () {
                const date = this.date;

                const curYear = date.getFullYear();
                const curMonth = date.getMonth();
                const curDate = date.getDate();
                const curDay = date.getDay();

                const firstDateOfMonth = getFirstDateOfMonth(date);
                const firstWeekDay = firstDateOfMonth.getDay();
                const daysOfMonth = getDaysOfMonth(curYear, curMonth + 1);
                const lastDateOfMonth = getLastDateOfMonth(date);
                const mod = (firstWeekDay + 7) % 7;
                
                const diff = this.renderRow === 6 ? mod : mod + 7;
                const panelStartDate = new Date(curYear, curMonth, firstDateOfMonth.getDate() - diff);
         
                const rows = this.initRenderRows();
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
                        cell.isSelected = isDate(this.displayDate) ? time === getClearHoursTime(new Date(this.displayDate).getTime()) : false;
                        cell.date = d;

                        // disable date
                        if (this.pickerOptions && typeof this.pickerOptions.disabledDate === 'function') {
                            cell.disabled = this.pickerOptions.disabledDate(cell.date);
                        }

                        row.push(cell);
                    }
                    rows[i] = row;
                }

                this.rows = [].concat(rows);
            },

            getCellClasses (cell) {
                const classes = ['v2-picker-panel__table-cell', 'v2-picker-panel__day'];
                classes.push(cell.type);
                if (cell.isToday) {
                    classes.push('today');
                }
                if (cell.isSelected) {
                    classes.push('selected');
                }
                if (cell.disabled) {
                    classes.push('disabled');
                }

                return classes.join(' ');
            },

            changeMonth (delta) {
                const d = this.date;
                this.date = nextMonth(d, delta);
            },

            changeYear (delta) {
                const d = this.date;
                this.date = nextYear(d, delta);
            },

            formatYearMonthText () {
                // 2018&nbsp;年&nbsp;&nbsp;1&nbsp;月
                const d = this.date;
                if (this.lang === 'cn') {
                    return `${d.getFullYear()}&nbsp;年&nbsp;&nbsp;${d.getMonth() + 1}&nbsp;月`;
                } else if (this.lang === 'en') {
                    return `${d.getFullYear()}&nbsp;&nbsp;${locals[this.lang].months.original[d.getMonth()]}`;
                }
            },

            handleShortcutPick (shortcut) {
                if (typeof shortcut.onClick === 'function') {
                    shortcut.onClick(this);
                }
            },

            shortcutPick (date) {
                if (isDate(date)) {
                    this.displayDate = formatDate(date, this.format);
                    this.date = date;
                    this.$emit('select-date', this.date, this.displayDate);
                    this.shown = false;
                }
            },

            getCellInfoByIndex (index) {
                const rowIndex = Math.floor(index / 7);
                const cellIndex = index % 7;
                return this.rows[rowIndex][cellIndex];
            },

            selectdCurDate (e) {
                // Compatible IE9 ~ IE10
                const index = e.target.dataset ? e.target.dataset.index : e.target.getAttribute('data-index');
                if (index) {
                    const cell = this.getCellInfoByIndex(index);
                    if (cell.disabled) {
                        return;
                    }
                    this.displayDate = formatDate(cell.date, this.format);
                    this.date = cell.date;
                    this.$emit('select-date', this.date, this.displayDate);
                    this.shown = false;
                }
            }
        },

        components: {
            ShortCuts
        },

        created () {

        },

        mounted () {
            this.$on('pick', this.shortcutPick);
            this.$nextTick(() => {
                if (this.pickerOptions && this.pickerOptions.shortcuts && Array.isArray(this.pickerOptions.shortcuts) && this.pickerOptions.shortcuts.length) {
                    this.shownSideBar = true;
                }
            });
        }
    };
</script>
