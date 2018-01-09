<template>
    <div :class="[
        'v2-date-wrap',
        {
            'is-disabled': disabled
        }

    ]">
        <span ref="trigger" class="v2-picker-trigger" @click="handleTriggerClick">{{selected ? selected : _placeholder}}</span>
        <i :class="['v2-trigger-icon', { 'active': shown }]"></i>
        <transition name="zoom-in-top">
            <div class="v2-picker-panel-wrap" v-show="shown">
                <div class="v2-picker-panel">v2-picker-panel</div>
            </div>
        </transition>
    </div>
</template>

<script>
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
                default: 'yyyy-MM-dd'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '' 
            }
        },

        data () {
            return {
                view: 'day',
                selected: '',
                shown: false
            };
        },

        computed: {
            _format () {

            },
            _placeholder () {
                return this.placeholder ? this.placeholder : this.lang === 'cn' ? '选择日期' : 'Choosing date...';
            }
        },

        methods: {
            getDefPlaceholder () {
                if (type === 'daterange') {
                    return this.lang === 'cn' ? '开始时间 - 结束时间' : 'Choosing date...';
                }
                return this.lang === 'cn' ? '选择日期' : 'Choosing date...';
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
            if (this.value) {
                this.selected = this.value;
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
