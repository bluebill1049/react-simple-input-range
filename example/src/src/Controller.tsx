import * as React from 'react';
import { Animate } from 'react-simple-animate';
import FlipNumbers from 'react-flip-numbers';
import { bubbleWithTail, bubble } from './constants/svgPath';

const commonAnimationProps = {
  easeType: 'cubic-bezier(0.86, 0, 0.07, 1)',
  startStyle: {
    transform: 'translateY(0)',
  },
};

interface Props {
  onFocus: () => void;
  onBlur: () => void;
  buttonSize: number;
  height: number;
  value: number;
  dragX: number;
  showBubble: boolean;
  isControlByKeyBoard: boolean;
  onMouseDown: (MouseEvent) => void;
  onInteractEnd: (Event) => void;
  backgroundColor?: string;
  textBackgroundColor?: string;
  textColor?: string;
}

const flipNumberProps = {
  height: 14,
  width: 10,
  color: 'black',
  background: 'white',
  perspective: 370,
  durationSeconds: 0.4,
  play: true,
  numberStyle: { outline: '1px solid transparent' },
};

export default function Controller({
  onFocus,
  onBlur,
  buttonSize,
  height,
  dragX,
  showBubble,
  isControlByKeyBoard,
  value,
  onMouseDown,
  onInteractEnd,
  backgroundColor,
  textBackgroundColor,
  textColor,
}: Props) {
  return (
    <div
      tabIndex={0}
      onClick={e => e.stopPropagation()}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        borderRadius: '50%',
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        fontSize: '12px',
        color: '#fff',
        top: `${(height - buttonSize) / 2}px`,
        position: 'absolute',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        cursor: '-webkit-grab',
        fontWeight: 600,
        background: 'none',
        border: 'none',
        transform: `translateX(${dragX}px)`,
        transition: isControlByKeyBoard ? '0.15s all ease-in' : '0s all',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onInteractEnd}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={2}
      aria-valuemax={30}
      aria-valuetext="Years of loan"
    >
      <input
        type="range"
        defaultValue={value.toString()}
        style={{
          visibility: 'hidden',
          width: 0,
          height: 0,
          display: 'block',
          position: 'absolute',
        }}
      />
      <Animate
        play={showBubble}
        {...commonAnimationProps}
        reverseDurationSeconds={0.3}
        durationSeconds={0.2}
        startStyle={{
          transform: 'translateY(0)',
        }}
        endStyle={{
          transform: 'translateY(-22px) scale(1.65)',
          filter: 'drop-shadow( 0 0 2px rgba(0, 0, 0, .2))',
        }}
        easeType="cubic-bezier(0.86, 0, 0.07, 1)"
        render={({ style }) => (
          <svg
            style={{
              position: 'absolute',
              top: '-23px',
              left: 0,
              ...style,
            }}
            x="0px"
            y="0px"
            width={`${buttonSize}px`}
            height="64px"
            viewBox="0 0 40 64"
          >
            <path
              style={{
                transition: '0.3s all',
                fill: backgroundColor,
              }}
              d={showBubble ? bubbleWithTail : bubble}
            />
          </svg>
        )}
      />

      <Animate
        play={showBubble}
        {...commonAnimationProps}
        endStyle={{
          transform: 'translateY(-46px) scale(1.3)',
        }}
        durationSeconds={0.3}
        reverseDurationSeconds={0.1}
        render={({ style }) => (
          <div
            style={{
              background: textBackgroundColor,
              height: `${buttonSize}px`,
              width: `${buttonSize}px`,
              borderRadius: '50%',
              position: 'absolute',
              ...style,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '10px',
                left: 0,
                width: `${buttonSize}px`,
                color: textColor,
                textAlign: 'center',
              }}
            >
              <FlipNumbers {...flipNumberProps} numbers={value.toString()} />
            </span>
          </div>
        )}
      />
    </div>
  );
}
