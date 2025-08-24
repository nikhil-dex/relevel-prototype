import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, TrendingUp, Utensils, ArrowRight, CheckCircle } from 'lucide-react'

function Recommendations({ recommendations }) {
  const navigate = useNavigate()

  const defaultRecommendations = [
    {
      id: 1,
      nutrient: 'Vitamin B12',
      foods: ['Salmon', 'Tuna', 'Eggs', 'Dairy products', 'Fortified cereals'],
      progress: 65,
      status: 'Low',
      description: 'Your Vitamin B12 levels are below optimal. Focus on animal-based foods and fortified products.',
      dailyGoal: '2.4 µg',
      currentIntake: '1.6 µg'
    },
    {
      id: 2,
      nutrient: 'Vitamin D',
      foods: ['Fatty fish', 'Egg yolks', 'Fortified milk', 'Mushrooms', 'Sunlight exposure'],
      progress: 45,
      status: 'Low',
      description: 'Vitamin D deficiency detected. Increase fatty fish intake and consider safe sun exposure.',
      dailyGoal: '600 IU',
      currentIntake: '270 IU'
    },
    {
      id: 3,
      nutrient: 'Iron',
      foods: ['Red meat', 'Spinach', 'Legumes', 'Nuts', 'Dark chocolate'],
      progress: 75,
      status: 'Moderate',
      description: 'Iron levels are improving but could be optimized with more iron-rich foods.',
      dailyGoal: '18 mg',
      currentIntake: '13.5 mg'
    }
  ]

  const displayRecommendations = recommendations.length > 0 ? recommendations : defaultRecommendations

  const getStatusColor = (status) => {
    switch (status) {
      case 'Low': return '#EF4444'
      case 'Moderate': return '#F59E0B'
      case 'Optimal': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getProgressColor = (progress) => {
    if (progress < 50) return '#EF4444'
    if (progress < 80) return '#F59E0B'
    return '#10B981'
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title">Your Personalized Recommendations</h1>
          <p className="section-subtitle">
            Based on your lab results, here are the foods and nutrients to focus on
          </p>
        </div>

        {/* Summary Stats */}
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
              <Lightbulb size={30} />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--deep-navy)',
              marginBottom: '8px'
            }}>
              {displayRecommendations.length}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Areas to Focus On
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
              <TrendingUp size={30} />
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
              Average Progress
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
              {displayRecommendations.reduce((acc, rec) => acc + rec.foods.length, 0)}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Food Suggestions
            </p>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {displayRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="card">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'var(--deep-navy)',
                    marginBottom: '8px'
                  }}>
                    {recommendation.nutrient}
                  </h3>
                  <span style={{
                    backgroundColor: getStatusColor(recommendation.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {recommendation.status}
                  </span>
                </div>
                
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--beige-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--warm-yellow)'
                }}>
                  <CheckCircle size={30} />
                </div>
              </div>

              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                {recommendation.description}
              </p>

              {/* Progress Section */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--deep-navy)'
                  }}>
                    Progress
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}>
                    {recommendation.progress}%
                  </span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${recommendation.progress}%`,
                      backgroundColor: getProgressColor(recommendation.progress)
                    }}
                  />
                </div>
              </div>

              {/* Daily Intake */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: 'var(--beige-light)',
                borderRadius: '8px'
              }}>
                <div>
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    Current Intake
                  </span>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--deep-navy)',
                    margin: '4px 0 0 0'
                  }}>
                    {recommendation.currentIntake}
                  </p>
                </div>
                
                <div style={{
                  width: '2px',
                  height: '40px',
                  backgroundColor: 'var(--warm-yellow)'
                }} />
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    Daily Goal
                  </span>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--deep-navy)',
                    margin: '4px 0 0 0'
                  }}>
                    {recommendation.dailyGoal}
                  </p>
                </div>
              </div>

              {/* Food Suggestions */}
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--deep-navy)',
                  marginBottom: '16px'
                }}>
                  Recommended Foods
                </h4>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {recommendation.foods.map((food, index) => (
                    <span key={index} style={{
                      backgroundColor: 'var(--warm-yellow)',
                      color: 'var(--deep-navy)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'var(--white)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--deep-navy)',
            marginBottom: '16px'
          }}>
            Ready to Track Your Progress?
          </h3>
          
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Monitor your daily intake and see how your nutrition choices impact your health markers
          </p>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
            style={{
              fontSize: '18px',
              padding: '16px 32px',
              gap: '12px'
            }}
          >
            View Dashboard
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Recommendations
