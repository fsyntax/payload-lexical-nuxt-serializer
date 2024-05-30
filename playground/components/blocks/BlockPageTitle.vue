<script setup lang="ts">
defineProps<{
  block: {
    title: string
    subtext: string
  }
}>()
</script>

<template>
  <div>
    <h1>{{ block.title }}</h1>
    <RenderContent :content="block.subtext" />
  </div>
</template>
