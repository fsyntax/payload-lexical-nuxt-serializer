<script setup lang="ts">
import type { BlockNode } from '../../../src/types'

defineProps<{
  block: {
    type: BlockNode
    text: {
      ctaButtonText: string
    }
  }
}>()
</script>

<template>
  <div>
    <button>{{ block.text.ctaButtonText }}</button>
  </div>
</template>
