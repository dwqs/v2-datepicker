<template>
    <div :class="[
        'v2-date-wrap',
        'v2-date-range-wrap',
        {
            'is-disabled': disabled
        }
    ]">
        <span ref="trigger" :class="['v2-picker-trigger', {'empty-text': !selectedRange}]" @click="handleTriggerClick">{{selectedRange ? selectedRange : _placeholder}}</span>
        <svg class="v2-date-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
            <path d="M693.527273 460.8c32.581818 0 65.163636 0 97.745455 0 0-23.272727 0-41.890909 0-65.163636-37.236364 0-65.163636 0-97.745455 0C693.527273 418.909091 693.527273 437.527273 693.527273 460.8z" p-id="1933" fill="#797973"></path>
            <path d="M232.727273 623.709091c32.581818 0 65.163636 0 97.745455 0 0-23.272727 0-41.890909 0-65.163636-32.581818 0-65.163636 0-97.745455 0C232.727273 581.818182 232.727273 605.090909 232.727273 623.709091z" p-id="1934" fill="#797973"></path>
            <path d="M465.454545 623.709091c32.581818 0 65.163636 0 97.745455 0 0-23.272727 0-41.890909 0-65.163636-32.581818 0-65.163636 0-97.745455 0C465.454545 581.818182 465.454545 605.090909 465.454545 623.709091z" p-id="1935" fill="#797973"></path>
            <path d="M791.272727 558.545455c-32.581818 0-65.163636 0-93.090909 0 0 23.272727 0 46.545455 0 65.163636 32.581818 0 60.509091 0 93.090909 0C791.272727 600.436364 791.272727 581.818182 791.272727 558.545455z" p-id="1936" fill="#797973"></path>
            <path d="M232.727273 786.618182c37.236364 0 65.163636 0 97.745455 0 0-23.272727 0-41.890909 0-65.163636-32.581818 0-65.163636 0-97.745455 0C232.727273 749.381818 232.727273 768 232.727273 786.618182z" p-id="1937" fill="#797973"></path>
            <path d="M460.8 791.272727c32.581818 0 65.163636 0 97.745455 0 0-23.272727 0-41.890909 0-65.163636-32.581818 0-65.163636 0-97.745455 0C460.8 749.381818 460.8 768 460.8 791.272727z" p-id="1938" fill="#797973"></path>
            <path d="M693.527273 791.272727c32.581818 0 65.163636 0 97.745455 0 0-23.272727 0-41.890909 0-65.163636-32.581818 0-65.163636 0-97.745455 0C693.527273 749.381818 693.527273 772.654545 693.527273 791.272727z" p-id="1939" fill="#797973"></path>
            <path d="M330.472727 395.636364c-32.581818 0-65.163636 0-97.745455 0C232.727273 418.909091 232.727273 437.527273 232.727273 456.145455c32.581818 0 65.163636 0 97.745455 0C330.472727 437.527273 330.472727 418.909091 330.472727 395.636364z" p-id="1940" fill="#797973"></path>
            <path d="M563.2 395.636364c-32.581818 0-65.163636 0-97.745455 0 0 23.272727 0 41.890909 0 60.509091 32.581818 0 65.163636 0 97.745455 0C563.2 437.527273 563.2 418.909091 563.2 395.636364z" p-id="1941" fill="#797973"></path>
            <path d="M921.6 93.090909l-121.018182 0L800.581818 23.272727C800.581818 9.309091 791.272727 0 777.309091 0s-23.272727 9.309091-23.272727 23.272727L754.036364 93.090909l-218.763636 0L535.272727 23.272727C535.272727 9.309091 525.963636 0 512 0c-13.963636 0-23.272727 9.309091-23.272727 23.272727L488.727273 93.090909 274.618182 93.090909 274.618182 23.272727C274.618182 9.309091 265.309091 0 251.345455 0 237.381818 0 228.072727 9.309091 228.072727 23.272727L228.072727 93.090909 102.4 93.090909C46.545455 93.090909 0 139.636364 0 195.490909l0 721.454545C0 977.454545 46.545455 1024 102.4 1024l814.545455 0c55.854545 0 102.4-46.545455 102.4-102.4L1019.345455 195.490909C1024 139.636364 977.454545 93.090909 921.6 93.090909zM977.454545 921.6c0 32.581818-27.927273 55.854545-55.854545 55.854545L102.4 977.454545C74.472727 977.454545 46.545455 949.527273 46.545455 921.6L46.545455 195.490909C46.545455 167.563636 74.472727 139.636364 102.4 139.636364l121.018182 0 0 69.818182C228.072727 218.763636 237.381818 232.727273 251.345455 232.727273c13.963636 0 23.272727-9.309091 23.272727-23.272727L274.618182 139.636364l214.109091 0 0 69.818182C488.727273 218.763636 498.036364 232.727273 512 232.727273c13.963636 0 23.272727-9.309091 23.272727-23.272727L535.272727 139.636364l218.763636 0 0 69.818182c0 13.963636 9.309091 23.272727 23.272727 23.272727s23.272727-9.309091 23.272727-23.272727L800.581818 139.636364l121.018182 0C949.527273 139.636364 977.454545 167.563636 977.454545 195.490909L977.454545 921.6z" p-id="1942" fill="#797973"></path>
        </svg>
        <transition name="zoom-in-top">
            <div class="v2-picker-panel-wrap v2-picker-range-panel-wrap" v-show="shown">
                <div class="v2-picker-range-panel v2-picker-range__left-panel">
                    <div class="v2-picker-panel__header">
                        <div class="v2-picker-header__label">
                            <span class="v2-picker-header__label-text" v-html="formatYearMonthText(1)"></span>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-prev">
                            <i class="v2-toggle-icon v2-toggle-icon__prev-year" @click="changeLeftYear(-1)"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__prev-month" @click="changeLeftMonth(-1)"></i>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-next">
                            <i class="v2-toggle-icon v2-toggle-icon__next-month" @click="changeLeftMonth(1)"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__next-year" @click="changeLeftYear(1)"></i>
                        </div>
                    </div>
                    <date-table
                        :lang="lange"
                        :date="leftDate"
                        :min-date="startDate"
                        :max-date="endDate"
                        :selecting="selecting"
                        @range-change="handleRangeChange">
                    </date-table>
                </div>
                <div class="v2-picker-range-panel v2-picker-range__right-panel">
                    <div class="v2-picker-panel__header">
                        <div class="v2-picker-header__label">
                            <span class="v2-picker-header__label-text" v-html="formatYearMonthText(2)"></span>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-prev">
                            <i class="v2-toggle-icon v2-toggle-icon__prev-year" @click="changeRightYear(-1)"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__prev-month" @click="changeRightMonth(-1)"></i>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-next">
                            <i class="v2-toggle-icon v2-toggle-icon__next-month" @click="changeRightMonth(1)"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__next-year" @click="changeRightYear(1)"></i>
                        </div>
                    </div>
                    <date-table
                        :lang="lange"
                        :date="rightDate"
                        :min-date="startDate"
                        :max-date="endDate"
                        :selecting="selecting"
                        @range-change="handleRangeChange">
                    </date-table>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import locals from './locals';

    import { 
        nextDate, daysOfMonth, isDate, nextYear, nextMonth,
        getDaysOfMonth, getFirstDateOfMonth, getLastDateOfMonth,
        getClearHoursTime, formatDate, contains
    } from './utils';

    import DateTable from './date-table';

    export default {
        name: 'v2-datepicker-range',
        props: {
            value: {
                
            },

            disabled: {
                type: Boolean,
                default: false
            },

            rangeSeparator: {
                type: String,
                default: ' - '
            },

            date: {},

            lang: {
                type: String,
                default: 'cn',
                validator: val => ['cn', 'en'].includes(val)
            },

            format: {
                type: String,
                default: 'yyyy/MM/dd'
            },

            placeholder: {
                type: String,
                default: '' 
            },

            unlinkPanels: {
                // 是否取消左右面板的联动
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                leftDate: new Date(),
                rightDate: nextMonth(new Date(), 1),
                shown: false,

                selecting: false,
                selectedRange: '',
                startDate: '2018/1/18',
                endDate: '2018/1/27'
            };
        },

        computed: {
            _placeholder () {
                return this.placeholder ? this.placeholder : this.lang === 'cn' ? '开始时间 - 结束时间' : 'Choosing date range...';
            }
        },

        methods: {
            formatYearMonthText (type) {
                // 2018&nbsp;年&nbsp;&nbsp;1&nbsp;月
                const d = type === 1 ? this.leftDate : this.rightDate;
                if (this.lang === 'cn') {
                    return `${d.getFullYear()}&nbsp;年&nbsp;&nbsp;${d.getMonth() + 1}&nbsp;月`;
                } else if (this.lang === 'en') {
                    return `${d.getFullYear()}&nbsp;&nbsp;${locals[this.lang].months.original[d.getMonth()]}`;
                }
            },

            changeLeftMonth (delta) {
                const leftDate = this.leftDate;
                const rightDate = this.rightDate;
                this.rightDate = nextMonth(rightDate, delta);
                this.leftDate = nextMonth(leftDate, delta);
            },

            changeLeftYear (delta) {
                const leftDate = this.leftDate;
                const rightDate = this.rightDate;
                this.rightDate = nextYear(rightDate, delta);
                this.leftDate = nextYear(leftDate, delta);
            },

            changeRightMonth (delta) {
                const leftDate = this.leftDate;
                const rightDate = this.rightDate;
                this.rightDate = nextMonth(rightDate, delta);
                this.leftDate = nextMonth(leftDate, delta);
            },

            changeRightYear (delta) {
                const leftDate = this.leftDate;
                const rightDate = this.rightDate;
                this.rightDate = nextYear(rightDate, delta);
                this.leftDate = nextYear(leftDate, delta);
            },

            handleRangeChange (date) {
                if (!this.selecting) {
                    this.selecting = true;
                }

                if (!this.startDate) {
                    this.startDate = formatDate(date, this.format);
                    return;
                }

                if (!this.endDate) {
                    this.endDate = formatDate(date, this.format);
                }
                const formate = [this.startDate, this.endDate];
                this.selectedRange = formate.join(this.rangeSeparator);
                this.$emit('input', formate);
                this.$emit('change', formate);
                this.shown = false;
                this.resetDate(true);
            },

            resetDate (force = false) {
                if (!this.startDate || !this.endDate || force) {
                    this.selecting = false;
                    this.startDate = '';
                    this.endDate = '';
                }
            },

            handleDocClick (e) {
                const target = e.target;
                if (!contains(this.$el, target) && this.shown) {
                    this.shown = false;
                    this.resetDate();
                }
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }
                this.shown && this.resetDate();
                this.shown = !this.shown;
            }
        },

        created () {
            console.log('left date', this.leftDate);
            console.log('right date', this.rightDate);
        },

        mounted () {
            window.document.addEventListener('click', this.handleDocClick, false);
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick);
        },

        components: {
            DateTable
        }
    };
</script>
