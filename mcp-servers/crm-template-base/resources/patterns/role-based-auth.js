export default `# Role-Based Authentication with Clerk

## Role Types
\`\`\`typescript
export type UserRole = 'LAB_TECH' | 'SALES_REP' | 'LAB_MANAGER' | 'ADMIN'

export interface User {
  id: string
  email: string
  role: UserRole
  permissions: string[]
}
\`\`\`

## Role-Based Middleware
\`\`\`typescript
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export function withRole(allowedRoles: UserRole[]) {
  return async function middleware(req: Request) {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserWithRole(userId)
    
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.next()
  }
}
\`\`\`

## Protected Component
\`\`\`tsx
import { useUser } from '@clerk/nextjs'

interface ProtectedProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function Protected({ allowedRoles, children, fallback }: ProtectedProps) {
  const { user } = useUser()
  const userRole = user?.publicMetadata?.role as UserRole

  if (!allowedRoles.includes(userRole)) {
    return fallback || <div>Access denied</div>
  }

  return <>{children}</>
}
\`\`\``;