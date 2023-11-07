<template>
    <button @click="$emit('clicked')" :class="`${!light ? 'main_button' : 'main_button_light'} ${disabled ? 'disabled' : ''}`" :disabled="disabled">{{title}}</button>
</template>

<script>
export default {
    name: "Button",
    props: {
        title: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        light: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<style>
.main_button {
    border-radius: 6px;
    background: #F47421;
    width: 218px;
    padding: 12px 0;
    color: #FFF;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    transition: .3s ease all;
    border: 1px solid transparent;
    height: 42px;
}

.main_button:hover {
    background: #F47421;
    box-shadow: 0px 4px 4px 0px rgba(184, 80, 12, 0.16);
}

.main_button:active {
    border-radius: 6px;
    border: 1px solid #EB6915;
    background: #F47421;
}

.main_button.disabled {
    border-radius: 6px;
    border: 1px solid #EB6915;
    opacity: 0.5;
    background: #F47421;
    cursor: default;
}

.main_button_light {
    border-radius: 6px;
    border: 1px solid #F47421;
    background: #FFF;
    width: 218px;
    padding: 12px 0;
    color: #F47421;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    transition: .3s ease all;
}

.main_button_light:hover {
    border-radius: 6px;
    border: 1px solid #F47421;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(184, 80, 12, 0.16);
}
</style>