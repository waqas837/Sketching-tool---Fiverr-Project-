import React, { useState, useRef } from "react";
import "./Drawtool.css";

const CropperTool = ({
  selectedTool,
  getCanvasSizeCB,
  showSizeCropModal,
  setShowSizeCropModal,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [isDrawn, setIsDrawn] = useState(false);
  const containerRef = useRef(null);

  const getPointerPosition = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const handleMouseDown = (e) => {
    if (isDrawn) return;
    const { x, y } = getPointerPosition(e);
    setStartPos({ x, y });
    setRect({ width: 0, height: 0, left: x, top: y });
    setIsDrawing(true);
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const drawingAreaRect = containerRef.current.getBoundingClientRect();
    const { x, y } = getPointerPosition(e);
    const width = x - startPos.x;
    const height = y - startPos.y;

    // Scroll drawing area when the mouse reaches the edges
    const scrollThreshold = 10; // Pixels from edge to trigger scroll

    if (x > drawingAreaRect.right - scrollThreshold) {
      containerRef.current.scrollLeft += scrollThreshold;
    } else if (x < drawingAreaRect.left + scrollThreshold) {
      containerRef.current.scrollLeft -= scrollThreshold;
    }

    if (y > drawingAreaRect.bottom - scrollThreshold) {
      containerRef.current.scrollTop += scrollThreshold;
    } else if (y < drawingAreaRect.top + scrollThreshold) {
      containerRef.current.scrollTop -= scrollThreshold;
    }

    // Update rectangle dimensions and position
    setRect({
      width: Math.round(width),
      height: Math.round(height),
      left: width < 0 ? x : startPos.x,
      top: height < 0 ? y : startPos.y,
    });
  };

  const handleMouseUp = (e) => {
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
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      // marginLeft: showSizeCropModal ? "0px" : "800px"
      style={{
        width: showSizeCropModal ? "100vw" : "100vw",
        height: "100vh",
        position: "fixed", // Ensure it overlays everything
        left: 100,
        overflow: "hidden",
        cursor: isDrawing ? "crosshair" : "default",
        zIndex: "10", // set max value of zindex
        marginRight: "auto",
      }}
    >
      {(isDrawing || isDrawn) && (
        <>
          <div
            style={{
              position: "absolute",
              border: "1px solid blue",
              width: `${Math.round(rect.width)}px`,
              height: `${Math.round(rect.height)}px`,
              left: `${Math.round(rect.left)}px`,
              top: `${Math.round(rect.top)}px`,
              boxSizing: "border-box",
            }}
          >
            {/* Corner boxes */}
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "blue",
                position: "absolute",
                top: "-4px",
                left: "-4px",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "blue",
                position: "absolute",
                top: "-4px",
                right: "-4px",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "blue",
                position: "absolute",
                bottom: "-4px",
                left: "-4px",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "blue",
                position: "absolute",
                bottom: "-4px",
                right: "-4px",
              }}
            />

            {/* Horizontal and vertical lines */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "1px",
                backgroundColor: "blue",
                top: "50%",
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: "1px",
                backgroundColor: "blue",
                top: 0,
                left: "50%",
              }}
            />
          </div>
          {isDrawing && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                border: "1px solid blue",
                borderRadius: "4px",
                padding: "2px 5px",
                left: `${rect.left + rect.width + 10}px`,
                top: `${rect.top}px`,
                zIndex: 10,
                color: "blue",
                fontSize: "12px",
              }}
            >
              {`Width: ${rect.width}px, Height: ${rect.height}px`}
            </div>
          )}
          {isDrawn && (
            <>
              <button
                onClick={(e) => {
                  // e.stopPropagation(); // Prevent event from bubbling to parent elements
                  handleConfirm(); // Call your confirm function
                }}
                style={{
                  position: "absolute",
                  left: `${rect.left + rect.width + 10}px`,
                  top: `${rect.top}px`,
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                ✓
              </button>
              <button
                onClick={handleCancel}
                style={{
                  position: "absolute",
                  left: `${rect.left + rect.width + 10}px`,
                  top: `${rect.top + 40}px`,
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                ✕
              </button>
            </>
          )}
        </>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 140,
          padding: "10px",
          fontSize: "14px",
          color: "lightgray",
        }}
      >
        {`Width: ${Math.round(rect.width)}px, Height: ${Math.round(
          rect.height
        )}px`}
      </div>
    </div>
  );
};

export default CropperTool;
