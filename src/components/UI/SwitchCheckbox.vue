<template>
    <button @click="$emit('update:value', !value)" :class="`switch_checkbox ${value ? 'active' : ''} ${!disabled ? 'disabled' : ''}`" :disabled="!disabled">
        <span></span>
    </button>
</template>

<script>
export default {
    name: "SwitchCheckbox",
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['update:value'],
    data () {
        return {
        }
    },
    
}
</script>

<style>
.switch_checkbox {
    border-radius: 16px;
    background: #BFBFBF;
    width: 28px;
    height: 16px;
    display: flex;
    padding: 2px;
    position: relative;
    transition: .2s ease all;
}

.switch_checkbox.active {
    background: #F47421;
}

.switch_checkbox.disabled {
    cursor: default;
    background: #BFBFBF;
    opacity: 0.4;
}

.switch_checkbox span {
    display: block;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    filter: drop-shadow(0px 2px 4px rgba(0, 35, 11, 0.20));
    transition: .2s ease all;
    position: absolute;
    left: 2px;
}

.switch_checkbox.active span {
    left: 14px;
}
</style>