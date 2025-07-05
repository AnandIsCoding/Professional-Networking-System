import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setShowModal } from "../../Redux/Slices/modal.slice";

const tabs = ["Privacy Policy", "Terms & Conditions", "Cookie Policy"];

const PrivacyPolicyModal = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setShowModal(null));
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl p-6 sm:p-10 overflow-hidden animate-fadeIn"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <FaTimes size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A66C2] mb-6 text-center ">
          Platform Policies
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-4 sm:mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 whitespace-nowrap text-sm sm:text-base border-b-2 transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "border-[#0A66C2] text-[#0A66C2] font-semibold"
                  : "border-transparent text-gray-500 hover:text-[#0A66C2]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[60vh] pr-2 text-gray-700 space-y-6 text-sm sm:text-base leading-relaxed">
          {activeTab === "Privacy Policy" && (
            <>
              <p>
                At <strong>LinkedSphere</strong>, we are committed to protecting your personal
                information and your right to privacy. This privacy notice describes how we might
                collect, use, and store your information when you use our platform.
              </p>

              <h3 className="text-lg font-semibold text-gray-900">Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal identifiers such as name, email address, phone number, etc.</li>
                <li>Professional data like experience, education, connections.</li>
                <li>Usage data like IP address, browser type, interactions, and cookies.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900">How We Use Your Information</h3>
              <p>
                We use your data to improve your experience, personalize suggestions, communicate
                important updates, ensure security, and analyze platform usage.
              </p>

              <h3 className="text-lg font-semibold text-gray-900">Your Privacy Rights</h3>
              <p>
                You can access, edit, or delete your personal data anytime through account settings
                or by emailing us at{" "}
                <a href="mailto:privacy@linkedsphere.com" className="text-blue-600 underline">
                  privacy@linkedsphere.com
                </a>.
              </p>
            </>
          )}

          {activeTab === "Terms & Conditions" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">Introduction</h3>
              <p>
                These Terms of Use govern your access to and use of LinkedSphere. By using the
                platform, you agree to comply with these terms.
              </p>

              <h3 className="text-lg font-semibold text-gray-900">User Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate and truthful information in your profile.</li>
                <li>Do not engage in spamming, harassment, or illegal activity.</li>
                <li>Do not copy or reproduce any content without authorization.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900">Limitation of Liability</h3>
              <p>
                LinkedSphere is not responsible for user-generated content or third-party links. We
                strive for accuracy, but make no guarantees regarding information completeness.
              </p>
            </>
          )}

          {activeTab === "Cookie Policy" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900">What Are Cookies?</h3>
              <p>
                Cookies are small text files stored in your browser. They help us enhance your
                experience by remembering your settings and preferences.
              </p>

              <h3 className="text-lg font-semibold text-gray-900">Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Essential Cookies:</strong> Enable basic features like authentication.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact.</li>
                <li><strong>Preference Cookies:</strong> Remember language and layout choices.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900">Managing Cookies</h3>
              <p>
                You can control or delete cookies in your browser settings. Disabling cookies may
                affect your user experience.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
