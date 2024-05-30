import type { Classes, Node as LexicalNode } from '../../types'
import { useNuxtApp } from '#app'

interface Props {
  content: {
    root: LexicalNode[]
  }
  classConfig?: Classes[] | []
  headingCmp?: boolean
}

export const RenderContent = {
  props: {
    content: {
      type: Object,
      required: true,
    },
    classConfig: {
      type: Array,
      default: () => [],
    },
  },
  async setup(props: Props) {
    const { $serialize } = useNuxtApp()
    if (props.content?.root) {
      const serializedContent = await $serialize(props.content.root, props.classConfig)
      return () => serializedContent
    }
    else {
      console.warn('Could not render content: No content provided.')
    }
  },
}
