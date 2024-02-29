<template>
    <div class="layout-default h-full">
        <Frame>
            <template #widget="{short}">

            </template>
            <template #content>
                <slot></slot>
            </template>
        </Frame>
    </div>
</template>
<script setup>
import Frame from "../ui/Frame.vue"
</script>
