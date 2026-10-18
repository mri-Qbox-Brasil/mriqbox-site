"use client"

import { useEffect, useState } from "react"

// Raw files on GitHub allow browser requests, unlike the supporters and artifacts APIs.
export const DATA_BRANCH_URL = "https://raw.githubusercontent.com/mri-Qbox-Brasil/mriqbox-site/data"

const requests = new Map<string, Promise<unknown>>()

function request(url: string) {
  let pending = requests.get(url)
  if (!pending) {
    pending = fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
    requests.set(url, pending)
  }
  return pending
}

// Static pages ship the build-time snapshot; the live value replaces it once the browser fetches it.
export function useLiveData<T>(url: string, initial: T, parse: (data: unknown) => T | null): T {
  const [value, setValue] = useState(initial)
  useEffect(() => {
    let active = true
    request(url).then((data) => {
      const parsed = parse(data)
      if (active && parsed !== null) setValue(parsed)
    })
    return () => {
      active = false
    }
  }, [url, parse])
  return value
}
