import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const revalidate = 3600

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    })

    const page = res.docs[0]
    if (!page) notFound()

    return (
      <div className="pt-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionWrapper>
            <h1 className="text-4xl sm:text-5xl font-black mb-10 leading-tight">{page.title}</h1>
            <div className="prose prose-invert prose-lg max-w-none">
              <RichText data={page.content as SerializedEditorState} />
            </div>
          </SectionWrapper>
        </article>
      </div>
    )
  } catch {
    notFound()
  }
}
