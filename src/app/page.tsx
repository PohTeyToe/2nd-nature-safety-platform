import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-green-700 text-white rounded-lg px-6 py-4 mb-8 text-center text-sm sm:text-base">
        Built for Troy at 2nd Nature Safety &mdash; a demo of tools to help you grow your business through association partnerships, certification tracking, and a modern web presence.
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">2nd Nature Safety Digital Platform</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A growth toolkit for 2nd Nature Safety — manage partnership outreach, track employee certifications, and showcase your training services.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Link
          href="/partnerships"
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-t-4 border-accent"
        >
          <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Partnership CRM</h2>
          <p className="text-gray-600">Track and manage outreach to 18 target associations across construction, industrial, union, and government sectors.</p>
        </Link>

        <Link
          href="/certifications"
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-t-4 border-primary"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Certification Tracker</h2>
          <p className="text-gray-600">Monitor employee training compliance with real-time status tracking, expiry alerts, and role-based templates.</p>
        </Link>

        <Link
          href="/landing"
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-t-4 border-success"
        >
          <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
            <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Training Landing Page</h2>
          <p className="text-gray-600">A demo of what 2ndnaturesafety.ca could look like as a modern customer acquisition tool.</p>
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        Built for the Riipen Labs Growth Strategy Project &middot; Team 162 &middot; March 2026
      </div>
    </div>
  );
}
