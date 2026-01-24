import React from 'react'

interface LexicalNode {
  type: string
  tag?: string
  listType?: string
  format?: number
  text?: string
  fields?: {
    url?: string
    newTab?: boolean
  }
  children?: LexicalNode[]
}

export function RichText({ content }: { content: { root: { children: LexicalNode[] } } | null | undefined }) {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  return (
    <div className="rich-text">
      {content.root.children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

function RenderNode({ node }: { node: LexicalNode }) {
  switch (node.type) {
    case 'heading':
      {
        const HeadingTag = `h${node.tag || '2'}` as keyof React.JSX.IntrinsicElements
        return (
          <HeadingTag className="font-bold text-slate-900 mt-8 mb-4">
            <RenderChildren nodes={node.children} />
          </HeadingTag>
        )
      }
    case 'paragraph':
      return (
        <p className="mb-4 leading-relaxed text-slate-700">
          <RenderChildren nodes={node.children} />
        </p>
      )
    case 'list':
      {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag className={`mb-6 ml-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'} space-y-2 text-slate-700`}>
            <RenderChildren nodes={node.children} />
          </ListTag>
        )
      }
    case 'listitem':
      return (
        <li>
          <RenderChildren nodes={node.children} />
        </li>
      )
    case 'text':
      {
        let text: React.ReactNode = node.text || ''
        if (typeof node.format === 'number') {
          if (node.format & 1) text = <strong key="bold">{text}</strong> // IS_BOLD
          if (node.format & 2) text = <em key="italic">{text}</em> // IS_ITALIC
        }
        return text
      }
    case 'link':
      return (
        <a href={node.fields?.url} className="text-primary hover:underline" target={node.fields?.newTab ? '_blank' : undefined}>
          <RenderChildren nodes={node.children} />
        </a>
      )
    default:
      if (node.children) {
        return <RenderChildren nodes={node.children} />
      }
      return null
  }
}

function RenderChildren({ nodes }: { nodes: LexicalNode[] | undefined }) {
  if (!nodes) return null
  return (
    <>
      {nodes.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </>
  )
}
