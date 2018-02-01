<template>
    <div class="v2-picker-panel__sidebar">
        <span v-for="(shortcut, index) in shortcuts" :key="index" @click="handleShortcutClick(shortcut)">
            {{shortcut.text || ''}}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            shortcuts: {
                type: Array,
                default: () => []
            }
        },
        
        methods: {
            handleShortcutClick (shortcut) {
                if (typeof shortcut.onClick === 'function') {
                    shortcut.onClick(this);
                }
            }
        }
    };
</script>
