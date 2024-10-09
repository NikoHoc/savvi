$(document).ready(function () {
  const socket = io("http://localhost:3000", {
    query: {},
  });

  $("#send").on("click", function (e) {
    e.preventDefault();
    const promptValue = $("#message").val();
    const sanitizedValue = DOMPurify.sanitize(promptValue);
    const result =
      `<div class="chat chat-end">
          <div class="chat-bubble">` +
      sanitizedValue +
      `</div>
        </div>`;

    $("#chat-box").append(result);

    $("#message").val("");
    if (promptValue.trim() === "") {
      return;
    }
    socket.emit("askToAI", {
      prompt: sanitizedValue,
    });
  });

  socket.on("responseFromAI", (response) => {
    response = response.replace(/\*/g, "");
    const result =
      `
    <div class="chat chat-start">
        <div class="chat-bubble">` +
      response +
      ` </div>
    </div>`;

    $("#chat-box").append(result);
  });
});
