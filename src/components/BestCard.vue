<template>
    <div class="best_card">
        <div class="best_card_head">
            <img src="../assets/images/card_img.png" alt="">
        </div>
        <div class="best_card_body">
            <h3>Как стать дизайнером</h3>
            <p>Вы узнаете всё о современных направлениях и концепциях в дизайне, попрактикуетесь на реальных задачах. Поймёте, в какой специализации хотите развиваться и как зарабатывать на любимом деле.</p>
        </div>
        <div class="best_card_bottom">
            <div>
                <span>Цена:</span>
                <h4>9 999.99</h4>
            </div>
            <button>Купить</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "BestCard"
}
</script>

<style>
.best_card{
    max-width: 404px;
    margin: 0 auto;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0px 6px 12px 0px rgba(10, 28, 45, 0.08);
}

.best_card_head img{
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

.best_card_body{
    padding: 24px;
}

.best_card_body h3 {
    color: var(--character-title-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 14px;
}

.best_card_body p {
    color: var(--Secondary-text, #444B52);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    }

.best_card_bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 24px 24px;
}

.best_card_bottom span {
    color: var(--Secondary-Grey, #7F848A);
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 2px;
}

.best_card_bottom h4 {
    color: var(--character-primary-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.best_card_bottom button {
    width: 217px;
    height: 42px;
    color: var(--character-primary-inverse, #FFF);
    text-align: center;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    background: var(--primary-6, #F47421);
    transition: .2s ease;
}

.best_card_bottom button:hover{
    border-radius: 6px;
    background: var(--Primary-Orange, #F47421);
    box-shadow: 0px 4px 4px 0px rgba(184, 80, 12, 0.16);
}
</style>