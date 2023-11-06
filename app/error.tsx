"use client";

import EmptyState from "@/components/EmptyState";

interface ErrorPageProps {
    error: Error
}

function ErrorPage({error}: ErrorPageProps) {
  return (
    <EmptyState
    title="Uh Oh"
    subtitle="Something went wrong!"
    />
  )
}

export default ErrorPage