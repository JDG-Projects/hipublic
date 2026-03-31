/**
 * Import cover images from hipublic.com into Vercel Blob + MongoDB media collection
 * Then link them to corresponding posts.
 *
 * Usage: node scripts/import-images.mjs
 */

import { MongoClient } from 'mongodb'
import { put } from '@vercel/blob'
import dotenv from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env') })

const DATABASE_URL = process.env.DATABASE_URL
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

if (!DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1) }
if (!BLOB_TOKEN) { console.error('BLOB_READ_WRITE_TOKEN not set'); process.exit(1) }

const imageMap = [
  { slug: 'how-to-detect-fraud-by-influencers', url: 'https://hipublic.com/wp-content/uploads/2026/03/article_17_1025x628.webp', alt: 'How To Detect Fraud By Influencers' },
  { slug: 'how-streaming-is-reshaping-the-mechanics-of-igaming', url: 'https://hipublic.com/wp-content/uploads/2026/02/article_16_1025x628.webp', alt: 'How Streaming Is Reshaping the Mechanics of iGaming' },
  { slug: 'igaming-2025-results', url: 'https://hipublic.com/wp-content/uploads/2025/12/article_15_1025x628.webp', alt: 'iGaming 2025 Results' },
  { slug: 'how-top-down-decisions-can-destroy-an-igaming-product', url: 'https://hipublic.com/wp-content/uploads/2025/12/article_14_1025x628.webp', alt: 'How Top-Down Decisions Can Destroy an iGaming Product' },
  { slug: 'linkedin-and-the-next-era-of-b2b-b2c-influencer-marketing', url: 'https://hipublic.com/wp-content/uploads/2025/10/article_13_1025x628.webp', alt: 'LinkedIn and the Next Era of B2B & B2C Influencer Marketing' },
  { slug: 'contracts-and-agreements-with-influencers', url: 'https://hipublic.com/wp-content/uploads/2025/07/article_12_1025x628.webp', alt: 'Contracts and Agreements with Influencers' },
  { slug: 'influencer-marketing-in-anti-crisis-brand-management', url: 'https://hipublic.com/wp-content/uploads/2025/06/article_11_1025x628.webp', alt: 'Influencer Marketing in Anti-Crisis Brand Management' },
  { slug: 'how-to-use-linkedin-influencers-for-b2b-development', url: 'https://hipublic.com/wp-content/uploads/2025/05/article_10_1025x628.webp', alt: 'How To Use LinkedIn Influencers For B2B Development' },
  { slug: 'b2b-marketing-budget-trends-in-2025-where-brands-are-investing-and-why', url: 'https://hipublic.com/wp-content/uploads/2025/04/article_9_1025x628.webp', alt: 'B2B Marketing Budget Trends in 2025' },
  { slug: 'dos-and-donts-of-working-with-influencers', url: 'https://hipublic.com/wp-content/uploads/2025/04/article_8_1025x628.webp', alt: "Do's And Don'ts Of Working With Influencers" },
  { slug: 'influencers-vs-creators-is-there-a-difference-between-them', url: 'https://hipublic.com/wp-content/uploads/2025/03/article_7_1025x628.webp', alt: 'Influencers vs Creators' },
  { slug: 'key-updates-in-social-media', url: 'https://hipublic.com/wp-content/uploads/2024/09/article_5_1025x628.webp', alt: 'Key Updates In Social Media' },
  { slug: 'trends-that-will-prevail-in-marketing', url: 'https://hipublic.com/wp-content/uploads/2025/01/article_6_1025x628.webp', alt: 'Trends That Will Prevail In Marketing In 2025' },
  { slug: 'the-future-of-igaming-marketing', url: 'https://hipublic.com/wp-content/uploads/2025/01/article_4_1025x628.webp', alt: 'The Future of iGaming Marketing' },
  { slug: 'the-expanding-world-of-artificial-intelligence', url: 'https://hipublic.com/wp-content/uploads/2024/11/article_1_1025x628.webp', alt: 'The Expanding World of Artificial Intelligence' },
  { slug: 'how-we-use-information-today', url: 'https://hipublic.com/wp-content/uploads/2024/09/article_2_1025x628.webp', alt: 'How We Use Information Today' },
  { slug: 'tiktok-vs-reels-vs-shorts-for-influencer-marketing-campaigns', url: 'https://hipublic.com/wp-content/uploads/2024/09/article_3_1025x628.webp', alt: 'TikTok vs Reels vs Shorts' },
]

async function main() {
  const client = new MongoClient(DATABASE_URL)
  await client.connect()
  console.log('Connected to MongoDB')

  const db = client.db('test')
  const mediaCol = db.collection('media')
  const postsCol = db.collection('posts')

  for (const item of imageMap) {
    const post = await postsCol.findOne({ slug: item.slug })
    if (!post) {
      console.log(`⏭ Post not found: ${item.slug}`)
      continue
    }

    // Skip if post already has coverImage
    if (post.coverImage) {
      console.log(`⏭ Already has image: "${item.alt}"`)
      continue
    }

    try {
      // Download image
      console.log(`⬇ Downloading: ${item.url}`)
      const response = await fetch(item.url)
      if (!response.ok) {
        console.log(`  ❌ Failed to download (${response.status})`)
        continue
      }

      const buffer = Buffer.from(await response.arrayBuffer())
      const contentType = response.headers.get('content-type') || 'image/webp'

      // Extract filename from URL
      const urlParts = item.url.split('/')
      const filename = urlParts[urlParts.length - 1]

      // Upload to Vercel Blob
      console.log(`⬆ Uploading to Vercel Blob: ${filename}`)
      const blob = await put(`media/${filename}`, buffer, {
        access: 'public',
        contentType,
        token: BLOB_TOKEN,
      })

      // Create media document
      const now = new Date().toISOString()
      const mediaDoc = {
        alt: item.alt,
        url: blob.url,
        filename,
        mimeType: contentType,
        filesize: buffer.length,
        width: 1025,
        height: 628,
        thumbnailURL: null,
        createdAt: now,
        updatedAt: now,
        __v: 0,
      }

      const mediaResult = await mediaCol.insertOne(mediaDoc)
      console.log(`  📸 Media created: ${mediaResult.insertedId}`)

      // Link to post
      await postsCol.updateOne(
        { _id: post._id },
        { $set: { coverImage: mediaResult.insertedId } },
      )

      // Also update the version document
      await db.collection('_posts_versions').updateOne(
        { parent: post._id, latest: true },
        { $set: { 'version.coverImage': mediaResult.insertedId } },
      )

      console.log(`  ✅ Linked to: "${post.title}"`)
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`)
    }
  }

  const mediaCount = await mediaCol.countDocuments()
  console.log(`\nTotal media in DB: ${mediaCount}`)

  await client.close()
}

main()
