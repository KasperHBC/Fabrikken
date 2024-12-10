// KnowledgePortalLink.js
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const KnowledgePortalLink = ({ url, tooltip }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-green-600 hover:text-blue-800 transition"
      title={tooltip || 'Lær mere på Vidensportalen'}
    >
      <FaInfoCircle className="text-4xl" />
    </a>
  );
};

export default KnowledgePortalLink;
