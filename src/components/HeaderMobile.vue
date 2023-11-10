<template>
    <div v-if="$store.state.header_mobile" class="header_mobile">
        <div class="mobile_header_content">
            <div class="header_top">
                <router-link to="/" class="header_logo">
                    <img src="../assets/images/header_logo.svg" alt="">
                </router-link>
                <button @click="closeMobileMenu()">
                    <img src="@/assets/images/close.svg" alt="">
                </button>
            </div>
            <div class="header_body">
                <router-link 
                    v-for="(item, i) in menus" 
                    :key="i" 
                    :to="{name: item.to}"
                    :class="`nav_link ${item.name == active_page ? 'active' : ''}`"
                    @click="active_page = item.name"
                >
                    {{item.name}}
                </router-link>
                <log-out />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderMobile",
    data () {
        return {
            active_page: 'Главная',
            menus: [
                {to: 'Home', name: 'Главная'},
                {to: 'Home', name: 'Подписки'},
                {to: 'Home', name: 'История платежей'},
                {to: 'Home', name: 'Настройки'},
                {to: 'Home', name: 'Обратная связь'},
                
            ]
        }
    },
    methods: {
        closeMobileMenu () {
            $('body').removeClass('overflow-hidden');
            this.$store.commit('changeHeaderMobile', false);
        }
    }
}
</script>

<style>
body.overflow-hidden {
    overflow: hidden;
}

@media only screen and (min-width: 992px){
    body.oveflow-hidden {
        margin-right: 21px;
    }
    .header_mobile {
        display: none;
    }
}

.header_mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.mobile_header_content {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 330px;
    height: 100%;
    padding: 20px;
}

.header_top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;
}

.header_top button {
    background: none;
    outline: none;
    border: none;
}

.header_body {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.header_body .header_btn {
    width: 130px;
    display: flex;
    justify-content: center;
}

.nav_link {
    color: #202224;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}

.nav_link.active {
    color: #F47421;
    font-weight: 600;
}
</style>