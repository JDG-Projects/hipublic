import React, { Suspense } from 'react'
import Link from 'next/link'
import { Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { GradientText } from '@/components/ui/AnimatedText'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'

export const metadata = {
  title: 'hiPublic | Blog',
  description: 'Insights, strategies, and trends in influencer marketing from the HiPublic team.',
}

export const revalidate = 600

const POSTS_PER_PAGE = 6

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt?: string
  tags?: { tag: string }[]
  coverImage?: { url?: string }
}

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

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-16">
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-white/20">
          <ChevronLeft size={18} />
        </div>
      )}

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-white/30">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={page === 1 ? '/blog' : `/blog?page=${page}`}
            className={`flex items-center justify-center w-10 h-10 rounded-xl border text-sm font-medium transition-all duration-200 ${
              page === currentPage
                ? 'bg-purple-600/20 border-purple-500/40 text-purple-400'
                : 'bg-white/5 border-white/8 text-white/50 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40'
            }`}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-200"
        >
          <ChevronRight size={18} />
        </Link>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-white/20">
          <ChevronRight size={18} />
        </div>
      )}
    </nav>
  )
}

async function PostsLoader({ page }: { page: number }) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      limit: POSTS_PER_PAGE,
      page,
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
    })

    if (res.docs.length === 0) {
      return <p className="text-center text-white/40">No posts found.</p>
    }

    return (
      <>
        <PostsGrid posts={res.docs as Post[]} />
        <Pagination currentPage={page} totalPages={res.totalPages} />
      </>
    )
  } catch {
    return <p className="text-center text-white/40">Failed to load posts.</p>
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

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
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/3 border border-white/8 overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-white/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-white/5 rounded w-1/3" />
                      <div className="h-5 bg-white/5 rounded w-3/4" />
                      <div className="h-4 bg-white/5 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <PostsLoader page={page} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
