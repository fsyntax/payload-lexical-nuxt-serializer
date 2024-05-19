import escapeHTML from 'escape-html'
import type { VNode } from 'vue'
import { h } from 'vue'
import {
  IS_ALIGN_CENTER,
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from '../RichTextNodeFormat'
import { NuxtImg, NuxtLink } from '#components'
import type { ModuleOptions, BaseNode, Classes, LinkNode, BlockNode, Node, UploadNode } from '~/src/types'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

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
    // const pluginRuntimeConfig = useRuntimeConfig().public.payloadLexicalHtmlSerializer as ModuleOptions
    // if (!pluginRuntimeConfig?.components) {
    //   console.warn('No components defined in the module options')
    //   return null
    // }
    //
    // const { components } = pluginRuntimeConfig
    //
    // if (!components) {
    //   console.warn('No components defined in the module options')
    //   return null
    // }
    //
    // if (!node.blockType) {
    //   console.warn('No block type defined for block')
    //   return null
    // }
    //
    // const component = components[node.blockType]

    return h('div', {
      // block: node,
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
  function serialize(nodes: Node[], classes: Classes[] = [], renderNodeComponent: boolean = false, visitedNodes = new Set<Node>()): VNode[] {
    if (!Array.isArray(nodes)) nodes = [nodes]

    return nodes
      .map((node) => {
        if (!node || visitedNodes.has(node)) return null

        const visitedNodesCopy = new Set(visitedNodes)
        visitedNodesCopy.add(node)

        const children = node.children ? serialize(node.children, classes, renderNodeComponent, visitedNodesCopy) : []
        const classList = getAlignmentClass(node, classes)
        if (node.blockType) {
          node.type = 'block'
        }
        switch (node.type) {
          case 'root': {
            if (classList !== '') {
              return h('div', { class: classList }, children)
            }
            return h('div', { }, children)
          }
          case 'paragraph': {
            let paragraphClass = getClassForTag('p', classes)
            if (node.format === 'center') {
              paragraphClass += ' text-center'
            }
            if (paragraphClass !== '') {
              return h('p', { class: paragraphClass }, children)
            }
            return h('p', { }, children)
          }
          case 'text': {
            const escapedText = escapeHTML(node.text).replace(/&amp;|&quot;|&apos;|&lt;|&gt;|&#39;/g, (match: string) => {
              switch (match) {
                case '&amp;': return '&'
                case '&quot;': return '"'
                case '&apos;': return '\''
                case '&lt;': return '<'
                case '&gt;': return '>'
                case '&#39;': return '\''
                default: return match
              }
            })

            return applyTextFormatting(escapedText, node.format as number, classes)
          }
          case 'linebreak':
            return h('br')
          case 'link':
            return serializeLink(node, children, classes)
          case 'list': {
            const listTag = node.listType === 'bullet' ? 'ul' : 'ol'
            return h(listTag, { class: getClassForTag(listTag, classes) }, children)
          }
          case 'listitem':
            return h('li', { class: getClassForTag('li', classes) }, children)
          case 'block': {
            return handleBlockType(node) || null
          }
          case 'upload': {
            return handleUpload(node) || null
          }
          default: {
            if (classList !== '') {
              return h('p', { class: classList }, children)
            }
            return h('p', {}, children)
          }
        }
      })
      .filter((node): node is VNode => node !== null)
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
