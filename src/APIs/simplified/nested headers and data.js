/*
note 1: 
evaluationStatus might not be needed in data, only in headers. But it may be needed
due to the way the data is structured. It is not a leaf node, but it is a node that
has children.

note 2: 
colSpan is implicit, should be  total number of leaf nodes
rowSpan is 1 by default, can be set to a higher value
in the absence of a value, and if it is a leaf node, it will be maxDepth - numParents
*/

/* level 1 */
const headers = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "score",
    title: "Score",
    children: [],
  },
  {
    id: "Grade",
    title: "Student",
    children: [],
  },
];

const data = [
  {
    student: "Ari Nolan",
    score: 90,
    grade: "A",
  },
  {
    student: "Carson Phillips",
    score: 80,
    grade: "B",
  },
];

/* level 2 */

const headers2 = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "evaluationStatus",
    title: "Evaluation Status",
    children: [
      {
        id: "score",
        title: "Score",
        children: [],
      },
      {
        id: "Grade",
        title: "Student",
        children: [],
      },
    ],
  },
];

const data2 = [
  {
    student: "Ari Nolan",
    evaluationStatus: {
      score: 90,
      grade: "A",
    },
  },
  {
    student: "Carson Phillips",
    evaluationStatus: {
      score: 80,
      grade: "B",
    },
  },
];

/* level 3 */

const headers3 = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "classwork1",
    title: "Classwork 1",
    children: [
      //single child
      {
        id: "evaluationStatus",
        title: "Evaluation Status",
        children: [
          //2 children
          {
            id: "score",
            title: "Score",
            children: [],
          },
          {
            id: "Grade",
            title: "Student",
            children: [],
          },
        ],
      },
    ],
  },
];

const data3 = [
  {
    student: "Ari Nolan",
    classwork1: {
      evaluationStatus: {
        score: 90,
        grade: "A",
      },
    },
  },
  {
    student: "Carson Phillips",
    classwork1: {
      evaluationStatus: {
        score: 80,
        grade: "B",
      },
    },
  },
];

/* level 4 */

const headers4 = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "classwork1",
    title: "Classwork 1",
    children: [
      //single child
      {
        id: "evaluationStatus",
        title: "Evaluation Status",
        children: [
          //2 children
          {
            id: "score",
            title: "Score",
            children: [],
          },
          {
            id: "Grade",
            title: "Student",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "total",
    title: "Total",
    children: [
      {
        id: "evaluationStatus",
        title: "Evaluation Status",
        children: [
          {
            id: "score",
            title: "Score",
            children: [],
          },
        ],
      },
    ],
  },
];

const data4 = [
  {
    student: "Ari Nolan",
    classwork1: {
      evaluationStatus: {
        score: 90,
        grade: "A",
      },
    },
    total: {
      evaluationStatus: {
        score: 90,
      },
    },
  },
  {
    student: "Carson Phillips",
    classwork1: {
      evaluationStatus: {
        score: 80,
        grade: "B",
      },
    },
    total: {
      evaluationStatus: {
        score: 80,
      },
    },
  },
];

/* level 5 */

const headers5 = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "classwork",
    title: "Classwork",
    children: [
      {
        id: "classwork1",
        title: "Classwork 1",
        children: [
          //single child
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              //2 children
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const data5 = [
  {
    student: "Ari Nolan",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
        },
      },
    },
  },
  {
    student: "Carson Phillips",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
        },
      },
    },
  },
];

/* level 6 */
//multiple assignments eg. Classwork, Homework, Final Assessment etc.

const headers6 = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "classwork",
    title: "Classwork",
    children: [
      {
        id: "classwork1",
        title: "Classwork 1",
        children: [
          //single child
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              //2 children
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "homework",
    title: "Homework",
    children: [
      {
        id: "homework1",
        title: "Homework 1",
        children: [
          //single child
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              //2 children
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const data6 = [
  {
    student: "Ari Nolan",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
        },
      },
    },
    homework: {
      homework1: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
        },
      },
    },
  },
  {
    student: "Carson Phillips",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
        },
      },
    },
    homework: {
      homework1: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
        },
      },
    },
  },
];

/* level 7 */

