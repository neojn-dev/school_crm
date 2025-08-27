import Link from "next/link"
import { db } from "@/lib/db"

export default async function BlogsAdminListPage() {
  const posts = await db.blogPost.findMany({ orderBy: { updatedAt: 'desc' } })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blogs</h1>
          <p className="text-gray-600">Create and manage blog posts.</p>
        </div>
        <Link href="/cms/blogs/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-md">New Post</Link>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded bg-gray-100">{p.status}</span></td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(p.updatedAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <Link href={`/cms/blogs/${p.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


