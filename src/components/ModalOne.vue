<template>
    <div class="modal_bg">
    </div>
    <div class="modal">
        <div class="modal_head">
            <svg class="modal_close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clip-path="url(#clip0_2640_20895)">
                <path d="M1.51672 15.8998C1.12445 15.9226 0.738661 15.7922 0.440711 15.536C-0.146904 14.9449 -0.146904 13.9902 0.440711 13.3991L13.3075 0.532244C13.9187 -0.0396496 14.8777 -0.00785835 15.4496 0.603313C15.9668 1.15599 15.9969 2.00547 15.5202 2.59339L2.57756 15.536C2.28346 15.7885 1.90386 15.9186 1.51672 15.8998Z" fill="#7F848A"/>
                <path d="M14.3684 15.8998C13.9708 15.8981 13.5898 15.7403 13.3075 15.4603L0.440589 2.59337C-0.103806 1.95765 -0.0297925 1.00091 0.605933 0.456468C1.17334 -0.0294346 2.01014 -0.0294346 2.57749 0.456468L15.5201 13.3234C16.1312 13.8954 16.1628 14.8545 15.5907 15.4655C15.568 15.4898 15.5444 15.5133 15.5201 15.5361C15.2032 15.8117 14.7861 15.9434 14.3684 15.8998Z" fill="#7F848A"/>
            </g>
            <defs>
                <clipPath id="clip0_2640_20895">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
        </div>
        <h3>На какой e-mail отправить уведомление о модерации?</h3>
        <form class="modal_form">
            <label for="">Email для уведомлений :</label>
            <input class="erorr_input" type="text">
            <h5 class="erorr_text">*Поле не заполнено</h5>
            <button type="submit">Продолжить</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "ModalOne"
}
</script>

<style>
.modal_bg{
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.6;
    z-index: 2;
    background: var(--Secondary-Grey, #7F848A);
    width: 100%;
    height: 100%;
}

.modal{
    width: 452px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
}

.modal_head{
    position: relative;
}

.modal_head .modal_close{
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 16px;
}

.modal h3{
    margin: 32px auto;
    max-width: 290px;
    color: var(--character-title-85, var(--Primary-Black, #202224));
    text-align: center;
    font-family: 'Roboto',sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 120% */
}

.modal .modal_form{
    max-width: 268px;
    margin: 0 auto;
    position: relative;
}

.modal_form .erorr_text{
    /* display: none; */
    position: relative;
    top: 8px;
    color: var(--character-danger, #FF4D4F);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.modal_form label{
    color: var(--Secondary-Grey, #7F848A);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.modal_form input{
    margin-top: 8px;
    padding: 12px;
    width: 100%;
    height: 44px;
    border-radius: 6px;
    border: 1px solid #F4F3F3;
    background: var(--BG-Grey, #F6F6F6);
    color: var(--character-title-85, var(--Primary-Black, #202224));
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
}

.modal_form .erorr_input{
    border-radius: 6px;
    border: 1px solid var(--Alert, #FF5C65);
    background: rgba(255, 92, 101, 0.10);
}

.modal_form input:focus{
    outline: none;
}

.modal_form button{
    margin: 32px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 218px;
    height: 42px;
    color: var(--character-primary-inverse, #FFF);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    border-radius: 6px;
    background: var(--primary-6, #F47421);
    transition: .2s ease;
}

.modal_form button:hover{
    border-radius: 6px;
    background: var(--Primary-Orange, #F47421);
    box-shadow: 0px 4px 4px 0px rgba(184, 80, 12, 0.16);
}

</style>