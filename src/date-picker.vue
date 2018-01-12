<template>
    <div :class="[
        'v2-date-wrap',
        {
            'is-disabled': disabled
        }

    ]">
        <span ref="trigger" :class="['v2-picker-trigger', {'empty-text': !selectedDate}]" @click="handleTriggerClick">{{selectedDate ? selectedDate : _placeholder}}</span>
        <i :class="['v2-trigger-icon', { 'active': shown }]" v-if="trigger"></i>
        <transition name="zoom-in-top">
            <div class="v2-picker-panel-wrap" v-show="shown">
                <div class="v2-picker-panel">
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
                                    {{cell.text}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import locals from './locals';

    import { 
        nextDate, daysOfMonth, isDate,
        getDaysOfMonth, getFirstDateOfMonth, getLastDateOfMonth,
        getClearHoursTime, formatDate
    } from './utils';

    export default {
        name: 'v2-datepicker',
        props: {
            value: {},
            type: {
                type: String,
                default: 'date',
                validator: val => ['date', 'daterange'].includes(val)
            },
            lang: {
                type: String,
                default: 'cn',
                validator: val => ['cn', 'en'].includes(val)
            },
            format: {
                type: String,
                default: 'yyyy/MM/dd'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '' 
            },
            trigger: {
                type: Boolean,
                default: true
            }
        },

        data () {
            return {
                view: 'day',
                selectedDate: '',
                curDate: '',
                shown: false,
                rows: [[], [], [], [], [], [], []]
            };
        },

        computed: {
            _placeholder () {
                return this.placeholder ? this.placeholder : this.lang === 'cn' ? '选择日期' : 'Choosing date...';
            },

            weekDaysLabel () {
                return locals[this.lang] ? locals[this.lang].days : locals['cn'].days;
            }
        },

        watch: {
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
                const mod = (firstWeekDay + 7) % 7;
                
                const panelStartDate = new Date(curYear, curMonth, firstDateOfMonth.getDate() - (mod + 7));
                const daysOfPreMonth = getDaysOfMonth(panelStartDate.getFullYear(), panelStartDate.getMonth() + 1);

                // firstWeekDay = (firstWeekDay === 0 ? 7 : firstWeekDay);
         
                const rows = [[], [], [], [], [], [], []];
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
                        row.push(cell);
                    }
                    rows[i] = row;
                }

                this.rows = [].concat(rows);
            },

            getCellClasses (cell) {
                const classes = ['v2-picker-panel__table-cell', 'v2-picker-panel__day'];
                classes.push(cell.type);
                if (cell.isToday && !this.selectedDate) {
                    classes.push('today');
                }
                if (cell.isSelected) {
                    classes.push('selected');
                }
                return classes.join(' ');
            },

            getDefPlaceholder () {
                if (type === 'daterange') {
                    return this.lang === 'cn' ? '开始时间 - 结束时间' : 'Choosing date...';
                }
                return this.lang === 'cn' ? '选择日期' : 'Choosing date...';
            },

            formatYearMonthText () {
                // 2018&nbsp;年&nbsp;&nbsp;1&nbsp;月
                const d = this.curDate;
                if (this.lang === 'cn') {
                    return `${d.getFullYear()}&nbsp;年&nbsp;&nbsp;${d.getMonth() + 1}&nbsp;月`;
                } else if (this.lang === 'en') {
                    return `${d.getFullYear()}&nbsp;&nbsp;${locals[this.lang].months.original[d.getMonth()]}`;
                }
            },

            changeMonth (delta) {
                const d = this.curDate;
                this.curDate = new Date(d.getFullYear(), d.getMonth() + delta, d.getDate());
            },

            changeYear (delta) {
                const d = this.curDate;
                this.curDate = new Date(d.getFullYear() + delta, d.getMonth(), d.getDate());
            },

            selectdCurDate (cell) {
                this.selectedDate = formatDate(cell.date, this.format);
                this.curDate = cell.date;
                this.$emit('input', this.selectedDate);
                this.$emit('change', this.selectedDate);
                this.shown = false;
            },

            contains (root, target) {
                // root 节点是否包含 target 节点
                const isElement = Object.prototype.toString.call(root).includes('Element') && Object.prototype.toString.call(target).includes('Element');
                if (!isElement) {
                    return false;
                }
                let node = target;
                while (node) {
                    if (node === root) {
                        return true;
                    }
                    node = node.parentNode;
                }
                return false;
            },

            handleDocClick (e) {
                const target = e.target;
                if (!this.contains(this.$el, target) && this.shown) {
                    this.shown = false;
                }
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }
                this.shown = !this.shown;
            }
        },

        created () {
            if (!this.value || !isDate(this.value)) {
                this.curDate = new Date(Date.now());
            } else {
                this.curDate = new Date(this.value);
                this.selectedDate = formatDate(this.curDate, this.format);
            }
        },

        mounted () {
            window.document.addEventListener('click', this.handleDocClick, false);
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick);
        }
    };
</script>
