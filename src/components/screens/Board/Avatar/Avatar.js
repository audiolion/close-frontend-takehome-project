import React from 'react';
import gravatarUrl from 'gravatar-url';

export const Avatar = React.memo(function Avatar({ email }) {
  return (
    <img
      width="24"
      height="24"
      alt={`${email} Avatar`}
      src={gravatarUrl(email, { size: 24 })}
    />
  );
}, arePropsEqual);

function arePropsEqual(prevProps, nextProps) {
  return prevProps.email === nextProps.email;
}
