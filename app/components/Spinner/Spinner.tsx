// after amazing Spinner of Geist-ui https://github.com/geist-org/geist-ui/tree/master/components/spinner

import clsx from "clsx";

const getSpans = () => {
  return [...new Array(12)].map((_, index) => (
    <span key={index}>
      <style jsx>{`
        span {
          background-color: black;
          position: absolute;
          top: -3.9%;
          width: 24%;
          height: 8%;
          left: -10%;
          border-radius: 10px;
          animation: spinner 1.2s linear 0s infinite normal none running;
        }
        @media (prefers-color-scheme: dark) {
          span {
            background-color: white;
          }
        }
        span:nth-child(1) {
          animation-delay: -1.2s;
          transform: rotate(0deg) translate(146%);
        }
        span:nth-child(2) {
          animation-delay: -1.1s;
          transform: rotate(30deg) translate(146%);
        }
        span:nth-child(3) {
          animation-delay: -1s;
          transform: rotate(60deg) translate(146%);
        }
        span:nth-child(4) {
          animation-delay: -0.9s;
          transform: rotate(90deg) translate(146%);
        }
        span:nth-child(5) {
          animation-delay: -0.8s;
          transform: rotate(120deg) translate(146%);
        }
        span:nth-child(6) {
          animation-delay: -0.7s;
          transform: rotate(150deg) translate(146%);
        }
        span:nth-child(7) {
          animation-delay: -0.6s;
          transform: rotate(180deg) translate(146%);
        }
        span:nth-child(8) {
          animation-delay: -0.5s;
          transform: rotate(210deg) translate(146%);
        }
        span:nth-child(9) {
          animation-delay: -0.4s;
          transform: rotate(240deg) translate(146%);
        }
        span:nth-child(10) {
          animation-delay: -0.3s;
          transform: rotate(270deg) translate(146%);
        }
        span:nth-child(11) {
          animation-delay: -0.2s;
          transform: rotate(300deg) translate(146%);
        }
        span:nth-child(12) {
          animation-delay: -0.1s;
          transform: rotate(330deg) translate(146%);
        }
        @keyframes spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </span>
  ))
};

export default function Spinner({ className } : { className?: string }) {
  return (
    <div className={clsx("spinner", className)}>
      <div className="container">{getSpans()}</div>
      <style jsx>{`
        .spinner {
          width: 20px;
          height: 20px;
        }
        .container {
          position: relative;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
};
