const express = require("express");
const app = express();
const http = require("http").Server(app);
const dotenv = require("dotenv");
dotenv.config();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: `../conf.env` });
const connectedSockets = [];

const funccall = async (prompt) => {
  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "Saya ingin Anda bertindak sebagai akuntan dan mencari cara kreatif untuk mengelola keuangan. Anda perlu mempertimbangkan anggaran, strategi investasi, dan manajemen risiko saat membuat rencana keuangan untuk klien Anda. Dalam beberapa kasus, Anda mungkin juga perlu memberikan saran tentang hukum dan peraturan perpajakan untuk membantu mereka memaksimalkan keuntungan. Hanya jawab hal yang berhubungan dengan keuangan, hal lain yang tidak berhubungan dengan keuangan, anda perlu menjawab dengan memberi tahu user siapa anda.",
  });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result;
};

// Socket IO
io.on("connection", function (socket) {
  const userEmail = socket.handshake.query.email;
  const existingSocket = connectedSockets.find((s) => s.user.email === userEmail);
  if (!existingSocket) {
    connectedSockets.push({
      socket,
      user: {
        email: userEmail,
      },
    });
  }

  function findSocketByEmail(email) {
    return connectedSockets.find((socket) => socket.user.email === email);
  }

  socket.on("askToAI", async ({ prompt }) => {
    const result = await funccall(prompt);

    //Need to be fixed for single user later
    socket.emit("responseFromAI", result.response.text());
  });

  socket.on("disconnect", function () {
    const index = connectedSockets.findIndex((s) => s.socket === socket);
    if (index !== -1) {
      connectedSockets.splice(index, 1);
      console.log("User Just Disconnected");
    }
  });
});

http.listen(3000);
