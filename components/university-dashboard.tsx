"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data (you would replace this with actual data from your backend)
const classroomData = [
  { building: "A", roomNumber: "101", capacity: 30 },
  { building: "A", roomNumber: "102", capacity: 25 },
  { building: "B", roomNumber: "201", capacity: 40 },
  { building: "B", roomNumber: "202", capacity: 35 },
  { building: "C", roomNumber: "301", capacity: 50 },
]

const departmentData = [
  { name: "Computer Science", building: "A", budget: 500000, students: 300, instructors: 20 },
  { name: "Physics", building: "B", budget: 400000, students: 200, instructors: 15 },
  { name: "Mathematics", building: "A", budget: 300000, students: 250, instructors: 18 },
  { name: "Chemistry", building: "C", budget: 350000, students: 180, instructors: 14 },
  { name: "Biology", building: "C", budget: 450000, students: 220, instructors: 16 },
]

const courseData = [
  { id: "CS101", title: "Introduction to Programming", department: "Computer Science", credits: 3, students: 100 },
  { id: "CS201", title: "Data Structures", department: "Computer Science", credits: 4, students: 80 },
  { id: "PHYS101", title: "Mechanics", department: "Physics", credits: 4, students: 90 },
  { id: "MATH201", title: "Calculus", department: "Mathematics", credits: 4, students: 120 },
  { id: "CHEM101", title: "General Chemistry", department: "Chemistry", credits: 3, students: 85 },
]

const instructorData = [
  { id: "I001", name: "Dr. Smith", department: "Computer Science", salary: 90000, courses: 3 },
  { id: "I002", name: "Dr. Johnson", department: "Physics", salary: 85000, courses: 2 },
  { id: "I003", name: "Dr. Williams", department: "Mathematics", salary: 88000, courses: 4 },
  { id: "I004", name: "Dr. Brown", department: "Chemistry", salary: 87000, courses: 3 },
  { id: "I005", name: "Dr. Davis", department: "Biology", salary: 89000, courses: 3 },
]

const sectionData = [
  { courseId: "CS101", sectionId: "1", semester: "Fall", year: 2023, building: "A", roomNumber: "101", timeSlotId: "TS1" },
  { courseId: "CS201", sectionId: "1", semester: "Fall", year: 2023, building: "A", roomNumber: "102", timeSlotId: "TS2" },
  { courseId: "PHYS101", sectionId: "1", semester: "Fall", year: 2023, building: "B", roomNumber: "201", timeSlotId: "TS3" },
  { courseId: "MATH201", sectionId: "1", semester: "Fall", year: 2023, building: "A", roomNumber: "101", timeSlotId: "TS4" },
  { courseId: "CHEM101", sectionId: "1", semester: "Fall", year: 2023, building: "C", roomNumber: "301", timeSlotId: "TS5" },
]

const teachesData = [
  { instructorId: "I001", courseId: "CS101", sectionId: "1", semester: "Fall", year: 2023 },
  { instructorId: "I001", courseId: "CS201", sectionId: "1", semester: "Fall", year: 2023 },
  { instructorId: "I002", courseId: "PHYS101", sectionId: "1", semester: "Fall", year: 2023 },
  { instructorId: "I003", courseId: "MATH201", sectionId: "1", semester: "Fall", year: 2023 },
  { instructorId: "I004", courseId: "CHEM101", sectionId: "1", semester: "Fall", year: 2023 },
]

const studentData = [
  { id: "S001", name: "Alice", department: "Computer Science", totalCredits: 60 },
  { id: "S002", name: "Bob", department: "Physics", totalCredits: 45 },
  { id: "S003", name: "Charlie", department: "Mathematics", totalCredits: 75 },
  { id: "S004", name: "Diana", department: "Chemistry", totalCredits: 50 },
  { id: "S005", name: "Eva", department: "Biology", totalCredits: 55 },
]

const takesData = [
  { studentId: "S001", courseId: "CS101", sectionId: "1", semester: "Fall", year: 2023, grade: "A" },
  { studentId: "S002", courseId: "PHYS101", sectionId: "1", semester: "Fall", year: 2023, grade: "B" },
  { studentId: "S003", courseId: "MATH201", sectionId: "1", semester: "Fall", year: 2023, grade: "A" },
  { studentId: "S004", courseId: "CHEM101", sectionId: "1", semester: "Fall", year: 2023, grade: "B" },
  { studentId: "S005", courseId: "CS101", sectionId: "1", semester: "Fall", year: 2023, grade: "A" },
]

