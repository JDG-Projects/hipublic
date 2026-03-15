import React, { Suspense } from 'react'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/AnimatedText'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'

export const metadata = {
  title: 'hiPublic | Blog',
  description: 'Insights, strategies, and trends in influencer marketing from the HiPublic team.',
}

export const revalidate = 600

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt?: string
  tags?: { tag: string }[]
  coverImage?: { url?: string }
}

const fallback: Post[] = [
  {
    id: '1',
    title: 'iGaming Influencer Marketing Trends in 2025',
    slug: 'igaming-trends-2025',
    excerpt:
      'Discover the latest trends shaping influencer marketing in the iGaming industry and how to leverage them for maximum ROI.',
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
  {
    id: '4',
    title: 'LinkedIn B2B Influencer Marketing Guide',
    slug: 'linkedin-b2b-guide',
    excerpt:
      'How to harness the power of LinkedIn influencers for B2B brand awareness and lead generation.',
    publishedAt: '2025-01-20',
    tags: [{ tag: 'B2B' }, { tag: 'LinkedIn' }],
  },
  {
    id: '5',
    title: 'Influencer Contracts: What You Need to Know',
    slug: 'influencer-contracts',
    excerpt:
      'Essential legal considerations and best practices for influencer partnership agreements.',
    publishedAt: '2025-01-10',
    tags: [{ tag: 'Legal' }, { tag: 'Contracts' }],
  },
  {
    id: '6',
    title: 'Crisis Management for Influencer Campaigns',
    slug: 'crisis-management',
    excerpt:
      'How to handle PR crises in influencer marketing campaigns and protect your brand reputation.',
    publishedAt: '2024-12-20',
    tags: [{ tag: 'PR' }, { tag: 'Strategy' }],
  },
]

function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <SectionWrapper key={post.id} delay={i * 0.06}>
          <Link href={`/blog/${post.slug}`} className="group block h-full">
            <article className="h-full rounded-2xl bg-white/3 border border-white/8 hover:border-purple-500/30 overflow-hidden transition-colors duration-300">
              {post.coverImage?.url ? (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    width={640}
                    height={360}
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
                <h2 className="font-bold text-white group-hover:text-purple-300 transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-white/50 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
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
            </article>
          </Link>
        </SectionWrapper>
      ))}
    </div>
  )
}

async function PostsLoader() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      limit: 20,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
    })
    const posts = res.docs.length > 0 ? (res.docs as Post[]) : fallback
    return <PostsGrid posts={posts} />
  } catch {
    return <PostsGrid posts={fallback} />
  }
}

export default function BlogPage() {
  return (
    <div className="pt-16">
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionWrapper>
            <span className="text-sm font-semibold text-purple-400 tracking-widest uppercase mb-4 block">
              Blog
            </span>
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              <GradientText>Insights</GradientText> & Trends
            </h1>
            <p className="text-white/50 text-xl max-w-xl mx-auto">
              Expert knowledge on influencer marketing, strategy, and industry trends.
            </p>
          </SectionWrapper>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<PostsGrid posts={fallback} />}>
            <PostsLoader />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
