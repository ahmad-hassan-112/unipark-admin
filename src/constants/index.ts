import { FilterConfig } from '@/types';

export const passwordCriteria = [
  {
    id: 'uppercase',
    label: 'One uppercase character',
    regex: /[A-Z]/,
  },
  {
    id: 'number',
    label: 'One numerical character',
    regex: /[0-9]/,
  },
  {
    id: 'lowercase',
    label: 'One lowercase character',
    regex: /[a-z]/,
  },
  {
    id: 'min-length',
    label: '8 characters minimum',
    regex: /.{8,}/,
  },
];

export const AUTH_ROUTES = [ '/auth/signin', '/auth/reset-password', '/auth/request-reset-password' ];

export const SORT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'name', label: 'A-Z' },
  { value: '-name', label: 'Z-A' },
  { value: '-price', label: 'High to low' },
  { value: 'price', label: 'Low to high' },
];

export const CUSTOMER_SORT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'name', label: 'A-Z' },
  { value: '-name', label: 'Z-A' },
];

export const campusFilterConfigs: FilterConfig[] = [
  {
    label: 'Redirect status',
    key: 'is_redirect',
    options: [
      { value: 'all', label: 'All' },
      { value: 'true', label: 'Live' },
      { value: 'false', label: 'Broken' },
    ],
  },
  {
    label: 'Status',
    key: 'status',
    options: [
      { value: 'all', label: 'All' },
      { value: 'published', label: 'Published' },
      { value: 'unpublished', label: 'Unpublished' },
      { value: 'draft', label: 'Draft' },
    ],
  },
];

export const editProfileFields = [
  {
    name: 'first_name',
    label: 'First name',
    type: 'text',
    placeholder: 'Enter first name',
  },
  {
    name: 'last_name',
    label: 'Last name',
    type: 'text',
    placeholder: 'Enter last name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
];

export const editPasswordFields = [
  {
    name: 'current_password',
    label: 'Current password',
    type: 'password',
    placeholder: 'Enter your current password',
  },
  {
    name: 'password',
    label: 'New password',
    type: 'password',
    placeholder: '8 characters minimum',
    isPassword: true,
    showPasswordStrength: true,
  },
  {
    name: 'confirm_password',
    label: 'Confirm new password',
    type: 'password',
    placeholder: 'Re-enter your password',
  },
];

export const quickLinks = [
  {
    image: '/images/escrow-logo.svg',
    title: 'Secure and reliable escrow services to protect online transactions worldwide.',
    link: 'https://www.escrow.com',
  },
  {
    image: '/images/stripe-logo.svg',
    title: 'Secure and reliable stripe services to protect online transactions worldwide.',
    link: 'https://www.stripe.com',
  },
  {
    image: '/images/cloudflare-logo.svg',
    title: 'Enterprise-grade website security, performance optimization, and network protection services.',
    link: 'https://www.cloudflare.com',
  },
  {
    image: '/images/customer-logo.svg',
    title: 'A powerful marketing automation platform for sending targeted and behavior-driven messages.',
    link: 'https://www.customer.com',
  },
  {
    image: '/images/nominet-logo.svg',
    title: 'Managing and securing millions of UK campus names with innovative digital trust services.',
    link: 'https://nominet.uk/',
  },
  {
    image: '/images/zendesk-logo.svg',
    title: 'Customer support software to enhance service experiences.',
    link: 'https://www.zendesk.com',
  },
  {
    image: '/images/directus-logo.svg',
    title: 'An open-source headless CMS that instantly connects your database to customizable APIs.',
    link: 'https://www.directus.io',
  },
  {
    image: '/images/ascio-logo.svg',
    title: 'Global campus registration and secure DNS solutions.',
    link: 'https://www.ascio.com',
  },
  {
    image: '/images/openai-logo.svg',
    title: 'Advanced AI research and deployment company building safe and powerful artificial intelligence.',
    link: 'https://www.openai.com',
  },
  {
    image: '/images/keeper-logo.svg',
    title: 'Advanced AI research and deployment company building safe and powerful artificial intelligence.',
    link: 'https://www.keepersecurity.com/',
  },
];

export const DATE_FORMAT_DD_MMM_YYYY = 'DD-MMM-YYYY';
export const DATE_FORMAT_DO_MMM_YYYY = 'Do MMM, YYYY';

export const PRICE_REGEX = /^\d*\.?\d{0,2}$/;
