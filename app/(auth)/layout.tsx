export const metadata = {
  title: 'Authentication - School CRM',
  description: 'Sign in, sign up, and manage your account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {children}
    </div>
  )
}
