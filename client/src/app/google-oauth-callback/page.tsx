'use client';

import { useEffect } from 'react';

export default function GoogleOAuthCallback() {
  useEffect(() => {
    const hash = window.location.hash || window.location.search;
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const id_token = params.get('id_token');

    if (id_token) {
      // Send it back to the opener
      window.opener.postMessage({ type: 'google-oauth', id_token }, window.location.origin);
    } else {
      window.opener.postMessage({ type: 'google-oauth', error: 'No id_token returned' }, window.location.origin);
    }
  }, []);

  return <div>Processing Google Sign-In...</div>;
}