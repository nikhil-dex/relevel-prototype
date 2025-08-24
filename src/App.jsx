import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LabReportInput from './components/LabReportInput'
import Recommendations from './components/Recommendations'
import Dashboard from './components/Dashboard'
import { Upload, BarChart3, Lightbulb, Home } from 'lucide-react'

function App() {
  const [labData, setLabData] = useState({
    vitaminB12: 0,
    vitaminD: 0,
    iron: 0,
    calcium: 0,
    magnesium: 0
  })

  const [recommendations, setRecommendations] = useState([])

  const updateLabData = (newData) => {
    setLabData(newData)
    // Generate recommendations based on lab data
    generateRecommendations(newData)
  }

  const generateRecommendations = (data) => {
    const newRecommendations = []
    
    if (data.vitaminB12 < 200) {
      newRecommendations.push({
        id: 1,
        nutrient: 'Vitamin B12',
        foods: ['Salmon', 'Tuna', 'Eggs', 'Dairy products'],
        progress: Math.min((data.vitaminB12 / 200) * 100, 100)
      })
    }
    
    if (data.vitaminD < 30) {
      newRecommendations.push({
        id: 2,
        nutrient: 'Vitamin D',
        foods: ['Fatty fish', 'Egg yolks', 'Fortified milk', 'Mushrooms'],
        progress: Math.min((data.vitaminD / 30) * 100, 100)
      })
    }
    
    if (data.iron < 60) {
      newRecommendations.push({
        id: 3,
        nutrient: 'Iron',
        foods: ['Red meat', 'Spinach', 'Legumes', 'Nuts'],
        progress: Math.min((data.iron / 60) * 100, 100)
      })
    }
    
    setRecommendations(newRecommendations)
  }

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/lab-report" 
          element={<LabReportInput labData={labData} onUpdate={updateLabData} />} 
        />
        <Route 
          path="/recommendations" 
          element={<Recommendations recommendations={recommendations} />} 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard labData={labData} recommendations={recommendations} />} 
        />
      </Routes>
    </div>
  )
}

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/lab-report', label: 'Upload Report', icon: Upload },
    { path: '/recommendations', label: 'Recommendations', icon: Lightbulb },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 }
  ]

  return (
    <nav style={{
      backgroundColor: 'var(--deep-navy)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-medium)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div 
            onClick={() => navigate('/')}
            style={{
              color: 'var(--warm-yellow)',
              fontSize: '24px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            ReLevel
          </div>
          
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="btn"
                  style={{
                    backgroundColor: isActive ? 'var(--warm-yellow)' : 'transparent',
                    color: isActive ? 'var(--deep-navy)' : 'var(--white)',
                    border: isActive ? 'none' : '1px solid var(--warm-yellow)',
                    padding: '8px 16px',
                    fontSize: '14px'
                  }}
                >
                  <Icon size={16} />
                  <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default App
