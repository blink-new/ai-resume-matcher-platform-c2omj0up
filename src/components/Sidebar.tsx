import { 
  LayoutDashboard, 
  Upload, 
  Target, 
  FileText, 
  User,
  LogOut
} from 'lucide-react'
import { blink } from '../blink/client'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  user: any
}

export function Sidebar({ currentPage, onPageChange, user }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    { id: 'matches', label: 'Job Matches', icon: Target },
    { id: 'applications', label: 'Applications', icon: FileText },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">AI Resume Matcher</h1>
      </div>
      
      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-1 ${
                currentPage === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User size={16} className="text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => blink.auth.logout()}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )
}