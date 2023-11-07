<template>
    <div class="best_school_in" v-if="$store.state.landing_show">
        <div class="best_img">
            <img :src="getImageSrc($store.state.datas['1'].file)" alt="">
        </div>
        <div class="best_text">
            <h3>{{$store.state.datas['1'].title}}</h3>
            <div class="best_text_in">
                <div class="best_links">
                    <span>Телефон:</span>
                    <h5>{{ $store.state.datas['1'].phone }}</h5>
                </div>
                <div class="best_links">
                    <span>E-mail:</span>
                    <h5>{{ $store.state.datas['1'].email }}</h5>
                </div>
                <div class="best_links">
                    <span>Сайт:</span>
                    <h5 class="best_site">{{ $store.state.datas['1'].link }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SchoolTitle",
    methods: {
        getImageSrc (file) {
            return URL.createObjectURL(file);
        }
    }
}
</script>

<style>
.bestSchool .best_school_in {
    gap: 45px;
    padding: 10px;
    display: flex;
    align-items: center;
    max-width: 1260px;
    margin: 0 auto 72px auto;
    border-radius: 8px;
    background: #FFF;
}

.bestSchool .best_school_in .best_img img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
}

.best_school_in .best_text h3 {
    color: var(--character-title-85, var(--Primary-Black, #202224));
    font-family: 'Roboto',sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 24px;
}

.best_text .best_text_in {
    display: flex;
    gap: 56px;
}

.best_text_in span {
    color: var(--Secondary-Grey, #7F848A);
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 8px;
}

.best_text_in h5 {
    color: #202224;
    font-family: 'Roboto',sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.best_text_in .best_site {
    color: #F47421;
}
</style>