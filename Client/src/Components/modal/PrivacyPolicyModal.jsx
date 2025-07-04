import React from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../../Redux/Slices/modal.slice";
import { FaTimes } from "react-icons/fa";

function PrivacyPolicyModal() {
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
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl p-8 overflow-y-auto animate-fadeIn border border-gray-200"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-600 transition-colors z-[999] "
        >
          <FaTimes size={22} />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-[#0A66C2] mb-4">
          Privacy Policy
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Last updated on July 4, 2025
        </p>

        {/* Content */}
        <div className="space-y-5 text-gray-700 text-sm sm:text-base">
          <p>
            At <strong>LinkedSphere</strong>, your privacy is our top priority.
            This Privacy Policy explains how we collect, use, and protect your
            personal data when you use our platform.
          </p>

          <h3 className="font-semibold text-lg text-gray-900">1. Information We Collect</h3>
          <ul className="list-disc list-inside pl-2">
            <li>Full Name, Email address, and contact information</li>
            <li>Professional data like profile headline, experience, and skills</li>
            <li>Usage data such as interactions, messages, and search activity</li>
          </ul>

          <h3 className="font-semibold text-lg text-gray-900">2. How We Use Your Data</h3>
          <ul className="list-disc list-inside pl-2">
            <li>To improve your networking experience</li>
            <li>To personalize content, suggestions, and job recommendations</li>
            <li>To ensure platform security and prevent abuse</li>
          </ul>

          <h3 className="font-semibold text-lg text-gray-900">3. Data Protection</h3>
          <p>
            We use strong encryption, secure authentication, and regular audits
            to protect your information from unauthorized access or misuse.
          </p>

          <h3 className="font-semibold text-lg text-gray-900">4. Your Rights</h3>
          <p>
            You can request to view, edit, or delete your data at any time
            through your account settings or by contacting our support.
          </p>

          <p>
            By using LinkedSphere, you consent to this Privacy Policy. For more
            details, contact us at{" "}
            <a
              href="mailto:privacy@linkedsphere.com"
              className="text-[#0A66C2] hover:underline"
            >
              privacy@linkedsphere.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyModal;
