<template>
    <div class="code-area">
        <div class="area-left">
            <v2-datepicker v-model="selected"></v2-datepicker>
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//Return a string, which is the selected date.</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>v2-datepicker&nbsp;v-model='selected'&gt;&lt;/v2-datepicker&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
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
                shown: false
            };
        },
        methods: {
            toggle () {
                this.shown = !this.shown;
            }
        }
    };
</script>