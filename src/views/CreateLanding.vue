<template>
    <div> 
        <create-landing-head :current_step="current_step" :error="step_error"/>
        
        <!-- Step 1 -->
        <div class="step_1">
            <div class="landing_container">
                {{step_error}}
                <form-title 
                    :error="error_fields['1'].file" 
                    title="1. Логотип школы или фото эксперта:" 
                    warning="Файл не соответствует формату или превышает допустимый размер"
                />
                <file-upload
                    idx="1"
                    field_name="file"
                    :error="error_fields['1'].file"
                    @check_value="checkInputValue"
                    v-model:value="step_fields['1'].file"
                />
                <form-title :error="error_fields['1'].title" title="2. Название лендинга:"/>
                <form-input
                    idx="1"
                    field_name="title"
                    v-model:value="step_fields['1'].title"
                    @check_value="checkInputValue"
                    type="text" 
                    label="Напишите название/ФИО (его будут видеть ваши клиенты на лендинге):"
                    error_title="*Поле не заполнено"
                />
                <form-title 
                    :error="error_fields['1'].phone || error_fields['1'].email"
                    title="3. Контакты школы/эксперта"
                />
                <div class="subtitle">Укажите, как клиент может связаться с вами</div>
                <div class="inputs">
                    <form-input
                        idx="1"
                        field_name="phone"
                        v-model:value="step_fields['1'].phone"
                        @check_value="checkInputValue"
                        type="text"
                        label="Телефон:"
                        error_title="*Поле не заполнено"
                    />
                    <form-input
                        idx="1"
                        field_name="email"
                        v-model:value="step_fields['1'].email"
                        @check_value="checkInputValue"
                        type="text"
                        label="Email:"
                        error_title="*Поле заполнено некорректно"
                    />
                    <form-input
                        v-model:value="step_fields['1'].link"
                        :hidden_valid="true"
                        type="text"
                        label="Другое (ссылка на сайт, соцсеть и т.д.):"
                    />
                </div>
            </div>
            <div class="foot_line"></div>
        </div>

        <div class="steps_foot">
            <div class="foot_container">
                <button class="back_btn">Отмена</button>
                <div>
                    <Button
                        title="Продолжить"
                        :disabled="check_field"
                        @clicked="SaveDatas(current_step)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateLandingHead from '@/components/CreateLandingHead.vue';
import FormTitle from '@/components/FormTitle.vue';
import FileUpload from '@/components/FileUpload.vue';
import FormInput from '@/components/FormInput.vue';
import Button from '@/components/Button.vue';

export default {
    name: "CreateLanding",
    components: {
        CreateLandingHead,
        FormTitle,
        FileUpload,
        FormInput,
        Button,
    },
    data () {
        return {
            current_step: 1,
            current_error: false,
            step_fields: {
                '1': {}
            },
            error_fields: {
                '1': {
                    file: false,
                    title: false,
                    phone: false,
                    email: false,
                }
            }
        }
    },
    computed: {
        step_error () {
            let t = false;
            if (parseInt(this.current_step) == 1) {
                let errors = this.error_fields['1'];
                if (errors.file || errors.title || errors.phone || errors.email) {
                    t = true;
                }
            }
            return t;
        },
        check_field () {
            let t = true;
            if (parseInt(this.current_step) == 1) {
                let fields = this.step_fields['1'];
                this.current_step = 1;
                if (fields.file && fields.title && fields.phone && fields.email) {
                    this.current_step = 1.5;
                    t = false;
                }
            }
            return t;
        }
    },
    methods: {
        SaveDatas (idx) {
            alert(idx)
        },
        checkInputValue (idx, name, value) {
            this.error_fields[idx][name] = value;
        }
    }
}
</script>

<style>
.landing_container {
    max-width: 868px;
    margin: 0 auto;
}

.step_1 {
    padding-top: 30px;
}

.subtitle {
    color: #444B52;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 24px;
}

.step_1 .inputs {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    margin-bottom: 44px;
}

.foot_line {
    height: 24px;
    background: #F4F3F3;
}

.steps_foot {
    padding: 24px 0;
}

.steps_foot .foot_container {
    max-width: 1356px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.back_btn {
    border-radius: 6px;
    border: 1px solid #D9D9D9;
    background: #FFF;
    width: 218px;
    height: 42px;
    padding: 5px 16px;
    transition: .3s ease all;
}

.back_btn:hover {
    border-radius: 6px;
    border: 1px solid #D9D9D9;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(32, 34, 36, 0.12);
}
</style>