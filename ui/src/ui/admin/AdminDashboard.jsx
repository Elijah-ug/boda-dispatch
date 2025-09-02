import React from 'react'
import Settings from './Settings'
import FinanceTrack from './FinanceTrack'

export default function AdminDashboard() {
  return (
    <div className="py-5 bg-gray-800 h-screen px-10 flex justify-center">
      <div className="grid grid-cols-2 gap-10 w-full h-2/3 p-3 border-1">
        <Settings />
        <FinanceTrack />
      </div>
    </div>
  );
}
