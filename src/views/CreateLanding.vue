<template>
    <div> 
        <create-landing-head :current_step="current_step" :error="step_error"/>
        
        <!-- Step 1 -->
        <div :class="`step_1 step ${current_step == 1 || current_step == 1.5 ? '' : 'hidden'}`">
            <div class="landing_container">
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
                        type="phone"
                        label="Телефон:"
                        error_title="*Поле не заполнено"
                    />
                    <form-input
                        idx="1"
                        field_name="email"
                        v-model:value="step_fields['1'].email"
                        @check_value="checkInputValue"
                        type="email"
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

        <!-- Step 2 -->
        <div :class="`step_2 step ${current_step == 2 || current_step == 2.5 ? '' : 'hidden'}`">
            <div class="landing_container">
                <div class="form_item" v-for="(item, key, i) in step_fields['2']" :key="i">
                    <div class="form_item_head">
                        <div class="form_item_title">
                            <img src="@/assets/images/accordion_icon.svg" alt="">
                            <span>Карточка {{i + 1}}</span>
                        </div>
                        <button-remove @clicked="confirmRemove(key)"/>
                    </div>
                    <form-title :error="error_fields['2'][key].file" title="1. Логотип или фото продукта:"/>
                    <file-upload
                        :idx="`2-${key}`"
                        field_name="file"
                        :error="error_fields['2'][key].file"
                        @check_value="checkInputValue"
                        v-model:value="step_fields['2'][key].file"
                        :upload_library="true"

                    />
                    <form-title :error="error_fields['2'][key].title" title="2. Название продукта:"/>
                    <form-input
                        :idx="`2-${key}`"
                        field_name="title"
                        v-model:value="step_fields['2'][key].title"
                        @check_value="checkInputValue"
                        type="text" 
                        label="Напишите название продукта:"
                        error_title="*Поле не заполнено"
                        :error="error_fields['2'][key].title"
                    />
                    <form-title :error="error_fields['2'][key].money" title="3. Цена"/>
                    <div class="subtitle">Укажите цену, выберите можно ли купить несколько продуктов</div>
                    <div class="money_input_wrapper">
                        <form-input
                            :idx="`2-${key}`"
                            field_name="money"
                            v-model:value="step_fields['2'][key].money"
                            @check_value="checkInputValue"
                            type="money" 
                            label="Цена, ₽:"
                            error_title="*Поле не заполнено"
                            :error="error_fields['2'][key].money"
                        />
                        <Checkbox v-model:value="step_fields['2'][key].several" title="Можно купить несколько"/>
                    </div>
                    <form-title :error="error_fields['2'][key].comment" title="4. Описание:"/>
                    <form-input
                        :idx="`2-${key}`"
                        field_name="comment"
                        v-model:value="step_fields['2'][key].comment"
                        @check_value="checkInputValue"
                        type="textarea" 
                        label="Напишите название продукта:"
                        error_title="*Превышено допустимое количество символов"
                        :error="error_fields['2'][key].comment"
                    />
                    <form-title :error="error_fields['2'][key].payment" title="5. Способы оплаты"/>
                    <div class="subtitle">Отметьте каким способом клиент может купить продукт</div>
                    <div class="form_cards">
                        <div
                            @click="addPayment(key, pay.name)" 
                            :class="`card_item ${step_fields['2'][key]['payment'] && step_fields['2'][key]['payment'].includes(pay.name) ? 'selected' : ''}`" 
                            v-for="(pay, index) in payment_methods" 
                            :key="index"
                        >
                            <div class="text_wrapper">
                                <div class="img">
                                    <img v-if="step_fields['2'][key]['payment'] && step_fields['2'][key]['payment'].includes(pay.name)" src="@/assets/images/checkbox_icon.svg" alt="">
                                </div>
                                <span>{{pay.name}}</span>
                            </div>
                            <img :src="require(`@/assets/images/payment_card_${index+1}.svg`)" alt="">
                        </div>
                        <div v-if="error_fields['2'][key].payment" class="error_text">*Выберите способ оплаты</div>
                    </div>
                    <form-title :error="error_fields['2'][key].offer" title="6. Договор публичной оферты"/>
                    <div class="subtitle">Укажите цену, выберите можно ли купить несколько продуктов</div>
                    <Checkbox v-model:value="step_fields['2'][key].offer" title="Показывать договор публичной оферты клиенту"/>
                    <div v-if="step_fields['2'][key].offer" class="ofer_description">
                        <form-input
                            :idx="`2-${key}`"
                            field_name="offer"
                            v-model:value="step_fields['2'][key].offer_description"
                            @check_value="checkInputValue"
                            type="textarea" 
                            label="Напишите текст договора публичной оферты:"
                            error_title="*Поле не заполнено"
                            :error="error_fields['2'][key].offer"
                        />
                    </div>
                </div>
                <div class="add_button_wrapper">
                    <button-add @clicked="addCard" title="Добавить ещё карточку"/>
                </div>
            </div>
            <div class="foot_line"></div>

            <!-- Remove Card -->
            <modal-style v-if="delete_modal" @modalClose="CloseModal">
                <img src="@/assets/images/modal_warning_icon.svg" alt="" class="img">
                <div class="title">Вы уверены, что хотите удалить карточку «Как стать дизайнером»?</div>
                <div class="subtitle">Она больше не будет отображаться на лендинге</div>
                <div class="modal_buttons">
                    <ButtonBack @clicked="CloseModal()" title="Отмена" />
                    <Button @clicked="removeCard(cardIndex)" title="Удалить"/>
                </div>
            </modal-style>

            <!-- Choose photo library -->
            <modal-style>
                <div class="title">Выберите фото</div>
                <Button title="Применить фото"/>
            </modal-style>
        </div>

        <div class="steps_foot">
            <div class="foot_container">
                <button class="back_btn">Отмена</button>
                <div>
                    <Button
                        title="Продолжить"
                        :disabled="check_field"
                        @clicked="SaveDatas()"
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
import ButtonRemove from '@/components/ButtonRemove.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import ButtonBack from '@/components/ButtonBack.vue'
import Checkbox from '@/components/Checkbox.vue';
import ModalStyle from '@/components/ModalStyle.vue';

