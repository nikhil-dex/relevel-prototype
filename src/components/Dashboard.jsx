import React, { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Utensils, Target, CheckCircle } from 'lucide-react'

function Dashboard({ labData, recommendations }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const defaultRecommendations = [
    {
      id: 1,
      nutrient: 'Vitamin B12',
      foods: ['Salmon', 'Tuna', 'Eggs', 'Dairy products'],
      progress: 65,
      status: 'Low',
      dailyGoal: '2.4 µg',
      currentIntake: '1.6 µg'
    },
    {
      id: 2,
      nutrient: 'Vitamin D',
      foods: ['Fatty fish', 'Egg yolks', 'Fortified milk', 'Mushrooms'],
      progress: 45,
      status: 'Low',
      dailyGoal: '600 IU',
      currentIntake: '270 IU'
    },
    {
      id: 3,
      nutrient: 'Iron',
      foods: ['Red meat', 'Spinach', 'Legumes', 'Nuts'],
      progress: 75,
      status: 'Moderate',
      dailyGoal: '18 mg',
      currentIntake: '13.5 mg'
    }
  ]

  const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations

  const dailyMeals = [
    {
      meal: 'Breakfast',
      time: '8:00 AM',
      foods: ['Oatmeal with berries', 'Greek yogurt', 'Almonds'],
      nutrients: ['Iron', 'Vitamin D', 'Calcium']
    },
    {
      meal: 'Lunch',
      time: '12:30 PM',
      foods: ['Grilled salmon', 'Quinoa salad', 'Spinach'],
      nutrients: ['Vitamin B12', 'Iron', 'Magnesium']
    },
    {
      meal: 'Dinner',
      time: '7:00 PM',
      foods: ['Lean beef', 'Sweet potato', 'Broccoli'],
      nutrients: ['Iron', 'Vitamin B12', 'Vitamin D']
    }
  ]

  const weeklyProgress = [
    { day: 'Mon', progress: 75 },
    { day: 'Tue', progress: 82 },
    { day: 'Wed', progress: 68 },
    { day: 'Thu', progress: 91 },
    { day: 'Fri', progress: 79 },
    { day: 'Sat', progress: 85 },
    { day: 'Sun', progress: 88 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Low': return '#EF4444'
      case 'Moderate': return '#F59E0B'
      case 'Optimal': return '#10B981'
      default: return '#6B7280'
    }
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title">Your Nutrition Dashboard</h1>
          <p className="section-subtitle">
            Track your progress and stay on top of your daily nutrition goals
          </p>
        </div>

        {/* Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--beige-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--warm-yellow)'
            }}>
              <Target size={30} />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--deep-navy)',
              marginBottom: '8px'
            }}>
              {Math.round(displayRecommendations.reduce((acc, rec) => acc + rec.progress, 0) / displayRecommendations.length)}%
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Overall Progress
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--beige-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--warm-yellow)'
            }}>
              <Calendar size={30} />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--deep-navy)',
              marginBottom: '8px'
            }}>
              {new Date().getDate()}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Days Tracked
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--beige-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--warm-yellow)'
            }}>
              <Utensils size={30} />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--deep-navy)',
              marginBottom: '8px'
            }}>
              {dailyMeals.length}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Meals Today
            </p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {/* Left Column - Charts and Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Current vs Target Levels Chart */}
            <div className="card">
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--deep-navy)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <BarChart3 size={24} />
                Current vs Target Levels
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {displayRecommendations.map((rec) => (
                  <div key={rec.id}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontWeight: '600',
                        color: 'var(--deep-navy)'
                      }}>
                        {rec.nutrient}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)'
                      }}>
                        {rec.currentIntake} / {rec.dailyGoal}
                      </span>
                    </div>
                    
                    <div className="progress-bar" style={{ height: '12px' }}>
                      <div 
                        className="progress-fill"
                        style={{
                          width: `${rec.progress}%`,
                          backgroundColor: getStatusColor(rec.status)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="card">
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--deep-navy)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <TrendingUp size={24} />
                Weekly Progress
              </h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'end',
                gap: '8px',
                height: '120px',
                paddingTop: '20px'
              }}>
                {weeklyProgress.map((day, index) => (
                  <div key={index} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      height: `${day.progress}px`,
                      backgroundColor: 'var(--warm-yellow)',
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '8px',
                      transition: 'all 0.3s ease'
                    }} />
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      fontWeight: '600'
                    }}>
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Daily Tracker and Meals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Daily Intake Tracker */}
            <div className="card">
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--deep-navy)',
                marginBottom: '20px'
              }}>
                Daily Intake Tracker
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--deep-navy)',
                  marginBottom: '8px'
                }}>
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid var(--beige-light)',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'var(--white)'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {displayRecommendations.map((rec) => (
                  <div key={rec.id} style={{
                    padding: '16px',
                    backgroundColor: 'var(--beige-light)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontWeight: '600',
                        color: 'var(--deep-navy)'
                      }}>
                        {rec.nutrient}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)'
                      }}>
                        {rec.progress}%
                      </span>
                    </div>
                    
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{
                          width: `${rec.progress}%`,
                          backgroundColor: getStatusColor(rec.status)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Meals */}
            <div className="card">
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--deep-navy)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Utensils size={24} />
                Today's Meals
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {dailyMeals.map((meal, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    backgroundColor: 'var(--beige-light)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--deep-navy)'
                      }}>
                        {meal.meal}
                      </h4>
                      <span style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        fontWeight: '500'
                      }}>
                        {meal.time}
                      </span>
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                      {meal.foods.map((food, foodIndex) => (
                        <div key={foodIndex} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <CheckCircle size={16} style={{ color: 'var(--warm-yellow)' }} />
                          <span style={{
                            fontSize: '14px',
                            color: 'var(--deep-navy)'
                          }}>
                            {food}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      {meal.nutrients.map((nutrient, nutrientIndex) => (
                        <span key={nutrientIndex} style={{
                          backgroundColor: 'var(--warm-yellow)',
                          color: 'var(--deep-navy)',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {nutrient}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <button className="btn btn-primary" style={{ gap: '8px' }}>
            <Calendar size={20} />
            Log Today's Meals
          </button>
          
          <button className="btn btn-secondary" style={{ gap: '8px' }}>
            <TrendingUp size={20} />
            View Progress Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
