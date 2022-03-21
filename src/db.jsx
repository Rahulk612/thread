export const getComments = async () => {
    return [
      {
        id: "1",
        body: "Comments Thread Started 1",
        username: "Rahul",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T01:00:33.010+02:00",
      },
      {
        id: "2",
        body: "Comments Thread Started 2",
        username: "Vishal",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T01:45:33.010+02:00",
      },
      {
        id: "3",
        body: "Reply to Comments Thread Started 1",
        username: "Vishal",
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T19:00:33.010+02:00",
      },
      {
        id: "4",
        body: "reply to Comments Thread Started 2",
        username: "Manish",
        userId: "3",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "5",
        body: "reply to manish",
        username: "Vishal",
        userId: "2",
        parentId: "2",
        createdAt: "2021-08-16T23:59:33.010+02:00",
      },
    ];
}



export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};