const flatHeaders = [
  { id: "term", name: "Term", parentId: null },
  { id: "homework", name: "Homework", parentId: "term" },
  { id: "homework1", name: "Homework 1", parentId: "homework" },
  { id: "homework1_marks", name: "Marks", parentId: "homework1" },
  { id: "homework1_comment", name: "Comment", parentId: "homework1" },
  { id: "homework_total", name: "Total", parentId: "homework" },
  { id: "homework_total_score", name: "Score", parentId: "homework_total" },
  {
    id: "homework_evaluationStatus",
    name: "Evaluation Status",
    parentId: "homework",
  },
  { id: "classwork", name: "Classwork", parentId: "term" },
  { id: "classwork1", name: "Classwork 1", parentId: "classwork" },
  { id: "classwork1_marks", name: "Marks", parentId: "classwork1" },
  { id: "classwork1_comment", name: "Comment", parentId: "classwork1" },
  { id: "classwork_total", name: "Total", parentId: "classwork" },
  { id: "classwork_total_score", name: "Score", parentId: "classwork_total" },
  {
    id: "classwork_evaluationStatus",
    name: "Evaluation Status",
    parentId: "classwork",
  },
  { id: "finalAssessment", name: "Final Assessment", parentId: "term" },
  {
    id: "finalAssessment1",
    name: "Final Assessment 1",
    parentId: "finalAssessment",
  },
  { id: "finalAssessment1_marks", name: "Marks", parentId: "finalAssessment1" },
  {
    id: "finalAssessment1_comment",
    name: "Comment",
    parentId: "finalAssessment1",
  },
  { id: "finalAssessment_total", name: "Total", parentId: "finalAssessment" },
  {
    id: "finalAssessment_total_score",
    name: "Score",
    parentId: "finalAssessment_total",
  },
  {
    id: "finalAssessment_evaluationStatus",
    name: "Evaluation Status",
    parentId: "finalAssessment",
  },
  { id: "total", name: "Total", parentId: "term" },
  { id: "total_score", name: "Score", parentId: "total" },
  { id: "total_grade", name: "Grade", parentId: "total" },
  {
    id: "total_evaluationStatus",
    name: "Evaluation Status",
    parentId: "total",
  },
];

function convertToNestedObject(flatHeaders) {
  const nestedObject = {};
  const map = new Map();
  flatHeaders.forEach((header) => {
    map.set(header.id, header);
  });

  flatHeaders.forEach((header) => {
    if (header.parentId === null) {
      nestedObject[header.id] = header;
    } else {
      const parent = map.get(header.parentId);
      if (!parent.children) {
        parent.children = {};
      }
      parent.children[header.id] = header;
    }
  });

  return nestedObject;
}

// console.log(convertToNestedObject(flatHeaders));

function getLeafNodes(flatHeaders) {
  const leafNodes = flatHeaders.filter((header) => {
    return !flatHeaders.some((h) => h.parentId === header.id);
  });

  return leafNodes;
}

// console.log(getLeafNodes(flatHeaders));

/*
[
  {
    id: "homework1_marks",
    name: "Marks",
    parentId: "homework1",
  },
  {
    id: "homework1_comment",
    name: "Comment",
    parentId: "homework1",
  },
  {
    id: "homework_total_score",
    name: "Score",
    parentId: "homework_total",
  },
  {
    id: "homework_evaluationStatus",
    name: "Evaluation Status",
    parentId: "homework",
  },
  {
    id: "classwork1_marks",
    name: "Marks",
    parentId: "classwork1",
  },
  {
    id: "classwork1_comment",
    name: "Comment",
    parentId: "classwork1",
  },
  {
    id: "classwork_total_score",
    name: "Score",
    parentId: "classwork_total",
  },
  {
    id: "classwork_evaluationStatus",
    name: "Evaluation Status",
    parentId: "classwork",
  },
  {
    id: "finalAssessment1_marks",
    name: "Marks",
    parentId: "finalAssessment1",
  },
  {
    id: "finalAssessment1_comment",
    name: "Comment",
    parentId: "finalAssessment1",
  },
  {
    id: "finalAssessment_total_score",
    name: "Score",
    parentId: "finalAssessment_total",
  },
  {
    id: "finalAssessment_evaluationStatus",
    name: "Evaluation Status",
    parentId: "finalAssessment",
  },
  {
    id: "total_score",
    name: "Score",
    parentId: "total",
  },
  {
    id: "total_grade",
    name: "Grade",
    parentId: "total",
  },
  {
    id: "total_evaluationStatus",
    name: "Evaluation Status",
    parentId: "total",
  },
];

*/

