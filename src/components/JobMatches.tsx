import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { 
  Target, 
  MapPin, 
  Clock, 
  DollarSign,
  Building,
  HelpCircle,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Star,
  Filter,
  Search
} from 'lucide-react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { blink } from '../blink/client'

interface JobMatch {
  id: string
  jobTitle: string
  company: string
  location: string
  jobType: string
  salaryRange: string
  description: string
  requiredSkills: string[]
  preferredSkills: string[]
  experienceRequired: number
  educationRequired: string
  matchScore: number
  matchReasons: string[]
  mismatchReasons: string[]
  applicationStatus: string
  postedDate: string
}

export function JobMatches() {
  const [matches, setMatches] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('match_score')
  const [filterBy, setFilterBy] = useState('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockMatches: JobMatch[] = [
      {
        id: '1',
        jobTitle: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        salaryRange: '$120,000 - $160,000',
        description: 'We are looking for a Senior Frontend Developer to join our team and help build amazing user experiences.',
        requiredSkills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
        preferredSkills: ['Next.js', 'Tailwind CSS', 'GraphQL', 'Jest'],
        experienceRequired: 5,
        educationRequired: 'Bachelor\'s degree',
        matchScore: 95,
        matchReasons: [
          'Strong React and TypeScript experience matches perfectly',
          'Your 6 years of experience exceeds the 5-year requirement',
          'Previous frontend roles align with job requirements',
          'Skills in modern CSS frameworks are highly valued'
        ],
        mismatchReasons: [
          'GraphQL experience would be beneficial but not required',
          'Testing experience with Jest could be strengthened'
        ],
        applicationStatus: 'not_applied',
        postedDate: '2 days ago'
      },
      {
        id: '2',
        jobTitle: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        jobType: 'Full-time',
        salaryRange: '$90,000 - $130,000',
        description: 'Join our fast-growing startup as a Full Stack Developer and help shape the future of our platform.',
        requiredSkills: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Express'],
        preferredSkills: ['AWS', 'Docker', 'Redis', 'TypeScript'],
        experienceRequired: 3,
        educationRequired: 'Bachelor\'s degree or equivalent',
        matchScore: 88,
        matchReasons: [
          'JavaScript and React skills are a perfect match',
          'Your experience level exceeds requirements',
          'Remote work preference aligns with job offering',
          'Startup experience would be valuable here'
        ],
        mismatchReasons: [
          'Limited MongoDB experience compared to SQL databases',
          'Node.js backend experience could be stronger',
          'AWS cloud experience would be beneficial'
        ],
        applicationStatus: 'not_applied',
        postedDate: '1 week ago'
      },
      {
        id: '3',
        jobTitle: 'React Developer',
        company: 'Digital Agency Pro',
        location: 'New York, NY',
        jobType: 'Contract',
        salaryRange: '$80 - $100/hour',
        description: 'We need a skilled React Developer for a 6-month contract to build client applications.',
        requiredSkills: ['React', 'JavaScript', 'CSS', 'Git'],
        preferredSkills: ['Redux', 'Styled Components', 'Webpack'],
        experienceRequired: 3,
        educationRequired: 'Any degree or equivalent experience',
        matchScore: 92,
        matchReasons: [
          'React expertise is exactly what they\'re looking for',
          'Your JavaScript skills are well-suited for this role',
          'Experience with modern development tools matches their needs',
          'Contract work fits your availability preferences'
        ],
        mismatchReasons: [
          'Redux experience could be more extensive',
          'Styled Components knowledge would be helpful'
        ],
        applicationStatus: 'applied',
        postedDate: '3 days ago'
      },
      {
        id: '4',
        jobTitle: 'UI/UX Developer',
        company: 'Design Studio',
        location: 'Los Angeles, CA',
        jobType: 'Part-time',
        salaryRange: '$60,000 - $80,000',
        description: 'Looking for a UI/UX Developer to bridge the gap between design and development.',
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Adobe Creative Suite'],
        preferredSkills: ['React', 'Vue.js', 'SASS', 'Animation'],
        experienceRequired: 2,
        educationRequired: 'Design or Computer Science degree',
        matchScore: 72,
        matchReasons: [
          'Strong HTML/CSS foundation matches requirements',
          'JavaScript skills provide good technical base',
          'Your design sensibility would be valuable'
        ],
        mismatchReasons: [
          'Limited Figma and design tool experience',
          'Adobe Creative Suite skills need development',
          'UI/UX focus differs from your backend-heavy background',
          'Part-time schedule may not align with career goals'
        ],
        applicationStatus: 'not_applied',
        postedDate: '5 days ago'
      },
      {
        id: '5',
        jobTitle: 'Software Engineer',
        company: 'Enterprise Solutions',
        location: 'Chicago, IL',
        jobType: 'Full-time',
        salaryRange: '$100,000 - $140,000',
        description: 'Join our enterprise team to build scalable software solutions for Fortune 500 clients.',
        requiredSkills: ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
        preferredSkills: ['Microservices', 'Kubernetes', 'Jenkins', 'Agile'],
        experienceRequired: 4,
        educationRequired: 'Computer Science degree',
        matchScore: 65,
        matchReasons: [
          'Strong programming fundamentals transfer well',
          'API development experience is relevant',
          'Your problem-solving skills suit enterprise environments'
        ],
        mismatchReasons: [
          'Java experience is limited compared to JavaScript focus',
          'Spring Boot framework knowledge needs development',
          'Enterprise-scale system experience is minimal',
          'Backend focus differs from your frontend specialization'
        ],
        applicationStatus: 'not_applied',
        postedDate: '1 week ago'
      }
    ]

    // Simulate loading
    setTimeout(() => {
      setMatches(mockMatches)
      setLoading(false)
    }, 1000)
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 75) return 'bg-blue-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const filteredMatches = matches
    .filter(match => {
      const matchesSearch = match.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           match.company.toLowerCase().includes(searchQuery.toLowerCase())
      
      if (filterBy === 'all') return matchesSearch
      if (filterBy === 'high_match') return matchesSearch && match.matchScore >= 85
      if (filterBy === 'applied') return matchesSearch && match.applicationStatus === 'applied'
      if (filterBy === 'not_applied') return matchesSearch && match.applicationStatus === 'not_applied'
      
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'match_score') return b.matchScore - a.matchScore
      if (sortBy === 'company') return a.company.localeCompare(b.company)
      if (sortBy === 'posted_date') return a.postedDate.localeCompare(b.postedDate)
      return 0
    })

  const MatchExplanationDialog = ({ match }: { match: JobMatch }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Match Analysis: {match.jobTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(match.matchScore)} mb-3 border-4 ${match.matchScore >= 90 ? 'border-green-300' : match.matchScore >= 75 ? 'border-blue-300' : match.matchScore >= 60 ? 'border-yellow-300' : 'border-red-300'}`}>
              <span className={`text-3xl font-bold ${getScoreColor(match.matchScore)}`}>
                {match.matchScore}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Overall Match Score</p>
            <Progress value={match.matchScore} className="w-32 mx-auto" />
            <p className="text-xs text-muted-foreground mt-1">
              {match.matchScore >= 90 ? 'Excellent Match' : 
               match.matchScore >= 75 ? 'Good Match' : 
               match.matchScore >= 60 ? 'Fair Match' : 'Poor Match'}
            </p>
          </div>

          {/* Why it's a good match */}
          <div>
            <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Why you're a great fit:
            </h3>
            <ul className="space-y-2">
              {match.matchReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for improvement */}
          {match.mismatchReasons.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Areas to strengthen:
              </h3>
              <ul className="space-y-2">
                {match.mismatchReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Breakdown */}
          <div>
            <h3 className="font-semibold mb-3">Skills Breakdown:</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {match.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-700 mb-2">Preferred Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {match.preferredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Match Summary:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Experience Level:</span>
                <div className="font-medium">
                  {match.experienceRequired <= 3 ? '✅ Meets requirement' : 
                   match.experienceRequired <= 5 ? '⚠️ Close match' : '❌ Below requirement'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Skills Match:</span>
                <div className="font-medium">
                  {match.matchScore >= 85 ? '✅ Excellent' : 
                   match.matchScore >= 70 ? '⚠️ Good' : '❌ Needs work'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <div className="font-medium">
                  {match.location.includes('Remote') ? '✅ Remote friendly' : '📍 ' + match.location}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Job Type:</span>
                <div className="font-medium">{match.jobType}</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Recommendations:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Highlight your strongest matching skills in your application</li>
              <li>• Consider taking a course in areas where you need improvement</li>
              <li>• Emphasize relevant project experience in your cover letter</li>
              {match.matchScore >= 85 && <li>• This is a high-match opportunity - apply soon!</li>}
              {match.matchScore < 70 && <li>• Consider improving skills in key areas before applying</li>}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Job Matches</h1>
          <p className="text-muted-foreground mt-2">Finding the best opportunities for you...</p>
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
        <h1 className="text-3xl font-bold">Job Matches</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered job recommendations based on your resume analysis
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match_score">Match Score</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="posted_date">Posted Date</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="high_match">High Match (85%+)</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="not_applied">Not Applied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Matches */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <Card key={match.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{match.jobTitle}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Building className="h-4 w-4" />
                        <span>{match.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Match Score */}
                      <div className={`px-4 py-2 rounded-full ${getScoreBgColor(match.matchScore)} flex items-center gap-2 border-2 ${match.matchScore >= 90 ? 'border-green-200' : match.matchScore >= 75 ? 'border-blue-200' : match.matchScore >= 60 ? 'border-yellow-200' : 'border-red-200'}`}>
                        <Star className={`h-5 w-5 ${getScoreColor(match.matchScore)}`} />
                        <span className={`text-lg font-bold ${getScoreColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </span>
                      </div>
                      {/* Help Button */}
                      <div className="relative group">
                        <MatchExplanationDialog match={match} />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Why this match?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{match.jobType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{match.salaryRange}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {match.description}
                  </p>

                  {/* Skills */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Required: </span>
                      <div className="inline-flex flex-wrap gap-1">
                        {match.requiredSkills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="default" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {match.requiredSkills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.requiredSkills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:w-48">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">Posted {match.postedDate}</div>
                    {match.applicationStatus === 'applied' ? (
                      <Badge variant="secondary" className="mb-3">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Applied
                      </Badge>
                    ) : (
                      <div className="mb-3"></div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={match.applicationStatus === 'applied'}
                  >
                    {match.applicationStatus === 'applied' ? 'Applied' : 'Apply Now'}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or upload a new resume to get better matches.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}