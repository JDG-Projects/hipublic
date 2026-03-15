'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt?: string
  tags?: { tag: string }[]
  coverImage?: { url?: string }
}

interface BlogPreviewSectionProps {
  posts?: Post[]
}

const fallbackPosts: Post[] = [
  {
    id: '1',
    title: 'iGaming Influencer Marketing Trends in 2025',
    slug: 'igaming-trends-2025',
    excerpt:
      'Discover the latest trends shaping influencer marketing in the iGaming industry and how to leverage them.',
    publishedAt: '2025-03-01',
    tags: [{ tag: 'iGaming' }, { tag: 'Trends' }],
  },
  {
    id: '2',
    title: 'How to Choose the Right Influencer for Your Brand',
    slug: 'choose-right-influencer',
    excerpt:
      'A comprehensive guide to selecting influencers that align with your brand values and campaign goals.',
    publishedAt: '2025-02-15',
    tags: [{ tag: 'Strategy' }, { tag: 'Guide' }],
  },
  {
    id: '3',
    title: 'Measuring ROI in Influencer Campaigns',
    slug: 'measuring-roi-influencer',
    excerpt:
      'Learn the key metrics and tools to accurately measure the return on investment from influencer partnerships.',
    publishedAt: '2025-02-01',
    tags: [{ tag: 'Analytics' }, { tag: 'ROI' }],
  },
]

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const items = posts && posts.length > 0 ? posts : fallbackPosts

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
              Insights
            </span>
            <h2 className="text-4xl sm:text-5xl font-black">
              Latest{' '}
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="outline" size="sm">
              View All Posts <ArrowRight size={14} />
            </Button>
          </Link>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((post, i) => (
            <SectionWrapper key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="h-full rounded-2xl bg-white/3 border border-white/8 hover:border-purple-500/30 overflow-hidden transition-colors duration-300"
                >
                  {post.coverImage?.url ? (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-linear-to-br from-purple-900/30 to-cyan-900/20 flex items-center justify-center">
                      <div className="text-4xl font-black text-white/10">HP</div>
                    </div>
                  )}

                  <div className="p-6">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <Tag size={12} className="text-purple-400" />
                        {post.tags.slice(0, 2).map((t) => (
                          <span key={t.tag} className="text-xs text-purple-400 font-medium">
                            {t.tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2 mb-4">{post.excerpt}</p>

                    {post.publishedAt && (
                      <div className="flex items-center gap-1.5 text-xs text-white/30">
                        <Calendar size={12} />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    )}
                  </div>
                </motion.article>
              </Link>
            </SectionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
