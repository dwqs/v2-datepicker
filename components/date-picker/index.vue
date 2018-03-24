<template>
    <div :class="[
        'v2-date-wrap',
        {
            'is-disabled': disabled
        }

    ]" @mouseover="shownClear=true" @mouseout="shownClear=false" ref="wrap">
        <span ref="trigger" :class="['v2-picker-trigger', {'empty-text': !selectedDate}]" @click="handleTriggerClick">{{selectedDate ? selectedDate : _placeholder}}</span>
        <!-- <i :class="['v2-trigger-icon', { 'active': shown }]" v-if="trigger"></i> -->
        <svg v-if="this.selectedDate && shownClear" class="v2-date-clear" @click="clearDate" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
            <path d="M479.072 512l-98.72-98.72c-9.152-9.152-9.088-23.84 0-32.928 9.152-9.152 23.84-9.088 32.928 0l98.72 98.72 98.72-98.72c9.152-9.152 23.84-9.088 32.928 0 9.152 9.152 9.088 23.84 0 32.928l-98.72 98.72 98.72 98.72c9.152 9.152 9.088 23.84 0 32.928-9.152 9.152-23.84 9.088-32.928 0l-98.72-98.72-98.72 98.72c-9.152 9.152-23.84 9.088-32.928 0-9.152-9.152-9.088-23.84 0-32.928l98.72-98.72zM512 837.824c179.936 0 325.824-145.888 325.824-325.824s-145.888-325.824-325.824-325.824c-179.936 0-325.824 145.888-325.824 325.824s145.888 325.824 325.824 325.824z" p-id="3296" fill="#cdcdcd"></path>
        </svg>
        <svg class="v2-date-icon" @click="handleTriggerClick" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
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
        <transition name="zoom-in-top" @beforeEnter="handleBeforeEnter">
            <div class="v2-picker-panel-wrap" v-show="shown" :style="{minWidth: minWidth + 'px', top: top + 'px'}">
                <short-cuts v-if="shownSideBar" :shortcuts="pickerOptions.shortcuts" @pick="handleShortcutPick"></short-cuts>
                <div class="v2-picker-panel" ref="panel" :style="{marginLeft: shownSideBar ? '110px' : '0', height: renderRow === 6 ? '300px' : '335px'}">
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
    </div>
</template>

<script>
    import locals from '../../src/locals';

    import { 
        nextDate, daysOfMonth, isDate, nextYear, nextMonth,
        getDaysOfMonth, getFirstDateOfMonth, getLastDateOfMonth,
        getClearHoursTime, formatDate, contains, setPanelPosition
    } from '../../src/utils';

    import ShortCuts from '../../src/shortcuts.vue';

    export default {
        name: 'v2-datepicker',
        props: {
            value: {},
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
            },

            pickerOptions: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            renderRow: {
                type: Number,
                default: 7,
                validator: val => [6, 7].includes(val)
            }
        },

        data () {
            const initRenderRows = this.initRenderRows();
            return {
                view: 'day',
                selectedDate: '',
                curDate: new Date(),
                shown: false,
                shownClear: false,
                rows: initRenderRows,

                minWidth: 270,
                top: 32,
                panelHeight: null,
                wrapRect: null,
                shownSideBar: false
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
            },

            value (val) {
                if (isDate(val)) {
                    this.setDefDate();
                }
            }
        },

        methods: {
            handleBeforeEnter () {
                this.$nextTick(() => {
                    if (!this.panelHeight) {
                        this.panelHeight = parseInt(window.getComputedStyle(this.$refs.panel, null).getPropertyValue('height'));
                    }
                    this.top = setPanelPosition(this.panelHeight, this.wrapRect);
                });
            },

            initRenderRows () {
                if (this.renderRow === 6) {
                    return [[], [], [], [], [], []];
                } else {
                    return [[], [], [], [], [], [], []];
                }
            },

            setDefDate () {
                this.curDate = new Date(this.value);
                this.selectedDate = formatDate(this.curDate, this.format);
            },

            clearDate () {
                this.selectedDate = ''; 
                this.$emit('input', this.selectedDate);
                this.$emit('change', this.selectedDate);
                this.initDays();
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
                const mod = (firstWeekDay + 7) % 7;
                
                const diff = this.renderRow === 6 ? mod : mod + 7;
                const panelStartDate = new Date(curYear, curMonth, firstDateOfMonth.getDate() - diff);
                // const daysOfPreMonth = getDaysOfMonth(panelStartDate.getFullYear(), panelStartDate.getMonth() + 1);
                // firstWeekDay = (firstWeekDay === 0 ? 7 : firstWeekDay);
         
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
                        cell.isSelected = isDate(this.selectedDate) ? time === getClearHoursTime(new Date(this.selectedDate).getTime()) : false;
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
                this.curDate = nextMonth(d, delta);
            },

            changeYear (delta) {
                const d = this.curDate;
                this.curDate = nextYear(d, delta);
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
                    this.selectedDate = formatDate(cell.date, this.format);
                    this.curDate = cell.date;
                    this.$emit('input', this.curDate);
                    this.$emit('change', this.curDate);
                    this.shown = false;
                }
            },

            handleDocClick (e) {
                const target = e.target;
                if (!contains(this.$el, target) && this.shown) {
                    this.shown = false;
                }
            },

            handleDocResize (e) {
                this.wrapRect = this.$refs.wrap.getBoundingClientRect();
                this.$nextTick(() => {
                    if (!this.panelHeight) {
                        this.panelHeight = parseInt(window.getComputedStyle(this.$refs.panel, null).getPropertyValue('height'));
                    }
                    this.top = setPanelPosition(this.panelHeight, this.wrapRect);
                });
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }
                this.shown = !this.shown;
            },

            handleShortcutPick (date) {
                if (isDate(date)) {
                    this.selectedDate = formatDate(date, this.format);
                    this.curDate = date;
                    this.$emit('input', this.curDate);
                    this.$emit('change', this.curDate);
                    this.shown = false;
                }
            }
        },

        created () {
            if (this.value && isDate(this.value)) {
                this.setDefDate();
            }
            this.initDays();

            if (this.pickerOptions.shortcuts && Array.isArray(this.pickerOptions.shortcuts) && this.pickerOptions.shortcuts.length) {
                this.minWidth = 380;
                this.shownSideBar = true;
            }
        },

        mounted () {
            this.wrapRect = this.$refs.wrap.getBoundingClientRect();
            this.top = this.wrapRect.top;

            window.document.addEventListener('click', this.handleDocClick, false);
            window.document.addEventListener('scroll', this.handleDocResize, false);
            window.addEventListener('resize', this.handleDocResize, false);
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick, false);
            window.removeEventListener('resize', this.handleDocResize, false);
        },

        components: {
            ShortCuts
        }
    };
</script>
