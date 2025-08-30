import Link from "next/link"

export default async function BlogListPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blogs`, { cache: 'no-store' })
  const posts = await res.json()
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link key={post.id} href={`/updates/blog/${post.slug || post.id}`} className="rounded-xl border bg-white p-6 hover:shadow transition block">
            <div className="text-lg font-semibold text-gray-900">{post.title}</div>
            <div className="text-sm text-gray-600 mt-1">{post.excerpt}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


