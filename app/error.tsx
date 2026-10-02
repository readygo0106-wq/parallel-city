"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) { return <main className="empty-result page-shell"><h1>Something interrupted this view.</h1><p>Your local journey can continue. Please try again.</p><button className="primary-link primary-button" onClick={reset}>TRY AGAIN ↗</button></main>; }
