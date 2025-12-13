// src/pages/Settings.jsx
import React from "react";
import {
  FiSettings,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
  FiGlobe,
  FiCreditCard,
  FiBell,
  FiLock,
} from "react-icons/fi";

export default function Settings() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
        <FiSettings /> Store Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <SettingCard title="Store Information" icon={<FiGlobe />}>
          <Input label="Store Name" placeholder="Example Store" />
          <Input label="Description" placeholder="Your tagline..." />

          {/* Logo Upload */}
          <FileUpload label="Store Logo" />

          <SaveBtn />
        </SettingCard>

        <SettingCard title="Contact Information" icon={<FiMail />}>
          <Input label="Support Email" placeholder="support@example.com" icon={<FiMail />} />
          <Input label="Phone Number" placeholder="+91 98765 43210" icon={<FiPhone />} />
          <Input label="Address" placeholder="City, State, India" icon={<FiMapPin />} />
          <SaveBtn />
        </SettingCard>

        <SettingCard title="Payment Settings" icon={<FiCreditCard />}>
          <Input label="UPI ID" placeholder="yourname@bank" />

          <Select
            label="Payment Gateway"
            options={["Razorpay", "Stripe", "Cashfree", "Paytm Business"]}
          />

          <SaveBtn />
        </SettingCard>

        <SettingCard title="Order Settings" icon={<FiSettings />}>
          <Toggle label="Enable COD" />
          <Toggle label="Auto Order Confirmation" />
          <Input label="Minimum Order Amount" placeholder="0" />
          <SaveBtn />
        </SettingCard>

        <SettingCard title="Notifications" icon={<FiBell />}>
          <Toggle label="Email Alerts" />
          <Toggle label="SMS Alerts" />
          <Toggle label="Low Stock Alerts" />
          <SaveBtn />
        </SettingCard>

        <SettingCard title="Security & Privacy" icon={<FiLock />}>
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm Password" type="password" />
          <Toggle label="Two-Step Verification" />
          <SaveBtn />
        </SettingCard>

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CARD COMPONENT */
function SettingCard({ title, icon, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
    transition hover:shadow-xl backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-200">
        {icon} {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* INPUT COMPONENT */
function Input({ label, placeholder, type = "text", icon }) {
  return (
    <div>
      <label className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex items-center gap-2 border rounded-lg p-3 mt-1 
      bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-400">
        {icon && <span className="text-gray-500">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-200"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SELECT */
function Select({ label, options }) {
  return (
    <div>
      <label className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <select className="w-full p-3 mt-1 border rounded-lg bg-gray-50 dark:bg-gray-700 
      text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TOGGLE */
function Toggle({ label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-indigo-600 transition"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow peer-checked:translate-x-5 transition"></div>
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FILE UPLOAD */
function FileUpload({ label }) {
  return (
    <div>
      <label className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type="file"
        className="w-full p-3 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 
        border-gray-300 dark:border-gray-600"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SAVE BUTTON */
function SaveBtn() {
  return (
    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 
    transition flex items-center justify-center gap-2">
      <FiSave /> Save Changes
    </button>
  );
}
