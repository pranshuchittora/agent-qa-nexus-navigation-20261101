const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ name, size = 20, ...rest }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    ...rest,
  }

  switch (name) {
    case 'bolt':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M13.5 2.5 4.8 13.2h5.1l-1.4 8.3 8.7-10.7h-5.1l1.4-8.3Z" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M12 3 3.4 7.6 12 12.2l8.6-4.6L12 3Z" />
          <path {...strokeProps} d="m3.4 12.4 8.6 4.6 8.6-4.6" />
          <path {...strokeProps} d="m3.4 16.9 8.6 4.6 8.6-4.6" />
        </svg>
      )
    case 'cube':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M12 2.8 4.4 7v10L12 21.2 19.6 17V7L12 2.8Z" />
          <path {...strokeProps} d="M4.4 7 12 11.2 19.6 7M12 11.2v10" />
        </svg>
      )
    case 'devices':
      return (
        <svg {...common}>
          <rect {...strokeProps} x="2.6" y="4.4" width="13" height="9.6" rx="2" />
          <rect {...strokeProps} x="15.4" y="9.6" width="6" height="10" rx="1.6" />
          <path {...strokeProps} d="M6.4 18h5.2M9 14v4" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <circle {...strokeProps} cx="10.6" cy="10.6" r="6.4" />
          <path {...strokeProps} d="m15.4 15.4 4.2 4.2" />
        </svg>
      )
    case 'grid':
      return (
        <svg {...common}>
          <rect {...strokeProps} x="3.4" y="3.4" width="7" height="7" rx="2" />
          <rect {...strokeProps} x="13.6" y="3.4" width="7" height="7" rx="2" />
          <rect {...strokeProps} x="3.4" y="13.6" width="7" height="7" rx="2" />
          <rect {...strokeProps} x="13.6" y="13.6" width="7" height="7" rx="2" />
        </svg>
      )
    case 'list':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M4.6 6.6h.01M4.6 12h.01M4.6 17.4h.01" strokeWidth="2.4" />
          <path {...strokeProps} d="M9 6.6h10.4M9 12h10.4M9 17.4h10.4" />
        </svg>
      )
    case 'arrow-up-right':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M7 17 17 7M9 7h8v8" />
        </svg>
      )
    case 'arrow-down':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M12 4.8v13.4M6.4 12.6 12 18.2l5.6-5.6" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect {...strokeProps} x="2.6" y="5" width="18.8" height="14" rx="2.6" />
          <path {...strokeProps} d="m3.6 7 7.3 5.4a2 2 0 0 0 2.2 0L20.4 7" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M4 7.4h16M4 12h16M4 16.6h16" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...common}>
          <path {...strokeProps} d="M12 3.2l1.7 5 5 1.7-5 1.7-1.7 5-1.7-5-5-1.7 5-1.7L12 3.2Z" />
          <path {...strokeProps} d="M18.6 16.2l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle {...strokeProps} cx="12" cy="12" r="9" />
          <path {...strokeProps} d="M3.3 9.6h17.4M3.3 14.4h17.4" />
          <path {...strokeProps} d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
        </svg>
      )
    case 'github':
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.9c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.2 2.8 1a9.4 9.4 0 0 1 5 0c2-1.2 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z"
          />
        </svg>
      )
    case 'x':
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            d="M17.3 3h3.2l-7 8 7.5 10h-5.6l-4.4-5.9L6 21H2.8l7.3-8.3L2.9 3h5.7l4.1 5.5L17.3 3Zm-1.1 16h1.7L7.5 4.9H5.7L16.2 19Z"
          />
        </svg>
      )
    case 'dribbble':
      return (
        <svg {...common}>
          <circle {...strokeProps} cx="12" cy="12" r="9.2" />
          <path {...strokeProps} d="M5 7.4c4.6 2.2 8.9 4.9 11.6 9.6M8.6 20.2C10 15 13 11.4 18.4 9.8" />
          <path {...strokeProps} d="M3.2 13.4c5.4-.6 10.2.9 13.6 4.6" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common}>
          <path
            fill="currentColor"
            d="M4.9 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3 9.4h3.8V21H3V9.4Zm6.3 0h3.6v1.6c.5-.9 1.7-1.9 3.6-1.9 2.6 0 4.3 1.7 4.3 5.1V21h-3.8v-6.2c0-1.6-.6-2.6-2-2.6-1.1 0-1.8.7-2 1.5-.1.3-.1.7-.1 1V21H9.3V9.4Z"
          />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <rect {...strokeProps} x="2.4" y="5.2" width="19.2" height="13.6" rx="4" />
          <path {...strokeProps} d="M10.4 8.9l5.3 3.1-5.3 3.1V8.9Z" />
        </svg>
      )
    default:
      return null
  }
}

export default Icon
