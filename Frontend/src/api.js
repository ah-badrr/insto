import axios from "axios";

export const getMessages = async () => {
  const message = await axios.get(`http://localhost:8080/message/index.php`);
  
  return message.data.Data;
};