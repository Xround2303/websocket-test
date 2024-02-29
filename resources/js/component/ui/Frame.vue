<template>
    <div class="flex h-full">
        <div
            :class="[{'w-[300px]': !menuIsShort}, 'h-full flex-shrink-0 py-5 px-3 flex justify-center flex-col']">
            <div class="w-full h-full flex flex-col">
                <div
                    class="mb-2 h-[40px] transition-all text-surface-300 hover:text-surface-700  rounded-md w-full text-sm flex justify-center items-center cursor-pointer"
                    @click="menuIsShort = !menuIsShort"
                    v-if="menuIsShort"
                >
                    <font-awesome-icon :icon="['fas', 'angles-right']" />
                </div>
                <div class="mb-3">
                    <div class="flex relative">
                        <div class="flex items-center justify-center w-full h-[60px] overflow-hidden" v-if="!menuIsShort">
                            <img :src="logoBig" class="w-full h-full object-contain">
                        </div>
                        <div class="flex items-center justify-center w-full" v-if="menuIsShort" title="skyweb24">
                            <Adv :position="'none'"
                                 :width="menuIsShort ? '40px' : '60px'"
                                 :height="menuIsShort ? '40px' : '60px'"
                            />
                        </div>
                        <div
                            class="ml-3 flex-shrink-0 px-2 ml-auto transition-all text-surface-300 hover:text-surface-700 absolute right-0 top-0 h-full rounded-md text-sm flex justify-center items-center cursor-pointer"
                            @click="menuIsShort = !menuIsShort"
                            v-if="!menuIsShort"
                        >
                            <font-awesome-icon :icon="['fas', 'angles-left']" />
                        </div>
                    </div>
                </div>
                <div :class="['h-full mb-3 overflow-hidden', menuIsShort ? 'w-[40px]' : 'w-auto']">
                    <slot name="widget" :short="menuIsShort"></slot>
                </div>
            </div>
            <div class="flex-shrink-0 w-full flex flex-col overflow-y-auto">
                <Menu :tabs="menuGeneralList" :short="menuIsShort"/>
            </div>
            <div class="h-full flex flex-col justify-center items-center">
                <div class="mt-auto w-full flex flex-col">
                    <Menu :tabs="menuDefaultList" :short="menuIsShort"/>
                </div>
            </div>
        </div>
        <div
            class="w-full h-full border-l bg-gradient-to-r from-[#f6f7f9] to-[#f5f5f5] rounded-tl-3xl rounded-bl-3xl overflow-hidden flex flex-col"
        >
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script setup>
import logoBig from "../../assets/img/logo-big.png";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {Adv} from "skyweb24.vue-adv";
import Menu from "./Menu.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRoute, useRouter} from "vue-router";
const store = useStore();
const route = useRoute();
const router = useRouter();
const domain = computed(() => store.state.setting.domain);
const moduleCode = computed(() => store.state.setting.moduleCode);

const menuIsShort = ref(true);

const menuGeneralList = computed(() => {
    return [
    ]
});

const menuDefaultList = computed(() => {
    return [
        tab("Главная",
            getRoute("index").path,
            ['fas', 'home'],
            !getRoute("index").meta.checkPermissions(),
            router.currentRoute.value.name === getRoute("index").name,
        ),
        tab("Настройки",
            getRoute("setting").path,
            ['fas', 'gear'],
            !getRoute("setting").meta.checkPermissions(),
            router.currentRoute.value.name === getRoute("setting").name,
        ),
        tab("Отзывы",
            null,
            ['fas', 'star'],
            false,
            false,
            "_blank",
            `https://${domain.value}/market/detail/${moduleCode.value}/`
        ),
        tab(
            "Документация",
            null,
            ['fas', 'book'],
            true,
            false,
            "_blank",
            "https://skyweb24.ru"
        ),
    ]
});

const tab = function (title, path, icon = [], disabled = false, active = false, target = '_self', url = null) {
    return {
        title,
        path,
        icon,
        disabled,
        active,
        target,
        url
    }
}
const getRoute = (code) => {
    return router.options.routes.find(route => route.name === code);
}


</script>
