<template>
    <transition name="zoom-in-top">
            <div class="v2-picker-panel-wrap v2-picker-range-panel-wrap" ref="panel" v-show="shown" :style="position">
                <short-cuts v-if="shownSideBar" :shortcuts="pickerOptions.shortcuts" @shortcut-click="handleShortcutPick"></short-cuts>
                <div class="v2-picker-range-panel v2-picker-range__left-panel" :style="{marginLeft: shownSideBar ? '110px' : '0'}">
                    <div class="v2-picker-panel__header">
                        <div class="v2-picker-header__label">
                            <span class="v2-picker-header__label-text" v-html="formatYearMonthText(1)"></span>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-prev">
                            <i class="v2-toggle-icon v2-toggle-icon__prev-year v2-toggle-icon__left-prev-year" @click="changeLeftYear(-1)"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__prev-month v2-toggle-icon__left-prev-month" @click="changeLeftMonth(-1)"></i>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-next" v-if="unlinkPanels">
                            <i :class="[
                                'v2-toggle-icon v2-toggle-icon__next-month v2-toggle-icon__left-next-month',
                                {
                                    'v2-toggle-icon-disabled': disableLinkMonth
                                }
                            ]" @click="changeLeftMonth(1)"></i>
                            <i :class="[
                                'v2-toggle-icon v2-toggle-icon__next-year v2-toggle-icon__left-next-year',
                                {
                                    'v2-toggle-icon-disabled': disableLinkYear
                                }
                            ]" @click="changeLeftYear(1)"></i>
                        </div>
                    </div>
                    <date-table
                        :lang="lang"
                        :date="leftDate"
                        :min-date="startDate"
                        :max-date="endDate"
                        :selecting="selecting"
                        :options="pickerOptions"
                        @end-date-change="handleEndDateChange"
                        @range-change="handleRangeChange">
                    </date-table>
                </div>
                <div class="v2-picker-range-panel v2-picker-range__right-panel">
                    <div class="v2-picker-panel__header">
                        <div class="v2-picker-header__label">
                            <span class="v2-picker-header__label-text" v-html="formatYearMonthText(2)"></span>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-prev" v-if="unlinkPanels">
                            <i :class="[
                                'v2-toggle-icon v2-toggle-icon__prev-year v2-toggle-icon__right-prev-year',
                                {
                                    'v2-toggle-icon-disabled': disableLinkYear
                                }
                            ]" @click="changeRightYear(-1)"></i>
                            <i :class="[
                                'v2-toggle-icon v2-toggle-icon__prev-month v2-toggle-icon__right-prev-month',
                                {
                                    'v2-toggle-icon-disabled': disableLinkMonth
                                }
                            ]" @click="changeRightMonth(-1)"></i>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-next">
                            <i class="v2-toggle-icon v2-toggle-icon__next-month v2-toggle-icon__right-next-month" @click="changeRightMonth(1)"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__next-year v2-toggle-icon__right-next-year" @click="changeRightYear(1)"></i>
                        </div>
                    </div>
                    <date-table
                        :lang="lang"
                        :date="rightDate"
                        :min-date="startDate"
                        :max-date="endDate"
                        :selecting="selecting"
                        :options="pickerOptions"
                        @end-date-change="handleEndDateChange"
                        @range-change="handleRangeChange">
                    </date-table>
                </div>
            </div>
        </transition>
</template>

