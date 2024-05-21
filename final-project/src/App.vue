<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterView from '@/components/FooterView.vue'
import FriendView from '@/components/FriendView.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <FriendView />
  <FooterView />
</template>
