import React from 'react';
import { Share2, Facebook, Twitter, Instagram } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    instagram: `https://instagram.com/stories/create?url=${encodedUrl}`
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600 flex items-center gap-2">
        <Share2 size={20} />
        Share
      </span>
      <div className="flex gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} className="text-[#1877F2]" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={20} className="text-[#1DA1F2]" />
        </a>
        <a
          href={shareLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Share on Instagram"
        >
          <Instagram size={20} className="text-[#E4405F]" />
        </a>
      </div>
    </div>
  );
}