<template>
    <div class="code-area">
        <div class="area-left">
            <v2-datepicker v-model="selected" :picker-options="options"></v2-datepicker>
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//Return a string, which is the selected date.</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>v2-datepicker&nbsp;v-model='selected'&nbsp;:picker-options="options"&gt;&lt;/v2-datepicker&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
            <pre>
options: {
    disabledDate (time) {
        return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: 'Today',
        onClick (picker) {
            picker.$emit('pick', new Date());
        }
    }, {
        text: 'Yesterday',
        onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
        }
    }, {
        text: 'A week ago',
        onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
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
                        text: 'Today',
                        onClick (picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick (picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: 'A week ago',
                        onClick (picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
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