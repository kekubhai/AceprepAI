import { useState } from 'react'
import { useSlideIn } from '@/app/hooks/useSlideIn'
import { validateEmail } from '@/app/utils/validateEmail'
import { Send, Mail, MessageCircle, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Contact() {
  const [ref, isVisible] = useSlideIn()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateEmail(formData.email)) {
      setStatus('Please enter a valid email address.')
      return
    }
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setStatus('Thank you for your message. We&rsquo;ll get back to you within 24 hours!')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'hello@aceprep.ai',
      action: 'Send Email'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    }
  ]

  return (
    <section id="contact" ref={ref} className={`py-24 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-6">
            💬 We&rsquo;re Here to Help
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in touch with
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              our expert team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about AcePrep AI? We&rsquo;d love to hear from you. Choose your preferred way to connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose your preferred contact method</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-gray-600 mb-2">{info.description}</p>
                        <p className="text-gray-900 font-medium mb-3">{info.contact}</p>
                        <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                          {info.action}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Our Office</h4>
                  <p className="text-gray-600 mb-2">Visit us in person</p>
                  <p className="text-gray-900">
                    123 Innovation Drive<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="What can we help you with?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center justify-center font-semibold text-lg"
              >
                Send Message
                <Send className="ml-2 w-5 h-5" />
              </button>
              
              {status && (
                <div className={`p-4 rounded-xl text-center ${status.includes('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

