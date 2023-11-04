<template>
    <div class="checkbox_wrapper">
        <label @click="checkbox = !checkbox">
            <div class="img">
                <img :class="!checkbox ? 'hidden' : ''" src="@/assets/images/checkbox_icon.svg" alt="">
            </div>
            <span>{{title}}</span>
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
    data () {
        return {
            checkbox: false
        }
    },
    watch: {
        checkbox () {
            this.$emit('update:value', this.checkbox);
        }
    }
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