import React, { useState, useRef, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "./ScrollableTable.css";

const ScrollableTable = ({ rows, cols }) => {
  const tableContainerRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(Array(cols).fill(100));

  const handleResize = (index, newWidth) => {
    const newColumnWidths = [...columnWidths];
    newColumnWidths[index] = newWidth;
    setColumnWidths(newColumnWidths);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const scrollLeft = tableContainerRef.current.scrollLeft;
        const syncedElement = document.getElementById("synced-scroll");
        if (syncedElement) {
          syncedElement.scrollLeft = scrollLeft;
        }
      }
    };

    if (tableContainerRef.current) {
      tableContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <SynchronizedScrollComponent columnWidths={columnWidths} />
      <div className="table-container" ref={tableContainerRef}>
        <table className="scrollable-table">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <th
                  key={colIndex}
                  style={{ width: columnWidths[colIndex], padding: 0 }}
                >
                  <ResizableBox
                    width={columnWidths[colIndex]}
                    height={30}
                    axis="x"
                    resizeHandles={["e"]}
                    onResize={(e, { size }) =>
                      handleResize(colIndex, size.width)
                    }
                    handle={<span className="resize-handle" />}
                  >
                    <div style={{ width: columnWidths[colIndex] }}>
                      Header {colIndex + 1}
                    </div>
                  </ResizableBox>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <td key={colIndex} style={{ width: columnWidths[colIndex] }}>
                    Row {rowIndex + 1}, Col {colIndex + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SynchronizedScrollComponent = ({ columnWidths }) => {
  return (
    <div id="synced-scroll" className="synced-scroll">
      {/* Content that will scroll horizontally in sync with the table */}
      {columnWidths.map((width, colIndex) => (
        <div key={colIndex} className="synced-scroll-item" style={{ width }}>
          Synced Item {colIndex + 1}
        </div>
      ))}
    </div>
  );
};

export default ScrollableTable;
