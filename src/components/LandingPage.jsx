import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, TrendingUp, Target, Users } from 'lucide-react'

function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: TrendingUp,
      title: 'Personalized Insights',
      description: 'Get tailored recommendations based on your unique lab results'
    },
    {
      icon: Target,
      title: 'Smart Meal Planning',
      description: 'AI-powered suggestions to optimize your nutrient intake'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Backed by nutrition science and medical research'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--deep-navy) 0%, var(--navy-light) 100%)',
        color: 'var(--white)',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '700',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            ReLevel: Personalized Nutrient Tracker
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--soft-beige)',
            marginBottom: '40px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            From Lab Reports to Daily Meals
          </p>
          
          <button
            onClick={() => navigate('/lab-report')}
            className="btn btn-primary"
            style={{
              fontSize: '18px',
              padding: '16px 32px',
              gap: '12px'
            }}
          >
            <Upload size={24} />
            Upload Report
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--white)'
      }}>
        <div className="container">
          <h2 className="section-title">Why Choose ReLevel?</h2>
          <p className="section-subtitle">
            Transform your health journey with data-driven nutrition insights
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginTop: '60px'
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--beige-light)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: 'var(--warm-yellow)'
                  }}>
                    <Icon size={40} />
                  </div>
                  
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'var(--deep-navy)',
                    marginBottom: '16px'
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--beige-light)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--deep-navy)',
            marginBottom: '24px'
          }}>
            Ready to Optimize Your Nutrition?
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Upload your lab report and get personalized recommendations in minutes
          </p>
          
          <button
            onClick={() => navigate('/lab-report')}
            className="btn btn-primary"
            style={{
              fontSize: '18px',
              padding: '16px 32px'
            }}
          >
            <Upload size={24} />
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
