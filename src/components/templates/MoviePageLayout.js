import React from 'react';
import { LargeHeader } from '../atoms/LargeHeader'
import './MoviePageLayout.scss';

export const MoviePageLayout = ({ children, style }) => (
  <>
    <header>
      <LargeHeader text="Ultimate Moviegoers Guide" />
    </header>
    <main className={style}>
      {children}
    </main>
    <footer>
      Content from <a href="https://www.themoviedb.org/">TMDB</a>
    </footer>
  </>
)
