import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

export const Twitter: React.FC<IconProps> = (props) => (
  <svg {...base(props)}>
    <path d="M18.9 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H2.3l7.7-8.8L1.8 2.5h6.8l4.7 6.3 5.6-6.3Zm-1.2 17.6h1.8L7.4 4.3H5.4l12.3 15.8Z" />
  </svg>
);

export const Facebook: React.FC<IconProps> = (props) => (
  <svg {...base(props)}>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  </svg>
);

export const Youtube: React.FC<IconProps> = (props) => (
  <svg {...base(props)}>
    <path d="M23 12s0-3.4-.4-5a2.8 2.8 0 0 0-2-2C18.8 4.5 12 4.5 12 4.5s-6.8 0-8.6.5a2.8 2.8 0 0 0-2 2C1 8.6 1 12 1 12s0 3.4.4 5a2.8 2.8 0 0 0 2 2c1.8.5 8.6.5 8.6.5s6.8 0 8.6-.5a2.8 2.8 0 0 0 2-2c.4-1.6.4-5 .4-5ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
  </svg>
);

export const Linkedin: React.FC<IconProps> = (props) => (
  <svg {...base(props)}>
    <path d="M20.4 3H3.6C2.7 3 2 3.7 2 4.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V4.6c0-.9-.7-1.6-1.6-1.6ZM8.1 19H5.2V9.7h2.9V19ZM6.6 8.4a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-2.9v-4.5c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19H9.9V9.7h2.8V11h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.5 2 3.5 4.5V19Z" />
  </svg>
);
