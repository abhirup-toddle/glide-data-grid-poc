const gradebookAssessmentColumnHeaderGroups = [
  {
    value: "Student Name",
    id: "studentName",
    children: [],
  },
  {
    value: "Term 1",
    id: "term1",
    children: [
      {
        value: "Homework",
        id: "homework",
        children: [
          {
            value: "Homework 1",
            id: "homework1",
            children: [
              {
                value: "Evaluation Type",
                id: "evaluationType",
                children: [
                  {
                    value: "Score",
                    id: "score",
                    children: [],
                  },
                  {
                    value: "Comment",
                    id: "comment",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            value: "Total",
            id: "total",
            children: [
              {
                value: "Information",
                id: "information",
                children: [
                  {
                    value: "Score",
                    id: "score",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Classwork",
        id: "classwork",
        children: [
          {
            value: "Classwork 1",
            id: "classwork1",
            children: [
              {
                value: "Evaluation Type",
                id: "evaluationType",
                children: [
                  {
                    value: "Score",
                    id: "score",
                    children: [],
                  },
                  {
                    value: "Comment",
                    id: "comment",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            value: "Total",
            id: "total",
            children: [
              {
                value: "Information",
                id: "information",
                children: [
                  {
                    value: "Score",
                    id: "score",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: "Total",
        id: "total",
        children: [
          {
            value: "Information",
            id: "information",
            children: [
              {
                value: "Score",
                id: "score",
                children: [],
              },
              {
                value: "Grade",
                id: "grade",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const studentGradebookAssessmentData = [
  {
    studentName: "John Doe",
    term1: {
      homework: {
        homework1: {
          evaluationType: {
            score: 10,
            comment: "Good job",
          },
        },
        total: {
          information: {
            score: 10,
          },
        },
      },
      classwork: {
        classwork1: {
          evaluationType: {
            score: 10,
            comment: "Good job",
          },
        },
        total: {
          information: {
            score: 10,
          },
        },
      },
      total: {
        information: {
          score: 20,
          grade: "A",
        },
      },
    },
  },
  {
    studentName: "Jane Doe",
    term1: {
      homework: {
        homework1: {
          evaluationType: {
            score: 8,
            comment: "Good job",
          },
        },
        total: {
          information: {
            score: 8,
          },
        },
      },
      classwork: {
        classwork1: {
          evaluationType: {
            score: 8,
            comment: "Good job",
          },
        },
        total: {
          information: {
            score: 8,
          },
        },
      },
      total: {
        information: {
          score: 16,
          grade: "B",
        },
      },
    },
  },
];

const studentGradebookAssessmentData_simple = [
  {
    studentName: "John Doe",
    term: [
      {
        t1: {
          homework: {
            score: 10,
            comment: "Good job",
          },
          total: {
            score: 10,
          },
        },
        classwork: {
          classwork1: {
            score: 10,
            comment: "Good job",
          },
          total: {
            score: 10,
          },
        },
        total: {
          score: 20,
          grade: "A",
        },
      },
      {
        t2: {
          homework: {
            score: 10,
            comment: "Good job",
          },
          total: {
            score: 10,
          },
        },
        classwork: {
          classwork1: {
            score: 10,
            comment: "Good job",
          },
          total: {
            score: 10,
          },
        },
        total: {
          score: 20,
          grade: "A",
        },
      },
    ],
  },
  {
    studentName: "Jane Doe",
    term: [
      {
        t1: {
          homework: {
            score: 8,
            comment: "Good job",
          },
          total: {
            score: 8,
          },
        },
        classwork: {
          classwork1: {
            score: 8,
            comment: "Good job",
          },
          total: {
            score: 8,
          },
        },
        total: {
          score: 16,
          grade: "B",
        },
      },
      {
        t2: {
          homework: {
            score: 8,
            comment: "Good job",
          },
          total: {
            score: 8,
          },
        },
        classwork: {
          classwork1: {
            score: 8,
            comment: "Good job",
          },
          total: {
            score: 8,
          },
        },
        total: {
          score: 16,
          grade: "B",
        },
      },
    ],
  },
];
