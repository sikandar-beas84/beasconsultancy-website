"use client";

import { useState, useEffect } from "react";
import React from "react";

const ITEMS_PER_ROW = 5;
const ROWS_VISIBLE = 2;
const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS_VISIBLE;
const AUTO_SCROLL_DELAY = 7000; // 5 seconds

export default function TechnologySlider({ children }) {
  const items = React.Children.toArray(children);

  const [page, setPage] = useState(0);

  if (items.length === 0) return null;

  const pages = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
    pages.push(items.slice(i, i + ITEMS_PER_PAGE));
  }

  const maxPage = pages.length - 1;

  // Auto scroll
  useEffect(() => {
    if (maxPage <= 0) return;

    const interval = setInterval(() => {
      setPage((prev) => (prev === maxPage ? 0 : prev + 1));
    }, AUTO_SCROLL_DELAY);

    return () => clearInterval(interval);
  }, [maxPage]);

  return (
    <div className="technology-wrapper">
      <button
        className="tech-arrow tech-prev"
        onClick={() => setPage((p) => Math.max(p - 1, 0))}
        disabled={page === 0}
      >
        ❮
      </button>

      <div className="technology-viewport">
        <div
          className="technology-slider"
          style={{
            transform: `translateX(-${page * 100}%)`
          }}
        >
          {pages?.map((pageItems, index) => (
            <div className="technology-page" key={index}>
              {pageItems}
            </div>
          ))}
        </div>
      </div>

      <button
        className="tech-arrow tech-next"
        onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
        disabled={page === maxPage}
      >
        ❯
      </button>
    </div>
  );
}