<script>
    import locals from 'v2-datepicker/src/locals';

    import { 
        isDate, contains, getPanelPosition,
        nextMonth, nextYear
    } from 'v2-datepicker/src/utils';

    import ShortCuts from 'main/shortcuts.vue';
    import DateTable from './date-table.vue';

    export default {
        data () {
            return {
                shown: false,
                position: {
                    top: 0,
                    left: 0
                },

                shownSideBar: false,
                unlinkPanels: false,

                // 用于初始面板
                rightDate: null, 
                leftDate: null,

                // 选择
                startDate: null,
                endDate: null,
                selecting: false,
                clickCount: 0,

                pickerOptions: null,
                lang: 'cn',
                format: 'yyyy/MM/dd',

                disableLinkMonth: false, // whether link when unlinkPanels is true for closed months.
                disableLinkYear: false // whether link when unlinkPanels is true for closed years.
            };
        },

        computed: {
            weekDaysLabel () {
                return locals[this.lang] ? locals[this.lang].days : locals['cn'].days;
            }
        },

        methods: {
            changeLinkStatus (leftDate, rightDate) {                
                const l = leftDate || this.leftDate; 
                const r = rightDate || this.rightDate;
                const monthDiff = r.getMonth() - l.getMonth();
                const yearDiff = r.getFullYear() - l.getFullYear();

                if (this.unlinkPanels) {
                    if (yearDiff === 0 || (yearDiff === 1 && monthDiff <= 0)) {
                        this.disableLinkYear = true;
                    } else {
                        this.disableLinkYear = false;
                    }

                    if ((monthDiff === 1 && yearDiff === 0) || (monthDiff === -11 && yearDiff === 1)) {
                        this.disableLinkMonth = true;
                    } else {
                        this.disableLinkMonth = false;
                    }
                } else {
                    this.disableLinkMonth = false;
                    this.disableLinkYear = false;
                }
            },

            changeLeftMonth (delta) {
                // left panel date
                if (delta === 1 && this.disableLinkMonth) {
                    return;
                }
                this.leftDate = nextMonth(this.leftDate, delta);

                if (!this.unlinkPanels) {
                    this.rightDate = nextMonth(this.rightDate, delta);
                }
                this.changeLinkStatus(this.leftDate, null);
            },

            changeLeftYear (delta) {
                // left panel date
                if (delta === 1 && this.disableLinkYear) {
                    return;
                }
                this.leftDate = nextYear(this.leftDate, delta);

                if (!this.unlinkPanels) {
                    this.rightDate = nextYear(this.rightDate, delta);
                }

                this.changeLinkStatus(this.leftDate, null);
            },

            changeRightMonth (delta) {
                // right panel date
                if (delta === -1 && this.disableLinkMonth) {
                    return;
                }
                this.rightDate = nextMonth(this.rightDate, delta);

                if (!this.unlinkPanels) {
                    this.leftDate = nextMonth(this.leftDate, delta);
                }
                this.changeLinkStatus(null, this.rightDate);
            },

            changeRightYear (delta) {
                // right panel date
                if (delta === -1 && this.disableLinkYear) {
                    return;
                }
                this.rightDate = nextYear(this.rightDate, delta);

                if (!this.unlinkPanels) {
                    this.leftDate = nextYear(this.leftDate, delta);
                }
                this.changeLinkStatus(null, this.rightDate);
            },

            formatYearMonthText (type) {
                // 2018&nbsp;年&nbsp;&nbsp;1&nbsp;月
                const d = type === 1 ? this.leftDate : this.rightDate;
                if (!d) {
                    return;
                }
                if (this.lang === 'cn') {
                    return `${d.getFullYear()}&nbsp;年&nbsp;&nbsp;${d.getMonth() + 1}&nbsp;月`;
                } else if (this.lang === 'en' || this.lang === 'it') {
                    return `${d.getFullYear()}&nbsp;&nbsp;${locals[this.lang].months.original[d.getMonth()]}`;
                }
            },

            handleEndDateChange (date) {
                this.endDate = date;
            },

            handleRangeChange (date, isResetStartDate) {
                if (isResetStartDate) {
                    this.clickCount = 0;
                } 
                this.clickCount = this.clickCount + 1;
                if (!this.selecting) {
                    this.selecting = true;
                }
                if (this.clickCount === 1) {
                    this.startDate = date;
                    return;
                }
                if (this.clickCount >= 2) {
                    this.endDate = date;
                }
                
                this.$emit('emit', this.startDate, this.endDate);
                this.shown = false;
                this.selecting = false;
                this.clickCount = 0;
            },

            handleShortcutPick (shortcut) {
                if (typeof shortcut.onClick === 'function') {
                    shortcut.onClick(this);
                }
            },

            shortcutPick (range) {
                if (Array.isArray(range) && range.length === 2) {
                    if (!isDate(range[0]) || !isDate(range[1])) {
                        throw new Error('[v2-datepicker]: Invalid date returned in shortcuts');
                    }

                    this.startDate = range[0];
                    this.endDate = range[1];
                    this.$emit('emit', this.startDate, this.endDate);
                    this.shown = false;
                }
            },

            clearDate () {
                this.startDate = '';
                this.endDate = '';
                this.shown = false;
                this.selecting = false;
                this.clickCount = 0;
            }
        },

        components: {
            ShortCuts,
            DateTable
        },

        mounted () {
            this.$on('pick', this.shortcutPick);
            this.$on('clear', this.clearDate);
            this.$nextTick(() => {
                this.changeLinkStatus(this.leftDate, this.rightDate);
            });
        }
    };
</script>