import { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';

/**
 * MultiStepForm Component — Multi-step form wizard
 * 
 * A 3-step form wizard for user application/registration.
 * Features:
 * - Step 1: Personal Info (name, email, phone)
 * - Step 2: Professional Info (role, experience level, skills)
 * - Step 3: Review & Submit (summary with edit buttons to go back)
 * - Per-step validation (cannot proceed without filling required fields)
 * - Progress bar showing completion %
 * - Form state persisted in localStorage (survives refresh)
 * - Animated step transitions (slide left/right)
 * 
 * State Management Pattern:
 * "Multi-step forms need central state holding:
 * 1. formData — all collected data across steps
 * 2. currentStep — which step user on
 * 3. errors — validation errors per field
 * 4. touched — which fields user has interacted with (for showing errors)
 * 
 * Validate per step — don't let user proceed until current step valid.
 * Save to localStorage after each step — survive refresh.
 * Use useMemo/useCallback to optimize re-renders."
 */

const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack', 'UI Designer', 'DevOps'];
const experienceLevels = ['0-1 years', '1-2 years', '2-5 years', '5+ years'];
const skillsOptions = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python', 'Git', 'SQL'];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('multiStepForm');
    return saved ? JSON.parse(saved) : {
      // Step 1
      name: '',
      email: '',
      phone: '',
      // Step 2
      role: '',
      experienceLevel: '',
      skills: [],
      // Step 3
      agreedToTerms: false,
    };
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('multiStepForm', JSON.stringify(formData));
  }, [formData]);

  /**
   * Validate current step
   * Returns true if valid, false otherwise
   */
  const validateCurrentStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone must be 10 digits';
      }
    } else if (currentStep === 2) {
      if (!formData.role) newErrors.role = 'Role required';
      if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience required';
      if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
    } else if (currentStep === 3) {
      if (!formData.agreedToTerms) newErrors.agreedToTerms = 'Must agree to terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle field input changes
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  /**
   * Handle skill checkbox changes
   */
  const handleSkillChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  /**
   * Handle previous step
   */
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // In real app, would send to backend
      alert('Form submitted! Data saved: ' + JSON.stringify(formData, null, 2));
      localStorage.removeItem('multiStepForm'); // Clear saved form
      setFormData({
        name: '', email: '', phone: '',
        role: '', experienceLevel: '', skills: [],
        agreedToTerms: false,
      });
      setCurrentStep(1);
    }
  };

  /**
   * Go back to step for editing
   */
  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  // Calculate progress percentage
  const progressPercent = (currentStep / 3) * 100;
  const stepTitles = ['Personal Info', 'Professional Info', 'Review & Submit'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Join Our Community
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Complete the form below to apply for internship program
        </p>

        {/* Step Indicator */}
        <div className="mb-8 flex justify-between items-center">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : step < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
                onClick={() => step < currentStep && goToStep(step)}
              >
                {step < currentStep ? '✓' : step}
              </div>
              <div
                className={`flex-1 h-1 mx-2 transition-colors ${
                  step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            </div>
          ))}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep === 3
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            3
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card header={<h2 className="text-xl font-bold">{stepTitles[currentStep - 1]}</h2>}>
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="Yogendra BK"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {touched.name && errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  placeholder="yogendra@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {touched.email && errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="9841234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Role *
                </label>
                <select
                  value={formData.role}
                  onChange={e => handleInputChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a role...</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level *
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={e => handleInputChange('experienceLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select level...</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.experienceLevel && (
                  <p className="text-red-600 text-sm mt-1">{errors.experienceLevel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (select at least one) *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {skillsOptions.map(skill => (
                    <label key={skill} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
                {errors.skills && <p className="text-red-600 text-sm mt-1">{errors.skills}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Personal Info Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex justify-between items-center">
                  Personal Information
                  <button
                    onClick={() => goToStep(1)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>
              </div>

              {/* Professional Info Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex justify-between items-center">
                  Professional Information
                  <button
                    onClick={() => goToStep(2)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Role:</strong> {formData.role}</p>
                  <p><strong>Experience:</strong> {formData.experienceLevel}</p>
                  <p><strong>Skills:</strong></p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map(skill => (
                      <Badge key={skill} color="blue">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={e => handleInputChange('agreedToTerms', e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700">
                  I agree to terms & conditions and privacy policy
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-red-600 text-sm">{errors.agreedToTerms}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between gap-4 pt-6 border-t border-gray-200">
            <Button
              variant={currentStep === 1 ? 'ghost' : 'primary'}
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              ← Previous
            </Button>

            {currentStep < 3 ? (
              <Button variant="primary" onClick={handleNext}>
                Next →
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                ✓ Submit Application
              </Button>
            )}
          </div>
        </Card>

        {/* Form State Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
          <strong>💡 Form State Pattern:</strong> Form data persisted in localStorage. 
          Refresh page and data remains. On submit, form resets and localStorage cleared.
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;
