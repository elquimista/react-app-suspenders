import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return pug`
    div
      p Not Found
      Link(to="/") Go to homepage
  `;
}
