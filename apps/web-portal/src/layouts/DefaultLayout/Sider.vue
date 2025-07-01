<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
    :width="200"
    class="sider"
  >
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      :items="items"
    />
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  items: Array,
  selectedKeys: Array,
  openKeys: Array,
  collapsed: Boolean
})
const emit = defineEmits(['update:collapsed', 'update:selectedKeys', 'update:openKeys'])

const collapsed = ref(props.collapsed)
const selectedKeys = ref(props.selectedKeys)
const openKeys = ref(props.openKeys)

watch(collapsed, val => emit('update:collapsed', val))
watch(selectedKeys, val => emit('update:selectedKeys', val))
watch(openKeys, val => emit('update:openKeys', val))
</script>

<style scoped>
.sider {
  height: 100vh;
}
</style> 