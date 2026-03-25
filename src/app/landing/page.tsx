"use client";

import { useState } from "react";

const COURSES = [
  {
    name: "Working at Heights",
    description: "CPO-Approved initial and refresher training for workers performing tasks at heights. Meets Ontario Regulation 213/91.",
    delivery: "In-Person",
    duration: "1 Day (8 hrs)",
  },
  {
    name: "Confined Space Entry",
    description: "Comprehensive training covering hazard assessment, atmospheric testing, entry/exit procedures, and rescue planning.",
    delivery: "In-Person",
    duration: "1 Day (8 hrs)",
  },
  {
    name: "Forklift Operator",
    description: "Powered industrial truck training including classroom theory, practical evaluation, and written assessment.",
    delivery: "Blended",
    duration: "1 Day (8 hrs)",
  },
  {
    name: "WHMIS",
    description: "Workplace Hazardous Materials Information System training covering GHS labels, SDSs, and safe handling procedures.",
    delivery: "Online",
    duration: "2-3 Hours",
  },
  {
    name: "Construction Awareness (4-Step)",
    description: "Ministry-approved basic awareness training covering worker rights, hazard identification, and the IRS (Internal Responsibility System).",
    delivery: "Online / In-Person",
    duration: "Half Day",
  },
  {
    name: "Supervisor Awareness",
    description: "Required training for supervisors on their duties under the OHSA, due diligence, and managing worker safety.",
    delivery: "Online / In-Person",
    duration: "Half Day",
  },
  {
    name: "Hoisting & Rigging",
    description: "Safe operation of hoisting equipment, rigging hardware inspection, load calculations, and signalling procedures.",
    delivery: "In-Person",
    duration: "1 Day (8 hrs)",
  },
  {
    name: "Custom Courses",
    description: "Tailored training programs designed for your specific workplace hazards, equipment, and compliance requirements.",
    delivery: "Flexible",
    duration: "Custom",
  },
];

const SERVICES = [
  {
    title: "Training",
    description: "CPO-approved and industry-recognized courses delivered at your site or ours.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Consulting",
    description: "H&S program audits, policy development, and compliance gap analysis.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Equipment Supply",
    description: "Safety equipment, PPE, and fall protection systems sourced and delivered.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Custom Courses",
    description: "Bespoke training tailored to your workplace hazards and processes.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    quote: "2nd Nature Safety transformed our compliance program. We went from chaotic paper records to a streamlined system. Their Working at Heights course is the best we've experienced.",
    name: "Mark Henderson",
    role: "Site Supervisor, Ottawa Builds Inc.",
  },
  {
    quote: "Troy and his team really understand the needs of small contractors. The training is practical, engaging, and our workers actually remember what they learned.",
    name: "Lisa Chen",
    role: "Operations Manager, Capital Electrical",
  },
  {
    quote: "The COJG funding guidance alone saved us thousands. 2nd Nature made the application process painless and got our entire team certified at a fraction of the cost.",
    name: "James Okafor",
    role: "Owner, JO Logistics",
  },
];

const DELIVERY_COLORS: Record<string, string> = {
  "In-Person": "bg-blue-100 text-blue-700",
  "Blended": "bg-purple-100 text-purple-700",
  "Online": "bg-green-100 text-green-700",
  "Online / In-Person": "bg-teal-100 text-teal-700",
  "Flexible": "bg-orange-100 text-orange-700",
};

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 4000);
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Partner in <span className="text-accent">Workplace Safety</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              CPO-approved training, expert consulting, and compliance solutions for Ontario&apos;s construction, industrial, and trades sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors text-lg"
              >
                Book a Training Session
              </a>
              <a
                href="#contact"
                className="bg-white/10 text-white border-2 border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors text-lg"
              >
                Get a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">End-to-end health and safety solutions tailored to your industry and workforce.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COJG Banner */}
      <section className="bg-accent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white text-lg font-semibold">
              Did you know? The <span className="underline">Canada-Ontario Job Grant</span> can cover up to <span className="text-2xl font-bold">83%</span> of your training costs.
            </p>
            <a href="#contact" className="bg-white text-accent px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm ml-2">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ministry-approved and industry-recognized training programs delivered by experienced professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course) => (
              <div key={course.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${DELIVERY_COLORS[course.delivery] || "bg-gray-100 text-gray-700"}`}>
                    {course.delivery}
                  </span>
                  <span className="text-xs text-gray-500">{course.duration}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg key={n} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Get Started Today</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ready to strengthen your safety program? Contact us for a free consultation or to book a training session for your team.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">(613) 552-2460</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Website</div>
                    <a href="https://www.2ndnaturesafety.ca" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                      www.2ndnaturesafety.ca
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium">Ottawa, ON</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
              {formSubmitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                  Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                    placeholder="you@company.ca"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
                    placeholder="Tell us about your training needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xl font-bold">2nd Nature Safety</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Making workplace safety second nature for Ontario employers since day one.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#courses" className="hover:text-accent transition-colors">Courses</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
                <li><a href="https://www.2ndnaturesafety.ca" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Main Website</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Ottawa, ON, Canada</li>
                <li>(613) 552-2460</li>
                <li><a href="https://www.2ndnaturesafety.ca" className="hover:text-accent transition-colors">www.2ndnaturesafety.ca</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} 2nd Nature Safety. All rights reserved. | Demo built for Riipen Labs Growth Strategy Project
          </div>
        </div>
      </footer>
    </div>
  );
}
