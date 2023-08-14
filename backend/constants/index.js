const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Doe chats",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "raim",
        email: "raim@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "raim and guest",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "raim",
        email: "raim@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "raim and anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "raim",
        email: "raim@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      {
        name: "raim",
        email: "raim@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "raim and Jane",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "raim",
        email: "raim@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];

module.exports = { chats }
