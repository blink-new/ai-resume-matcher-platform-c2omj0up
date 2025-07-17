import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Upload, 
  Target, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

export function Dashboard() {
  const [stats, setStats] = useState({
    resumesUploaded: 1,
    jobMatches: 12,
    applications: 3,
    interviewsScheduled: 1
  })

  const recentActivity = [
    {
      id: 1,
      type: 'match',
      title: 'New job match found',
      description: 'Senior Frontend Developer at TechCorp (95% match)',
      time: '2 hours ago',
      icon: Target,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'application',
      title: 'Application submitted',
      description: 'Full Stack Developer at StartupXYZ',
      time: '1 day ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'resume',
      title: 'Resume analyzed',
      description: 'Skills extracted and profile updated',
      time: '2 days ago',
      icon: Upload,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Track your job search progress and discover new opportunities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumes Uploaded</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resumesUploaded}</div>
            <p className="text-xs text-muted-foreground">
              Ready for matching
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.jobMatches}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applications}</div>
            <p className="text-xs text-muted-foreground">
              Submitted this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {activity.time}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Upload className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium">Upload New Resume</h3>
              <p className="text-sm text-muted-foreground">Update your profile with latest resume</p>
            </button>
            
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Target className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium">Browse Matches</h3>
              <p className="text-sm text-muted-foreground">Discover new job opportunities</p>
            </button>
            
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <FileText className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium">Track Applications</h3>
              <p className="text-sm text-muted-foreground">Monitor your application status</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}