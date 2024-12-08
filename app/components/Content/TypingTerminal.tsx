'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import cx from 'clsx';
import Terminal from "@/components/Content/Terminal";


interface Props {
}

const defaultProps = {
};


const TypingTerminal: React.FC<Props> = (props) => {
  const {} = { ...defaultProps, ...props};

  const terminalRef = useRef(null);
  const terminalCodeRef = useRef(null);
  const isInView = useInView(terminalRef, { once: true, amount: 0.1 });

  const [typedCode, setTypedCode] = useState('');
  const [contentHeight, setContentHeight] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const code = [
    'curl -X GET \\',
    '-H "Content-type: application/json" \\',
    '-H "Accept: application/json" \\',
    '-d "offset=10" \\',
    '-d "ordering=id" \\',
    '"https://api.mineralogy.rocks/status"...',
  ];


  const htmlTypedCode = typedCode.split('\n').map((line, index) => {
    const isLastLine = index === typedCode.split('\n').length - 1;
    return (
      <div key={index} className={cx('flex items-center', index > 0 && 'ml-[36px] sm:ml-[42px]')}>
        {line}
        {isLastLine && (
          <svg className="text-gray-400 animate-[blink_1s_ease-out_infinite]"
               width="5"
               height="15"
               viewBox="0 0 5 15"
               fill="currentColor">
            <rect x="0" y="0" width="5" height="15"/>
          </svg>
        )}
        {!isLastLine && <br />}
      </div>
    );
  });

  useEffect(() => {
    if (terminalCodeRef.current) {
      // @ts-ignore
      setContentHeight(terminalCodeRef.current.offsetHeight);
    }
  }, [htmlTypedCode]);

  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      if (!isMounted) return;

      if (currentLineIndex >= code.length) {
        setIsFinished(true);
        return;
      }

      const currentLine = code[currentLineIndex];

      if (currentCharIndex >= currentLine.length) {
        // Move to next line
        setTypedCode(prev => prev + '\n');
        currentLineIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeNextCharacter, 200);
        return;
      }

      const char = currentLine[currentCharIndex];
      setTypedCode(prev => prev + char);
      currentCharIndex++;

      // Vary the typing speed
      const delay = char === ' ' ?
        Math.random() * 200 + 50 : // Longer pause for spaces
        Math.random() * 100 + 30;  // Normal typing speed

      timeoutId = setTimeout(typeNextCharacter, delay);
    };

    // Start typing animation
    timeoutId = setTimeout(typeNextCharacter, 500);

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isInView]);

  return (
    <div className="relative md:col-span-6" ref={terminalRef}>
      <div className="md:absolute w-full h-full">
        <Terminal>
          <pre className="text-xs sm:text-sm text-left leading-1 sm:leading-6 font-semibold flex ligatures-none overflow-auto">
            <code className="flex-none min-w-full p-5">
              <span className="flex">
                <svg viewBox="0 -9 3 24" aria-hidden="true"
                     className="flex-none overflow-visible text-pink-400 w-auto h-4 sm:h-6 mr-3">
                  <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"></path>
                </svg>
                <motion.div className="flex-auto"
                            initial={isFinished ? { height: 0 } : { height: 'auto' }}
                            animate={{
                              height: contentHeight,
                            }}
                            transition={{
                              type: 'spring',
                              bounce: 0.4,
                              stiffness: 50,
                              damping: 10,
                            }}>
                  <div ref={terminalCodeRef}>
                    {htmlTypedCode}
                  </div>
                </motion.div>
              </span>
            </code>
          </pre>
        </Terminal>
      </div>
    </div>
  );
};

export default TypingTerminal;
