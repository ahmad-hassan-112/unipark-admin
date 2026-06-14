import Image from 'next/image';
import React from 'react';

const NoResult = ({ height, title, description }: { height: string; title?: string; description?: string }) => {
  return (
    <div className={`border border-[var(--neutral100)] rounded-[10px] bg-white flex flex-col items-center justify-center ${height}`}>
      <Image src="/icons/no-result-icon.svg" alt="no-result" loading="lazy" width={60} height={60} />
      <p className="mt-4 mb-2 text-lg font-semibold text-center text-[#19212D99]">{title || 'No Results Found'}</p>
      <span className="text-[#272B4199] text-sm text-center max-w-[300px]">{description || 'We couldn’t find any results for your search. Please try again.'}</span>
    </div>
  );
};

export default NoResult;