export default {
    name: "CreateLanding",
    components: {
        CreateLandingHead,
        FormTitle,
        FileUpload,
        FormInput,
        Button,
        ButtonRemove,
        ButtonAdd,
        Checkbox,
        ModalStyle,
        ButtonBack,
    },
    data () {
        return {
            current_step: 2,
            step_fields: {
                '1': {},
                '2': {
                    '1': {},
                },
            },
            error_fields: {
                '1': {
                    file: false,
                    title: false,
                    phone: false,
                    email: false,
                },
                '2': {
                    '1': {
                        file: false,
                        title: false,
                        money: false,
                        comment: false,
                        payment: false,
                        offer: false,
                    }
                },
            },
            payment_methods: [
                {name: "Karta Visa, Mastercard, МИР"},
                {name: "Apple pay"},
                {name: "СПБ"},
                {name: "Google pay"},
            ],
            delete_modal: false,
            cardIndex: null,
        }
    },
    watch: {
        delete_modal () {
            if (this.delete_modal) {
                $('body').css({
                    overflow: 'hidden',
                    marginRight: '21px',
                });
            } else {
                $('body').css({
                    overflow: 'auto',
                    marginRight: '0',
                });
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
            } else if (parseInt(this.current_step) == 2)  {
                for (const [key, value] of Object.entries(this.error_fields['2'])) {
                    let errors = this.error_fields['2'][key];
                    if (
                        errors.file ||
                        errors.title ||
                        errors.money ||
                        errors.comment ||
                        errors.payment ||
                        errors.offer
                    ) {
                        t = true;
                        break;
                    }
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
            } else if (parseInt(this.current_step) == 2) {
                if (Object.keys(this.step_fields['2']).length) {
                    t = false;
                } else {
                    t = true;
                }
                
                this.checkStepFields();
            } else {
                t = false;
            }
            return t;
        }
    },
    methods: {
        CloseModal () {
            this.delete_modal = false;
        },
        SaveDatas () {
            if (parseInt(this.current_step) == 1) {

                // Step 1
                this.current_step = 2;
            } else if (parseInt(this.current_step) == 2) {

                // Step 2
                if (this.checkStep2()) {
                    this.current_step = 3;
                    console.log('ishladi');
                }
            }
        },
        checkInputValue (idx, name, value) {
            if (parseInt(this.current_step) == 2) {
                let index = idx.split('-');
                this.error_fields[index[0]][index[1]][name] = value;
            } else {
                this.error_fields[idx][name] = value;
            }
        },
        confirmRemove (idx) {
            this.cardIndex = idx;
            this.delete_modal = true;
        },
        removeCard (idx) {
            delete this.step_fields['2'][idx];
            delete this.error_fields['2'][idx];
            this.delete_modal = false;
        },
        addCard () {
            let key = '1';
            for (const [k, value] of Object.entries(this.step_fields['2'])) {
                key = String(Number(k) + 1);
            }
            this.step_fields['2'][key] = {};
            this.error_fields['2'][key] = {
                                            file: false,
                                            title: false,
                                            money: false,
                                            comment: false,
                                            payment: false,
                                            offer_description: false,
                                        }
        },
        addPayment (key, payName) {
            if (this.step_fields['2'][key]['payment']) {
                if (Array.isArray(this.step_fields['2'][key]['payment'])) {
                    if (this.step_fields['2'][key]['payment'].includes(payName)) {
                        let arr_index = this.step_fields['2'][key]['payment'].indexOf(payName);
                        this.step_fields['2'][key]['payment'].splice(arr_index, 1);
                    } else {
                        this.step_fields['2'][key]['payment'].push(payName)
                    }
                } else {
                    this.step_fields['2'][key]['payment'] = [];
                    this.step_fields['2'][key]['payment'].push(payName);
                }
            } else {
                this.step_fields['2'][key]['payment'] = [];
                this.step_fields['2'][key]['payment'].push(payName)
            }
            this.error_fields['2'][key].payment = false;
        },
        checkStepFields () {
            let field = false;
            for (const [key, value] of Object.entries(this.step_fields['2'])) {
                let datas = this.step_fields['2'][key];
                if (
                    datas.file &&
                    datas.title &&
                    datas.money && 
                    datas.comment &&
                    (datas.payment && datas.payment.length)
                ) {
                    if ((datas.offer && datas.offer_description) || !datas.offer) {
                        field = true;
                    }
                } else {
                    field = false;
                    break;
                }
            }

            field ? this.current_step = 2.5 : this.current_step = 2;
            return field;
        },
        checkStep2 () {
            for (const [key, value] of Object.entries(this.step_fields['2'])) {
                let datas = this.step_fields['2'][key];
                if (!datas.file) {
                    this.error_fields['2'][key].file = true;
                }
                if (!datas.title) {
                    this.error_fields['2'][key].title = true;
                }
                if (!datas.money) {
                    this.error_fields['2'][key].money = true;
                }
                if (!datas.comment) {
                    this.error_fields['2'][key].comment = true;
                }
                if (!datas.payment || !datas.payment.length) {
                    this.error_fields['2'][key].payment = true;
                }
                if (datas.offer && !datas.offer_description) {
                    this.error_fields['2'][key].offer = true;
                }
            }
            return this.checkStepFields();
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

.step.hidden {
    display: none;
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

.form_item {
    padding-bottom: 72px;
    border-bottom: 1px solid #BEC1C5;
}

.form_item .form_item_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid #BEC1C5;
    background: #FFF;
    padding: 24px 24px 24px 29px;
    margin: 42px 0 54px;
}

.form_item .form_item_head .form_item_title {
    display: flex;
    align-items: center;
    gap: 18px;
}

.form_item .form_item_head .form_item_title span {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.add_button_wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 72px 0px;
}

.step .money_input_wrapper input {
    width: 268px;
}

.step_2 .form_cards {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 331px;
}

.step_2 .form_cards .card_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: #FFF;
    padding: 16px;
    cursor: pointer;
}

.step_2 .form_cards .card_item.selected {
    border: 1px solid #F47421;
}

.step_2 .form_cards .text_wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

.step_2 .form_cards .text_wrapper span {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.step_2 .form_cards .img {
    width: 16px;
    height: 16px;
    border-radius: 1.5px;
    background: #F6F6F6;
}

.step_2 .ofer_description {
    margin-top: 24px;
}

.step_2 .ofer_description textarea {
    min-height: 86px;
}

.error_text {
    color: #FF4D4F;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-top: 8px;
}

.step_2 .modal_buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
}

.step_2 .modal_buttons button {
    width: 130px;
}
</style>