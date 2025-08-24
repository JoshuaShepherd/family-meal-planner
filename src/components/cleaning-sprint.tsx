'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

type CleaningTask = {
  id: string
  text: string
  points: number
  completed: boolean
  completedBy?: string
}

type Player = {
  name: string
  score: number
  tasksCompleted: number
  emoji: string
}

type GamePhase = 'setup' | 'planning' | 'active' | 'celebration'

const SPRINT_DURATION = 25 * 60 // 25 minutes in seconds
const TASK_POINTS = {
  quick: 10,    // 1-5 min tasks
  medium: 25,   // 5-15 min tasks  
  heavy: 50     // 15+ min tasks
}

export function CleaningSprint() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup')
  const [players, setPlayers] = useState<Player[]>([
    { name: '', score: 0, tasksCompleted: 0, emoji: '🧹' },
    { name: '', score: 0, tasksCompleted: 0, emoji: '🧽' }
  ])
  const [tasks, setTasks] = useState<CleaningTask[]>([])
  const [newTask, setNewTask] = useState('')
  const [selectedPoints, setSelectedPoints] = useState<number>(TASK_POINTS.quick)
  const [timeRemaining, setTimeRemaining] = useState(SPRINT_DURATION)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerActive(false)
            setGamePhase('celebration')
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isTimerActive, timeRemaining])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const updatePlayerName = (index: number, name: string) => {
    setPlayers(prev => prev.map((player, i) => 
      i === index ? { ...player, name } : player
    ))
  }

  const addTask = () => {
    if (newTask.trim()) {
      const task: CleaningTask = {
        id: Date.now().toString(),
        text: newTask.trim(),
        points: selectedPoints,
        completed: false
      }
      setTasks(prev => [...prev, task])
      setNewTask('')
    }
  }

  const completeTask = (taskId: string, playerName: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, completedBy: playerName }
        : task
    ))
    
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      setPlayers(prev => prev.map(player => 
        player.name === playerName
          ? { 
              ...player, 
              score: player.score + task.points,
              tasksCompleted: player.tasksCompleted + 1
            }
          : player
      ))
    }
  }

  const startSprint = () => {
    setIsTimerActive(true)
    setGamePhase('active')
  }

  const resetGame = () => {
    setGamePhase('setup')
    setTasks([])
    setTimeRemaining(SPRINT_DURATION)
    setIsTimerActive(false)
    setPlayers(prev => prev.map(player => ({ 
      ...player, 
      score: 0, 
      tasksCompleted: 0 
    })))
  }

  const getTaskIcon = (points: number) => {
    if (points === TASK_POINTS.quick) return '⚡'
    if (points === TASK_POINTS.medium) return '💪'
    return '🏋️‍♀️'
  }

  const totalScore = players.reduce((sum, player) => sum + player.score, 0)
  const totalTasks = players.reduce((sum, player) => sum + player.tasksCompleted, 0)
  const winner = players.reduce((prev, current) => 
    current.score > prev.score ? current : prev
  )

  // Setup Phase
  if (gamePhase === 'setup') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🏠 Cleaning Sprint Challenge
          </h1>
          <p className="text-gray-600">Gamified Pomodoro cleaning for couples</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>👫 Player Setup</CardTitle>
            <CardDescription>Enter your names to start the challenge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-2xl">{player.emoji}</span>
                <Input
                  placeholder={`Player ${index + 1} name`}
                  value={player.name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="flex-1"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => setGamePhase('planning')} 
            disabled={players.some(p => !p.name.trim())}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Start Planning Sprint 🚀
          </Button>
        </div>
      </div>
    )
  }

  // Planning Phase
  if (gamePhase === 'planning') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">📋 Task Planning</h2>
          <p className="text-gray-600">Add tasks before starting your 25-minute cleaning sprint</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>➕ Add New Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="e.g., Clean bathroom sink"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Task Difficulty:</p>
                <div className="flex gap-2">
                  {[
                    { value: TASK_POINTS.quick, label: 'Quick', icon: '⚡' },
                    { value: TASK_POINTS.medium, label: 'Medium', icon: '💪' },
                    { value: TASK_POINTS.heavy, label: 'Heavy', icon: '🏋️‍♀️' }
                  ].map(({ value, label, icon }) => (
                    <Button
                      key={value}
                      variant={selectedPoints === value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPoints(value)}
                      className="flex-1"
                    >
                      {icon} {label} ({value}pts)
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={addTask} className="w-full">
                Add Task
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📝 Task List ({tasks.length} tasks)</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No tasks added yet</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span>{getTaskIcon(task.points)}</span>
                        <span className="text-sm">{task.text}</span>
                      </div>
                      <Badge variant="secondary">{task.points}pts</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={startSprint} 
            disabled={tasks.length === 0}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Start 25-Minute Sprint! 🏃‍♀️🏃‍♂️
          </Button>
        </div>
      </div>
    )
  }

  // Active Sprint Phase
  if (gamePhase === 'active') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Timer Header */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-green-600 mb-2">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-xl text-gray-600">Cleaning Sprint in Progress!</p>
        </div>

        {/* Player Scores */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {players.map((player, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">{player.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{player.name}</h3>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {player.score} points
                </div>
                <div className="text-sm text-gray-600">
                  {player.tasksCompleted} tasks completed
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle>🎯 Available Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getTaskIcon(task.points)}</span>
                      <span className={task.completed ? 'line-through text-gray-500' : ''}>
                        {task.text}
                      </span>
                      <Badge variant={task.completed ? 'secondary' : 'default'}>
                        {task.points}pts
                      </Badge>
                    </div>
                    
                    {task.completed ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">
                          ✅ Completed by {task.completedBy}
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        {players.map(player => (
                          <Button
                            key={player.name}
                            size="sm"
                            onClick={() => completeTask(task.id, player.name)}
                            className="text-xs"
                          >
                            {player.emoji} {player.name} Done!
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Celebration Phase
  if (gamePhase === 'celebration') {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">🎉 Sprint Complete! 🎉</h1>
          <p className="text-xl text-gray-600">Amazing teamwork!</p>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">🏆 Individual Results</h3>
            <div className="space-y-4">
              {players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                <div key={player.name} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {index === 0 && <span className="text-2xl">👑</span>}
                    <span className="text-2xl">{player.emoji}</span>
                    <div>
                      <div className="font-bold">{player.name}</div>
                      <div className="text-sm text-gray-600">
                        {player.tasksCompleted} tasks
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-purple-600">
                    {player.score} pts
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">📊 Team Stats</h3>
            <div className="space-y-4 text-left">
              <div className="flex justify-between">
                <span>Total Points Earned:</span>
                <span className="font-bold text-green-600">{totalScore}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Tasks Completed:</span>
                <span className="font-bold text-blue-600">{totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span>Completion Rate:</span>
                <span className="font-bold text-purple-600">
                  {Math.round((totalTasks / tasks.length) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sprint Champion:</span>
                <span className="font-bold text-yellow-600">
                  {winner.emoji} {winner.name}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Celebration Messages */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-2">🌟 Celebration Time!</h3>
          <p className="text-lg">
            {totalScore >= 200 && "Incredible cleaning power! Your home is sparkling! ✨"}
            {totalScore >= 100 && totalScore < 200 && "Great teamwork! You're cleaning champions! 🏆"}
            {totalScore < 100 && "Every bit of progress counts! Keep up the momentum! 💪"}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={resetGame}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            🔄 New Sprint
          </Button>
          <Button 
            onClick={() => setGamePhase('planning')}
            variant="outline"
            size="lg"
          >
            📋 Add More Tasks
          </Button>
        </div>
      </div>
    )
  }

  return null
}
