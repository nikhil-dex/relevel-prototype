import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, CheckCircle, ArrowRight, ChevronDown, X } from 'lucide-react'

function LabReportInput({ labData, onUpdate }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    selectedNutrient: '',
    currentValue: '',
    currentUnit: '',
    targetMin: '',
    targetMax: '',
    targetUnit: '',
    desiredIntake: []
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const nutrientOptions = [
    { value: 'vitaminB12', label: 'Vitamin B12', units: ['pg/mL', 'ng/L', 'pmol/L', 'ng/dL', 'µg/L'] },
    { value: 'vitaminD', label: 'Vitamin D', units: ['ng/mL', 'nmol/L', 'IU/L', 'µg/L', 'pg/mL'] },
    { value: 'iron', label: 'Iron', units: ['µg/dL', 'mg/L', 'µmol/L', 'mg/dL', 'g/L', 'ng/mL'] },
    { value: 'calcium', label: 'Calcium', units: ['mg/dL', 'mmol/L', 'mEq/L', 'g/L', 'µg/mL', 'ng/mL'] },
    { value: 'magnesium', label: 'Magnesium', units: ['mg/dL', 'mmol/L', 'mEq/L', 'g/L', 'µg/mL', 'ng/mL'] },
    { value: 'folate', label: 'Folate', units: ['ng/mL', 'nmol/L', 'µg/L', 'mg/L', 'pg/mL'] },
    { value: 'zinc', label: 'Zinc', units: ['µg/dL', 'mg/L', 'µmol/L', 'mg/dL', 'g/L', 'ng/mL'] },
    { value: 'selenium', label: 'Selenium', units: ['µg/L', 'ng/mL', 'µmol/L', 'mg/L', 'g/L'] },
    { value: 'vitaminC', label: 'Vitamin C', units: ['mg/dL', 'µmol/L', 'g/L', 'µg/mL', 'ng/mL'] },
    { value: 'vitaminE', label: 'Vitamin E', units: ['mg/dL', 'µmol/L', 'g/L', 'µg/mL', 'ng/mL'] },
    { value: 'vitaminK', label: 'Vitamin K', units: ['ng/mL', 'µmol/L', 'µg/L', 'mg/L', 'pg/mL'] },
    { value: 'vitaminA', label: 'Vitamin A', units: ['µg/dL', 'µmol/L', 'IU/L', 'mg/L', 'ng/mL'] }
  ]

  // Comprehensive list of all available units
  const allUnits = [
    'pg/mL', 'ng/mL', 'µg/mL', 'mg/mL', 'g/mL',
    'pg/dL', 'ng/dL', 'µg/dL', 'mg/dL', 'g/dL',
    'pg/L', 'ng/L', 'µg/L', 'mg/L', 'g/L',
    'pmol/L', 'nmol/L', 'µmol/L', 'mmol/L', 'mol/L',
    'mEq/L', 'IU/L', 'U/L', 'kU/L'
  ]

  const intakeOptions = [
    'Milk', 'Eggs', 'Fish', 'Meat', 'Poultry', 'Legumes', 'Nuts', 'Seeds',
    'Whole Grains', 'Leafy Greens', 'Fruits', 'Vegetables', 'Dairy Products',
    'Fortified Foods', 'Supplements', 'Sunlight Exposure', 'Shellfish', 'Liver',
    'Mushrooms', 'Sweet Potatoes', 'Carrots', 'Spinach', 'Kale', 'Broccoli',
    'Oranges', 'Strawberries', 'Almonds', 'Walnuts', 'Chia Seeds', 'Flax Seeds'
  ]

  const [dropdownsOpen, setDropdownsOpen] = useState({
    nutrient: false,
    currentUnit: false,
    targetUnit: false,
    intake: false
  })

  const dropdownRefs = {
    nutrient: useRef(null),
    currentUnit: useRef(null),
    targetUnit: useRef(null),
    intake: useRef(null)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs).forEach(key => {
        if (dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
          setDropdownsOpen(prev => ({ ...prev, [key]: false }))
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
    
    // Clear errors when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  const toggleDropdown = (dropdownName) => {
    setDropdownsOpen(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }))
  }

  const selectOption = (dropdownName, value) => {
    if (dropdownName === 'selectedNutrient') {
      // Reset units when nutrient changes
      setFormData(prev => ({
        ...prev,
        selectedNutrient: value,
        currentUnit: '',
        targetUnit: ''
      }))
    } else {
      handleInputChange(dropdownName, value)
    }
    
    setDropdownsOpen(prev => ({
      ...prev,
      [dropdownName]: false
    }))
  }

  const toggleIntakeOption = (option) => {
    setFormData(prev => ({
      ...prev,
      desiredIntake: prev.desiredIntake.includes(option)
        ? prev.desiredIntake.filter(item => item !== option)
        : [...prev.desiredIntake, option]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.selectedNutrient) {
      newErrors.selectedNutrient = 'Please select a nutrient to track'
    }
    
    if (!formData.currentValue || parseFloat(formData.currentValue) <= 0) {
      newErrors.currentValue = 'Please enter a valid current value'
    }
    
    if (!formData.currentUnit) {
      newErrors.currentUnit = 'Please select a unit for current value'
    }
    
    if (!formData.targetMin || parseFloat(formData.targetMin) <= 0) {
      newErrors.targetMin = 'Please enter a valid minimum target'
    }
    
    if (!formData.targetMax || parseFloat(formData.targetMax) <= 0) {
      newErrors.targetMax = 'Please enter a valid maximum target'
    }
    
    if (parseFloat(formData.targetMin) >= parseFloat(formData.targetMax)) {
      newErrors.targetRange = 'Minimum target must be less than maximum target'
    }
    
    if (!formData.targetUnit) {
      newErrors.targetUnit = 'Please select a unit for target range'
    }
    
    if (formData.desiredIntake.length === 0) {
      newErrors.desiredIntake = 'Please select at least one food/supplement option'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploading(true)
      // Simulate file processing
      setTimeout(() => {
        setIsUploading(false)
        setUploadSuccess(true)
        // Auto-fill with sample data for demo
        const sampleData = {
          selectedNutrient: 'vitaminB12',
          currentValue: '180',
          currentUnit: 'pg/mL',
          targetMin: '200',
          targetMax: '900',
          targetUnit: 'pg/mL',
          desiredIntake: ['Salmon', 'Tuna', 'Eggs', 'Dairy products']
        }
        setFormData(sampleData)
        setErrors({})
      }, 2000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    // Convert form data to the expected format
    const convertedData = {
      [formData.selectedNutrient]: parseFloat(formData.currentValue) || 0
    }
    onUpdate(convertedData)
    navigate('/recommendations')
  }

  const getSelectedNutrientInfo = () => {
    return nutrientOptions.find(n => n.value === formData.selectedNutrient)
  }

  const selectedNutrientInfo = getSelectedNutrientInfo()

  // Get units to display - prioritize nutrient-specific units, then show all units
  const getUnitsToDisplay = (dropdownName) => {
    if (selectedNutrientInfo && selectedNutrientInfo.units) {
      // Show nutrient-specific units first, then all other units
      const specificUnits = selectedNutrientInfo.units
      const otherUnits = allUnits.filter(unit => !specificUnits.includes(unit))
      return [...specificUnits, ...otherUnits]
    }
    return allUnits
  }

  const renderDropdown = (dropdownName, options, placeholder, selectedValue, onSelect) => (
    <div ref={dropdownRefs[dropdownName]} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => toggleDropdown(dropdownName)}
        style={{
          width: '100%',
          padding: '12px',
          border: `2px solid ${errors[dropdownName] ? '#EF4444' : 'var(--beige-light)'}`,
          borderRadius: '8px',
          fontSize: '16px',
          backgroundColor: 'var(--white)',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'border-color 0.3s ease'
        }}
      >
        {selectedValue || placeholder}
        <ChevronDown size={20} style={{ 
          transform: dropdownsOpen[dropdownName] ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }} />
      </button>
      
      {dropdownsOpen[dropdownName] && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--white)',
          border: '2px solid var(--beige-light)',
          borderRadius: '8px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: 'var(--shadow-medium)',
          marginTop: '4px'
        }}>
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={typeof option === 'object' ? option.value : option}
                onClick={() => onSelect(option)}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--beige-light)',
                  transition: 'background-color 0.2s ease',
                  ':hover': { backgroundColor: 'var(--beige-light)' }
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--beige-light)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                {typeof option === 'object' ? option.label : option}
              </div>
            ))
          ) : (
            <div style={{
              padding: '12px',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              No options available
            </div>
          )}
        </div>
      )}
      
      {errors[dropdownName] && (
        <span style={{
          color: '#EF4444',
          fontSize: '12px',
          marginTop: '4px',
          display: 'block'
        }}>
          {errors[dropdownName]}
        </span>
      )}
    </div>
  )

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title">Upload Your Lab Report</h1>
          <p className="section-subtitle">
            Get personalized nutrition recommendations based on your blood work results
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* File Upload Section */}
          <div className="card">
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'var(--deep-navy)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FileText size={24} />
              Upload Lab Report
            </h3>

            <div style={{
              border: '2px dashed var(--warm-yellow)',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--beige-light)',
              marginBottom: '24px'
            }}>
              {!uploadSuccess ? (
                <>
                  <Upload size={48} style={{ color: 'var(--warm-yellow)', marginBottom: '16px' }} />
                  <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    {isUploading ? 'Processing your report...' : 'Drag & drop your lab report here or click to browse'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="file-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="file-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
                    {isUploading ? 'Processing...' : 'Choose File'}
                  </label>
                </>
              ) : (
                <div style={{ color: 'var(--warm-yellow)' }}>
                  <CheckCircle size={48} style={{ marginBottom: '16px' }} />
                  <p style={{ color: 'var(--deep-navy)', fontWeight: '600' }}>
                    Report uploaded successfully!
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Sample data has been filled in below
                  </p>
                </div>
              )}
            </div>

            <div style={{
              backgroundColor: 'var(--beige-light)',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              <strong>Supported formats:</strong> PDF, JPG, PNG, DOC, DOCX
              <br />
              <strong>File size:</strong> Up to 10MB
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="card">
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'var(--deep-navy)',
              marginBottom: '24px'
            }}>
              Enter Lab Values
            </h3>

            <form onSubmit={handleSubmit}>
              {/* 1. Which nutrient to track? */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: 'var(--deep-navy)',
                  marginBottom: '8px'
                }}>
                  1. Which nutrient to track?
                </label>
                
                {renderDropdown(
                  'nutrient',
                  nutrientOptions,
                  'Select a nutrient',
                  selectedNutrientInfo?.label,
                  (nutrient) => selectOption('selectedNutrient', nutrient.value)
                )}
              </div>

              {/* 2. Current report value */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: 'var(--deep-navy)',
                  marginBottom: '8px'
                }}>
                  2. Current report value
                </label>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.currentValue}
                      onChange={(e) => handleInputChange('currentValue', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `2px solid ${errors.currentValue ? '#EF4444' : 'var(--beige-light)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        backgroundColor: 'var(--white)',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="Enter value"
                    />
                    {errors.currentValue && (
                      <span style={{
                        color: '#EF4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block'
                      }}>
                        {errors.currentValue}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ minWidth: '120px' }}>
                    {renderDropdown(
                      'currentUnit',
                      getUnitsToDisplay('currentUnit'),
                      'Unit',
                      formData.currentUnit,
                      (unit) => selectOption('currentUnit', unit)
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Target range */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: 'var(--deep-navy)',
                  marginBottom: '8px'
                }}>
                  3. Target range
                </label>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.targetMin}
                      onChange={(e) => handleInputChange('targetMin', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `2px solid ${errors.targetMin ? '#EF4444' : 'var(--beige-light)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        backgroundColor: 'var(--white)',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="Min"
                    />
                    {errors.targetMin && (
                      <span style={{
                        color: '#EF4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block'
                      }}>
                        {errors.targetMin}
                      </span>
                    )}
                  </div>
                  
                  <span style={{ 
                    color: 'var(--text-secondary)', 
                    fontWeight: '600',
                    marginTop: '12px'
                  }}>
                    to
                  </span>
                  
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.targetMax}
                      onChange={(e) => handleInputChange('targetMax', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `2px solid ${errors.targetMax ? '#EF4444' : 'var(--beige-light)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        backgroundColor: 'var(--white)',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="Max"
                    />
                    {errors.targetMax && (
                      <span style={{
                        color: '#EF4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block'
                      }}>
                        {errors.targetMax}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ minWidth: '120px' }}>
                    {renderDropdown(
                      'targetUnit',
                      getUnitsToDisplay('targetUnit'),
                      'Unit',
                      formData.targetUnit,
                      (unit) => selectOption('targetUnit', unit)
                    )}
                  </div>
                </div>
                
                {errors.targetRange && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block'
                  }}>
                    {errors.targetRange}
                  </span>
                )}
              </div>

              {/* 4. Choose desired nutrient intake */}
              <div style={{ marginBottom: '32px', position: 'relative' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: 'var(--deep-navy)',
                  marginBottom: '8px'
                }}>
                  4. Choose desired nutrient intake
                </label>
                
                <div style={{
                  border: `2px solid ${errors.desiredIntake ? '#EF4444' : 'var(--beige-light)'}`,
                  borderRadius: '8px',
                  padding: '12px',
                  backgroundColor: 'var(--white)',
                  minHeight: '120px',
                  transition: 'border-color 0.3s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    {formData.desiredIntake.map((item, index) => (
                      <span key={index} style={{
                        backgroundColor: 'var(--warm-yellow)',
                        color: 'var(--deep-navy)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {item}
                        <button
                          type="button"
                          onClick={() => toggleIntakeOption(item)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--deep-navy)',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(30, 42, 56, 0.1)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => toggleDropdown('intake')}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '2px dashed var(--warm-yellow)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: 'transparent',
                      color: 'var(--warm-yellow)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--warm-yellow)'
                      e.target.style.color = 'var(--deep-navy)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = 'var(--warm-yellow)'
                    }}
                  >
                    Add food/supplement options
                    <ChevronDown size={20} style={{ 
                      transform: dropdownsOpen.intake ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }} />
                  </button>
                </div>
                
                {/* Food/Supplement Dropdown - Positioned above the button */}
                {dropdownsOpen.intake && (
                  <div ref={dropdownRefs.intake} style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--white)',
                    border: '2px solid var(--beige-light)',
                    borderRadius: '8px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: 'var(--shadow-medium)',
                    marginBottom: '8px'
                  }}>
                    {intakeOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => toggleIntakeOption(option)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: '1px solid var(--beige-light)',
                          backgroundColor: formData.desiredIntake.includes(option) ? 'var(--beige-light)' : 'transparent',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!formData.desiredIntake.includes(option)) {
                            e.target.style.backgroundColor = 'var(--beige-light)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!formData.desiredIntake.includes(option)) {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                
                {errors.desiredIntake && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block'
                  }}>
                    {errors.desiredIntake}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  gap: '12px',
                  opacity: (!formData.selectedNutrient || !formData.currentValue || !formData.currentUnit || 
                           !formData.targetMin || !formData.targetMax || !formData.targetUnit || 
                           formData.desiredIntake.length === 0) ? 0.6 : 1,
                  cursor: (!formData.selectedNutrient || !formData.currentValue || !formData.currentUnit || 
                          !formData.targetMin || !formData.targetMax || !formData.targetUnit || 
                          formData.desiredIntake.length === 0) ? 'not-allowed' : 'pointer'
                }}
                disabled={!formData.selectedNutrient || !formData.currentValue || !formData.currentUnit || 
                         !formData.targetMin || !formData.targetMax || !formData.targetUnit || 
                         formData.desiredIntake.length === 0}
              >
                Generate Recommendations
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabReportInput
