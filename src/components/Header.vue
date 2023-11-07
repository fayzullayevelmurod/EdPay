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
               {{ $route.name }} {{item.name}}
            </router-link>
        </nav>
        <button class="header_btn">
            Выйти
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.16634 10.6666V11.9999C3.16634 13.4733 4.36034 14.6666 5.83301 14.6666H12.4997C13.973 14.6666 15.1663 13.4733 15.1663 11.9999C15.1663 9.78059 15.1663 6.21992 15.1663 3.99992C15.1663 2.52725 13.973 1.33325 12.4997 1.33325C10.5937 1.33325 7.73967 1.33325 5.83301 1.33325C4.36034 1.33325 3.16634 2.52725 3.16634 3.99992V5.33325C3.16634 5.70125 3.46501 5.99992 3.83301 5.99992C4.20101 5.99992 4.49967 5.70125 4.49967 5.33325C4.49967 5.33325 4.49967 4.70859 4.49967 3.99992C4.49967 3.26392 5.09701 2.66659 5.83301 2.66659H12.4997C13.2363 2.66659 13.833 3.26392 13.833 3.99992V11.9999C13.833 12.7366 13.2363 13.3333 12.4997 13.3333C10.5937 13.3333 7.73967 13.3333 5.83301 13.3333C5.09701 13.3333 4.49967 12.7366 4.49967 11.9999C4.49967 11.2919 4.49967 10.6666 4.49967 10.6666C4.49967 10.2993 4.20101 9.99992 3.83301 9.99992C3.46501 9.99992 3.16634 10.2993 3.16634 10.6666ZM8.22367 7.33325L7.36167 6.47191C7.10167 6.21125 7.10167 5.78925 7.36167 5.52858C7.62234 5.26858 8.04434 5.26858 8.30434 5.52858L10.3043 7.52858C10.565 7.78925 10.565 8.21125 10.3043 8.47191L8.30434 10.4719C8.04434 10.7319 7.62234 10.7319 7.36167 10.4719C7.10167 10.2112 7.10167 9.78925 7.36167 9.52859L8.22367 8.66659H2.49967C2.13167 8.66659 1.83301 8.36792 1.83301 7.99992C1.83301 7.63259 2.13167 7.33325 2.49967 7.33325H8.22367Z" fill="#202224"/>
            </svg>
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
    }
}
</script>

<style>
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

.header_btn {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 5px 16px;
    border-radius: 6px;
    border: 1px solid #D9D9D9;
    background: #FFF;
    color:  #202224;
    text-align: right;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    transition: .2s ease;
}

.header_btn:hover {
    border: 1px solid var(--neutral-5, #D9D9D9);
    background: var(--neutral-1, #FFF);
    box-shadow: 0px 4px 4px 0px rgba(32, 34, 36, 0.12);
}
</style>