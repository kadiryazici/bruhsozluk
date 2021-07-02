<template>
   <div v-if="props.visible" @click.self="closeModal" class="_modal_wrapper">
      <slot />
   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
   visible: boolean;
}>();

const emit = defineEmits<{
   (event: 'update:visible', value: boolean): void;
}>();

const closeModal = () => {
   emit('update:visible', false);
};
</script>

<style lang="scss" scoped>
$padding: 20px;
$width: 100%;
$height: 100%;
._modal_wrapper {
   padding: $padding;
   background-color: colors.$modalBackground;
   display: flex;
   align-items: center;
   justify-content: center;
   width: $width;
   height: $height;
   height: -webkit-fill-available;
   height: fill-available;
   overflow-x: hidden;
   overflow-y: auto;
   position: fixed;
   top: 0;
   left: 0;
}
</style>
