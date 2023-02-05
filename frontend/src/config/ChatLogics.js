export const getSender = (logedUser, users) => {
  return logedUser.id === users[0]._id ? users[1].name : users[0].name;
};
export const getSenderUser = (logedUser, users) => {
  return logedUser.id === users[0]._id ? users[1] : users[0];
};
