/**
 * Back Office Solutions — site configuration
 * Replace placeholder URLs before going live.
 */
window.BO_CONFIG = Object.freeze({
  /** POST JSON enquiries here (Google Apps Script, CRM, etc.). Leave empty until configured. */
  enquiryEndpoint: '/api/enquiry',
  BUSINESS_NAME: 'Back Office Solutions',
  PHONE_DISPLAY: '+91 799 414 5602',
  PHONE_TEL: '+917994145602',
  PHONE_FOOTER_DISPLAY: '+91 9895145602',
  PHONE_FOOTER_TEL: '+919895145602',
  WHATSAPP_URL: 'https://wa.me/919895145602',
  EMAIL: 'yourbackofficehub@gmail.com',
  ADDRESS: 'CKRA 131, Trivandrum, Kerala',
  MEMBERSHIP_ENQUIRY_URL: 'contact.html?topic=membership',
  TOPMATE_ELIGIBILITY_URL: 'topmate.html#consultation-calendar',
  TOPMATE_GUIDANCE_URL: 'topmate.html#consultation-calendar',
  TOPMATE_PACKAGE_URL: 'topmate.html#consultation-calendar',
  SOCIAL: {
    instagram: '',
    linkedin: '',
    twitter: '',
    facebook: ''
  }
});

/** Alias for integrations expecting SITE_CONFIG */
window.SITE_CONFIG = window.BO_CONFIG;
