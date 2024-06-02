import React, { useState, useRef } from 'react';
import "./Drawtool.css"

const CropperTool = ({ selectedTool, getCanvasSizeCB }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [isDrawn, setIsDrawn] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    if (isDrawn) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
    setRect({ width: 0, height: 0, left: x, top: y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = x - startPos.x;
    const height = y - startPos.y;
    setRect({
      width: Math.abs(width),
      height: Math.abs(height),
      left: width < 0 ? x : startPos.x,
      top: height < 0 ? y : startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDrawn(true);
  };

  const handleConfirm = () => {
    getCanvasSizeCB(rect.width, rect.height);
    setIsDrawn(false);
  };

  const handleCancel = () => {
    setRect({ width: 0, height: 0, left: 0, top: 0 });
    setIsDrawn(false);
  };

  if (selectedTool !== "crop") {
    return <div></div>;
  }

  return (
    <div
      className='mycanvas'
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: '93vw',
        height: '100vh',
        position: 'fixed', // Ensure it overlays everything
        overflow: 'hidden',
        cursor: isDrawing ? 'crosshair' : 'default',
        zIndex: "100", // set max value of zindex
        marginRight: "auto"
      }}
    >
      {(isDrawing || isDrawn) && (
        <>
          <div
            style={{
              position: 'absolute',
              border: '1px solid blue',
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              left: `${rect.left}px`,
              top: `${rect.top}px`,
              boxSizing: 'border-box',
            }}
          >
            {/* Corner boxes */}
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'blue',
                position: 'absolute',
                top: '-4px',
                left: '-4px',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'blue',
                position: 'absolute',
                top: '-4px',
                right: '-4px',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'blue',
                position: 'absolute',
                bottom: '-4px',
                left: '-4px',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'blue',
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
              }}
            />

            {/* Horizontal and vertical lines */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '1px',
                backgroundColor: 'blue',
                top: '50%',
                left: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: '100%',
                width: '1px',
                backgroundColor: 'blue',
                top: 0,
                left: '50%',
              }}
            />
          </div>
          {isDrawing && (
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                border: '1px solid blue',
                borderRadius: '4px',
                padding: '2px 5px',
                left: `${rect.left + rect.width + 10}px`,
                top: `${rect.top}px`,
                zIndex: 10,
                color: 'blue',
                fontSize: '12px',
              }}
            >
              {`Width: ${rect.width}px, Height: ${rect.height}px`}
            </div>
          )}
          {isDrawn && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling to parent elements
                  handleConfirm(); // Call your confirm function
                }}
                style={{
                  position: 'absolute',
                  left: `${rect.left + rect.width + 10}px`,
                  top: `${rect.top}px`,
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                ✓
              </button>
              <button
                onClick={handleCancel}
                style={{
                  position: 'absolute',
                  left: `${rect.left + rect.width + 10}px`,
                  top: `${rect.top + 40}px`,
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                ✕
              </button>
            </>
          )}
        </>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '10px', fontSize: '14px', color: 'blue' }}>
        {`Width: ${rect.width}px, Height: ${rect.height}px`}
      </div>
    </div>
  );
};

export default CropperTool;
