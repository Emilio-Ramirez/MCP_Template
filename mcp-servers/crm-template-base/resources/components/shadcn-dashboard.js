export default `# Shadcn Dashboard Components

## Main Layout
\`\`\`tsx
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
\`\`\`

## Sidebar Component
\`\`\`tsx
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, FileText, Settings } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold">CRM</h2>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <Button key={item.name} variant="ghost" className="w-full justify-start">
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </div>
  )
}
\`\`\``;