// Module options TypeScript interface definition

export interface ModuleOptions {
  /**
   * Define the components that will be used to render the blocks
   * @param key - The key of the block - should be the blockType property of the block
   * @param component - The component that will be used to render the block
   */
  components?: Record<string, string>
}

export interface Classes {
  tag: string
  class: string
}

export interface BaseNode {
  type: string
  children?: Node[]
  format?: string | number
  version: number
  tag?: string
  blockType?: string
}

export interface ParagraphNode extends BaseNode {
  type: 'paragraph'
}

export interface TextNode extends BaseNode {
  type: 'text'
  text: string
}

export interface HeadingNode extends BaseNode {
  type: 'heading'
  tag: string
}

export interface RootNode extends BaseNode {
  type: 'root'
}
export interface LinebreakNode extends BaseNode {
  type: 'linebreak'
}
export interface LinkNode extends BaseNode {
  type: 'link'
  fields: {
    url: string
    newTab: boolean
    linkType: string
    rel?: string
    sponsored?: boolean
    nofollow?: boolean
    doc?: {
      relationTo: string
    }
  }
}

export interface ListNode extends BaseNode {
  type: 'list'
  listType: string
}
export interface ListItemNode extends BaseNode {
  type: 'listitem'
}
export interface BlockNode extends BaseNode {
  type: 'block'
  fields: any
  version: number
  format?: string | number
}
export interface UploadNode extends BaseNode {
  type: 'upload'
  version: number
  relationTo: 'media'

  fields: null
  format: string
  value: {
    id: number
    updatedAt: string
    createdAt: string
    filename: string
    filesize: number
    height: number
    mimeType: string | undefined
    url: string
    width: number
    description?: string
  }
}

export type Alignment = 'center' | 'right' | 'left'
export type ImageBlockType = 'default' | 'circle' | 'square'
export type Node = ParagraphNode | TextNode | HeadingNode | RootNode | LinebreakNode | LinkNode | ListNode | ListItemNode | BlockNode | UploadNode
