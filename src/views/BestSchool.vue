<template>
  <div class="bestSchool">
    <SchoolTitle />
    <BestCard />

</div>
<div class="best_bottom">
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <g clip-path="url(#clip0_2658_13762)">
                <path d="M15.5383 9.12302C15.4728 9.13365 15.4066 9.13855 15.3403 9.13769H4.05262L4.29875 9.25217C4.53933 9.36604 4.7582 9.52102 4.94556 9.71009L8.11091 12.8754C8.52779 13.2734 8.59784 13.9136 8.2769 14.3923C7.90338 14.9024 7.18706 15.0132 6.67691 14.6396C6.6357 14.6094 6.59653 14.5765 6.55971 14.5411L0.835755 8.81715C0.388428 8.37032 0.388034 7.64549 0.834861 7.19816C0.835147 7.19788 0.835469 7.19756 0.835755 7.19727L6.55971 1.47331C7.0074 1.02688 7.73223 1.02788 8.1787 1.47556C8.21383 1.5108 8.24663 1.5483 8.2769 1.58779C8.59784 2.06649 8.52779 2.70668 8.11091 3.10464L4.95128 6.27571C4.78332 6.44385 4.59021 6.58484 4.37889 6.69356L4.03545 6.84811H15.2773C15.8621 6.82639 16.3752 7.2349 16.4851 7.80973C16.5863 8.43382 16.1624 9.02178 15.5383 9.12302Z" fill="#F47421"/>
            </g>
            <defs>
                <clipPath id="clip0_2658_13762">
                <rect width="16" height="16" fill="white" transform="matrix(1 0 0 -1 0.5 16)"/>
                </clipPath>
            </defs>
        </svg>
        Вернуться к редактированию
    </button>
</div>
</template>

<script>
import BestCard from "../components/BestCard.vue"
import SchoolTitle from "../components/SchoolTitle.vue"
export default {
    name: "BestSchool",
    components: {
        BestCard,
        SchoolTitle,
    }
}
</script>

<style>
.bestSchool {
    padding: 0 10px;
    background-color: #F4F3F3;
    height: 100vh;
}

.best_bottom {
    position: relative;
    z-index: 4;
    border-radius: 8px 8px 0 0;
    background: #FFF;
    display: flex;
    justify-content: center;
}

.best_bottom button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 24px auto;
    width: 280px;
    height: 42px;
    border-radius: 6px;
    border: 1px solid var(--Primary-Orange, #F47421);
    background: #FFF;
    color: var(--Primary-Orange, #F47421);
    text-align: center;
    font-family: 'Roboto',sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    transition: .2s ease;
}

.best_bottom button:hover {
    border-radius: 6px;
    border: 1px solid var(--Primary-Orange, #F47421);
    box-shadow: 0px 4px 4px 0px rgba(184, 80, 12, 0.16);
}
</style>