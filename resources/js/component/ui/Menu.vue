<template>
    <div :class="getClassGroup(tab)" v-for="tab of tabs">
        <template v-if="tab.url">
            <a :href="tab.url" :target="tab.target" :class="classContainer" :title="tab.title">
                <div :class="classIcon">
                    <div class="absolute top-[-10px] right-[-10px] rounded-full bg-white w-[20px] h-[20px] text-[10px] flex items-center justify-center" v-if="tab.target === '_blank'">
                        <font-awesome-icon :icon="['fas', 'share']" />
                    </div>
                    <font-awesome-icon :icon="tab.icon" />
                </div>
                <div :class="[classTitle]" v-if="!short">
                    {{tab.title}}
                </div>
            </a>
        </template>
        <template v-else>
            <router-link :to="tab.path" :target="tab.target" :class="classContainer" :title="tab.title">

                <div :class="classIcon">
                    <div class="absolute top-[-10px] right-[-10px] rounded-full bg-white w-[20px] h-[20px] text-[10px] flex items-center justify-center" v-if="tab.target === '_blank'">
                        <font-awesome-icon :icon="['fas', 'share']" />
                    </div>
                    <font-awesome-icon :icon="tab.icon" />
                </div>
                <div :class="[classTitle]" v-if="!short">
                    {{tab.title}}
                </div>
            </router-link>
        </template>
    </div>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter} from "vue-router";
import {computed} from "vue";


const props = defineProps({
    tabs: {
        required: true,
        type: Array,
        default: () => []
    },
    short: {
        required: false,
        type: Boolean,
        default: false
    }
})

const router = useRouter();

const getClassGroup = (tab) => {
    return [
        'group w-full mb-3 last-of-type:mb-0 transition-all',
        {
            "w-[40px]": props.short
        },
        getGroup(tab)
    ]
}

const classContainer = [
    'h-[40px] w-full cursor-pointer rounded-md flex transition-all ',

    'group-[.is-active]:cursor-default',
    'group-[.is-active]:pointer-events-none',
    'group-[.is-active]:bg-surface-50',
    'group-[.is-active]:bg-primary-100',
    'group-[.is-active]:text-primary-600',

    'group-[.is-disabled]:cursor-default',
    'group-[.is-disabled]:pointer-events-none',
    'group-[.is-disabled]:bg-surface-50',

    'hover:bg-surface-50',

];

const classIcon = [
    'w-[40px] h-[40px] h-full mb-3 flex text-md justify-center items-center p-3 rounded-md transition-all cursor-pointer relative',

    'group-[.is-active]:bg-primary-500',
    'group-[.is-active]:text-white',

    'group-[.is-disabled]:bg-surface-100',
    'group-[.is-disabled]:text-surface-300',

    'group-[.is-default]:bg-surface-100',
    'group-[.is-default]:text-surface-800',

    'hover:bg-surface-200',

    'group-hover/is-default:!bg-surface-300',
];

const classTitle = [
    'ml-3 items-center flex',
    'group-[.is-disabled]:text-surface-300',
];

const getGroup = (tab) => {
    if(tab.disabled) return 'group/is-disabled is-disabled';
    if(tab.active) return "group/is-active is-active";

    return "group/is-default is-default";
}
</script>
