<template>
    <div :pid="pid" :class="[
        'v2-date-wrap',
        'v2-date-range-wrap',
        {
            'is-disabled': disabled
        }
    ]" @click.stop="handleTriggerClick" @mouseover="shownClear=true" @mouseout="shownClear=false">
        <span ref="trigger" :class="['v2-picker-trigger', {'empty-text': !displayDate}]">{{displayDate ? displayDate : _placeholder}}</span>
        <svg v-if="displayDate && shownClear" @click.stop="clearDate" class="v2-date-clear" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
            <path d="M479.072 512l-98.72-98.72c-9.152-9.152-9.088-23.84 0-32.928 9.152-9.152 23.84-9.088 32.928 0l98.72 98.72 98.72-98.72c9.152-9.152 23.84-9.088 32.928 0 9.152 9.152 9.088 23.84 0 32.928l-98.72 98.72 98.72 98.72c9.152 9.152 9.088 23.84 0 32.928-9.152 9.152-23.84 9.088-32.928 0l-98.72-98.72-98.72 98.72c-9.152 9.152-23.84 9.088-32.928 0-9.152-9.152-9.088-23.84 0-32.928l98.72-98.72zM512 837.824c179.936 0 325.824-145.888 325.824-325.824s-145.888-325.824-325.824-325.824c-179.936 0-325.824 145.888-325.824 325.824s145.888 325.824 325.824 325.824z" p-id="3296" fill="#cdcdcd"></path>
        </svg>
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
    </div>
</template>

