<template>
    <div class="checkbox_wrapper">
        <label @click="$emit('update:value', !value)">
            <div class="img">
                <img :class="!value ? 'hidden' : ''" src="@/assets/images/checkbox_icon.svg" alt="">
            </div>
            <span v-html="title"></span>
        </label>
    </div>
</template>

<script>
export default {
    name: "Checkbox",
    props: {
        title: {
            type: String,
            default: "",
        },
        value: Boolean
    },
    emits: ['update:value'],
}
</script>

<style>
.checkbox_wrapper label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.checkbox_wrapper label span {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.checkbox_wrapper label span a {
    color: #F47421;
    font-weight: 600;
}

.checkbox_wrapper label .img {
    width: 16px;
    height: 16px;
    background: #F6F6F6;
    border-radius: 1.5px;
}

.checkbox_wrapper label img.hidden {
    display: none;
}
</style>