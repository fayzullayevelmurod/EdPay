<template>
    <div :class="`alert_wrapper ${type}`">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props: {
        type: {
            type: String,
            defalult: '',
        }
    }
}
</script>

<style>
.alert_wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 56px;
    background: white;
    padding: 12px 26px;
    border-radius: 8px 8px 2px 2px;
}


.alert_wrapper::before {
    content: '';
    position: absolute;
    width: 4.3px;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 2.5px;
}

.alert_wrapper.coral {
    background: rgba(244, 147, 33, 0.05);
}

.alert_wrapper.coral::before {
    background: #F49321;
}

.alert_wrapper.blue {
    background: rgba(63, 180, 246, 0.05);
}

.alert_wrapper.blue::before {
    background: #3FB4F6;
}

.alert_wrapper div {
    color: #444B52;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.alert_wrapper div span {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
}
</style>