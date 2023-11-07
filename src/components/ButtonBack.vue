<template>
    <button class="back_button" @click="$emit('clicked')">{{ title }}</button>
</template>

<script>
export default {
    name: "ButtonBack",
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
.back_button {
    border-radius: 6px;
    border: 1px solid #D9D9D9;
    background: #FFF;
    color: #202224;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    width: 218px;
    padding: 5px 16px;
    height: 42px;
}
</style>