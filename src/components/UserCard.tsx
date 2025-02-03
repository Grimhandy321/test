

import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Věk: {user.age}</p>
      <p>Email: {user.email}</p>
      {user.isStudent !== undefined && <p>Je student: {user.isStudent ? 'Ano' : 'Ne'}</p>}
      {user.address && <p>Adresa: {user.address}</p>}
      {user.hobbies && user.hobbies.length > 0 && (
        <div>
          <p>Koníčky:</p>
          <ul>
            {user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
