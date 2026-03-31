import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'

export const revalidate = 3600


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  type Post = {
    title: string
    excerpt: string
    publishedAt?: string
    tags?: { tag: string }[]
    coverImage?: { url?: string }
    content?: unknown
  }
  let post: Post | null = null

  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    })
    if (res.docs.length > 0) post = res.docs[0] as Post
  } catch {
    // fallback below
  }

  if (!post) {
    const fallbacks: Record<string, Post> = {
      'igaming-trends-2025': {
        title: 'iGaming Influencer Marketing Trends in 2025',
        excerpt: 'Discover the latest trends shaping influencer marketing in the iGaming industry.',
        publishedAt: '2025-03-01',
        tags: [{ tag: 'iGaming' }, { tag: 'Trends' }],
      },
    }
    post = fallbacks[slug] ?? null
  }

  if (!post) notFound()

  return (
    <div className="pt-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <SectionWrapper>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <Tag size={14} className="text-purple-400" />
              {post.tags.map((t) => (
                <span key={t.tag} className="text-sm text-purple-400 font-medium">
                  {t.tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">{post.title}</h1>

          {post.publishedAt && (
            <div className="flex items-center gap-2 text-sm text-white/40 mb-8 pb-8 border-b border-white/8">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}

          {post.coverImage?.url && (
            <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-white/70 prose-strong:text-white prose-li:text-white/70 prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-blockquote:border-purple-500/40 prose-blockquote:text-white/50">
            {post.content ? (
              <RichText data={post.content as SerializedEditorState} />
            ) : (
              <p className="text-white/60 text-lg leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </SectionWrapper>
      </article>

      <ContactCTA />
    </div>
  )
}
