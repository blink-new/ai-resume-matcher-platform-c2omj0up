import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  X
} from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { blink } from '../blink/client'

export function ResumeUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const { toast } = useToast()

  const analyzeResume = useCallback(async (file: File, fileUrl: string) => {
    setAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // Simulate analysis progress
      const analysisInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(analysisInterval)
            return 90
          }
          return prev + 15
        })
      }, 500)

      // Extract text from resume
      const extractedText = await blink.data.extractFromBlob(file)

      // Use AI to analyze the resume
      const { object: analysis } = await blink.ai.generateObject({
        prompt: `Analyze this resume and extract key information: ${extractedText}`,
        schema: {
          type: 'object',
          properties: {
            skills: {
              type: 'array',
              items: { type: 'string' },
              description: 'Technical and soft skills mentioned'
            },
            experience_years: {
              type: 'number',
              description: 'Total years of professional experience'
            },
            education_level: {
              type: 'string',
              description: 'Highest education level (High School, Bachelor, Master, PhD, etc.)'
            },
            job_titles: {
              type: 'array',
              items: { type: 'string' },
              description: 'Previous job titles held'
            },
            summary: {
              type: 'string',
              description: 'Brief professional summary'
            },
            strengths: {
              type: 'array',
              items: { type: 'string' },
              description: 'Key professional strengths identified'
            }
          },
          required: ['skills', 'experience_years', 'education_level', 'job_titles', 'summary', 'strengths']
        }
      })

      clearInterval(analysisInterval)
      setAnalysisProgress(100)
      setAnalyzing(false)
      setAnalysisResults(analysis)

      toast({
        title: 'Resume analyzed successfully!',
        description: 'Your profile has been updated with extracted information'
      })

    } catch (error) {
      console.error('Analysis failed:', error)
      setAnalyzing(false)
      toast({
        title: 'Analysis failed',
        description: 'Please try again',
        variant: 'destructive'
      })
    }
  }, [toast])

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or Word document',
        variant: 'destructive'
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive'
      })
      return
    }

    setUploadedFile(file)
    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(uploadInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Upload file to storage
      const { publicUrl } = await blink.storage.upload(
        file,
        `resumes/${Date.now()}-${file.name}`,
        { upsert: true }
      )

      clearInterval(uploadInterval)
      setUploadProgress(100)
      setUploading(false)

      // Start AI analysis
      await analyzeResume(file, publicUrl)

    } catch (error) {
      console.error('Upload failed:', error)
      setUploading(false)
      toast({
        title: 'Upload failed',
        description: 'Please try again',
        variant: 'destructive'
      })
    }
  }, [analyzeResume, toast])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setAnalysisResults(null)
    setUploadProgress(0)
    setAnalysisProgress(0)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upload Resume</h1>
        <p className="text-muted-foreground mt-2">
          Upload your resume and let AI analyze it to find the best job matches
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Upload</CardTitle>
        </CardHeader>
        <CardContent>
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop your resume here</h3>
              <p className="text-muted-foreground mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
                className="hidden"
                id="resume-upload"
              />
              <Button asChild>
                <label htmlFor="resume-upload" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supports PDF, DOC, DOCX files up to 10MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {/* Analysis Progress */}
              {analyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing resume...
                    </span>
                    <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} />
                </div>
              )}

              {/* Analysis Complete */}
              {analysisResults && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Analysis complete!</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div>
              <h3 className="font-medium mb-2">Professional Summary</h3>
              <p className="text-muted-foreground">{analysisResults.summary}</p>
            </div>

            {/* Experience & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Experience</h3>
                <p className="text-2xl font-bold text-primary">
                  {analysisResults.experience_years} years
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Education</h3>
                <p className="text-lg font-medium">{analysisResults.education_level}</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-medium mb-3">Skills Identified</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResults.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Previous Roles */}
            <div>
              <h3 className="font-medium mb-3">Previous Roles</h3>
              <div className="space-y-2">
                {analysisResults.job_titles.map((title: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h3 className="font-medium mb-3">Key Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {analysisResults.strengths.map((strength: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}