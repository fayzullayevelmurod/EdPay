<template>
  <header v-if="!$store.state.landing_show">
    <div class="header_container">
        <router-link to="/" class="header_logo">
            <img src="../assets/images/header_logo.svg" alt="">
        </router-link>
        <nav class="menu">
            <router-link 
                v-for="(item, i) in menus" 
                :key="i" 
                :to="{name: item.to}"
                :class="`nav_link ${item.name == active_page ? 'active' : ''}`"
                @click="active_page = item.name"
            >
                {{item.name}}
            </router-link>
        </nav>
        <log-out />
        <button class="bars" @click="openHeaderMobile()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </button>
    </div>
  </header>
</template>

<script>
export default {
    name: "Header",
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
        openHeaderMobile () {
            this.$store.commit('changeHeaderMobile', true);
            $('body').addClass('overflow-hidden');
        }
    }
}
</script>

<style scoped>
header{
    filter: drop-shadow(0px 6px 12px rgba(10, 28, 45, 0.08));
    background: var(--conditional-header-background, #FFF);
}

.header_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu {
    display: flex;
    align-items: center;
    gap: 40px;
}

.nav_link {
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    transition: .2s ease;
}

.nav_link.active {
    color: #F47421;
    font-weight: 600;
    line-height: 18px;
}



.bars {
    display: none;
}

@media only screen and (max-width: 992px) {
    .menu, .header_btn {
        display: none;
    }

    header .header_container {
        padding-left: 20px;
        padding-right: 20px;
    }

    .bars {
        display: flex;
        align-items: center;
        justify-content: start;
        background: transparent
    }

    .bars svg {
        width: 20px;
        height: auto;
    }
}

</style>