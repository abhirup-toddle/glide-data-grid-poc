import React from "react";
import useHeaderRenderer from "./utils/useHeaders";

const data = [
  {
    a: [
      {
        "a-1": [
          {
            "a-1-1": [
              { "a-1-1-1": [{ "a-1-1-1-1": [] }, { "a-1-1-1-1-1": [] }] },
            ],
          },
          { "a-1-2": [] },
        ],
      },
      { "a-2": [] },
    ],
  },
  {
    b: [
      { "b-1": [{ "b-1-1": [] }, { "b-1-2": [] }] },
      { "b-2": [{ "b-2-1": [] }, { "b-2-2": [] }] },
    ],
  },
  {
    c: [{ "c-1": [] }],
  },
  {
    d: [],
  },
];

const Headers = () => {
  const headers = useHeaderRenderer(data);

  return (
    <div>
      <h1>Headers Demo</h1>
      {headers}
    </div>
  );
};

export default Headers;
