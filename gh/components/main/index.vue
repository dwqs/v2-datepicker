<template>
    <div class="app-main-wrap">
        <h3>Basic Usage/基本使用</h3>
        <h4>1. As the date-picker component/作为日期选择组件</h4>
        <h5>Default usage/默认形式</h5>
        <basic></basic>
        <h5>Setting shortcuts/设置快捷项</h5>
        <short-cuts></short-cuts>
        <h5>Change the language and the return form./更改语言和返回形式</h5>
        <basic-set></basic-set>
        <h4>2. As the daterange-picker component/作为日期区间选择组件</h4>
        <h5>Default usage/默认形式</h5>
        <basic-range></basic-range>
        <h5>Setting shortcuts/设置快捷项</h5>
        <rang-short-cuts></rang-short-cuts>
        <h5>Change the language and the return form./更改语言和返回形式</h5>
        <basic-range-set></basic-range-set>
        <h5>Disable the linkage./取消左右面板的日期选择联动</h5>
        <disable-link></disable-link>
    </div>
</template>

<script>
    import './index.less';

    import Basic from './date-picker/basic.vue';
    import BasicSet from './date-picker/basic-setting.vue';
    import ShortCuts from './date-picker/shortcuts.vue';
    import BasicRange from './date-range/basic.vue';
    import BasicRangeSet from './date-range/basic-setting.vue';
    import DisableLink from './date-range/disable-link.vue';
    import RangeShortCuts from './date-range/shortcuts.vue';

    export default {
        components: {
            Basic,
            BasicSet,
            BasicRange,
            BasicRangeSet,
            DisableLink,
            ShortCuts,
            'rang-short-cuts': RangeShortCuts
        }
    };
</script>
