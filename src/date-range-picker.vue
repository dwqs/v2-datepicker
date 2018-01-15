<template>
    <div :class="[
        'v2-date-wrap',
        'v2-date-range-wrap',
        {
            'is-disabled': disabled
        }
    ]">
        <span ref="trigger" :class="['v2-picker-trigger', {'empty-text': !selectedDate}]" @click="handleTriggerClick">{{selectedDate ? selectedDate : _placeholder}}</span>
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
                            <!-- v-html="formatYearMonthText()" -->
                            <span class="v2-picker-header__label-text">2017年12月</span>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-prev">
                            <i class="v2-toggle-icon v2-toggle-icon__prev-year"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__prev-month"></i>
                        </div>
                    </div>
                    <div class="v2-picker-panel__content">
                        <div class="v2-picker-panel__week-label">
                            <span v-for="day in weekDaysLabel" :key="day" v-text="day"></span>
                        </div>
                        <div class="v2-picker-panel__table v2-picker-panel__days-table">
                            left table
                            <!-- <div class="v2-picker-panel__table-row" v-for="(row, index) in rows" :key="index">
                                <span v-for="cell in row" :key="cell.index"
                                      :class="getCellClasses(cell)"
                                      @click="selectdCurDate(cell)"
                                    >
                                    {{cell.text}}
                                </span>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="v2-picker-range-panel v2-picker-range__right-panel">
                    <div class="v2-picker-panel__header">
                        <div class="v2-picker-header__label">
                            <!-- v-html="formatYearMonthText()" -->
                            <span class="v2-picker-header__label-text">2018年1月</span>
                        </div>
                        <div class="v2-picker-header__toggle v2-picker-header__toggle-next">
                            <i class="v2-toggle-icon v2-toggle-icon__next-month"></i>
                            <i class="v2-toggle-icon v2-toggle-icon__next-year"></i>
                        </div>
                    </div>
                    <div class="v2-picker-panel__content">
                        <div class="v2-picker-panel__week-label">
                            <span v-for="day in weekDaysLabel" :key="day" v-text="day"></span>
                        </div>
                        <div class="v2-picker-panel__table v2-picker-panel__days-table">
                            right table
                            <!-- <div class="v2-picker-panel__table-row" v-for="(row, index) in rows" :key="index">
                                <span v-for="cell in row" :key="cell.index"
                                      :class="getCellClasses(cell)"
                                      @click="selectdCurDate(cell)"
                                    >
                                    {{cell.text}}
                                </span>
                            </div> -->
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
        contains
    } from './utils';

    export default {
        name: 'v2-datepicker-range',
        props: {
            value: {
                type: Array,
                default: []
            },

            disabled: {
                type: Boolean,
                default: false
            },

            rangeSeparator: {
                type: String,
                default: '-'
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

            placeholder: {
                type: String,
                default: '' 
            }
        },

        data () {
            return {
                leftDate: '',
                rightDate: '',
                shown: false,
                selectedDate: ''
            };
        },

        computed: {
            _placeholder () {
                return this.placeholder ? this.placeholder : this.lang === 'cn' ? '开始时间 - 结束时间' : 'Choosing date range...';
            },

            weekDaysLabel () {
                return locals[this.lang] ? locals[this.lang].days : locals['cn'].days;
            }
        },

        methods: {
            handleDocClick (e) {
                const target = e.target;
                if (!contains(this.$el, target) && this.shown) {
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

        mounted () {
            window.document.addEventListener('click', this.handleDocClick, false);
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick);
        }
    };
</script>
