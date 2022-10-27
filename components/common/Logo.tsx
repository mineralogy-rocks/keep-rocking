import cx from 'clsx';


export default function Logo({isHovered}: {isHovered?: boolean}) {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1307_1488)" filter="url(#filter0_df_1307_1488)">
      <path d="M9.25 2L15.5 18H3L9.25 2Z"
            fill="white"
            className={cx('transition-transform duration-500', { 'transition-transform ease-in-out translate-x-1.5 duration-500': isHovered })} />
      <path d="M14.75 7L21 18H8.5L14.75 7Z"
            fill="white"
            className={cx('transition-transform duration-500', { 'transition-transform ease-in-out -translate-x-1.5 duration-500': isHovered })} />
      </g>
      <defs>
        <filter id="filter0_df_1307_1488" x="0" y="0" width="25" height="25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-1"/>
          <feGaussianBlur stdDeviation="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1307_1488"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1307_1488" result="shape"/>
          <feGaussianBlur stdDeviation="0.05" result="effect2_foregroundBlur_1307_1488"/>
        </filter>
        <clipPath id="clip0_1307_1488">
          <rect width="18" height="16" fill="white" transform="translate(3 2)"/>
        </clipPath>
      </defs>
    </svg>
  );
}