/*
{
    "term": {
        "id": "term",
        "name": "Term",
        "parentId": null,
        "children": {
            "homework": {
                "id": "homework",
                "name": "Homework",
                "parentId": "term",
                "children": {
                    "homework1": {
                        "id": "homework1",
                        "name": "Homework 1",
                        "parentId": "homework",
                        "children": {
                            "homework1_marks": {
                                "id": "homework1_marks",
                                "name": "Marks",
                                "parentId": "homework1"
                            },
                            "homework1_comment": {
                                "id": "homework1_comment",
                                "name": "Comment",
                                "parentId": "homework1"
                            }
                        }
                    },
                    "homework_total": {
                        "id": "homework_total",
                        "name": "Total",
                        "parentId": "homework",
                        "children": {
                            "homework_total_score": {
                                "id": "homework_total_score",
                                "name": "Score",
                                "parentId": "homework_total"
                            }
                        }
                    },
                    "homework_evaluationStatus": {
                        "id": "homework_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "homework"
                    }
                }
            },
            "classwork": {
                "id": "classwork",
                "name": "Classwork",
                "parentId": "term",
                "children": {
                    "classwork1": {
                        "id": "classwork1",
                        "name": "Classwork 1",
                        "parentId": "classwork",
                        "children": {
                            "classwork1_marks": {
                                "id": "classwork1_marks",
                                "name": "Marks",
                                "parentId": "classwork1"
                            },
                            "classwork1_comment": {
                                "id": "classwork1_comment",
                                "name": "Comment",
                                "parentId": "classwork1"
                            }
                        }
                    },
                    "classwork_total": {
                        "id": "classwork_total",
                        "name": "Total",
                        "parentId": "classwork",
                        "children": {
                            "classwork_total_score": {
                                "id": "classwork_total_score",
                                "name": "Score",
                                "parentId": "classwork_total"
                            }
                        }
                    },
                    "classwork_evaluationStatus": {
                        "id": "classwork_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "classwork"
                    }
                }
            },
            "finalAssessment": {
                "id": "finalAssessment",
                "name": "Final Assessment",
                "parentId": "term",
                "children": {
                    "finalAssessment1": {
                        "id": "finalAssessment1",
                        "name": "Final Assessment 1",
                        "parentId": "finalAssessment",
                        "children": {
                            "finalAssessment1_marks": {
                                "id": "finalAssessment1_marks",
                                "name": "Marks",
                                "parentId": "finalAssessment1"
                            },
                            "finalAssessment1_comment": {
                                "id": "finalAssessment1_comment",
                                "name": "Comment",
                                "parentId": "finalAssessment1"
                            }
                        }
                    },
                    "finalAssessment_total": {
                        "id": "finalAssessment_total",
                        "name": "Total",
                        "parentId": "finalAssessment",
                        "children": {
                            "finalAssessment_total_score": {
                                "id": "finalAssessment_total_score",
                                "name": "Score",
                                "parentId": "finalAssessment_total"
                            }
                        }
                    },
                    "finalAssessment_evaluationStatus": {
                        "id": "finalAssessment_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "finalAssessment"
                    }
                }
            },
            "total": {
                "id": "total",
                "name": "Total",
                "parentId": "term",
                "children": {
                    "total_score": {
                        "id": "total_score",
                        "name": "Score",
                        "parentId": "total"
                    },
                    "total_grade": {
                        "id": "total_grade",
                        "name": "Grade",
                        "parentId": "total"
                    },
                    "total_evaluationStatus": {
                        "id": "total_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "total"
                    }
                }
            }
        }
    }
}
*/

