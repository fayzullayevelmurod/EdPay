<template>
    <div>
        <div :class="$store.state.landing_show ? 'd-none' : ''">
            <create-landing-head v-if="current_step < 6" :current_step="current_step" :error="step_error"/>
            
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
                        <form-title :error="error_fields['2'][key].descrioption" title="4. Описание:"/>
                        <form-input
                            :idx="`2-${key}`"
                            field_name="descrioption"
                            v-model:value="step_fields['2'][key].descrioption"
                            @check_value="checkInputValue"
                            type="textarea" 
                            label="Напишите название продукта:"
                            error_title="*Превышено допустимое количество символов"
                            :error="error_fields['2'][key].descrioption"
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
            </div>
    
            <!-- Step 3 -->
            <div :class="`step_3 step ${current_step == 3 || current_step == 3.5 ? '' : 'hidden'}`">
                <div class="landing_container">
                    <form-title :error="error_fields['3']" title="1. Набор полей и кнопок для клиента"/>
                    <div class="subtitle">Выберите, какую информацию о себе должен указать клиент. Укажите, какие поля обязательны для заполнения.</div>
                    <div class="checklist_wrapper">
                        <div :class="`checklist ${i != step_fields['3'].length - 1 ? 'bordered' : ''}`" v-for="(item, i) in step_fields['3']" :key="i">
                            <Checkbox v-model:value="item.value" :title="item.name"/>
                            <div class="checklist_right">
                                <switch-checkbox :disabled="item.value" v-model:value="item.mandatory" />
                                <div :class="`switch_title ${!item.value ? 'hidden' : ''}`">Сделать обязательным для заполнения</div>
                            </div>
                        </div>
                    </div>
                    <div :class="`error_text ${error_fields['3'] ? 'active' : ''}`">*Выберите минимум один способ обратной связи</div>
                </div>
                <div class="foot_line">
                    <div class="landing_container">
                        <div class="title">Вы уже можете посмотреть, как будет выглядеть Ваш будущий лендинг </div>
                        <div class="subtitle">Нажмите кнопку «Предпросмотр лендинга» ниже. Если он вам нравится — переходите к следующему шагу, загружайте документы и начинайте работать с нами</div>
                    </div>
                </div>
            </div>
    
            <!-- Step 4 -->
            <div :class="`step_4 step ${current_step == 4 || current_step == 4.5 ? '' : 'hidden'}`">
                <div class="landing_container">
                    <form-title :error="error_fields['4'].inn" title="1. Реквизиты:"/>
                    <form-input
                        idx="4"
                        field_name="inn"
                        v-model:value="step_fields['4'].inn"
                        @check_value="checkInputValue"
                        type="number" 
                        label="ИНН:"
                        error_title="*ИНН не найден"
                        :error="error_fields['4'].inn"
                    />
                    <div v-if="user_data_inn" class="bank_user_data">
                        <div>
                            <div class="title">ОГРН/ОГРНИП</div>
                            <div class="value">2534216162542534862`53486`524386`15438`61534</div>
                        </div>
                        <div>
                            <div class="title">Наименование (для внутренних нужд сервиса, его не увидят клиенты)</div>
                            <div class="value">ИП Петров В.К.</div>
                        </div>
                    </div>
                    <form-title :error="bank_card_datas" title="2. Вывод средств:"/>
                    <div class="inputs">
                        <form-input
                            idx="4"
                            field_name="bank_bic"
                            v-model:value="step_fields['4'].bank_bic"
                            @check_value="checkInputValue"
                            type="number" 
                            label="БИК банка:"
                            error_title="*БИК банка не найден"
                            :error="error_fields['4'].bank_bic"
                        />
                        
                        <!-- Bank name -->
                        <div v-if="check_bank_name" class="bank_user_data">
                            <div>
                                <div class="title">Название банка</div>
                                <div class="value">ПАО Сбербанк</div>
                            </div>
                        </div>
                        
                        <form-input
                            idx="4"
                            field_name="account_number"
                            v-model:value="step_fields['4'].account_number"
                            @check_value="checkInputValue"
                            type="number" 
                            label="Номер р/с:"
                            error_title="*Поле не заполнено"
                            :error="error_fields['4'].account_number"
                        />
                        <form-input
                            idx="4"
                            field_name="recipient"
                            v-model:value="step_fields['4'].recipient"
                            @check_value="checkInputValue"
                            type="text" 
                            label="Получатель:"
                            error_title="*Поле не заполнено"
                            :error="error_fields['4'].recipient"
                        />
                    </div>
                </div>
                <div class="foot_line"></div>
            </div>
    
            <!-- Step 5 -->
            <div :class="`step_5 step ${current_step == 5 || current_step == 5.5 ? '' : 'hidden'}`">
                <div class="landing_container">
                    <form-title :error="error_fields['5']" title="1. Документы:"/>
                    <h4>Приложите фото или сканы следующих документов:</h4>
                    <div :class="`step_block ${i == 4 ? 'last_child' : ''}`" v-for="i in 4" :key="i">Документ {{i}};</div>
                    <div class="select_file">
                        <div class="select_file_in">
                            <img src="@/assets/images/file_icon.svg" alt="" class="file_icon">
                            <p>Допустимые форматы: gif, jpg, jpeg, png, bmp, tif, tiff, pdf, doc, docx, txt, xls, xlsx<br> Размер одного файла не должен превышать 3 Mb</p>
                            <input type="file" @change="selectFile" class="select_file_input">
                        </div>
                        <Button title="Выбрать файл" @clicked="openSelectFile()"/>
                    </div>
                    <div v-if="error_fields['5']" class="error_text">*Прикрепите документы</div>
                    <h3 v-if="step_fields['5'].length" class="uploaded_title">Загруженные документы:</h3>
                    <div v-if="step_fields['5'].length" class="upload_documents_wrapper">
                        <div :class="`uploaded_documents ${step_fields['5'].length - 1 != idx ? 'border-bottom' : ''}`" v-for="(file, idx) in step_fields[5]" :key="idx">
                            <div class="uploaded_block">
                                <div class="block_left">
                                    <img :src="getfileLink(file)" alt="">
                                    <div>
                                        <h5>{{file.name}}</h5>
                                        <h6>{{getFileSize(file.size)}}</h6>
                                    </div>
                                </div>
                                <button-remove @clicked="removeFile(idx)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot_line"></div>
            </div>
    
            <!-- Step 6 -->
            <div :class="`step_6 step ${current_step == 6 || current_step == 6.5 ? '' : 'hidden'}`">
                <div class="container">
                    <div class="title">Создание лендинга</div>
                    <Alert type="blue">
                        <div>Так лендинг будут видеть Ваши клиенты, проверьте его перед публикацией.</div>
                    </Alert>
                    <div class="title title_2">Оформление заказа</div>
                    <div class="card_calculation">
                        <div class="calculation_left">
                            <img src="@/assets/images/library_image_3.png" alt="">
                            <div class="name">Как стать дизайнером</div>
                        </div>
                        <div class="calculation_right">
                            <div class="money">
                                <div class="money_title">Цена:</div>
                                <div class="money_amount">{{numberFormat(step_fields['6'].amount)}} ₽/шт</div>
                            </div>
                            <div class="calculation_input">
                                <button @click="calculationAmount(false)" :class="`minus ${step_fields['6'].count === 1 ? 'disabled' : ''}`">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M1.57031 7.32227H14.4275C14.506 7.32227 14.5703 7.38655 14.5703 7.46512V8.53655C14.5703 8.61512 14.506 8.67941 14.4275 8.67941H1.57031C1.49174 8.67941 1.42745 8.61512 1.42745 8.53655V7.46512C1.42745 7.38655 1.49174 7.32227 1.57031 7.32227Z" fill="#A1ABB6"/>
                                    </svg>
                                </button>
                                <input type="number" v-model="step_fields['6'].count">
                                <button @click="calculationAmount(true)" class="plus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8.53753 1.57227H7.4661C7.37086 1.57227 7.32324 1.61988 7.32324 1.71512V7.32227H2.00223C1.90699 7.32227 1.85938 7.36988 1.85938 7.46512V8.53655C1.85938 8.63179 1.90699 8.67941 2.00223 8.67941H7.32324V14.2866C7.32324 14.3818 7.37086 14.4294 7.4661 14.4294H8.53753C8.63277 14.4294 8.68039 14.3818 8.68039 14.2866V8.67941H14.0022C14.0975 8.67941 14.1451 8.63179 14.1451 8.53655V7.46512C14.1451 7.36988 14.0975 7.32227 14.0022 7.32227H8.68039V1.71512C8.68039 1.61988 8.63277 1.57227 8.53753 1.57227Z" fill="#202224"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="money">
                                <div class="money_title">Итого:</div>
                                <div class="money_amount">{{numberFormat(step_fields['6'].all_amount)}} ₽</div>
                            </div>
                        </div>
                    </div>
                    <div class="calculation_form">
                        <form-title title="1. Способы оплаты" />
                        <div class="subtitle">Выберите способ оплаты:</div>
                        <div class="form_cards">
                            <div
                                @click="addPayment2(pay.name)" 
                                :class="`card_item ${step_fields['6']['payment'] && step_fields['6']['payment'].includes(pay.name) ? 'selected' : ''}`" 
                                v-for="(pay, index) in payment_methods" 
                                :key="index"
                            >
                                <div class="text_wrapper">
                                    <div class="img">
                                        <img v-if="step_fields['6']['payment'] && step_fields['6']['payment'].includes(pay.name)" src="@/assets/images/checkbox_icon.svg" alt="">
                                    </div>
                                    <span>{{pay.name}}</span>
                                </div>
                                <img :src="require(`@/assets/images/payment_card_${index+1}.svg`)" alt="">
                            </div>
                            <div v-if="error_fields['6'].payment" class="error_text">*Выберите способ оплаты</div>
                        </div>
                        <form-title title="2. Контактные данные" />
                        <div class="calculation_form_wrapper">
                            <div class="calculation_form_inputs">
                                <form-input
                                    idx="6"
                                    field_name="phone"
                                    v-model:value="step_fields['6'].phone"
                                    @check_value="checkInputValue"
                                    type="phone" 
                                    label="<span>*</span>Телефон:"
                                    error_title="*Поле не заполнено"
                                    :error="error_fields['6'].phone"
                                />
                                <form-input
                                    idx="6"
                                    field_name="email"
                                    v-model:value="step_fields['6'].email"
                                    @check_value="checkInputValue"
                                    type="email" 
                                    label="<span>*</span>E-mail :"
                                    error_title="*Поле заполнено некорректно"
                                    :error="error_fields['6'].email"
                                />
                            </div>
                            <form-input
                                idx="6"
                                field_name="comment"
                                v-model:value="step_fields['6'].comment"
                                @check_value="checkInputValue"
                                type="textarea" 
                                label="Комментарий:"
                                error_title="*Превышено допустимое количество символов"
                                :error="error_fields['6'].comment"
                            />
                        </div>
                        <img src="@/assets/images/calculation_line.svg" alt="" class="line">
                        <div class="form_card_foot">
                            <Button title="Оплатить"/>
                            <div class="foot_text">
                                <div class="name">Всего к оплате:</div>
                                <div class="value">{{numberFormat(this.step_fields['6'].all_amount)}} ₽</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="steps_foot">
                <div v-if="current_step == 6" class="foot_container foot_container_1">
                    <Checkbox v-model:value="step_fields['6'].agree" title="Нажимая кнопку и отправляя данные формы, Вы даёте <a href='#'>согласие на обработку персональных данных</a> и соглашаетесь с <a href='#'>политикой конфиденциальности</a>"/>
                    <Alert type="coral">
                        <div>Перед публикацией вся информация проходит модерацию</div>
                        <div>Проверка может занять до трех дней (но мы стараемся успеть за день). После проверки на почту <span>school@yandex.ru</span> придет уведомление, прошел лендинг модерацию или нет.</div>
                    </Alert>
                </div>
                <div class="foot_container">
                    <button @click="backStep()" class="back_btn">Отмена</button>
                    <div class="buttons">
                        <Button @clicked="showCard()" v-if="current_step == 3 || current_step == 3.5 || current_step == 4 || current_step == 4.5 || current_step == 5" :light="true" title="Предпросмотр лендинга"/>
                        <Button
                            title="Продолжить"
                            :disabled="check_field"
                            @clicked="SaveDatas()"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div :class="!$store.state.landing_show ? 'd-none' : ''">
            <create-landing-show @go_back="goBack()" />
        </div>
    </div>
