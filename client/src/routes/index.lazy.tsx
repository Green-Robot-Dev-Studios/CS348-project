import AppMenu from '@/components/app-menu'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Dashboard
})

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppMenu />
      <h1 className="text-8xl font-semibold font-display text-center">Waterfood</h1>
    </div>
  )
}
