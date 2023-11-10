<template>
    <div class="form_title_wrapper">
        <div class="form_title">{{title}}</div>
        <div v-if="error" class="warning_wrapper">
            <div class="warning">
                <img src="@/assets/images/warning_icon.svg" alt="">
                <div class="warning_text_wrap">
                    <div class="warning_text">
                        <span>{{warning}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FormTitle",
    props: {
        title: {
            type: String,
            default: ""
        },
        warning: {
            type: String,
            default: "Файл не соответствует формату или превышает допустимый размер"
        },
        error: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.form_title_wrapper {
    position: relative;
}

.form_title {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin: 42px 0 24px;
}

.form_title_wrapper .warning_wrapper {
    position: absolute;
    left: -36px;
    bottom: 0;
}

.form_title_wrapper .warning_wrapper .warning {
    position: relative;
}

.warning .warning_text_wrap {
    position: absolute;
    border-radius: 4px;
    left: -40.3px;
    bottom: 35px;
    background: #fff;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.14));
    display: none;
}

.warning_wrapper:hover .warning .warning_text_wrap {
    display: block;
}

.warning .warning_text {
    position: relative;
    width: 282px;
    padding: 15px 0px 13px 23px;
}

.warning .warning_text::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 100%;
    border-radius: 2.5px;
    background: #FF5C65;
    left: 0;
    top: 0;
}

.warning .warning_text::after {
    content: "";
    position: absolute;
    border-radius: 4px;
    background: #fff;
    width: 19.13px;
    height: 19.13px;
    transform: rotate(-45deg);
    bottom: -8px;
    left: 38px;
}

.warning .warning_text span {
    color: rgba(0, 0, 0, 0.85);
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}

@media only screen and (max-width: 992px) {
    .warning_wrapper {
        display: none;
    }
}
</style>