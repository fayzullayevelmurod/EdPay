<template>
  <!-- <ModalOne /> -->
  <div class="home">
    <h2 class="home_title">Добро пожаловать в LeadPay!</h2>
    <div class="home_content">
      <h2 class="home_content_head">
        <img src="@/assets/images/home_contant_header.svg" alt="">
        У вас ещё нет лендинга
      </h2>
      <h3 class="home_content_text">Для создания лендинга вам понадобится следующая информация и документы:</h3>
      <p class="home_list" v-for="(item, i) in necessary_documents" :key="i">{{item}}</p>
    </div>
    <div class="home_btn">
      <button class="home_button" @click="$router.push({name: 'CreateLanding'})">
        <img src="@/assets/images/plus_icon.svg" alt="">
        Создать лендинг
      </button>
      <h5 class="instraction">
        <img src="@/assets/images/black_warning.svg" alt="">
        Инструкция
      </h5>
    </div>
  </div>
  <div class="contact_information">
    <h2 class="contact_information_title">Контактная информация</h2>
    <p class="information_text">Телефон и email привязанные к этому аккаунту</p>
    <div id="contact_form">
        <form-input
          idx=""
          field_name=""
          v-model:value="fields.phone"
          @check_value="checkInputValue"
          type="phone" 
          label="Телефон для входа в LeadPay:"
          error_title="Phone не подтвержден"
          :error="errors.phone"
          :placeholder="'+7(_ _ _) _ _ _-_ _-_ _'"
        />
        <form-input
          idx="1"
          field_name="email"
          v-model:value="fields.email"
          @check_value="checkInputValue"
          type="email" 
          label="Email для уведомлений :"
          error_title="Email не подтвержден"
          :error="errors.email"
        />
        <Button @clicked="saveData()" title="Сохранить"/>
    </div>
    <Alert v-if="open_alert" type="coral">
      <div>На <span>{{fields.email}}</span> мы отправили ссылку, перейдите по ней, чтобы привязать e-mail для уведомлений. Без подтверждения e-mail привязан не будет. <a href="#">Отправить ссылку еще раз</a></div>
    </Alert>
  </div>
  <div class="tarif">
    <h1>Тарифы</h1>
    <p>Тариф зависит от выбранного варианта оплаты покупателем</p>
    <div class="tarif_wrapper">
      <div class="tarif_block" v-for="(item, i) in rates" :key="i">
        <div class="tarif_img">
          <img :class="`img_${i+1}`" :src="require(`@/assets/images/payment_card_${i+1}.svg`)" alt="">
        </div>
        <h3>{{item.name}}</h3>
        <h2>{{item.discount}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import ModalOne from "@/components/ModalOne.vue"
export default {
  name: "Home",
  components: {
    ModalOne,
  },
  data () {
    return {
      necessary_documents: [
        "ФИО/наименование компании;",
        "адрес эл. почты;",
        "ОГРН/ОГРНИП/ИНН(для самозанятых);",
        "платёжные реквизиты для вывода денег (банк, наименование получателя (Юр. лицо или физ. лицо), номер расчётного счета)."
      ],
      rates: [
        {name: "Банковские карты", discount: "2,5%"},
        {name: "Apple pay", discount: "1,5%"},
        {name: "СПБ", discount: "0%"},
        {name: "Юмани", discount: "0%"},
      ],
      fields: {
        phone: "",
        email: "",
      },
      errors: {
        phone: false,
        email: false,
      },
      open_alert: false,
    }
  },
  methods: {
    saveData () {
      if (this.fields.email.length && !this.errors.email && this.fields.phone && !this.errors.phone) {
        this.open_alert = true;
      }
    },
    checkInputValue (key, name, value) {
      this.errors[name] = value;
    }
  }
}
</script>

<style>
  .home{
    border-radius: 8px;
    background: #F4F3F3;
    padding-bottom: 70px;
  }

  .home_title{
    padding: 72px 0;
    text-align: center;
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: 54px;
  }

  .home_content{
    margin: 0 auto;
    max-width: 565px;
  }

  .home_content_head{
    margin-bottom: 32px;
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px; 
    display: flex;
    align-items: center;
    gap: 49px;
  }

  .home_content_text{
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 16px;
  }

  .home_list{
    margin-bottom: 12px;
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    position: relative;
    padding-left: 14px;
  }

  .home_list::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    left: 0;
    top: 7px;
    background: #F47421;
  }

  .home_list .svg_icon{
    width: 6px;
    height: 6px;
  }

  .home_btn{
    max-width: 400px;
    margin: 0 auto;
    position: relative;
  }

  .home_btn .home_button{
    margin: 20px auto 0 ;
    color: var(--character-primary-inverse, #FFF);
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 128.571% */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 218px;
    height: 42px;
    border-radius: 6px;
    background: var(--Primary-Black, #202224);
    transition: .2s ease;
  }

  .home_button:hover{
    border-radius: 6px;
    background: var(--Secondary-text, #444B52);
    box-shadow: 0px 4px 4px 0px rgba(32, 34, 36, 0.12);
  }

  .home_btn .instraction{
    display: flex;
    align-items: center;
    gap: 12px;
    position: absolute;
    bottom: 30%;
    right: -40px;
    color: #F47421;
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }

  .contact_information{
    margin: 72px auto;
    padding: 50px 40px;
    max-width: 898px;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 6px 12px 0px rgba(10, 28, 45, 0.08);
  }
  
  .contact_information_title{
    text-align: center;
    margin-bottom: 32px;
    color:#202224;
    font-family: 'Roboto',sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
  }

  .information_text{
    text-align: center;
    color:#202224;
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 32px;
  }

  #contact_form{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 16px;
  }

  #contact_form .input_wrapper {
    width: 268px;
  }

  #contact_form .main_button {
    margin-top: 28px;
  }

  #contact_form .input_wrapper input.error {
    border: 1px solid #F49321;
    background: rgba(244, 147, 33, 0.10);
  }

  #contact_form .input_wrapper span {
    color: #F49321;
  }

  .tarif{
    padding-bottom: 122px;
  }

  .tarif h1{
    text-align: center;
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 32px;
  }

  .tarif p{
    text-align: center;
    color: #444B52;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 52px;
  }

  .tarif_wrapper{
    max-width: 1170px;
    gap: 32px;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tarif_block{
    text-align: center;
    width: 274px;
    padding: 28px 24px;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 6px 12px 0px rgba(10, 28, 45, 0.08);
  }
  
  .tarif_block .tarif_img{
    margin: 0 auto 32px auto;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    background-color: #F6F6F6;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .tarif_block .tarif_img .img_1 {
    width: 43px;
    height: 43px;
  }

  .tarif_block .tarif_img .img_2 {
    width: 64.5px;
    height: 65.632px;
  }

  .tarif_block .tarif_img .img_3 {
    width: 45px;
    height: 56px;
  }

  .tarif_block .tarif_img .img_4 {
    width: 64.5px;
    height: 64.5px;
  }

  .tarif_block h3{
    color: var(--character-primary-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 32px;
  }

  .tarif_block h2{
    color: var(--character-primary-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
  }
</style>