</template>

<script>
import CreateLandingHead from '@/components/CreateLandingHead.vue';
import CreateLandingShow from '@/components/CreateLandingShow.vue';


export default {
    name: "CreateLanding",
    components: {
        CreateLandingHead,
        CreateLandingShow
    },
    data () {
        return {
            current_step: 1,
            step_fields: {
                '1': {},
                '2': {
                    '1': {},
                },
                '3': [
                    {name: "Телефон", value: false, mandatory: false},
                    {name: "E-mail", value: false, mandatory: false},
                    {name: "Комментарии", value: false, mandatory: false},
                ],
                '4': {},
                '5': [],
                '6': {
                    amount: 9999.99,
                    count: 1,
                    all_amount: 9999.99,
                    payment: [],
                    phone: '',
                    email: '',
                    comment: '',
                    agree: false,
                }
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
                        descrioption: false,
                        payment: false,
                        offer: false,
                    }
                },
                '3': false,
                '4': {
                    inn: false,
                    bank_bic: false,
                    account_number: false,
                    recipient: false
                },
                '5': false,
                '6': {
                    payment: false,
                    phone: false,
                    email: false,
                    comment: false,
                }
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
                $('body').addClass('overflow-hidden');
            } else {
                $('body').removeClass('overflow-hidden');
            }
        },
        
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
                        errors.descrioption ||
                        errors.payment ||
                        errors.offer
                    ) {
                        t = true;
                        break;
                    }
                }
            } else if (parseInt(this.current_step) == 3) {
                t = this.error_fields['3']
            } else if (parseInt(this.current_step) == 4) {
                let fields = this.step_fields['4'];
                if (fields.inn && fields.bank_bic && fields.account_number && fields.recipient) {
                    this.current_step = 4.5;
                }
                let errors = this.error_fields['4'];
                if (errors.inn || this.bank_card_datas) {
                    t = true;
                    this.current_step = 4
                };
            } else if (parseInt(this.current_step) == 5) {
                t = this.error_fields['5']
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
        },
        user_data_inn () {
            let t = false;
            if (this.step_fields['4'].inn) {
                let a = String(this.step_fields['4'].inn);

                if (a.length > 1) {
                    let firstDigit = a[0];
                    
                    for (let i = 1; i < a.length; i++) {
                        if (a[i] !== firstDigit) {
                            t = true;
                            break;
                        }
                    }
                    t ? this.error_fields['4'].inn = false : this.error_fields['4'].inn = true;
                }
            }

            return t;
        },
        bank_card_datas () {
            if (this.error_fields['4'].bank_bic || this.error_fields['4'].account_number || this.error_fields['4'].recipient) {
                return true;
            }

            return false;
        },
        check_bank_name () {
            let t = false;
            if (this.step_fields['4'].bank_bic) {
                let a = String(this.step_fields['4'].bank_bic);

                if (a.length > 1) {
                    let firstDigit = a[0];
                    
                    for (let i = 1; i < a.length; i++) {
                        if (a[i] !== firstDigit) {
                            t = true;
                            break;
                        }
                    }
                    t ? this.error_fields['4'].bank_bic = false : this.error_fields['4'].bank_bic = true;
                }
            }

            return t;
        }
    },
    methods: {
        CloseModal () {
            this.delete_modal = false;
        },
        SaveDatas () {
            this.$store.commit('saveData', this.step_fields);
            this.$store.commit('changeCurrentStep', parseInt(this.current_step));
            if (parseInt(this.current_step) == 1) {

                // Step 1
                this.current_step = 2;
            } else if (parseInt(this.current_step) == 2) {
                
                // Step 2
                if (this.checkStep2()) {
                    // this.$store.commit('changeLandingShow', true);
                    this.current_step = 3;
                }
            } else if (parseInt(this.current_step) == 3) {

                // Step 3
                if (this.checkStep3()) {
                    this.current_step = 4;
                }
            } else if (parseInt(this.current_step) == 4) {

                // Step 4
                if (this.checkStep4()) {
                    this.current_step = 5;
                }
            } else if (parseInt(this.current_step) == 5) {

                // Step 5
                if (this.checkStep5()) {
                    this.current_step = 6;
                }
            } else if (parseInt(this.current_step) == 6) {

                // Step 6
                if (this.checkStep6()) {
                    this.current_step = 6;
                }
            }
        },
        showCard () {
            this.$store.commit('saveData', this.step_fields)
            this.$store.commit('changeLandingShow', true);
        },
        goBack () {
            this.$store.commit('changeLandingShow', false);
        },
        backStep () {
            if (parseInt(this.current_step) !== 1) {
                this.current_step = parseInt(this.current_step) - 1;
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
                                            descrioption: false,
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
        addPayment2 (payName) {
            if (this.step_fields['6']['payment'].includes(payName)) {
                let arr_index = this.step_fields['6']['payment'].indexOf(payName);
                this.step_fields['6']['payment'].splice(arr_index, 1);
            } else {
                this.step_fields['6']['payment'].push(payName)
            }
            this.error_fields['6'].payment = false;
        },
        checkStepFields () {
            let field = false;
            for (const [key, value] of Object.entries(this.step_fields['2'])) {
                let datas = this.step_fields['2'][key];
                if (
                    datas.file &&
                    datas.title &&
                    datas.money && 
                    datas.descrioption &&
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
                if (!datas.descrioption) {
                    this.error_fields['2'][key].descrioption = true;
                }
                if (!datas.payment || !datas.payment.length) {
                    this.error_fields['2'][key].payment = true;
                }
                if (datas.offer && !datas.offer_description) {
                    this.error_fields['2'][key].offer = true;
                }
            }
            return this.checkStepFields();
        },
        checkStep3 () {
            let i = 1;
            this.step_fields['3'].forEach(datas => {
                if (datas.value) {
                    i++;
                }
            });
            
            if (i == 1) {
                this.error_fields['3'] = true;
                return false;
            } else {
                this.error_fields['3'] = false;
                return true;
            }
        },
        checkStep4 () {
            let t = true;
            for (const [key, value] of Object.entries(this.error_fields[4])) {
                if (!this.step_fields['4'][key]) {
                    t = false;
                    this.error_fields['4'][key] = true;
                }
            }
            return t;
        },
        checkStep5 () {
            if (!this.step_fields['5'].length) {
                this.error_fields['5'] = true;
                return false;
            }
            return true;
        },
        checkStep6 () {
            let t = true;
            if (!this.step_fields['6'].payment.length) {
                t = false;
                this.error_fields['6'].payment = true;
            }
            if (!this.step_fields['6'].phone.length) {
                t = false;
                this.error_fields['6'].phone = true;
            }
            if (!this.step_fields['6'].email.length) {
                t = false;
                this.error_fields['6'].email = true;
            }
            if (!this.step_fields['6'].comment.length) {
                t = false;
                this.error_fields['6'].comment = true;
            }
        },
        openSelectFile () {
            $('.select_file_input').click();
        },
        selectFile (e) {
            this.step_fields['5'].push(e.target.files[0]);
            this.error_fields['5'] = false;
        },
        removeFile (idx) {
            this.step_fields['5'].splice(idx, 1);
        },
        getFileSize (fileSize) {
            let size = "";
            fileSize < 1000000 ? size = Math.floor(fileSize/1000) + 'Kb' : size = Math.floor(fileSize/1000000) + 'Mb'
            return '(' + size + ')';
        },
        getfileLink (file) {
            return URL.createObjectURL(file);
        },
        calculationAmount (condination) {
            if (condination) {
                this.step_fields['6'].count++;
            } else {
                if (this.step_fields['6'].count !== 1) {
                    this.step_fields['6'].count--;
                }
            }
            this.step_fields['6'].all_amount = this.step_fields['6'].amount * this.step_fields['6'].count;
        },
        numberFormat (num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
}
</script>

<style>
.d-none {
    display: none;
}

.uploaded_title {
    color: var(--character-title-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; 
    margin-bottom: 24px;
    margin-top: 42px;
}

.upload_documents_wrapper {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    border: 1px solid #F4F3F3;
}

.uploaded_documents {
    background: #FFF;
}

.uploaded_documents.border-bottom {
    border-bottom: 1px solid #F4F3F3;
}

.uploaded_block {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.uploaded_block .block_left {
    display: flex;
    align-items: center;
    gap: 24px;
}

.uploaded_block img {
    width: 48px;
    min-width: 48px;
    height: 48px;
    object-fit: cover;
}

.uploaded_block h5 {
    color: var(--Secondary-text, #444B52);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 128.571% */
}

.uploaded_block h6 {
    color: #7F848A;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}

.select_file {
    margin-top: 12px;
    padding: 34px 42px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px dashed var(--Disabled, #BEC1C5);
    background: var(--BG-Grey, #F6F6F6);
}

.select_file .select_file_in {
    display: flex;
    align-items: center;
}

.select_file button {
    margin-left: auto;
}

.select_file p {
    margin-left: 17px;
    max-width: 400px;
    color: var(--Secondary-Grey, #7F848A);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.step_block {
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 12px;
    position: relative;
    padding-left: 14px;
}

.step_block.last_child {
    margin-bottom: 24px;
}

.step_block::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background: #F47421;
}

.step h4 {
    color: var(--character-title-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 24px;
}

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

.steps_foot .foot_container_1 {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 42px;
    margin-bottom: 24px;
    margin-top: 8px;
}

.steps_foot .foot_container_1 .alert_wrapper {
    width: 100%;
}

.steps_foot .buttons {
    display: flex;
    align-items: center;
    gap: 24px;
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

.form_cards {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 331px;
}

.form_cards .card_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: #FFF;
    padding: 16px;
    cursor: pointer;
}

.form_cards .card_item.selected {
    border: 1px solid #F47421;
}

.form_cards .text_wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

.form_cards .text_wrapper span {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.form_cards .img {
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

.step_2 .border_line {
    width: 100%;
    display: block;
    margin-bottom: 24px;
}

.step_2 .images {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    width: 884px;
    padding-bottom: 18px;
}

.step_2 .images .image {
    width: calc(100% / 4 - (18px / 4));
    padding: 0;
    border-radius: 10px;
    padding: 6px 6px 3px;
    background: transparent;
    cursor: pointer;
    position: relative;
}

.step_2 .images .image.checked {
    background: rgba(244, 116, 31, 0.1);
}

.step_2 .images .image .main_image {
    width: 100%;
    border-radius: 8px;
    border: 2px solid transparent;
}

.step_2 .images .image.checked .main_image {
    border: 2px solid #F47421;
}

.step_2 .images .image .checkbox {
    display: none;
    position: absolute;
    top: 18px;
    left: 18px;
}

.step_2 .images .image.checked .checkbox {
    display: block;
}

.step_2 .modal_wrapper .choose_photo {
    padding-left: 32px;
    padding-right: 32px;
}

.step_2 .modal_wrapper .choose_photo .title {
    max-width: 100%;
    margin-bottom: 18px;
}

.step_3 .error_text {
    padding-left: 4px;
    opacity: 0;
}

.step_3 .error_text.active {
    opacity: 1;
}

.step_3 .checklist_wrapper {
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: #FFF;
}

.step_3 .checklist_wrapper .checklist {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
}

.step_3 .checklist_wrapper .checklist .checkbox_wrapper span {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}

.step_3 .checklist_wrapper .checklist .checklist_right {
    display: flex;
    align-items: center;
    gap: 19px;
}

.step_3 .checklist_wrapper .checklist .checklist_right .switch_title {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.step_3 .checklist_wrapper .checklist .checklist_right .switch_title.hidden {
    color: #BEC1C5;
}

.step_3 .checklist_wrapper .checklist.bordered {
    border-bottom: 1px solid #F4F3F3;
}

.step_3 .foot_line {
    height: auto;
    margin-top: 44px;
    padding: 24px 0;
}

.step_3 .foot_line .title {
    color: rgba(0, 0, 0, 0.85);
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 8px;
}

.step_3 .foot_line .subtitle {
    color: #444B52;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
}

.step_4 .bank_user_data {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.step_4 .bank_user_data .title {
    color: #7F848A;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 4px;
}

.step_4 .bank_user_data .value {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}

.step_4 .inputs {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.step_4 .inputs .hidden {
    display: none;
}

.step_4 .foot_line {
    margin-top: 44px;
}

.step_5 .foot_line {
    margin-top: 72px;
}

.step_5 .select_file_input {
    display: none;
}

.step_6 {
    background: #F4F3F3;
    padding: 72px 0% 24px;
}

.step_6 .container {
    max-width: 1260px;
    margin: 0 auto;
}

.step_6 .title {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 42px;
    text-align: center;
}

.step_6 .title_2 {
    text-align: left;
    margin: 72px 0 42px;
}

.card_calculation {
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 6px 12px 0px rgba(10, 28, 45, 0.08);
    padding: 14px 47px 14px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.calculation_left {
    display: flex;
    align-items: center;
    gap: 32px;
}

.calculation_left img {
    width: 103px;
    height: 103px;
    object-fit: cover;
    border-radius: 8px;
}

.calculation_left .name {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.calculation_right {
    display: flex;
    align-items: center;
    gap: 33px;
}

.calculation_right .money .money_title {
    color: #7F848A;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 2px;
}

.calculation_right .money .money_amount {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.calculation_input {
    display: flex;
    align-items: stretch;
    height: 42px;
}

.calculation_input button {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F4F3F3;
}

.calculation_input button svg path {
    fill: #000;
}

.calculation_input button.disabled {
    cursor: default;
}

.calculation_input button.disabled svg path {
    fill: #A1ABB6;
}

.calculation_input .minus {
    border-radius: 6px 0px 0px 6px;
    box-shadow: 0px -1px 0px 0px #D9D9D9 inset, 0px 1px 0px 0px #D9D9D9 inset, 1px 0px 0px 0px #D9D9D9 inset;
}

.calculation_input .plus {
    border-radius: 0px 6px 6px 0px;
    box-shadow: 0px -1px 0px 0px #D9D9D9 inset, 0px 1px 0px 0px #D9D9D9 inset, -1px 0px 0px 0px #D9D9D9 inset;
}

.calculation_input input {
    width: 64px;
    border: 1px solid #D9D9D9;
    background: #FFF;
    outline: none;
    color: #202224;
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}

.calculation_form {
    padding: 1px 32px 24px 42px;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 6px 12px 0px rgba(10, 28, 45, 0.08);
}

.calculation_form_wrapper {
    max-width: 560px;
}

.calculation_form_inputs {
    display: flex;
    align-items: flex-start;
    gap: 24px;
}

.calculation_form_wrapper .input_wrapper textarea {
    min-height: 98px;
    resize: none;
}

.calculation_form .line {
    width: 100%;
    margin-bottom: 24px;
}

.form_card_foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form_card_foot .foot_text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 26px;
}

.form_card_foot .foot_text .name {
    color: #7F848A;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.form_card_foot .foot_text .value {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

@media only screen and (max-width: 1380px) {
    .steps_foot .foot_container {
        padding-left: 20px;
        padding-right: 20px;
    }

    .step_6 .container {
        padding: 0px 20px;
    }
}

@media only screen and (max-width: 992px) {
    .step .landing_container {
        padding: 0px 20px;
    }
    .step_1 .inputs {
        flex-direction: column;
        gap: 10px;
    }
    
    .steps_foot .foot_container {
        flex-direction: column-reverse;
        gap: 10px;
    }

    .steps_foot .foot_container .buttons {
        flex-direction: column;
        gap: 10px;
    }

    .step_2 .images {
        width: 100%;
        height: 500px;
        overflow-y: scroll;
    }

    .step_2 .images::-webkit-scrollbar {
        display: none;
    }

    .step_2 .images .image {
        width: calc(100% / 3 - 6px)
    }

    .step_2 .modal_wrapper .modal_content {
        width: calc(100% - 40px);
    }

    .step_3 .checklist_wrapper .checklist {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .step_5 .select_file {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 34px 20px;
    }
    
    .step_5 .select_file .select_file_in {
        align-items: flex-start;
    }

    .step_5 .select_file button {
        width: 100%;
    }

    .step_6 .card_calculation {
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
        padding: 14px;
    }

    .step_6 .card_calculation .calculation_right {
        width: 100%;
        justify-content: space-between;
    }
}

@media only screen and (max-width: 550px) {
    .step_6 .card_calculation .calculation_right {
        width: 100%;
        flex-direction: column;
        gap: 10px;
    }
}

@media only screen and (max-width: 576px) {
    .step_2 .images .image {
        width: calc(100% / 2 - 6px)
    }

    .step_6 .calculation_form {
        padding-left: 24px;
    }

    .step_6 .calculation_form .form_cards {
        width: 100%;
    }

    .calculation_form_wrapper .calculation_form_inputs {
        flex-direction: column;
        gap: 10px;
    }

    .step_6 .form_card_foot {
        flex-direction: column-reverse;
        gap: 20px;
    }

    .step_6 .form_card_foot .foot_text {
        width: 100%;
    }
}
</style>