<script>
    import Vue from 'vue';
    import debounce from 'v2-datepicker/src/debounce';

    import {
        isDate, formatDate, contains, getPanelPosition, nextMonth
    } from 'v2-datepicker/src/utils';

    import pickerManage from 'v2-datepicker/src/picker-manage';

    import DateRangePickerPanel from './date-range-panel';

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

            lang: {
                type: String,
                default: 'cn',
                validator: val => ['cn', 'en', 'it'].includes(val)
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
            },

            pickerOptions: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            // since 2.2.0
            defaultValue: {
                // default date when open the datepicker
            }
        },

        data () {
            const MONTH = 1000 * 3600 * 24 * 30;
            const [initLeftDate, initRightDate] = this.initDate(MONTH);

            return {
                pid: -1,
                leftDate: initLeftDate,
                rightDate: initRightDate,
                shownClear: false,

                panelHeight: null,
                panelWidth: null,
                wrapRect: null,
                picker: null,
                startDate: null,
                endDate: null,

                displayDate: '',
                MONTH: MONTH
            };
        },

        computed: {
            _placeholder () {
                return this.placeholder ? this.placeholder : this.lang === 'cn' ? '开始时间 - 结束时间' : 'Choosing date range...';
            }
        },

        watch: {
            value (val) {
                if (Array.isArray(val) && val.length === 2) {
                    this.setDefRange();
                }
            }
        },

        methods: {
            initDate (MONTH) {
                if (Array.isArray(this.value) && this.value.length === 2) {
                    let leftDate = isDate(this.value[0]) ? new Date(this.value[0]) : new Date();
                    let rightDate = isDate(this.value[1]) ? new Date(this.value[1]) : nextMonth(new Date(), 1);

                    if (leftDate.getTime() > rightDate.getTime()) {
                        [leftDate, rightDate] = [rightDate, leftDate];
                    }
                    const diff = rightDate.getTime() - leftDate.getTime();

                    if (!this.unlinkPanels && diff > MONTH) {
                        rightDate = nextMonth(leftDate, 1);
                    }

                    // fix #12/#13
                    if (diff <= MONTH) {
                        rightDate = nextMonth(leftDate, 1);
                    }

                    return [leftDate, rightDate];
                }
                // since 2.2.0
                if (!this.unlinkPanels && isDate(this.defaultValue)) {
                    const leftDate = new Date(this.defaultValue);
                    return [leftDate, nextMonth(leftDate, 1)];
                }

                return [new Date(), nextMonth(new Date(), 1)];
            },

            setDefRange () {
                let startDate = isDate(this.value[0]) ? new Date(this.value[0]) : '';
                let endDate = isDate(this.value[1]) ? new Date(this.value[1]) : '';
                if (startDate && endDate) {
                    if (startDate.getTime() > endDate.getTime()) {
                        [startDate, endDate] = [endDate, startDate];
                    }

                    this.startDate = startDate;
                    this.endDate = endDate;
                    const formate = [formatDate(this.startDate, this.format), formatDate(this.endDate, this.format)];
                    this.displayDate = formate.join(this.rangeSeparator);
                }
            },

            clearDate () {
                this.displayDate = '';
                this.$emit('input', []);
                this.$emit('change', []);
                if (this.picker) {
                    this.picker.$emit('clear');
                }
            },

            emitValue (startDate, endDate) {
                const formate = [formatDate(startDate, this.format), formatDate(endDate, this.format)];
                this.displayDate = formate.join(this.rangeSeparator);
                this.$emit('input', [startDate, endDate]);
                this.$emit('change', [startDate, endDate]);
                // this.$nextTick(() => {
                //     [this.leftDate, this.rightDate] = this.initDate(this.MONTH);
                // });
            },

            shownSideBar () {
                // fix #10
                if (this.pickerOptions && this.pickerOptions.shortcuts && Array.isArray(this.pickerOptions.shortcuts) && this.pickerOptions.shortcuts.length) {
                    return true;
                }
                return false;
            },

            handleTriggerClick () {
                if (this.disabled) {
                    return;
                }

                this.wrapRect = this.$el.getBoundingClientRect();
                if (!this.picker) {
                    this.picker = new Vue(DateRangePickerPanel).$mount();
                    this.picker.pickerOptions = { ...this.pickerOptions };
                    this.picker.leftDate = this.leftDate;
                    this.picker.rightDate = this.rightDate;
                    this.picker.startDate = this.startDate;
                    this.picker.endDate = this.endDate;
                    this.picker.unlinkPanels = this.unlinkPanels;
                    this.picker.lang = this.lang;
                    this.picker.format = this.format;
                    this.picker.shownSideBar = this.shownSideBar();
                    this.picker.position = {
                        top: `${this.wrapRect.bottom}px`,
                        left: `${this.wrapRect.left}px`
                    };

                    this.picker.$on('emit', this.emitValue);
                    this.pid = pickerManage.addPicker('range', this.picker);
                    document.body.appendChild(this.picker.$el);
                }

                pickerManage.updatePicker(this.pid);
                this.picker.shown = !this.picker.shown;
                this.$nextTick(() => {
                    this.setPanelPosition();
                });
            },

            handleDocClick (e) {
                const target = e.target;
                if (!this.picker) {
                    return;
                }

                if (!contains(this.picker.$el, target) && this.picker.shown) {
                    this.picker.shown = false;
                }
            },

            setPanelPosition () {
                if (!this.panelHeight) {
                    this.panelHeight = parseInt(window.getComputedStyle(this.picker.$el, null).getPropertyValue('height'));
                }
                if (!this.panelWidth) {
                    this.panelWidth = parseInt(window.getComputedStyle(this.picker.$el, null).getPropertyValue('width'));
                }

                const { top, left } = getPanelPosition(this.panelHeight, this.panelWidth, this.wrapRect);
                this.picker.position = {
                    top: `${top}px`,
                    left: `${left}px`
                };
            },

            handleDocResize (e) {
                if (!this.picker || !this.picker.shown) {
                    return;
                }
                this.wrapRect = this.$el.getBoundingClientRect();
                this.$nextTick(() => {
                    this.setPanelPosition();
                });
            }
        },

        created () {
            this.winResize = debounce(this.handleDocResize);
        },

        mounted () {
            if (Array.isArray(this.value) && this.value.length === 2) {
                this.setDefRange();
            }

            window.document.addEventListener('click', this.handleDocClick, false);
            window.document.addEventListener('scroll', this.winResize, false);
            window.addEventListener('resize', this.winResize, false);
        },

        beforeDestroy () {
            window.document.removeEventListener('click', this.handleDocClick, false);
            window.document.removeEventListener('scroll', this.handleDocResize, false);
            window.removeEventListener('resize', this.handleDocResize, false);

            if (this.picker) {
                this.picker.$destroy();
                this.picker.$off();
                this.picker.$el.parentNode.removeChild(this.picker.$el);
            }
            this.winResize = null;
            this.picker = null;

            this.pid = pickerManage.deletePicker(this.pid);
        }
    };
</script>
