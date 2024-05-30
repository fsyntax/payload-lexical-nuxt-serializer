import escapeHTML from 'escape-html'
import { type VNode } from 'vue'
import { h } from 'vue'
import { BlockRenderer, NuxtImg, NuxtLink } from '#components'
import type { BaseNode, Classes, LinkNode, BlockNode, Node, UploadNode } from '~/src/types'
import { defineNuxtPlugin } from '#app'

// This copy-and-pasted from somewhere in lexical here: https://github.com/facebook/lexical/blob/c2ceee223f46543d12c574e62155e619f9a18a5d/packages/lexical/src/LexicalConstants.ts

// Text node formatting
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6
const IS_ALIGN_CENTER = 2

/**
 * Mapping of text formatting types to CSS classes.
 */
const TEXT_FORMATTING_CLASSES: Record<number, string> = {
  [IS_BOLD]: 'strong',
  [IS_ITALIC]: 'em',
  [IS_STRIKETHROUGH]: 'line-through',
  [IS_UNDERLINE]: 'underline',
  [IS_CODE]: 'code',
  [IS_ALIGN_CENTER]: 'text-center',
  [IS_SUBSCRIPT]: 'sub',
  [IS_SUPERSCRIPT]: 'sup',
}

/**
 * Mapping of text formatting types to HTML tags.
 */
const TEXT_FORMATTING_TAGS: Record<number, string> = {
  [IS_BOLD]: 'strong',
  [IS_ITALIC]: 'em',
  [IS_STRIKETHROUGH]: 'span',
  [IS_UNDERLINE]: 'span',
  [IS_CODE]: 'code',
  [IS_ALIGN_CENTER]: 'div',
  [IS_SUBSCRIPT]: 'sub',
  [IS_SUPERSCRIPT]: 'sup',
}

const IMAGE_MIME_TYPE = 'image'

/**
 * Defines a Nuxt plugin for serializing rich text nodes.
 */
