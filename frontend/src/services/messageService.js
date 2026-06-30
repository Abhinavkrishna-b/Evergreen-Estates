import API from "./api";

export const startOrGetConversation = async (propertyId, sellerId) => {
  const { data } = await API.post("/messages/conversations", {
    propertyId,
    sellerId,
  });
  return data.data.conversation;
};

export const getMyConversations = async () => {
  const { data } = await API.get("/messages/conversations");
  return data.data.conversations;
};

export const getMessages = async (conversationId) => {
  const { data } = await API.get(`/messages/conversations/${conversationId}`);
  return data.data.messages;
};

export const sendMessage = async (conversationId, text) => {
  const { data } = await API.post("/messages", { conversationId, text });
  return data.data.message;
};