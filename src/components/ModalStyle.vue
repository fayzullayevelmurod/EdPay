<template>
<div class="modal_wrapper">
    <div class="modal_bg"></div>
    <div :class="`modal_content ${content_class}`">
        <button @click="$emit('modalClose')" class="modal_close">
            <img src="@/assets/images/close.svg" alt="">
        </button>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: "ModalStyle",
    props: {
        content_class: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
.modal_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.modal_wrapper .modal_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: #7F848A;
}

.modal_wrapper .modal_content {
    position: relative;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
    padding: 32px 56px;
    text-align: center;
}

.modal_wrapper .modal_content .modal_close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    cursor: pointer;
}

.modal_wrapper .modal_content .img {
    margin-bottom: 16px;
    height: 72px;
}

.modal_wrapper .modal_content .title {
    max-width: 340px;
    margin-bottom: 16px;
    color: #202224;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.modal_wrapper .modal_content .subtitle {
    color: #444B52;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 20px;
}
</style>