import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findFirst({ where: { OR: [{ slug: params.slug }, { id: params.slug }] } })
  if (!post || post.status !== 'published') return notFound()
  return (
    <article className="container-custom py-12 prose max-w-3xl">
      <h1>{post.title}</h1>
      {post.excerpt && <p className="lead">{post.excerpt}</p>}
      {post.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </article>
  )
}


