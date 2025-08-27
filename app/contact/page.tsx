export default function ContactPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-gray-600 mt-2">We typically respond within 1 business day.</p>
      <form className="mt-8 grid gap-4 max-w-xl">
        <input className="border rounded-lg p-3" placeholder="Your name" />
        <input className="border rounded-lg p-3" type="email" placeholder="Email" />
        <textarea className="border rounded-lg p-3" rows={5} placeholder="Message" />
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow">Send</button>
      </form>
    </div>
  )
}


