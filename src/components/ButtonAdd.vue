<template>
    <button @click="$emit('clicked')" class="add_button">
        <img src="@/assets/images/add_icon.svg">
        <span>Добавить ещё карточку</span>
    </button>
</template>

<script>
export default {
    name: "ButtonAdd",
    props: {
        title: {
            type: String,
            default: ""
        }
    }
}
</script>

<style>
.add_button {
    border-radius: 6px;
    background: #202224;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 243px;
    padding: 12px 16px;
    transition: .3s ease all;
}

.add_button:hover {
    background: #444B52;
    box-shadow: 0px 4px 4px 0px rgba(32, 34, 36, 0.12);
}

.add_button span {
    color: #FFF;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}
</style>