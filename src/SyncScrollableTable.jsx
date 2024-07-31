import React, { useState, useRef, useEffect, forwardRef } from "react";
import { ResizableBox } from "react-resizable";
import "./SyncScrollableTable.css";

const SyncScrollableTable = ({ rows, cols }) => {
  const tableContainerRef = useRef(null);
  const syncedScrollRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(Array(cols).fill(100));

  const handleResize = (index, newWidth) => {
    const newColumnWidths = [...columnWidths];
    newColumnWidths[index] = newWidth;
    setColumnWidths(newColumnWidths);
  };

  const synchronizeScroll = (source, target) => {
    target.scrollLeft = source.scrollLeft;
  };

  useEffect(() => {
    const handleTableScroll = () => {
      if (tableContainerRef.current && syncedScrollRef.current) {
        synchronizeScroll(tableContainerRef.current, syncedScrollRef.current);
      }
    };

    const handleSyncedScroll = () => {
      if (tableContainerRef.current && syncedScrollRef.current) {
        synchronizeScroll(syncedScrollRef.current, tableContainerRef.current);
      }
    };

    if (tableContainerRef.current && syncedScrollRef.current) {
      tableContainerRef.current.addEventListener("scroll", handleTableScroll);
      syncedScrollRef.current.addEventListener("scroll", handleSyncedScroll);
    }

    return () => {
      if (tableContainerRef.current && syncedScrollRef.current) {
        tableContainerRef.current.removeEventListener(
          "scroll",
          handleTableScroll
        );
        syncedScrollRef.current.removeEventListener(
          "scroll",
          handleSyncedScroll
        );
      }
    };
  }, []);

  return (
    <div>
      <SynchronizedScrollComponent
        columnWidths={columnWidths}
        ref={syncedScrollRef}
      />
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

// eslint-disable-next-line react/display-name
const SynchronizedScrollComponent = forwardRef(({ columnWidths }, ref) => (
  <div id="synced-scroll" className="synced-scroll" ref={ref}>
    {columnWidths.map((width, colIndex) => (
      <div key={colIndex} className="synced-scroll-item" style={{ width }}>
        Synced Item {colIndex + 1}
      </div>
    ))}
  </div>
));

export default SyncScrollableTable;
