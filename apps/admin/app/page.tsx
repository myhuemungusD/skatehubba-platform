'use client'

import { useState } from 'react'

type AdminSection = 
  | 'overview'
  | 'spots'
  | 'streams'
  | 'users'
  | 'clips'
  | 'events'
  | 'marketplace'
  | 'analytics'
  | 'announcements'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview')

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-gray-800 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">SkateHubba™</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          <NavItem 
            icon="📊" 
            label="Overview" 
            active={activeSection === 'overview'}
            onClick={() => setActiveSection('overview')}
          />
          <NavItem 
            icon="📍" 
            label="Manage Spots" 
            active={activeSection === 'spots'}
            onClick={() => setActiveSection('spots')}
          />
          <NavItem 
            icon="🎥" 
            label="Approve Streams" 
            active={activeSection === 'streams'}
            onClick={() => setActiveSection('streams')}
          />
          <NavItem 
            icon="👥" 
            label="Users & Bans" 
            active={activeSection === 'users'}
            onClick={() => setActiveSection('users')}
          />
          <NavItem 
            icon="🎬" 
            label="Manage Clips" 
            active={activeSection === 'clips'}
            onClick={() => setActiveSection('clips')}
          />
          <NavItem 
            icon="🏆" 
            label="Community Events" 
            active={activeSection === 'events'}
            onClick={() => setActiveSection('events')}
          />
          <NavItem 
            icon="🛒" 
            label="Marketplace" 
            active={activeSection === 'marketplace'}
            onClick={() => setActiveSection('marketplace')}
          />
          <NavItem 
            icon="📈" 
            label="Analytics" 
            active={activeSection === 'analytics'}
            onClick={() => setActiveSection('analytics')}
          />
          <NavItem 
            icon="📢" 
            label="Announcements" 
            active={activeSection === 'announcements'}
            onClick={() => setActiveSection('announcements')}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Header section={activeSection} />
        <Content section={activeSection} />
      </main>
    </div>
  )
}

function NavItem({ icon, label, active, onClick }: { 
  icon: string
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-red-600 text-white' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )
}

function Header({ section }: { section: AdminSection }) {
  const titles: Record<AdminSection, string> = {
    overview: 'Dashboard Overview',
    spots: 'Manage Skate Spots',
    streams: 'Approve Live Streams',
    users: 'User Management & Moderation',
    clips: 'Clip Moderation',
    events: 'Community Events',
    marketplace: 'Marketplace Control',
    analytics: 'Platform Analytics',
    announcements: 'Push Announcements',
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white">{titles[section]}</h2>
      <p className="text-gray-400 mt-2">Manage and monitor your platform</p>
    </div>
  )
}

function Content({ section }: { section: AdminSection }) {
  switch (section) {
    case 'overview':
      return <OverviewContent />
    case 'spots':
      return <SpotsContent />
    case 'streams':
      return <StreamsContent />
    case 'users':
      return <UsersContent />
    case 'clips':
      return <ClipsContent />
    case 'events':
      return <EventsContent />
    case 'marketplace':
      return <MarketplaceContent />
    case 'analytics':
      return <AnalyticsContent />
    case 'announcements':
      return <AnnouncementsContent />
    default:
      return <OverviewContent />
  }
}

function OverviewContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Users" value="12,458" change="+12%" />
      <StatCard title="Active Spots" value="3,247" change="+8%" />
      <StatCard title="Live Streams" value="24" change="+4" />
      <StatCard title="Pending Approvals" value="156" change="+23" urgent />
      
      <div className="col-span-full mt-4">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <ActivityItem 
            type="spot" 
            user="sk8erboy23" 
            action="added new spot: Embarcadero Plaza"
            time="2 minutes ago"
          />
          <ActivityItem 
            type="stream" 
            user="ProSkater_101" 
            action="started live stream at Venice Beach"
            time="15 minutes ago"
          />
          <ActivityItem 
            type="report" 
            user="System" 
            action="flagged clip for review (inappropriate content)"
            time="1 hour ago"
            urgent
          />
        </div>
      </div>
    </div>
  )
}

function SpotsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <input 
          type="search" 
          placeholder="Search spots..."
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-96"
        />
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
          Add New Spot
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left">Spot Name</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Check-ins</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <SpotRow name="Embarcadero Plaza" location="San Francisco, CA" checkins={1247} status="verified" />
            <SpotRow name="Venice Beach Skatepark" location="Los Angeles, CA" checkins={892} status="verified" />
            <SpotRow name="Downtown Rails" location="Portland, OR" checkins={445} status="pending" />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StreamsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreamCard 
          streamer="ProSkater_101"
          title="S.K.A.T.E. Battle at Venice"
          viewers={234}
          status="pending"
        />
        <StreamCard 
          streamer="sk8erboy23"
          title="Learning Kickflips"
          viewers={45}
          status="approved"
        />
      </div>
    </div>
  )
}

function UsersContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input 
          type="search" 
          placeholder="Search users..."
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg flex-1"
        />
        <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
          <option>All Users</option>
          <option>Verified Pros</option>
          <option>Banned Users</option>
          <option>Flagged Accounts</option>
        </select>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Management</h3>
        <p className="text-gray-400">User moderation tools coming soon...</p>
      </div>
    </div>
  )
}

function ClipsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ClipCard title="Insane Kickflip" user="sk8erboy23" status="pending" />
        <ClipCard title="Street Line" user="ProSkater_101" status="approved" />
        <ClipCard title="Flagged Content" user="sketchy_user" status="flagged" />
      </div>
    </div>
  )
}

function EventsContent() {
  return (
    <div className="space-y-6">
      <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
        Create New Event
      </button>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <EventItem name="Summer Skate Jam 2025" date="June 15, 2025" participants={847} />
          <EventItem name="Pro-Am Tournament" date="July 4, 2025" participants={1203} />
        </div>
      </div>
    </div>
  )
}

function MarketplaceContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Listings" value="2,341" />
        <StatCard title="Total Sales" value="$124,567" />
        <StatCard title="Pending Approvals" value="45" urgent />
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Marketplace Controls</h3>
        <p className="text-gray-400">Product and listing management tools coming soon...</p>
      </div>
    </div>
  )
}

function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Daily Active Users" value="3,421" change="+15%" />
        <StatCard title="New Signups (30d)" value="1,847" change="+28%" />
        <StatCard title="Avg Session Time" value="12m 34s" change="+5%" />
        <StatCard title="Retention Rate" value="68%" change="+3%" />
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
        <p className="text-gray-400">Detailed analytics charts and graphs coming soon...</p>
      </div>
    </div>
  )
}

function AnnouncementsContent() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Push New Announcement</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Announcement title..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          <textarea 
            placeholder="Announcement message..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg"
          />
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold">
              Push to All Users
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
              Schedule for Later
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
        <div className="space-y-3">
          <AnnouncementItem 
            title="New Features Released"
            date="2 days ago"
            reach="12,458 users"
          />
          <AnnouncementItem 
            title="Maintenance Window Scheduled"
            date="1 week ago"
            reach="12,341 users"
          />
        </div>
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ title, value, change, urgent }: { 
  title: string
  value: string
  change?: string
  urgent?: boolean
}) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${urgent ? 'border-2 border-red-500' : ''}`}>
      <h4 className="text-gray-400 text-sm mb-2">{title}</h4>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <span className={`text-sm ${urgent ? 'text-red-400' : 'text-green-400'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  )
}

function ActivityItem({ type, user, action, time, urgent }: {
  type: string
  user: string
  action: string
  time: string
  urgent?: boolean
}) {
  return (
    <div className={`flex items-start gap-4 pb-4 border-b border-gray-700 last:border-0 last:pb-0 ${urgent ? 'text-red-400' : ''}`}>
      <div className="text-2xl">
        {type === 'spot' && '📍'}
        {type === 'stream' && '🎥'}
        {type === 'report' && '⚠️'}
      </div>
      <div className="flex-1">
        <p className="font-medium">{user}</p>
        <p className="text-sm text-gray-400">{action}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}

function SpotRow({ name, location, checkins, status }: {
  name: string
  location: string
  checkins: number
  status: 'verified' | 'pending'
}) {
  return (
    <tr className="border-b border-gray-700">
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="px-6 py-4 text-gray-400">{location}</td>
      <td className="px-6 py-4">{checkins.toLocaleString()}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'verified' ? 'bg-green-600' : 'bg-yellow-600'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
        <button className="text-red-400 hover:text-red-300">Delete</button>
      </td>
    </tr>
  )
}

function StreamCard({ streamer, title, viewers, status }: {
  streamer: string
  title: string
  viewers: number
  status: 'pending' | 'approved'
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="aspect-video bg-gray-900 rounded mb-4 flex items-center justify-center">
        <span className="text-4xl">🎥</span>
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-400 mb-4">by {streamer} • {viewers} viewers</p>
      {status === 'pending' ? (
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold">
            Approve
          </button>
          <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
            Reject
          </button>
        </div>
      ) : (
        <span className="inline-block px-3 py-1 bg-green-600 rounded-full text-xs font-semibold">
          ✓ Approved
        </span>
      )}
    </div>
  )
}

function ClipCard({ title, user, status }: {
  title: string
  user: string
  status: 'pending' | 'approved' | 'flagged'
}) {
  const statusColors = {
    pending: 'bg-yellow-600',
    approved: 'bg-green-600',
    flagged: 'bg-red-600'
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="aspect-video bg-gray-900 rounded mb-3 flex items-center justify-center">
        <span className="text-3xl">🎬</span>
      </div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-400 mb-3">by {user}</p>
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  )
}

function EventItem({ name, date, participants }: {
  name: string
  date: string
  participants: number
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{participants.toLocaleString()}</p>
        <p className="text-xs text-gray-400">participants</p>
      </div>
    </div>
  )
}

function AnnouncementItem({ title, date, reach }: {
  title: string
  date: string
  reach: string
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
      <p className="text-sm text-gray-400">{reach}</p>
    </div>
  )
}