const headers7 = [
  {
    id: "student",
    // rowSpan: 4, //maxDepth(4) - numParents(0) = 4
    title: "Student",
    children: [],
  },
  {
    id: "classwork",
    title: "Classwork",
    children: [
      {
        id: "classwork1",
        title: "Classwork 1",
        children: [
          //single child
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              //2 children
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "total",
    title: "Total",
    rowSpan: 2,
    children: [
      {
        id: "evaluationStatus",
        title: "Evaluation Status",
        children: [
          {
            id: "score",
            title: "Score",
            children: [],
          },
          {
            id: "Grade",
            title: "Student",
            children: [],
          },
        ],
      },
    ],
  },
];

const data7 = [
  {
    student: "Ari Nolan",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
        },
      },
    },
    total: {
      evaluationStatus: {
        score: 90,
        grade: "A",
      },
    },
  },
  {
    student: "Carson Phillips",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
        },
      },
    },
    total: {
      evaluationStatus: {
        score: 80,
        grade: "B",
      },
    },
  },
];

/* level 8 */
const headers8 = [
  {
    id: "student",
    // rowSpan: 4, //maxDepth(4) - numParents(0) = 4
    title: "Student",
    children: [],
  },
  {
    id: "classwork",
    title: "Classwork",
    children: [
      {
        id: "classwork1",
        title: "Classwork 1",
        children: [
          //single child
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              //2 children
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "homework",
    title: "Homework",
    children: [
      {
        id: "homework1",
        title: "Homework 1",
        children: [
          //single child
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              //2 children
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "total",
    title: "Total",
    rowSpan: 2,
    children: [
      {
        id: "evaluationStatus",
        title: "Evaluation Status",
        children: [
          {
            id: "score",
            title: "Score",
            children: [],
          },
          {
            id: "Grade",
            title: "Student",
            children: [],
          },
        ],
      },
    ],
  },
];

const data8 = [
  {
    student: "Ari Nolan",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
        },
      },
    },
    homework: {
      homework1: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
        },
      },
    },
    total: {
      evaluationStatus: {
        score: 90,
        grade: "A",
      },
    },
  },
  {
    student: "Carson Phillips",
    classwork: {
      classwork1: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
        },
      },
    },
    homework: {
      homework1: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
        },
      },
    },
    total: {
      evaluationStatus: {
        score: 80,
        grade: "B",
      },
    },
  },
];

/* level 9 */
const headers9 = [
  {
    id: "student",
    title: "Student",
    children: [],
  },
  {
    id: "term1",
    title: "Term 1",
    children: [
      {
        id: "classwork",
        title: "Classwork",
        children: [
          {
            id: "classwork1",
            title: "Classwork 1",
            children: [
              //single child
              {
                id: "evaluationStatus",
                title: "Evaluation Status",
                children: [
                  //2 children
                  {
                    id: "score",
                    title: "Score",
                    children: [],
                  },
                  {
                    id: "Grade",
                    title: "Student",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "total",
            title: "Total",
            children: [
              {
                id: "evaluationStatus",
                title: "Evaluation Status",
                children: [
                  {
                    id: "score",
                    title: "Score",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "homework",
        title: "Homework",
        children: [
          {
            id: "homework1",
            title: "Homework 1",
            children: [
              //single child
              {
                id: "evaluationStatus",
                title: "Evaluation Status",
                children: [
                  //2 children
                  {
                    id: "score",
                    title: "Score",
                    children: [],
                  },
                  {
                    id: "Grade",
                    title: "Student",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "total",
            title: "Total",
            children: [
              {
                id: "evaluationStatus",
                title: "Evaluation Status",
                children: [
                  {
                    id: "score",
                    title: "Score",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "total",
        title: "Total",
        rowSpan: 2,
        children: [
          {
            id: "evaluationStatus",
            title: "Evaluation Status",
            children: [
              {
                id: "score",
                title: "Score",
                children: [],
              },
              {
                id: "Grade",
                title: "Student",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const data9 = [
  {
    student: "Ari Nolan", //studentName
    term1: {
      //term
      classwork: {
        //assignmentType
        classwork1: {
          //assignmentName
          evaluationStatus: {
            score: 90,
            grade: "A",
          },
        },
        total: {
          evaluationStatus: {
            score: 90,
          },
        },
      },
      homework: {
        homework1: {
          evaluationStatus: {
            score: 90,
            grade: "A",
          },
        },
        total: {
          evaluationStatus: {
            score: 90,
          },
        },
      },
      total: {
        evaluationStatus: {
          score: 90,
          grade: "A",
        },
      },
    },
  },
  {
    student: "Carson Phillips",
    term1: {
      classwork: {
        classwork1: {
          evaluationStatus: {
            score: 80,
            grade: "B",
          },
        },
        total: {
          evaluationStatus: {
            score: 80,
          },
        },
      },
      homework: {
        homework1: {
          evaluationStatus: {
            score: 80,
            grade: "B",
          },
        },
        total: {
          evaluationStatus: {
            score: 80,
          },
        },
      },
      total: {
        evaluationStatus: {
          score: 80,
          grade: "B",
        },
      },
    },
  },
];
