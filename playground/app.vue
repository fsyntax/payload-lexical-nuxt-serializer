<script setup lang="ts">
import { pageMockData } from '../src/mockData'
</script>

<template>
  <div>
    <BlockRenderer :blocks="pageMockData.content" />
  </div>
</template>
