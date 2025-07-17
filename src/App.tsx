import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { ResumeUpload } from './components/ResumeUpload'
import { JobMatches } from './components/JobMatches'
import { ApplicationTracker } from './components/ApplicationTracker'
import { Toaster } from './components/ui/toaster'

type Page = 'dashboard' | 'upload' | 'matches' | 'applications'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">AI Resume Matcher</h1>
          <p className="text-muted-foreground mb-6">
            Upload your resume and let AI find the perfect job matches for you
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In to Get Started
          </button>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'upload':
        return <ResumeUpload />
      case 'matches':
        return <JobMatches />
      case 'applications':
        return <ApplicationTracker />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} user={user} />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {renderPage()}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default App