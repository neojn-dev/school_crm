export const metadata = {
  title: 'Authentication - Next.js Template',
  description: 'Sign in, sign up, and manage your account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
