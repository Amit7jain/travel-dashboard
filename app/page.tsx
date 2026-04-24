"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Map, Calendar, Compass, 
  User, Settings, ChevronRight, X, Users, 
  CreditCard, Sparkles, MapPin
} from 'lucide-react';

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
      active ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </motion.div>
);

const TripCard = ({ title, location, price, image, isDesign }: TripCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`relative flex-shrink-0 group cursor-pointer rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm ${
      isDesign ? 'w-72 h-48' : 'w-full'
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute bottom-4 left-4 z-20 text-white">
      <p className="text-xs font-medium opacity-80 uppercase tracking-wider">{location}</p>
      <h3 className="text-lg font-semibold leading-tight">{title}</h3>
      {!isDesign && <p className="mt-1 text-sm font-light">From ${price}</p>}
    </div>
  </motion.div>
);

const TimelineDay = ({ day, activities }) => (
  <div className="flex gap-6 pb-8 border-l-2 border-slate-100 ml-3 relative">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white" />
    <div className="flex-1 pl-4">
      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Day {day}</h4>
      <div className="space-y-3">
        {activities.map((act, i) => (
          <div key={i} className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
            <div>
              <p className="font-semibold text-slate-800">{act.time}</p>
              <p className="text-sm text-slate-500">{act.name}</p>
            </div>
            <Sparkles size={16} className="text-indigo-400" />
          </div>
        ))}
        <button className="flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors">
          <Plus size={14} /> Add Activity
        </button>
      </div>
    </div>
  </div>
);

// --- Main Dashboard Component ---

export default function TravelDashboard() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* 1. Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 z-30">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Map size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">Venture</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={Compass} label="Explore" active />
          <SidebarItem icon={MapPin} label="My Trips" />
          <SidebarItem icon={Plus} label="Design Studio" />
          <SidebarItem icon={Calendar} label="Bookings" />
        </nav>

        <div className="pt-6 border-t border-slate-100 space-y-2">
          <SidebarItem icon={Settings} label="Settings" />
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <span className="font-medium text-sm">Profile</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="lg:ml-64 pb-24 lg:pb-10">
        
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-6 py-4 flex items-center justify-between border-b border-slate-50">
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
              New Trip
            </button>
          </div>
        </header>

        <div className="p-6 space-y-10 max-w-7xl mx-auto">
          
          {/* Section: Upcoming Designs */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Upcoming Designs <span className="text-slate-300 font-light">3</span>
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
              <TripCard title="Amalfi Coast Drift" location="Italy" image="https://images.unsplash.com/photo-1440778303588-435521a205bc?auto=format&fit=crop&q=80&w=800" isDesign />
              <TripCard title="Kyoto Zen Garden" location="Japan" image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" isDesign />
              <TripCard title="Sahara Star Gaze" location="Morocco" image="https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&q=80&w=800" isDesign />
            </div>
          </section>

          {/* Section: Design & Timeline View */}
          <div className="grid lg:grid-cols-3 gap-10">
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Trip Designer</h2>
                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                  <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-white shadow-sm">Timeline</button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-white/50">Map</button>
                </div>
              </div>
              <div className="bg-white rounded-3xl">
                <TimelineDay day="1" activities={[{ time: '09:00 AM', name: 'Arrival at Naples' }, { time: '02:00 PM', name: 'Private Boat Tour' }]} />
                <TimelineDay day="2" activities={[{ time: '10:00 AM', name: 'Positano Coastal Walk' }]} />
              </div>
            </section>

            {/* Section: Published Trips / Booking Start */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Featured</h2>
              <div className="space-y-6">
                <div onClick={() => setBookingOpen(true)} className="relative group cursor-pointer">
                  <TripCard title="Bali Spiritual Retreat" location="Indonesia" price="1,299" image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" />
                  <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30">
                    Popular
                  </div>
                </div>
                <TripCard title="Swiss Alps Ski" location="Switzerland" price="2,450" image="https://images.unsplash.com/photo-1502901664700-f56d7d1f03f8?auto=format&fit=crop&q=80&w=800" />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* 3. Floating Price Widget */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-24 lg:bottom-10 right-6 z-30 bg-indigo-600 text-white p-4 lg:p-6 rounded-3xl shadow-2xl flex flex-col items-end border border-indigo-400"
      >
        <p className="text-[10px] uppercase font-bold tracking-tighter opacity-80">Estimated Total</p>
        <div className="text-2xl lg:text-3xl font-black">$3,749.00</div>
        <button 
          onClick={() => setBookingOpen(true)}
          className="mt-2 bg-white text-indigo-600 px-6 py-2 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-colors"
        >
          Book Now
        </button>
      </motion.div>

      {/* 4. Bottom Nav (Mobile Only) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/70 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl flex justify-around p-3 lg:hidden z-40">
        {[Compass, MapPin, Plus, Calendar, User].map((Icon, i) => (
          <motion.div key={i} whileTap={{ scale: 0.8 }} className={`p-3 rounded-2xl ${i === 0 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
            <Icon size={22} />
          </motion.div>
        ))}
      </nav>

      {/* 5. Booking Slide-over Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 bottom-0 lg:top-0 w-full lg:w-[450px] bg-white z-[60] shadow-2xl flex flex-col rounded-t-[40px] lg:rounded-none"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-bold">Book Trip</h2>
                  <button onClick={() => setBookingOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                    <X />
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Travel Dates</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <Calendar className="text-indigo-600" size={20} />
                      <span className="font-medium">Aug 14 — Aug 21, 2026</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Travelers</label>
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Users className="text-indigo-600" size={20} />
                        <span className="font-medium text-lg">2 Adults</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">-</button>
                        <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-3xl space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Trip Subtotal</span>
                      <span className="font-bold">$3,450.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Service Fee</span>
                      <span className="font-bold">$299.00</span>
                    </div>
                    <div className="pt-3 border-t border-indigo-100 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-xl font-black text-indigo-600">$3,749.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <CreditCard size={20} />
                    </motion.div>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Secure Checkout
                    </>
                  )}
                  {loading && <motion.div className="absolute bottom-0 left-0 h-1 bg-indigo-500" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} />}
                </motion.button>
                <p className="text-center text-xs text-slate-400 mt-4">Free cancellation until 48 hours before departure</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
} 