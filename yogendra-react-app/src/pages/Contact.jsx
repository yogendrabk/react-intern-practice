import { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

/**
 * Contact Page — Day 34
 *
 * Features:
 * 1. Fully validated contact form (name, email, subject, message)
 * 2. Custom useForm-like pattern with form state + validation on submit
 * 3. Touched state to show errors only after user interact
 * 4. Success animation with drawing checkmark (CSS animation)
 * 5. Contact info sidebar (location, email, working hours)
 * 6. Form field components with error display
 *
 * Form validation rules:
 * - Name: required, min 2 characters
 * - Email: required, must be valid email
 * - Subject: required, min 5 characters
 * - Message: required, min 10 characters
 *
 * This demonstrate:
 * - Form state management with useState
 * - Validation patterns
 * - Conditional rendering for errors
 * - CSS animation for success state
 * - UX best practice: Touched state for better UX
 */

export function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Touched state — track which fields user has touched (for showing errors)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  // Success state
  const [submitted, setSubmitted] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const getErrors = () => {
    const errors = {};
    if (formData.name.trim() === '') errors.name = 'Name is required';
    if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (formData.email.trim() === '') errors.email = 'Email is required';
    if (!validateEmail(formData.email)) errors.email = 'Email is invalid';
    if (formData.subject.trim() === '') errors.subject = 'Subject is required';
    if (formData.subject.trim().length < 5) errors.subject = 'Subject must be at least 5 characters';
    if (formData.message.trim() === '') errors.message = 'Message is required';
    if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    return errors;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle blur (mark field as touched)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched for immediate error display
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (isValid) {
      // Show success state
      setSubmitted(true);

      // Reset after animation (3 seconds)
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
      }, 3000);
    }
  };

  // If success, show checkmark animation
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
        <div className="text-center">
          {/* Animated checkmark SVG */}
          <div className="mb-6 flex justify-center">
            <svg
              className="w-24 h-24 text-green-500 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-green-800 mb-2">Message Received!</h2>
          <p className="text-lg text-green-700 mb-4">
            Thank you for reaching out. We will get back to you within 24 hours.
          </p>
          <p className="text-sm text-green-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have a question or project idea? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`
                      w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                      transition
                      ${
                        touched.name && errors.name
                          ? 'border-red-500 focus:ring-red-500 bg-red-50'
                          : 'border-gray-300 focus:ring-primary-500'
                      }
                    `}
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-red-600 mt-1">❌ {errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    className={`
                      w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                      transition
                      ${
                        touched.email && errors.email
                          ? 'border-red-500 focus:ring-red-500 bg-red-50'
                          : 'border-gray-300 focus:ring-primary-500'
                      }
                    `}
                  />
                  {touched.email && errors.email && (
                    <p className="text-sm text-red-600 mt-1">❌ {errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="How can we help?"
                    className={`
                      w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                      transition
                      ${
                        touched.subject && errors.subject
                          ? 'border-red-500 focus:ring-red-500 bg-red-50'
                          : 'border-gray-300 focus:ring-primary-500'
                      }
                    `}
                  />
                  {touched.subject && errors.subject && (
                    <p className="text-sm text-red-600 mt-1">❌ {errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us more about your project or inquiry..."
                    rows="5"
                    className={`
                      w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                      resize-none transition
                      ${
                        touched.message && errors.message
                          ? 'border-red-500 focus:ring-red-500 bg-red-50'
                          : 'border-gray-300 focus:ring-primary-500'
                      }
                    `}
                  />
                  {touched.message && errors.message && (
                    <p className="text-sm text-red-600 mt-1">❌ {errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!isValid && Object.values(touched).some(Boolean)}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Location */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">
                      Kathmandu,<br />
                      Nepal
                    </p>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">✉️</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:yogendra@techyatra.com" className="hover:text-primary-600">
                        yogendra@techyatra.com
                      </a>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Working Hours */}
              <Card>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🕐</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-sm text-gray-600">
                      Monday - Friday<br />
                      9:00 AM - 6:00 PM<br />
                      (NPT)
                    </p>
                  </div>
                </div>
              </Card>

              {/* Response Time */}
              <Card className="bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Response Time</h3>
                    <p className="text-sm text-blue-800">
                      We typically respond within 24 hours. Thank you for your patience!
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
