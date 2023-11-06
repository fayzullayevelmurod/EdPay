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
                    type="text" 
                    label="ИНН:"
                    error_title="*ИНН не найден"
                />
                <form-title :error="error_fields['4'].bank" title="2. Вывод средств:"/>
                <form-input
                    idx="4"
                    field_name="bank"
                    v-model:value="step_fields['4'].bank"
                    @check_value="checkInputValue"
                    type="text" 
                    label="БИК банка:"
                    error_title="*БИК банка не найден"
                />
                <form-input
                    idx="4"
                    field_name="number"
                    v-model:value="step_fields['4'].number"
                    @check_value="checkInputValue"
                    type="text" 
                    label="Номер р/с:"
                    error_title="*Поле не заполнено"
                />
                <form-input
                    idx="4"
                    field_name="recipient"
                    v-model:value="step_fields['4'].recipient"
                    @check_value="checkInputValue"
                    type="text" 
                    label="Получатель:"
                    error_title="*Поле не заполнено"
                />
            </div>
        </div>

        <!-- Step 5 -->
        <div :class="`step_5 step ${current_step == 5 || current_step == 5 ? '' : 'hidden'}`">
            <div class="landing_container">
                <form-title :error="error_fields['4'].inn" title="1. Реквизиты:"/>
                <form-input
                    idx="4"
                    field_name="inn"
                    v-model:value="step_fields['4'].inn"
                    @check_value="checkInputValue"
                    type="text" 
                    label="ИНН:"
                    error_title="*ИНН не найден"
                />
                <form-title :error="error_fields['4'].bank" title="2. Вывод средств:"/>
                <form-input
                    idx="4"
                    field_name="bank"
                    v-model:value="step_fields['4'].bank"
                    @check_value="checkInputValue"
                    type="text" 
                    label="БИК банка:"
                    error_title="*БИК банка не найден"
                />
                <form-input
                    idx="4"
                    field_name="number"
                    v-model:value="step_fields['4'].number"
                    @check_value="checkInputValue"
                    type="text" 
                    label="Номер р/с:"
                    error_title="*Поле не заполнено"
                />
                <form-input
                    idx="4"
                    field_name="recipient"
                    v-model:value="step_fields['4'].recipient"
                    @check_value="checkInputValue"
                    type="text" 
                    label="Получатель:"
                    error_title="*Поле не заполнено"
                />
            </div>
        </div>

        <!-- Step 6 -->
        <div :class="`step_5 step ${current_step == 5 || current_step == 5.5 ? '' : 'hidden'}`">
            <div class="landing_container">
                <form-title :error="error_fields['4'].inn" title="1. Документы:"/>
                <h4>Приложите фото или сканы следующих документов:</h4>
                <div class="step_block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#F47421"/>
                    </svg>
                    <span>Документ 1;</span>
                </div>
                <div class="step_block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#F47421"/>
                    </svg>
                    <span>Документ 2;</span>
                </div>
                <div class="step_block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#F47421"/>
                    </svg>
                    <span>Документ 3;</span>
                </div>
                <div class="step_block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#F47421"/>
                    </svg>
                    <span>Документ 4;</span>
                </div>
                <div class="select_file">
                    <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
                        <path d="M53.3775 13.0759L41.5129 1.85136C40.251 0.657439 38.5992 0 36.862 0H14.2734C10.5418 0 7.50586 3.03594 7.50586 6.76758V56.2324C7.50586 59.9641 10.5418 63 14.2734 63H48.7266C52.4582 63 55.4941 59.9641 55.4941 56.2324V17.9922C55.4941 16.1404 54.7226 14.3485 53.3775 13.0759ZM49.7923 14.7656H40.6055C40.2662 14.7656 39.9902 14.4896 39.9902 14.1504V5.49232L49.7923 14.7656ZM48.7266 59.3086H14.2734C12.5772 59.3086 11.1973 57.9286 11.1973 56.2324V6.76758C11.1973 5.07138 12.5772 3.69141 14.2734 3.69141H36.2988V14.1504C36.2988 16.5251 38.2308 18.457 40.6055 18.457H51.8027V56.2324C51.8027 57.9286 50.4228 59.3086 48.7266 59.3086Z" fill="#7F848A"/>
                        <path d="M44.666 24.6094H17.5957C16.5764 24.6094 15.75 25.4358 15.75 26.4551C15.75 27.4744 16.5764 28.3008 17.5957 28.3008H44.666C45.6853 28.3008 46.5117 27.4744 46.5117 26.4551C46.5117 25.4358 45.6853 24.6094 44.666 24.6094Z" fill="#7F848A"/>
                        <path d="M44.666 34.4531H17.5957C16.5764 34.4531 15.75 35.2795 15.75 36.2988C15.75 37.3181 16.5764 38.1445 17.5957 38.1445H44.666C45.6853 38.1445 46.5117 37.3181 46.5117 36.2988C46.5117 35.2795 45.6853 34.4531 44.666 34.4531Z" fill="#7F848A"/>
                        <path d="M26.5437 44.2969H17.5957C16.5764 44.2969 15.75 45.1233 15.75 46.1426C15.75 47.1619 16.5764 47.9883 17.5957 47.9883H26.5437C27.563 47.9883 28.3894 47.1619 28.3894 46.1426C28.3894 45.1233 27.563 44.2969 26.5437 44.2969Z" fill="#7F848A"/>
                    </svg>
                    <p>Допустимые форматы: gif, jpg, jpeg, png, bmp, tif, tiff, pdf, doc, docx, txt, xls, xlsx<br>
                    Размер одного файла не должен превышать 3 Mb
                    </p>
                    <Button
                        title="Выбрать файл"
                        :disabled="check_field"
                        @clicked="SaveDatas()"
                    />
                </div>
                <h3 class="uploaded_title">Загруженные документы:</h3>
                <div class="uploaded_documents">
                    <div class="uploaded_block">
                        <img src="../assets/images/upload.png" alt="">
                        <div>
                            <h5>dhcdvs6457257.jpg </h5>
                            <h6>(2Mb)</h6>
                        </div>
                        <div class="upload_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.668 4.66675C12.4912 4.66675 12.3216 4.73699 12.1966 4.86201C12.0715 4.98703 12.0013 5.1566 12.0013 5.33341V12.7941C11.9822 13.1312 11.8306 13.4471 11.5796 13.673C11.3286 13.8989 10.9986 14.0165 10.6613 14.0001H5.3413C5.00403 14.0165 4.67396 13.8989 4.42297 13.673C4.17199 13.4471 4.02043 13.1312 4.0013 12.7941V5.33341C4.0013 5.1566 3.93106 4.98703 3.80604 4.86201C3.68102 4.73699 3.51145 4.66675 3.33464 4.66675C3.15782 4.66675 2.98826 4.73699 2.86323 4.86201C2.73821 4.98703 2.66797 5.1566 2.66797 5.33341V12.7941C2.687 13.4849 2.97902 14.14 3.48009 14.616C3.98115 15.0919 4.65042 15.3499 5.3413 15.3334H10.6613C11.3522 15.3499 12.0215 15.0919 12.5225 14.616C13.0236 14.14 13.3156 13.4849 13.3346 12.7941V5.33341C13.3346 5.1566 13.2644 4.98703 13.1394 4.86201C13.0143 4.73699 12.8448 4.66675 12.668 4.66675Z" fill="black"/>
                            <path d="M13.3333 2.66675H10.6667V1.33341C10.6667 1.1566 10.5964 0.987034 10.4714 0.86201C10.3464 0.736986 10.1768 0.666748 10 0.666748H6C5.82319 0.666748 5.65362 0.736986 5.5286 0.86201C5.40357 0.987034 5.33333 1.1566 5.33333 1.33341V2.66675H2.66667C2.48986 2.66675 2.32029 2.73699 2.19526 2.86201C2.07024 2.98703 2 3.1566 2 3.33341C2 3.51023 2.07024 3.6798 2.19526 3.80482C2.32029 3.92984 2.48986 4.00008 2.66667 4.00008H13.3333C13.5101 4.00008 13.6797 3.92984 13.8047 3.80482C13.9298 3.6798 14 3.51023 14 3.33341C14 3.1566 13.9298 2.98703 13.8047 2.86201C13.6797 2.73699 13.5101 2.66675 13.3333 2.66675ZM6.66667 2.66675V2.00008H9.33333V2.66675H6.66667Z" fill="black"/>
                            <path d="M7.33333 11.3333V6.66667C7.33333 6.48986 7.2631 6.32029 7.13807 6.19526C7.01305 6.07024 6.84348 6 6.66667 6C6.48986 6 6.32029 6.07024 6.19526 6.19526C6.07024 6.32029 6 6.48986 6 6.66667V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333Z" fill="black"/>
                            <path d="M10.0013 11.3333V6.66667C10.0013 6.48986 9.93106 6.32029 9.80604 6.19526C9.68102 6.07024 9.51145 6 9.33464 6C9.15782 6 8.98826 6.07024 8.86323 6.19526C8.73821 6.32029 8.66797 6.48986 8.66797 6.66667V11.3333C8.66797 11.5101 8.73821 11.6797 8.86323 11.8047C8.98826 11.9298 9.15782 12 9.33464 12C9.51145 12 9.68102 11.9298 9.80604 11.8047C9.93106 11.6797 10.0013 11.5101 10.0013 11.3333Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div class="uploaded_block">
                        <img src="../assets/images/upload.png" alt="">
                        <div>
                            <h5>dhcdvs6457257.jpg </h5>
                            <h6>(2Mb)</h6>
                        </div>
                        <div class="upload_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.668 4.66675C12.4912 4.66675 12.3216 4.73699 12.1966 4.86201C12.0715 4.98703 12.0013 5.1566 12.0013 5.33341V12.7941C11.9822 13.1312 11.8306 13.4471 11.5796 13.673C11.3286 13.8989 10.9986 14.0165 10.6613 14.0001H5.3413C5.00403 14.0165 4.67396 13.8989 4.42297 13.673C4.17199 13.4471 4.02043 13.1312 4.0013 12.7941V5.33341C4.0013 5.1566 3.93106 4.98703 3.80604 4.86201C3.68102 4.73699 3.51145 4.66675 3.33464 4.66675C3.15782 4.66675 2.98826 4.73699 2.86323 4.86201C2.73821 4.98703 2.66797 5.1566 2.66797 5.33341V12.7941C2.687 13.4849 2.97902 14.14 3.48009 14.616C3.98115 15.0919 4.65042 15.3499 5.3413 15.3334H10.6613C11.3522 15.3499 12.0215 15.0919 12.5225 14.616C13.0236 14.14 13.3156 13.4849 13.3346 12.7941V5.33341C13.3346 5.1566 13.2644 4.98703 13.1394 4.86201C13.0143 4.73699 12.8448 4.66675 12.668 4.66675Z" fill="black"/>
                            <path d="M13.3333 2.66675H10.6667V1.33341C10.6667 1.1566 10.5964 0.987034 10.4714 0.86201C10.3464 0.736986 10.1768 0.666748 10 0.666748H6C5.82319 0.666748 5.65362 0.736986 5.5286 0.86201C5.40357 0.987034 5.33333 1.1566 5.33333 1.33341V2.66675H2.66667C2.48986 2.66675 2.32029 2.73699 2.19526 2.86201C2.07024 2.98703 2 3.1566 2 3.33341C2 3.51023 2.07024 3.6798 2.19526 3.80482C2.32029 3.92984 2.48986 4.00008 2.66667 4.00008H13.3333C13.5101 4.00008 13.6797 3.92984 13.8047 3.80482C13.9298 3.6798 14 3.51023 14 3.33341C14 3.1566 13.9298 2.98703 13.8047 2.86201C13.6797 2.73699 13.5101 2.66675 13.3333 2.66675ZM6.66667 2.66675V2.00008H9.33333V2.66675H6.66667Z" fill="black"/>
                            <path d="M7.33333 11.3333V6.66667C7.33333 6.48986 7.2631 6.32029 7.13807 6.19526C7.01305 6.07024 6.84348 6 6.66667 6C6.48986 6 6.32029 6.07024 6.19526 6.19526C6.07024 6.32029 6 6.48986 6 6.66667V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333Z" fill="black"/>
                            <path d="M10.0013 11.3333V6.66667C10.0013 6.48986 9.93106 6.32029 9.80604 6.19526C9.68102 6.07024 9.51145 6 9.33464 6C9.15782 6 8.98826 6.07024 8.86323 6.19526C8.73821 6.32029 8.66797 6.48986 8.66797 6.66667V11.3333C8.66797 11.5101 8.73821 11.6797 8.86323 11.8047C8.98826 11.9298 9.15782 12 9.33464 12C9.51145 12 9.68102 11.9298 9.80604 11.8047C9.93106 11.6797 10.0013 11.5101 10.0013 11.3333Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div class="uploaded_block">
                        <img src="../assets/images/upload.png" alt="">
                        <div>
                            <h5>dhcdvs6457257.jpg </h5>
                            <h6>(2Mb)</h6>
                        </div>
                        <div class="upload_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.668 4.66675C12.4912 4.66675 12.3216 4.73699 12.1966 4.86201C12.0715 4.98703 12.0013 5.1566 12.0013 5.33341V12.7941C11.9822 13.1312 11.8306 13.4471 11.5796 13.673C11.3286 13.8989 10.9986 14.0165 10.6613 14.0001H5.3413C5.00403 14.0165 4.67396 13.8989 4.42297 13.673C4.17199 13.4471 4.02043 13.1312 4.0013 12.7941V5.33341C4.0013 5.1566 3.93106 4.98703 3.80604 4.86201C3.68102 4.73699 3.51145 4.66675 3.33464 4.66675C3.15782 4.66675 2.98826 4.73699 2.86323 4.86201C2.73821 4.98703 2.66797 5.1566 2.66797 5.33341V12.7941C2.687 13.4849 2.97902 14.14 3.48009 14.616C3.98115 15.0919 4.65042 15.3499 5.3413 15.3334H10.6613C11.3522 15.3499 12.0215 15.0919 12.5225 14.616C13.0236 14.14 13.3156 13.4849 13.3346 12.7941V5.33341C13.3346 5.1566 13.2644 4.98703 13.1394 4.86201C13.0143 4.73699 12.8448 4.66675 12.668 4.66675Z" fill="black"/>
                            <path d="M13.3333 2.66675H10.6667V1.33341C10.6667 1.1566 10.5964 0.987034 10.4714 0.86201C10.3464 0.736986 10.1768 0.666748 10 0.666748H6C5.82319 0.666748 5.65362 0.736986 5.5286 0.86201C5.40357 0.987034 5.33333 1.1566 5.33333 1.33341V2.66675H2.66667C2.48986 2.66675 2.32029 2.73699 2.19526 2.86201C2.07024 2.98703 2 3.1566 2 3.33341C2 3.51023 2.07024 3.6798 2.19526 3.80482C2.32029 3.92984 2.48986 4.00008 2.66667 4.00008H13.3333C13.5101 4.00008 13.6797 3.92984 13.8047 3.80482C13.9298 3.6798 14 3.51023 14 3.33341C14 3.1566 13.9298 2.98703 13.8047 2.86201C13.6797 2.73699 13.5101 2.66675 13.3333 2.66675ZM6.66667 2.66675V2.00008H9.33333V2.66675H6.66667Z" fill="black"/>
                            <path d="M7.33333 11.3333V6.66667C7.33333 6.48986 7.2631 6.32029 7.13807 6.19526C7.01305 6.07024 6.84348 6 6.66667 6C6.48986 6 6.32029 6.07024 6.19526 6.19526C6.07024 6.32029 6 6.48986 6 6.66667V11.3333C6 11.5101 6.07024 11.6797 6.19526 11.8047C6.32029 11.9298 6.48986 12 6.66667 12C6.84348 12 7.01305 11.9298 7.13807 11.8047C7.2631 11.6797 7.33333 11.5101 7.33333 11.3333Z" fill="black"/>
                            <path d="M10.0013 11.3333V6.66667C10.0013 6.48986 9.93106 6.32029 9.80604 6.19526C9.68102 6.07024 9.51145 6 9.33464 6C9.15782 6 8.98826 6.07024 8.86323 6.19526C8.73821 6.32029 8.66797 6.48986 8.66797 6.66667V11.3333C8.66797 11.5101 8.73821 11.6797 8.86323 11.8047C8.98826 11.9298 9.15782 12 9.33464 12C9.51145 12 9.68102 11.9298 9.80604 11.8047C9.93106 11.6797 10.0013 11.5101 10.0013 11.3333Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="steps_foot">
            <div class="foot_container">
                <button class="back_btn">Отмена</button>
                <div class="buttons">
                    <Button v-if="current_step == 3 || current_step == 3.5" :light="true" title="Предпросмотр лендинга"/>
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
import SwitchCheckbox from '@/components/SwitchCheckbox.vue'

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
        SwitchCheckbox,
    },
    data () {
        return {
            current_step: 5,
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
                '4': {}
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
                '3': false,
                '4': {
                    inn: false,
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
                        errors.comment ||
                        errors.payment ||
                        errors.offer
                    ) {
                        t = true;
                        break;
                    }
                }
            } else if (parseInt(this.current_step) == 3) {
                t = this.error_fields['3']
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
                }
            } else if (parseInt(this.current_step) == 3) {
                if (this.checkStep3()) {
                    this.current_step = 4;
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
    }
}
</script>

<style>
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

.uploaded_documents {
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: #FFF;
}

.uploaded_block {
    border-bottom: 1px solid #F4F3F3;
    padding: 12px 16px;
    display: flex;
    align-items: center;
}

.uploaded_block img {
    margin-right: 24px;
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

.uploaded_block .upload_btn {
    margin-left: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 6px;
    border: 1px solid var(--neutral-5, #D9D9D9);
    background: var(--neutral-1, #FFF);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
    transition: .2s ease;
}

.uploaded_block .upload_btn:hover {
    border: 1px solid var(--neutral-5, #D9D9D9);
    background: var(--neutral-1, #FFF);
    box-shadow: 0px 4px 4px 0px rgba(32, 34, 36, 0.12);
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

.step_block{
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.step_block span {
    color: var(--character-title-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
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
</style>