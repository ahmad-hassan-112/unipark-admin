import { passwordCriteria } from '@/constants';
import toast from 'react-hot-toast';
import moment from 'moment';
import { get } from 'lodash';

export const getErrorMessage = error => {
  return get(error, 'response.data.details.0.message') || get(error, 'response.data.message') || error?.message;
};

export const getPasswordStrength = password => {
  if (!password) return 0;
  const strength = passwordCriteria.filter(rule => rule.regex.test(password)).length;

  return strength;
};

export const updateURLParams = (router, searchParams, params = {}) => {
  const query = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([ key, value ]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    } else {
      query.delete(key);
    }
  });

  router.push(`?${query.toString()}`);
};

export const performSearch = (key, searchValue, router, currentSearchParams) => {
  const query = new URLSearchParams(currentSearchParams.toString());
  const page = parseInt(currentSearchParams.get('page'));

  if (searchValue) {
    query.set(key, searchValue);
    if (page) {
      query.set('page', 1);
    }
  } else {
    query.delete(key);
  }

  router.push(`?${query.toString()}`);
};

export const formatFileSize = fileSizeInBytes => {
  if (fileSizeInBytes < 1024) {
    return fileSizeInBytes + ' B';
  } else if (fileSizeInBytes < 1024 * 1024) {
    return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
  } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
    return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};

export const handleToast = (message, type, defaultErrorMessage = 'An unexpected error occurred.') => {
  const options = {
    position: 'top-center',
    className: type === 'success' ? 'success-toast' : 'error-toast',
  };

  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    const finalMessage = message || defaultErrorMessage;

    toast.error(finalMessage, options);
  }
};

export const showDataToast = message => handleToast(message, 'success');

export const showErrorToast = message => handleToast(message, 'error');

export const mapYearlyData = (rawData, valueKey) => {
  const labels = rawData?.map(item => item.year);
  const values = rawData?.map(item => Number(item[valueKey]));

  return { labels, values };
};

export const calculateMaxValue = (data1, data2) => {
  const max1 = Math.max(...data1);
  const max2 = Math.max(...data2);
  const maxValue = Math.max(max1, max2);

  return Math.ceil((maxValue * 1.2) / 10) * 10;
};

export const getFullName = item => {
  return `${item?.first_name || ''} ${item?.last_name || ''}`.trim();
};

export const getProfileImage = profileImage => {
  return `${process.env.NEXT_PUBLIC_API_URL}${profileImage}`;
};

export const getInitials = firstArg => {

  let fullName = firstArg?.fullName;

  if (!fullName || typeof fullName !== 'string') return '';

  const nameParts = fullName.trim().split(/\s+/);

  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : '';

  return `${firstInitial}${lastInitial}`;
};

export const formatDateOrDash = (value, format) => {
  return value ? moment(value).format(format) : '-';
};


export const formatRegisterDateSmart = (value, format) => {
  if (!value) return '-';

  const date = moment(value);

  if (!date.isValid()) return '-';

  const year = date.year();

  if (year < 2000) return `before ${date.format('MMM-YYYY')}`;

  return date.format(format);
};

export const getDateRangeLabel = filter => {
  const end = moment();

  let start;

  switch (filter) {
  case '7d':
    start = moment().subtract(7, 'days');
    break;
  case '30d':
    start = moment().subtract(30, 'days');
    break;
  case '24h':
  default:
    start = moment().subtract(24, 'hours');
  }

  if (start.isSame(end, 'day')) return start.format('D MMMM');

  return `${start.format('D MMMM')} - ${end.format('D MMMM')}`;
};
