<template>
    <div class="code-area">
        <div class="area-left">
            <v2-datepicker-range v-model="selected" :picker-options="options"></v2-datepicker-range>
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//Return a array, which is the selected date.</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>v2-datepicker-range&nbsp;v-model='selected'&nbsp;:picker-options="options"&gt;&lt;/v2-datepicker-range&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
            <pre>
options: {
    disabledDate (time) {
        return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: 'Last week',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: 'Last month',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: 'Last 3 months',
        onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]
}
            </pre>
        </div>
        <div class="show-code" @click="toggle">
            {{this.shown ? 'Hide Code' : 'Show Code'}}
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                selected: '',
                shown: false,
                options: {
                    disabledDate (time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: 'Last week',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last month',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last 3 months',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        },
        methods: {
            toggle () {
                this.shown = !this.shown;
            }
        }
    };
</script>