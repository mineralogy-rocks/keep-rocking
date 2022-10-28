import cx from 'clsx';

export default function Logo({isHovered}: {isHovered?: boolean}) {
  return (
    <>
      <svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
        <g className={cx('transition-transform duration-500', { 'transition-transform ease-in-out -translate-x-2 -translate-y-1.5 duration-500 animate-pulse': isHovered })} >
          <g filter="url(#filter0_f_1318_1487)">
            <circle cx="21" cy="17" r="4" fill={isHovered ? '#F5CA5B' : '#EDD69C'}/>
          </g>
          <g filter="url(#filter1_f_1318_1487)">
            <circle cx="21" cy="17" r="5" fill={isHovered ? '#F5CA5B' : '#EDD69C'}/>
          </g>
          <g filter="url(#filter2_f_1318_1487)">
            <circle cx="21" cy="17" r="6" fill={isHovered ? '#F5CA5B' : '#EDD69C'}/>
          </g>
        </g>
        <g clipPath="url(#clip0_1307_1488)" filter="url(#filter0_df_1307_1488)" transform='translate(5, 9)'>
          <path d="M9.25 2L15.5 18H3L9.25 2Z"
                stroke="black"
                strokeWidth={0.5}
                fill="white"
                className={cx('transition-transform duration-500', { 'transition-transform ease-in-out translate-x-1.5 duration-500': isHovered })} />
          <path d="M14.75 7L21 18H8.5L14.75 7Z"
                stroke="black"
                strokeWidth={0.5}
                fill="white"
                className={cx('transition-transform duration-500', { 'transition-transform ease-in-out -translate-x-1.5 duration-500': isHovered })} />
        </g>
        <defs>
          <filter id="filter0_f_1318_1487" x="11" y="11" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_1318_1487"/>
          </filter>
          <filter id="filter1_f_1318_1487" x="5" y="5" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_1318_1487"/>
          </filter>
          <filter id="filter2_f_1318_1487" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1318_1487"/>
          </filter>
          <filter id="filter0_df_1307_1488" x="0" y="0" width="35" height="35" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
    </>
  );
}
