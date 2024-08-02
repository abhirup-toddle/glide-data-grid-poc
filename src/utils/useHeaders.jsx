import React, { useMemo } from "react";

const useHeaderRenderer = (data) => {
  const renderHeaders = useMemo(() => {
    const styles = {
      outerContainer: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "900px",
        width: "100%",
        height: "100%",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
      },
      column: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
      },
      header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        borderBottom: "1px solid #ccc",
        borderRight: "1px solid #ccc",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
      },
      subHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
      },
      leaf: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        borderRight: "1px solid #ccc",
        flex: 1,
      },
    };

    const renderSubHeaders = (items, isLast = false) => {
      return (
        <div style={styles.subHeaderContainer}>
          {items.map((item, index) => {
            const key = Object.keys(item)[0];
            const value = item[key];
            const isLeaf = !Array.isArray(value) || value.length === 0;

            if (isLeaf) {
              return (
                <div key={`${key}-${index}`} style={styles.leaf}>
                  x
                </div>
              );
            }

            return (
              <div key={`${key}-${index}`} style={styles.column}>
                <div style={styles.header}>x</div>
                {renderSubHeaders(value, isLast && index === items.length - 1)}
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div style={styles.outerContainer}>
        {data.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return (
            <div key={`${key}-${index}`} style={styles.column}>
              <div style={styles.header}>{key}</div>
              {Array.isArray(value) &&
                value.length > 0 &&
                renderSubHeaders(value, true)}
            </div>
          );
        })}
      </div>
    );
  }, [data]);

  return renderHeaders;
};

export default useHeaderRenderer;
