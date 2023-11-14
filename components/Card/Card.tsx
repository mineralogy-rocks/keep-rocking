import cx from "clsx";


interface Props {
    className?: string,
    isHoverable?: boolean,
    isHovered?: boolean,
    onClick?: (event: React.MouseEvent) => void,
    children?: React.ReactNode,
    offset?: number,
};

const defaultProps = {
    className: "",
    isHoverable: true,
    isHovered: false,
    onClick: () => {},
    children: null,
    offset: 0.323,
};


const Card = ({ className, isHoverable, isHovered, onClick, children, offset }: Props & typeof defaultProps) => {

    const clickHandler = (event: React.MouseEvent) => {
        onClick && onClick(event);
    };


    return (
        <div className={cx(className, isHoverable ? "cursor-pointer transition" : "bg-white", "relative w-56 rounded-sm p-3 ring-1 ring-slate-300/40",
                           isHoverable && (isHovered ? "ring-slate-600/[0.04] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03),0_1px_2px_rgba(15,23,42,0.06)]" : "hover:bg-slate-50"))}
                   onClick={clickHandler}>
            {children}
            <svg viewBox="0 0 384 12" fill="none" aria-hidden="true" className="absolute right-0 top-full w-[384px] max-w-[120%] transition">
              <mask id=":r1t:-a" maskUnits="userSpaceOnUse" x="48" y="0" width="269" height="4" style={{ maskType: 'alpha' }}>
                <path transform="rotate(180 316.656 4)" fill="#C4C4C4" d="M316.656 4h268v4h-268z"></path>
              </mask>
              <g filter="url(#:r1t:-b)" mask="url(#:r1t:-a)">
                <path transform="rotate(180 292.656 1)" fill="url(#:r1t:-c)" d="M292.656 1h220v2h-220z"></path>
              </g>
              <mask id=":r1t:-d" maskUnits="userSpaceOnUse" x="116" y="0" width="268" height="12" style={{ maskType: 'alpha' }}>
                <path transform="rotate(180 384 12)" fill="#C4C4C4" d="M384 12h268v12H384z"></path>
              </mask>
              <g filter="url(#:r1t:-e)" mask="url(#:r1t:-d)">
                <path transform="rotate(180 360 1)" fill="url(#:r1t:-f)" d="M360 1h220v2H360z"></path>
              </g>
              <defs>
                <linearGradient id=":r1t:-c" x1="292.656" y1="1" x2="512.656" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA" stopOpacity="0"></stop>
                  <stop offset={offset} stopColor="#1A1AF9"></stop>
                  <stop offset={1 - offset} stopColor="#AF17B4" stopOpacity="0.3"></stop>
                  <stop offset="1" stopColor="#1336AC" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id=":r1t:-f" x1="360" y1="1" x2="580" y2="1" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA" stopOpacity="0"></stop>
                  <stop offset={offset} stopColor="#1A1AF9"></stop>
                  <stop offset={1 - offset} stopColor="#AF17B4" stopOpacity="0.6"></stop>
                  <stop offset="1" stopColor="#1336AC" stopOpacity="0"></stop>
                </linearGradient>
                <filter id=":r1t:-b" x="71.656" y="-2" width="222" height="4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur stdDeviation=".5" result="effect1_foregroundBlur_311_43467"></feGaussianBlur>
                </filter>
                <filter id=":r1t:-e" x="131" y="-10" width="238" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                  <feGaussianBlur stdDeviation="4.5" result="effect1_foregroundBlur_311_43467"></feGaussianBlur>
                </filter>
              </defs>
            </svg>
        </div>
    );
};

Card.defaultProps = defaultProps;
export default Card;
