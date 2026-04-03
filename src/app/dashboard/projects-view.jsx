"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../../ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { 
  PlusIcon, 
  MoreVerticalIcon, 
  CalendarIcon, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  PencilIcon,
  Trash2Icon
} from "lucide-react"

const initialProjects = [
  {
    id: 1,
    title: "Brand Redesign",
    description: "Complete overhaul of the corporate branding including logo, color palette, and guidelines.",
    status: "active",
    progress: 75,
    dueDate: "2026-05-15",
  },
  {
    id: 2,
    title: "Mobile App V2",
    description: "Development of the second version of the iOS and Android applications.",
    status: "pending",
    progress: 10,
    dueDate: "2026-06-30",
  },
  {
    id: 3,
    title: "Q1 Marketing Campaign",
    description: "Execute the planned marketing initiatives for the first quarter.",
    status: "completed",
    progress: 100,
    dueDate: "2026-03-31",
  },
]

export function ProjectsView() {
  const [projects, setProjects] = useState(initialProjects)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    progress: 0,
    dueDate: "",
  })

  const openSheet = (project = null) => {
    if (project) {
      setEditingProject(project)
      setFormData(project)
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        description: "",
        status: "active",
        progress: 0,
        dueDate: "",
      })
    }
    setIsSheetOpen(true)
  }

  const closeSheet = () => {
    setIsSheetOpen(false)
    setEditingProject(null)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...formData, id: p.id } : p))
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }])
    }
    closeSheet()
  }

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-200 dark:border-blue-800'
      case 'completed': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-200 dark:border-green-800'
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-200 dark:border-yellow-800'
      default: return 'bg-gray-500/10 text-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <Clock className="w-3 h-3 mr-1" />
      case 'completed': return <CheckCircle2 className="w-3 h-3 mr-1" />
      case 'pending': return <AlertCircle className="w-3 h-3 mr-1" />
      default: return null
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto no-scrollbar max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your active projects here.</p>
        </div>
        <Button onClick={() => openSheet()} className="shrink-0 gap-2">
          <PlusIcon className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1.5 flex-1">
                  <Badge variant="outline" className={`uppercase text-[10px] tracking-wider mb-2 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    {project.status}
                  </Badge>
                  <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mr-2">
                      <MoreVerticalIcon className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openSheet(project)}>
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(project.id)}>
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2 min-h-[40px] mt-2">
                {project.description || "No description provided."}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pb-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-semibold">{Number(project.progress)}%</span>
                </div>
                <Progress value={Number(project.progress)} />
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t bg-muted/20 px-6 py-4 mt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Due {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'No date set'}
              </div>
            </CardFooter>
          </Card>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground">
            <h3 className="text-lg font-medium mb-1">No Projects Found</h3>
            <p className="text-sm mb-4">You have not created any projects yet.</p>
            <Button variant="outline" onClick={() => openSheet()}>Create your first project</Button>
          </div>
        )}
      </div>

      {/* Add / Edit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="flex flex-col sm:max-w-md w-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingProject ? 'Edit Project' : 'New Project'}</SheetTitle>
            <SheetDescription>
              {editingProject ? 'Update the details of your project.' : 'Add a new project to your workspace.'}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSave} className="flex-1 flex flex-col gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="e.g. Website Redesign"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Briefly describe the project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(val) => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="progress">Progress (%)</Label>
                <span className="text-xs text-muted-foreground">{formData.progress}%</span>
              </div>
              <input
                id="progress"
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <SheetFooter className="mt-auto">
              <Button type="button" variant="outline" onClick={closeSheet} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                {editingProject ? 'Save Changes' : 'Create Project'}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
