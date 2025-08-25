import { NavigationManagerClient } from "./navigation-manager-client"

export default function NavigationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Navigation Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your website's navigation structure and menu items.
        </p>
      </div>

      <NavigationManagerClient />
    </div>
  )
}

export const metadata = {
  title: 'Navigation Management - CMS Admin',
  description: 'Manage website navigation and menu structure',
}