/*
{
    "term": {
        "id": "term",
        "name": "Term",
        "parentId": null,
        "children": {
            "homework": {
                "id": "homework",
                "name": "Homework",
                "parentId": "term",
                "children": {
                    "homework1": {
                        "id": "homework1",
                        "name": "Homework 1",
                        "parentId": "homework",
                        "children": {
                            "homework1_marks": {
                                "id": "homework1_marks",
                                "name": "Marks",
                                "parentId": "homework1"
                            },
                            "homework1_comment": {
                                "id": "homework1_comment",
                                "name": "Comment",
                                "parentId": "homework1"
                            }
                        }
                    },
                    "homework_total": {
                        "id": "homework_total",
                        "name": "Total",
                        "parentId": "homework",
                        "children": {
                            "homework_total_score": {
                                "id": "homework_total_score",
                                "name": "Score",
                                "parentId": "homework_total"
                            }
                        }
                    },
                    "homework_evaluationStatus": {
                        "id": "homework_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "homework"
                    }
                }
            },
            "classwork": {
                "id": "classwork",
                "name": "Classwork",
                "parentId": "term",
                "children": {
                    "classwork1": {
                        "id": "classwork1",
                        "name": "Classwork 1",
                        "parentId": "classwork",
                        "children": {
                            "classwork1_marks": {
                                "id": "classwork1_marks",
                                "name": "Marks",
                                "parentId": "classwork1"
                            },
                            "classwork1_comment": {
                                "id": "classwork1_comment",
                                "name": "Comment",
                                "parentId": "classwork1"
                            }
                        }
                    },
                    "classwork_total": {
                        "id": "classwork_total",
                        "name": "Total",
                        "parentId": "classwork",
                        "children": {
                            "classwork_total_score": {
                                "id": "classwork_total_score",
                                "name": "Score",
                                "parentId": "classwork_total"
                            }
                        }
                    },
                    "classwork_evaluationStatus": {
                        "id": "classwork_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "classwork"
                    }
                }
            },
            "finalAssessment": {
                "id": "finalAssessment",
                "name": "Final Assessment",
                "parentId": "term",
                "children": {
                    "finalAssessment1": {
                        "id": "finalAssessment1",
                        "name": "Final Assessment 1",
                        "parentId": "finalAssessment",
                        "children": {
                            "finalAssessment1_marks": {
                                "id": "finalAssessment1_marks",
                                "name": "Marks",
                                "parentId": "finalAssessment1"
                            },
                            "finalAssessment1_comment": {
                                "id": "finalAssessment1_comment",
                                "name": "Comment",
                                "parentId": "finalAssessment1"
                            }
                        }
                    },
                    "finalAssessment_total": {
                        "id": "finalAssessment_total",
                        "name": "Total",
                        "parentId": "finalAssessment",
                        "children": {
                            "finalAssessment_total_score": {
                                "id": "finalAssessment_total_score",
                                "name": "Score",
                                "parentId": "finalAssessment_total"
                            }
                        }
                    },
                    "finalAssessment_evaluationStatus": {
                        "id": "finalAssessment_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "finalAssessment"
                    }
                }
            },
            "total": {
                "id": "total",
                "name": "Total",
                "parentId": "term",
                "children": {
                    "total_score": {
                        "id": "total_score",
                        "name": "Score",
                        "parentId": "total"
                    },
                    "total_grade": {
                        "id": "total_grade",
                        "name": "Grade",
                        "parentId": "total"
                    },
                    "total_evaluationStatus": {
                        "id": "total_evaluationStatus",
                        "name": "Evaluation Status",
                        "parentId": "total"
                    }
                }
            }
        }
    }
}
*/
