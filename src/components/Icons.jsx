function Svg({ size = 16, children, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function IconSparkles({ size }) {
  return (
    <Svg size={size} stroke="none" fill="currentColor">
      <path d="M11 4l1.7 4.6L17.3 10.3 12.7 12 11 16.6 9.3 12 4.7 10.3 9.3 8.6z" />
      <path d="M17.8 14.6l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z" />
    </Svg>
  )
}

export function IconLock({ size }) {
  return (
    <Svg size={size}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Svg>
  )
}

export function IconPencil({ size }) {
  return (
    <Svg size={size}>
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17z" />
      <path d="M13.5 6.5l3 3" />
    </Svg>
  )
}

export function IconCheck({ size }) {
  return (
    <Svg size={size}>
      <path d="M5 13l4 4L19 7" />
    </Svg>
  )
}

export function IconInfo({ size }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M12 11v5" />
    </Svg>
  )
}

export function IconArrowRight({ size }) {
  return (
    <Svg size={size}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  )
}
