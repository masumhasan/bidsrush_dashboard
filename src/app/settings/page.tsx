'use client';

import { User, Lock, Bell, Eye, LogOut } from 'lucide-react';
import { currentUser } from '@/lib/mockData';
import Image from 'next/image';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">
          Manage your account and preferences
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-200 bg-white rounded-t-lg">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-4 font-medium border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 inline mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-6 py-4 font-medium border-b-2 transition-colors ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lock className="w-5 h-5 inline mr-2" />
          Security
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-6 py-4 font-medium border-b-2 transition-colors ${
            activeTab === 'notifications'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bell className="w-5 h-5 inline mr-2" />
          Notifications
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-6">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={100}
              height={100}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Profile Picture
              </h3>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Change Photo
              </button>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                First Name
              </label>
              <input
                type="text"
                defaultValue="John"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={currentUser.email}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Bio
            </label>
            <textarea
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
            {saveSuccess && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                ✓ Changes saved successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Update Password
              </button>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p className="font-medium text-slate-900">Enable 2FA</p>
                <p className="text-sm text-slate-600">
                  Add an extra layer of security
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Enable
              </button>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Active Sessions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Current Session</p>
                  <p className="text-sm text-slate-600">Last active: Just now</p>
                </div>
                <span className="text-xs font-semibold text-green-600">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Email Notifications
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Auction Ending Soon',
                  description: 'Get notified when an auction you bid on is ending',
                },
                {
                  title: 'Outbid Alerts',
                  description:
                    'Be notified when someone outbids you',
                },
                {
                  title: 'Auction Won',
                  description:
                    'Get notified when you win an auction',
                },
                {
                  title: 'New Auctions',
                  description:
                    'Receive updates on new auctions matching your interests',
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-slate-600">
                      {notification.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 rounded border-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Notification Frequency
            </h3>
            <div className="space-y-2">
              {['Instant', 'Hourly', 'Daily', 'Weekly'].map((freq) => (
                <label key={freq} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    defaultChecked={freq === 'Instant'}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-900">{freq}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Save Preferences
          </button>
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <button className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
          <LogOut className="w-4 h-4" />
          Logout All Devices
        </button>
      </div>
    </div>
  );
}
