<template>
  <div id="email">
    <img src="../assets/images/email_icon.svg" alt="">
    <h2>Email подтвержден</h2>
    <div class="email_button">
        <button>Ввойти в личный кабинет</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "Email",  
}
</script>

<style>
#email{
    padding-top: 72px;
    text-align: center;
    background: #FFF;
}

#email h2{
    margin: 32px auto 44px auto;
    color: var(--character-primary-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px; /* 112.5% */
}

.email_button button{
    margin: 0 auto;
    width: 218px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--primary-6, #F47421);
    color: var(--character-primary-inverse, #FFF);
    text-align: center;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; 
}
</style>