// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          logout: 'Logout',
          profile: 'Profile',
          place_order: 'Place Order',
          login: 'Login',
          admin_panel: 'Admin Panel',
          download_app: 'Download Desktop App',
          search_here: 'Search here...',
          
          // Footer translations
          legals: 'Legals',
          about: 'About',
          refund_policy: 'Refund Policy',
          privacy_policy: 'Privacy Policy',
          terms: 'Terms',

          information: 'Information',
          how_to_buy: 'How to buy',
          contact: 'Contact',
          complain: 'Complain',

          about_text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          all_rights_reserved: 'All Rights Reserved',
            valid_email_required: "Valid Email Address Required",
      something_went_wrong: "Something Went Wrong",
      enter_your_email: "Enter Your Email",
      verification_code_info: "A verification code will be sent to the email address you provide",
      email_address: "Email Address",
      next: "Next",
       valid_pin_required: "Valid PIN Required",
      enter_verification_code: "Enter Verification Code",
      verification_code_sent_info: "A verification code has been sent to the email address you provide",
      verification: "Verification",
      submit: "Submit",
        },
      },
      bn: {
        translation: {
          home: 'হোম',
          logout: 'লগআউট',
          profile: 'প্রোফাইল',
          place_order: 'অর্ডার করুন',
          login: 'লগইন',
          admin_panel: 'অ্যাডমিন প্যানেল',
          download_app: 'ডাউনলোড অ্যাপ',
          search_here: 'অনুসন্ধান করুন...',

          // Footer translations
          legals: 'আইনি তথ্য',
          about: 'সম্পর্কে',
          refund_policy: 'রিফান্ড পলিসি',
          privacy_policy: 'প্রাইভেসি পলিসি',
          terms: 'শর্তাবলী',

          information: 'তথ্য',
          how_to_buy: 'কিভাবে কিনবেন',
          contact: 'যোগাযোগ',
          complain: 'অভিযোগ',

          about_text: 'লোরেম ইপসাম হল ছাপার এবং টাইপসেটিং শিল্পের সাধারণ ডামি টেক্সট।',
          all_rights_reserved: 'সমস্ত অধিকার সংরক্ষিত',
           valid_email_required: "বৈধ ইমেইল ঠিকানা প্রয়োজন",
      something_went_wrong: "কিছু ভুল হয়েছে",
      enter_your_email: "আপনার ইমেইল লিখুন",
      verification_code_info: "যে ইমেইল ঠিকানাটি আপনি দিবেন সেখানে একটি ভেরিফিকেশন কোড পাঠানো হবে",
      email_address: "ইমেইল ঠিকানা",
      next: "পরবর্তী",
       valid_pin_required: "বৈধ পিন প্রয়োজন",
     
      enter_verification_code: "ভেরিফিকেশন কোড লিখুন",
      verification_code_sent_info: "আপনি যে ইমেইল ঠিকানা দিয়েছেন সেখানে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে",
      verification: "ভেরিফিকেশন",
      submit: "জমা দিন",
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