export default defineNuxtPlugin((_nuxtApp) => {
  /**
   * Returns the CSS class for a given HTML tag.
   * @param tag - The HTML tag.
   * @param classes - The array of classes.
   * @returns The CSS class for the tag.
   */
  function getClassForTag(tag: string, classes: Classes[] | undefined): string {
    if (!classes || classes.length === 0 || tag === undefined) return ''
    const classObject = classes.find(c => c.tag === tag)
    if (!classObject) {
      console.warn(`No class defined for tag ${tag}`)
      return ''
    }
    return classObject.class
  }

  /**
   * Applies text formatting to a given text.
   * @param text - The text to format.
   * @param format - The formatting type.
   * @param classes - The array of classes.
   * @returns The formatted text.
   */
  function applyTextFormatting(text: string, format: number, classes: Classes[] = []): string | VNode {
    const tag = TEXT_FORMATTING_TAGS[format]
    const className = getClassForTag(tag, classes)

    if (tag) {
      return h(tag, { class: `${className} ${TEXT_FORMATTING_CLASSES[format]}` }, text)
    }

    return text
  }

  /**
   * Serializes a link node.
   * @param node - The link node.
   * @param children - The child nodes.
   * @param classes - The array of classes.
   * @returns The serialized link node.
   */
  function serializeLink(node: LinkNode, children: VNode[], classes: Classes[]): VNode {
    const url = node.fields.url
    if (node.fields.linkType === 'custom') {
      const linkProps = {
        href: url,
        target: node.fields.newTab ? '_blank' : undefined,
        rel: [node.fields.rel, node.fields.sponsored ? 'sponsored' : '', node.fields.nofollow ? 'nofollow' : ''].filter(Boolean).join(' '),
        class: getClassForTag('a', classes),
      }
      return h('a', linkProps, children)
    }
    else {
      return h(NuxtLink, {
        to: node.fields.doc?.relationTo === 'page' ? url : `${node.fields.doc?.relationTo}/${url}`,
        class: getClassForTag('a', classes),
      }, () => h('span', children))
    }
  }

  /**
   * Handles a block type node.
   * @param node - The block node.
   * @returns The handled block type component.
   */
  async function handleBlockType(node: BlockNode): Promise<VNode | null> {
    return h(BlockRenderer, {
      blocks: [node.fields],
    })
  }

  /**
   * Handles an upload node.
   * @param node - The upload node.
   * @returns The handled upload node.
   */
  function handleUpload(node: UploadNode): VNode | null {
    const mimeType = node.value.mimeType
    if (mimeType && mimeType.startsWith(IMAGE_MIME_TYPE)) {
      return h(NuxtImg, {
        src: node.value.url,
        alt: node.value.description,
        format: 'webp',
      })
    }
    else {
      console.warn(`Unsupported MIME type for upload: ${mimeType}`)
      return null
    }
  }

  /**
   * Returns the alignment class for a given node.
   * @param node - The base node.
   * @param classes - The array of classes.
   * @returns The alignment class for the node.
   */
  function getAlignmentClass(node: BaseNode, classes: Classes[]): string {
    const baseClass = getClassForTag(node.tag as string, classes)
    if (node.format === 'center') return `${baseClass} text-center`
    if (node.format === 'right') return `${baseClass} text-right`
    return baseClass
  }

  /**
   * Serializes an array of nodes.
   * @param nodes - The array of nodes.
   * @param classes - The array of classes.
   * @param renderNodeComponent - Whether to render the node component.
   * @param visitedNodes - The set of visited nodes.
   * @returns The array of serialized nodes.
   */
  async function serialize(nodes: Node[], classes: Classes[] = [], renderNodeComponent: boolean = false, visitedNodes = new Set<Node>()): Promise<VNode[]> {
    if (!Array.isArray(nodes)) nodes = [nodes]

    const serializedNodes: VNode[] = []

    for (const node of nodes) {
      if (!node || visitedNodes.has(node)) continue

      const visitedNodesCopy = new Set(visitedNodes)
      visitedNodesCopy.add(node)

      const children = node.children ? await serialize(node.children, classes, renderNodeComponent, visitedNodesCopy) : []
      const classList = getAlignmentClass(node, classes)

      let serializedNode: VNode | null = null

      switch (node.type) {
        case 'root':
          serializedNode = h('div', { class: classList || undefined }, children)
          break
        case 'paragraph': {
          let paragraphClass = getClassForTag('p', classes)
          if (node.format === 'center') {
            paragraphClass += ' text-center'
          }
          serializedNode = h('p', { class: paragraphClass || undefined }, children)
          break
        }
        case 'text': {
          const escapedText = escapeHTML(node.text).replace(/&amp;|&quot;|&apos;|&lt;|&gt;|&#39;/g, (match: string) => {
            switch (match) {
              case '&amp;':
                return '&'
              case '&quot;':
                return '"'
              case '&apos;':
                return '\''
              case '&lt;':
                return '<'
              case '&gt;':
                return '>'
              case '&#39;':
                return '\''
              default:
                return match
            }
          })
          serializedNode = applyTextFormatting(escapedText, node.format as number, classes) as VNode
          break
        }
        case 'linebreak':
          serializedNode = h('br')
          break
        case 'link':
          serializedNode = serializeLink(node, children, classes)
          break
        case 'list': {
          const listTag = node.listType === 'bullet' ? 'ul' : 'ol'
          serializedNode = h(listTag, { class: getClassForTag(listTag, classes) }, children)
          break
        }
        case 'listitem':
          serializedNode = h('li', { class: getClassForTag('li', classes) }, children)
          break
        case 'block':
          serializedNode = await handleBlockType(node)
          break
        case 'upload':
          serializedNode = handleUpload(node)
          break
        default:
          serializedNode = h('p', { class: classList || undefined }, children)
          break
      }

      if (serializedNode) {
        serializedNodes.push(serializedNode)
      }
    }

    return serializedNodes
  }

  /**
   * Returns the serialize function.
   */
  return {
    provide: {
      serialize,
    },
  }
})
