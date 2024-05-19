<script setup lang="ts">
import { blockMockData } from '../src/mockData'
</script>

<template>
  <div>
    <BlockRenderer :blocks="blockMockData.content" />
  </div>
</template>
