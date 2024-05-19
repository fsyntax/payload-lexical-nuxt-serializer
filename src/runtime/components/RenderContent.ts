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
  setup(props: Props) {
    const { $serialize } = useNuxtApp()
    if (props.content?.root) {
      return () => $serialize(props.content.root, props.classConfig)
    }
    else if (props.content) {
      return () => $serialize(props.content, props.classConfig)
    }
    else {
      return () => null
    }
  },
}
