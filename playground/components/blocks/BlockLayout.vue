<script setup lang="ts">
defineProps<{
  block: {
    layout: {
      id: string
      columns: string
      [key: `content${number}`]: string
    }[]
  }
}>()
</script>

<template>
  <div v-if="block.layout">
    <div
      v-for="layout in block.layout"
      :key="layout.id"
    >
      <div
        v-for="n in parseInt(layout.columns as string)"
        :key="`columnContent-${n}`"
      >
        <RenderContent
          v-if="layout[`content${n}`]"
          :content="layout[`content${n}`]"
        />
      </div>
    </div>
  </div>
</template>
