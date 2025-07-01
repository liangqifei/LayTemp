<template>
  <a-layout style="min-height: 100vh">
    <Sider
      :items="menuItems"
      v-model:collapsed="collapsed"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    />
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px;">
        <!-- 可放Logo、用户信息等 -->
      </a-layout-header>
      <a-layout-content style="margin: 16px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sider from './Sider.vue'
import { generateMenuFromRoutes } from '@/utils/generateMenuFromRoutes'

const router = useRouter()
const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])

const menuItems = computed(() => generateMenuFromRoutes(router.getRoutes()))
</script>

<style scoped>
</style> 