const advisorData = [
  { studentId: "S001", instructorId: "I001" },
  { studentId: "S002", instructorId: "I002" },
  { studentId: "S003", instructorId: "I003" },
  { studentId: "S004", instructorId: "I004" },
  { studentId: "S005", instructorId: "I005" },
]

const timeSlotData = [
  { id: "TS1", day: "Monday", startTime: "09:00", endTime: "10:30" },
  { id: "TS2", day: "Monday", startTime: "11:00", endTime: "12:30" },
  { id: "TS3", day: "Tuesday", startTime: "09:00", endTime: "10:30" },
  { id: "TS4", day: "Tuesday", startTime: "11:00", endTime: "12:30" },
  { id: "TS5", day: "Wednesday", startTime: "09:00", endTime: "10:30" },
]

const prereqData = [
  { courseId: "CS201", prereqId: "CS101" },
  { courseId: "PHYS101", prereqId: "MATH201" },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export  function UniversityDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedEntity, setSelectedEntity] = useState(null)

  const filteredCourses = selectedDepartment === "All" 
    ? courseData 
    : courseData.filter(course => course.department === selectedDepartment)

  const filteredInstructors = selectedDepartment === "All"
    ? instructorData
    : instructorData.filter(instructor => instructor.department === selectedDepartment)

  const filteredStudents = selectedDepartment === "All"
    ? studentData
    : studentData.filter(student => student.department === selectedDepartment)

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>University Data Visualization</CardTitle>
        <CardDescription>Explore university data using Shneiderman's visual information-seeking mantra</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="departments">
          <TabsList className="">
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="timeslots">Time Slots</TabsTrigger>
            <TabsTrigger value="teaches">Teaches</TabsTrigger>
            <TabsTrigger value="takes">Takes</TabsTrigger>
            <TabsTrigger value="advisors">Advisors</TabsTrigger>
            <TabsTrigger value="prereqs">Prerequisites</TabsTrigger>
          </TabsList>
          <TabsContent value="departments" className="flex justify-center items-center my-5">
            <ChartContainer
              config={{
                budget: {
                  label: "Budget",
                  color: "hsl(var(--chart-1))",
                },
                students: {
                  label: "Students",
                  color: "hsl(var(--chart-2))",
                },
                instructors: {
                  label: "Instructors",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[400px] "
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="var(--color-budget)" />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--color-students)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="budget" fill="var(--color-budget)" name="Budget ($)" />
                  <Bar yAxisId="right" dataKey="students" fill="var(--color-students)" name="Students" />
                  <Bar yAxisId="right" dataKey="instructors" fill="var(--color-instructors)" name="Instructors" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="courses" >
            <div className="mb-4">
              <Select onValueChange={setSelectedDepartment} defaultValue="All">
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  {[...new Set(courseData.map(course => course.department))].map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ChartContainer
              config={{
                students: {
                  label: "Students",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%" className=' '>
                <PieChart>
                  <Pie
                    data={filteredCourses}
                    dataKey="students"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {filteredCourses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {filteredCourses.map(course => (
                <Dialog key={course.id}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(course)}>
                      {course.id}: {course.title}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{course.title}</DialogTitle>
                      <DialogDescription>Course Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Course ID:</strong> {course.id}
                      </div>
                      <div>
                        <strong>Department:</strong> {course.department}
                      </div>
                      <div>
                        <strong>Credits:</strong> {course.credits}
                      </div>
                      <div>
                        <strong>Enrolled Students:</strong> {course.students}
                      </div>
                      <div>
                        <strong>Prerequisites:</strong> {prereqData.filter(p => p.courseId === course.id).map(p => p.prereqId).join(', ') || 'None'}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="instructors">
            <div className="mb-4">
              <Select onValueChange={setSelectedDepartment} defaultValue="All">
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  {[...new Set(instructorData.map(instructor => instructor.department))].map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ChartContainer
              
              config={{
                salary: {
                  label: "Salary",
                  color: "hsl(var(--chart-1))",
                },
                courses: {
                  label: "Courses",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="salary" name="Salary" unit="$" />
                  <YAxis type="number" dataKey="courses" name="Courses" />
                  <ZAxis type="category" dataKey="name" name="Name" />
                  <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                  <Scatter data={filteredInstructors} fill="var(--color-salary)" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {filteredInstructors.map(instructor => (
                <Dialog key={instructor.id}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(instructor)}>
                      {instructor.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{instructor.name}</DialogTitle>
                      <DialogDescription>Instructor Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Instructor ID:</strong> {instructor.id}
                      </div>
                      <div>
                        <strong>Department:</strong> {instructor.department}
                      </div>
                      <div>
                        <strong>Salary:</strong> ${instructor.salary.toLocaleString()}
                      </div>
                      <div>
                        <strong>Courses Taught:</strong> {instructor.courses}
                      </div>
                      <div>
                        <strong>Advisees:</strong> {advisorData.filter(a => a.instructorId === instructor.id).map(a => a.studentId).join(', ')}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="students">
            <div className="mb-4">
              <Select onValueChange={setSelectedDepartment} defaultValue="All">
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  {[...new Set(studentData.map(student => student.department))].map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ChartContainer
              config={{
                totalCredits: {
                  label: "Total Credits",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredStudents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="totalCredits" fill="var(--color-totalCredits)" name="Total Credits" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {filteredStudents.map(student => (
                <Dialog key={student.id}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(student)}>
                      {student.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{student.name}</DialogTitle>
                      <DialogDescription>Student Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Student ID:</strong> {student.id}
                      </div>
                      <div>
                        <strong>Department:</strong> {student.department}
                      </div>
                      <div>
                        <strong>Total Credits:</strong> {student.totalCredits}
                      </div>
                      <div>
                        <strong>Advisor:</strong> {advisorData.find(a => a.studentId === student.id)?.instructorId || 'Not assigned'}
                      </div>
                      <div>
                        <strong>Courses Taken:</strong>
                        <ul>
                          {takesData.filter(t => t.studentId === student.id).map(t => (
                            <li key={`${t.courseId}-${t.sectionId}`}>
                              {t.courseId} (Grade: {t.grade})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="classrooms">
            <ChartContainer
              config={{
                capacity: {
                  label: "Capacity",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classroomData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="roomNumber" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="capacity" fill="var(--color-capacity)" name="Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {classroomData.map(classroom => (
                <Dialog key={`${classroom.building}-${classroom.roomNumber}`}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(classroom)}>
                      {classroom.building}-{classroom.roomNumber}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Classroom {classroom.building}-{classroom.roomNumber}</DialogTitle>
                      <DialogDescription>Classroom Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Building:</strong> {classroom.building}
                      </div>
                      <div>
                        <strong>Room Number:</strong> {classroom.roomNumber}
                      </div>
                      <div>
                        <strong>Capacity:</strong> {classroom.capacity}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sections">
            <ChartContainer
              config={{
                sections: {
                  label: "Sections",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectionData}
                    dataKey="sectionId"
                    nameKey="courseId"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {sectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {sectionData.map(section => (
                <Dialog key={`${section.courseId}-${section.sectionId}`}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(section)}>
                      {section.courseId}-{section.sectionId}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Section {section.courseId}-{section.sectionId}</DialogTitle>
                      <DialogDescription>Section Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Course ID:</strong> {section.courseId}
                      </div>
                      <div>
                        <strong>Section ID:</strong> {section.sectionId}
                      </div>
                      <div>
                        <strong>Semester:</strong> {section.semester} {section.year}
                      </div>
                      <div>
                        <strong>Location:</strong> {section.building}-{section.roomNumber}
                      </div>
                      <div>
                        <strong>Time Slot:</strong> {section.timeSlotId}
                      </div>
                      <div>
                        <strong>Instructor:</strong> {teachesData.find(t => t.courseId === section.courseId && t.sectionId === section.sectionId)?.instructorId || 'Not assigned'}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="timeslots">
            <ChartContainer
              config={{
                duration: {
                  label: "Duration (minutes)",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSlotData.map(ts => ({
                  ...ts,
                  duration: (new Date(`2000-01-01T${ts.endTime}:00`) - new Date(`2000-01-01T${ts.startTime}:00`)) / 60000
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="duration" fill="var(--color-duration)" name="Duration (minutes)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {timeSlotData.map(timeSlot => (
                <Dialog key={timeSlot.id}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(timeSlot)}>
                      {timeSlot.id}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Time Slot {timeSlot.id}</DialogTitle>
                      <DialogDescription>Time Slot Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Time Slot ID:</strong> {timeSlot.id}
                      </div>
                      <div>
                        <strong>Day:</strong> {timeSlot.day}
                      </div>
                      <div>
                        <strong>Start Time:</strong> {timeSlot.startTime}
                      </div>
                      <div>
                        <strong>End Time:</strong> {timeSlot.endTime}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="teaches">
            <ChartContainer
              config={{
                courses: {
                  label: "Courses Taught",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instructorData.map(instructor => ({
                  ...instructor,
                  coursesTaught: teachesData.filter(t => t.instructorId === instructor.id).length
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="coursesTaught" fill="var(--color-courses)" name="Courses Taught" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {teachesData.map(teaches => (
                <Dialog key={`${teaches.instructorId}-${teaches.courseId}-${teaches.sectionId}`}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(teaches)}>
                      {teaches.instructorId}: {teaches.courseId}-{teaches.sectionId}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Teaching Assignment</DialogTitle>
                      <DialogDescription>Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Instructor:</strong> {instructorData.find(i => i.id === teaches.instructorId)?.name || teaches.instructorId}
                      </div>
                      <div>
                        <strong>Course:</strong> {courseData.find(c => c.id === teaches.courseId)?.title || teaches.courseId}
                      </div>
                      <div>
                        <strong>Section:</strong> {teaches.sectionId}
                      </div>
                      <div>
                        <strong>Semester:</strong> {teaches.semester} {teaches.year}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="takes">
  <ChartContainer
    config={{
      students: {
        label: "Students",
        color: "hsl(var(--chart-1))",
      },
    }}
    className="h-[400px] mx-auto"
  >
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={courseData.map(course => ({
        ...course,
        enrolledStudents: takesData.filter(t => t.courseId === course.id).length
      }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="enrolledStudents" fill="var(--color-students)" name="Enrolled Students" />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
  <div className="mt-4 grid grid-cols-2 gap-2">
    {takesData.map(takes => (
      <Dialog key={`${takes.studentId}-${takes.courseId}-${takes.sectionId}`}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setSelectedEntity(takes)}>
            {takes.studentId}: {takes.courseId}-{takes.sectionId}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Enrollment</DialogTitle>
            <DialogDescription>Details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <strong>Student:</strong> {studentData.find(s => s.id === takes.studentId)?.name || takes.studentId}
            </div>
            <div>
              <strong>Course:</strong> {courseData.find(c => c.id === takes.courseId)?.title || takes.courseId}
            </div>
            <div>
              <strong>Section:</strong> {takes.sectionId}
            </div>
            <div>
              <strong>Semester:</strong> {takes.semester} {takes.year}
            </div>
            <div>
              <strong>Grade:</strong> {takes.grade}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    ))}
  </div>
</TabsContent>
          <TabsContent value="advisors">
            <ChartContainer
              config={{
                advisees: {
                  label: "Advisees",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instructorData.map(instructor => ({
                  ...instructor,
                  adviseeCount: advisorData.filter(a => a.instructorId === instructor.id).length
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="adviseeCount" fill="var(--color-advisees)" name="Number of Advisees" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {advisorData.map(advisor => (
                <Dialog key={`${advisor.studentId}-${advisor.instructorId}`}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(advisor)}>
                      {advisor.studentId} - {advisor.instructorId}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Advisor-Advisee Relationship</DialogTitle>
                      <DialogDescription>Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Student:</strong> {studentData.find(s => s.id === advisor.studentId)?.name || advisor.studentId}
                      </div>
                      <div>
                        <strong>Advisor:</strong> {instructorData.find(i => i.id === advisor.instructorId)?.name || advisor.instructorId}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="prereqs">
            <ChartContainer
              config={{
                prereqCount: {
                  label: "Prerequisites",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseData.map(course => ({
                  ...course,
                  prereqCount: prereqData.filter(p => p.courseId === course.id).length
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="prereqCount" fill="var(--color-prereqCount)" name="Number of Prerequisites" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {prereqData.map(prereq => (
                <Dialog key={`${prereq.courseId}-${prereq.prereqId}`}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedEntity(prereq)}>
                      {prereq.courseId} requires {prereq.prereqId}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Prerequisite Relationship</DialogTitle>
                      <DialogDescription>Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <strong>Course:</strong> {courseData.find(c => c.id === prereq.courseId)?.title || prereq.courseId}
                      </div>
                      <div>
                        <strong>Prerequisite:</strong> {courseData.find(c => c.id === prereq.prereqId)?.title || prereq.prereqId}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}