<template>
    <div class="code-area">
        <div class="area-left">
            <v2-datepicker-range format="MM/DD/YYYY" lang="en" v-model="selected"></v2-datepicker-range>
        </div>
        <div class="area-right">
            <pre><code>{{selected}}</code></pre>
        </div>
        <div class="original-code" ref="original" v-if="shown">
            <pre><code><span>//lang:['cn', 'en']. format: the combination of YYYY/yyyy/MM/DD</span><br /><span>&lt;</span>template<span>&gt;</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;</span>v2-datepicker-range&nbsp;v-model='selected'&nbsp;lang="en"&nbsp;format="MM/DD/YYYY"&gt;&lt;/v2-datepicker-range&gt;<br/>&lt;</span>/template<span>&gt;</span></code></pre>
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
                selected: [],
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