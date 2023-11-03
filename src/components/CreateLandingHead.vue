<template>
    <div class="create_landing_vue">
        <div class="container">
            <div class="title">Создание лендинга</div>
            <div class="steps">
                <div
                    :class="`
                        step
                        ${error ? 'error' : ''}
                        ${step == i ? 'active' : ''}
                        ${step  === i + 0.5 ? 'half-active' : ''}
                        ${step > i ? 'full-active' : ''}
                    `"
                    v-for="(item, i) in step_list"
                    :key="i">
                    <div class="circle">
                        <img src="@/assets/images/checked_step_icon.svg" alt="">
                    </div>
                    <div v-if="i != step_list.length -1" class="line_wrapper">
                        <div class="line" :style="border_style"></div>
                        <div class="line_active_wrapper">
                            <div class="line_active" :style="border_style_active"></div>
                        </div>
                        <div class="line_circle_active"></div>
                    </div>
                    <div class="text">
                        <div class="text_title">{{item.title}}</div>
                        <div class="text_subtitle">{{item.subtitle}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import line_icon from '@/assets/images/rounded-line.svg'
import line_icon_active from '@/assets/images/rounded-line-active.svg'

export default {
    name: "CreateLandingHead",
    props: {
        current_step: Number,
        error: Boolean,
    },
    data () {
        return {
            step_list: [
                {title: "Шаг 1", subtitle: "Информация о школе/эксперте"},
                {title: "Шаг 2", subtitle: "Карточки продуктов"},
                {title: "Шаг 3", subtitle: "Информация о клиенте"},
                {title: "Шаг 4", subtitle: "Юридическая информация"},
                {title: "Шаг 5", subtitle: "Документы"},
            ],
            border_style: `
                border-top: 1px solid transparent;
                border-image: url('${line_icon}') 1 repeat;
            `,
            border_style_active: `
                border-top: 1px solid transparent;
                border-image: url('${line_icon_active}') 1 repeat;
            `,
        }
    },
    computed: {
        step () {
            return this.current_step - 1;
        }
    }
}
</script>

<style>
.create_landing_vue {
    background: #F4F3F3;
    padding: 72px 0 125px;
}

.create_landing_vue .container {
    max-width: 1296px;
    margin: 0 auto;
}

.create_landing_vue .title {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
    margin-bottom: 72px;
}

.steps {
    display: flex;
    align-items: center;
}

.steps .step {
    position: relative;
    display: flex;
    align-items: center;
}

.step .text {
    position: absolute;
    left: 0;
    bottom: 0px;
    transform: translateY(100%);
    padding-top: 15px;
}

.step .text .text_title {
    color: #BEC1C5;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 4px;
}

.step .text .text_subtitle {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}

.step .circle {
    border: 1px solid #BEC1C5;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    position: relative;
}

.step .circle::before {
    content: "";
    background: #BEC1C5;
    position: absolute;
    width: 18px;
    height: 18px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

.step .circle img {
    display: none;
    width: 32px;
    height: 32px;
}

.step.active .circle {
    border: 1px solid #F47421;
}

.step.active .circle::before {
    background: #F47421;
}

.step.active.error .circle{
    border: 1px solid #FF5C65;
}

.step.active.error .circle::before {
    background: #FF5C65;
}

.step.full-active .circle,
.step.half-active .circle {
    border: none;
}

.step.full-active .circle::before,
.step.half-active .circle::before {
    display: none;
}

.step.full-active .circle img,
.step.half-active .circle img {
    display: block;
}

.step .line_wrapper {
    width: 257px;
    padding: 0px 4px;
    position: relative;
}

.step .line {
    transform: translateY(1px);
}

.line_active_wrapper {
    position: relative;
    left: 0;
    width: 0;
    height: 1px;
    overflow: hidden;
}

.step.full-active .line_active_wrapper {
    width: 100%;
}

.step.half-active .line_active_wrapper {
    width: 50%; 
}

.step.half-active .line_circle_active {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #F47421;
    border-radius: 50%;
    bottom: -6.5px;
    left: 50%;
    transform: translateX(-50%);
}

.step .line_active {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 2;
    width: 249px;
}
</style>