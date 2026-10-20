import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function RelationshipTimer({ startDate = "2019-10-20T00:00:00" }) {
  const [timeUnits, setTimeUnits] = useState({
    years: 7,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 2557,
  });

  useEffect(() => {
    const start = new Date(startDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, now - start);

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365.25);
      const remainingDays = Math.floor(totalDays % 365.25);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeUnits({
        years,
        days: remainingDays,
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const stats = [
    { label: "Years of Love", value: timeUnits.years, sub: "Unshakable Bond" },
    { label: "Days Cherished", value: timeUnits.totalDays.toLocaleString(), sub: "Pure Magic" },
    { label: "Hours of Joy", value: `${timeUnits.hours}h`, sub: "Endless Laughter" },
    { label: "Minutes of Peace", value: `${timeUnits.minutes}m`, sub: "Shared Dreams" },
    { label: "Every Second", value: `${timeUnits.seconds}s`, sub: "Ticking Live", isLive: true },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-semibold mb-4">
        <Clock className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
        <span>Every Single Second Since October 20, 2019</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 text-center relative overflow-hidden bg-white/90 shadow-md ${
              stat.isLive 
                ? 'border-rose-400 shadow-rose-200/50' 
                : 'border-rose-200 hover:border-rose-300'
            }`}
          >
            {/* Live pulsing dot */}
            {stat.isLive && (
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}

            <div className="font-caveat text-3xl sm:text-4xl font-bold text-rose-600">
              {stat.value}
            </div>
            <div className="text-xs font-bold text-[#4a2c2a] mt-0.5">
              {stat.label}
            </div>
            <div className="text-[11px] text-[#785350] font-medium mt-0.5">
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
