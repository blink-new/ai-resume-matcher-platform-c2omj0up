import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  Eye,
  MessageSquare
} from 'lucide-react'

interface Application {
  id: string
  jobTitle: string
  company: string
  location: string
  appliedDate: string
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'rejected' | 'offer_received'
  matchScore: number
  notes: string
  nextStep?: string
  interviewDate?: string
}

export function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: '1',
        jobTitle: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        appliedDate: '2024-01-15',
        status: 'interview_scheduled',
        matchScore: 95,
        notes: 'Great match for React and TypeScript skills. Interview scheduled for next week.',
        nextStep: 'Technical interview on Jan 22',
        interviewDate: '2024-01-22'
      },
      {
        id: '2',
        jobTitle: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        appliedDate: '2024-01-12',
        status: 'under_review',
        matchScore: 88,
        notes: 'Applied through company website. Received confirmation email.',
        nextStep: 'Waiting for initial screening call'
      },
      {
        id: '3',
        jobTitle: 'React Developer',
        company: 'Digital Agency Pro',
        location: 'New York, NY',
        appliedDate: '2024-01-10',
        status: 'submitted',
        matchScore: 92,
        notes: 'Contract position. Submitted portfolio and resume.',
        nextStep: 'Follow up if no response by Jan 20'
      },
      {
        id: '4',
        jobTitle: 'Frontend Engineer',
        company: 'Innovation Labs',
        location: 'Austin, TX',
        appliedDate: '2024-01-08',
        status: 'rejected',
        matchScore: 78,
        notes: 'Received rejection email. They went with someone with more backend experience.',
        nextStep: 'Apply to similar roles with stronger frontend focus'
      },
      {
        id: '5',
        jobTitle: 'UI Developer',
        company: 'Creative Studio',
        location: 'Los Angeles, CA',
        appliedDate: '2024-01-05',
        status: 'offer_received',
        matchScore: 85,
        notes: 'Received offer! Salary: $95k, benefits included. Need to respond by Jan 25.',
        nextStep: 'Review offer details and negotiate if needed'
      }
    ]

    // Simulate loading
    setTimeout(() => {
      setApplications(mockApplications)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'interview_scheduled':
        return 'bg-purple-100 text-purple-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'offer_received':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <FileText className="h-4 w-4" />
      case 'under_review':
        return <Eye className="h-4 w-4" />
      case 'interview_scheduled':
        return <Calendar className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      case 'offer_received':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted'
      case 'under_review':
        return 'Under Review'
      case 'interview_scheduled':
        return 'Interview Scheduled'
      case 'rejected':
        return 'Rejected'
      case 'offer_received':
        return 'Offer Received'
      default:
        return status
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'submitted':
        return 25
      case 'under_review':
        return 50
      case 'interview_scheduled':
        return 75
      case 'rejected':
        return 0
      case 'offer_received':
        return 100
      default:
        return 0
    }
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => ['submitted', 'under_review', 'interview_scheduled'].includes(app.status)).length,
    interviews: applications.filter(app => app.status === 'interview_scheduled').length,
    offers: applications.filter(app => app.status === 'offer_received').length
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Application Tracker</h1>
          <p className="text-muted-foreground mt-2">Loading your applications...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Application Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your job applications and track their progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Submitted this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
            <p className="text-xs text-muted-foreground">
              Received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Application Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{application.jobTitle}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{application.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{application.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">
                        Applied {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{getStatusText(application.status)}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Application Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {application.matchScore}% match
                      </span>
                    </div>
                    <Progress 
                      value={getProgressValue(application.status)} 
                      className="h-2"
                    />
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Notes</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{application.notes}</p>
                  </div>

                  {/* Next Step */}
                  {application.nextStep && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Next Step</span>
                      </div>
                      <p className="text-sm text-blue-700">{application.nextStep}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:w-48">
                  {application.interviewDate && (
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-purple-800">Interview</div>
                      <div className="text-xs text-purple-600">
                        {new Date(application.interviewDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Job
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>

                  {application.status === 'offer_received' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review Offer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {applications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-muted-foreground">
              Start applying to jobs from your matches to track them here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}