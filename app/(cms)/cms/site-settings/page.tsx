import { SiteSettingsClient } from "./site-settings-client"

export default function SiteSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your website&apos;s global settings, homepage, and branding.
        </p>
      </div>

      <SiteSettingsClient />
    </div>
  )
}

export const metadata = {
  title: 'Site Settings - CMS Admin',
  description: 'Configure website settings and homepage',
}
