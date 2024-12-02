$(document).ready(function () {

  const socket = io("http://localhost:3000", {
    query: {},
  });

  const arrPic = [
    "cat1.jpg",
    "cat2.gif",
    "cat3.gif",
    "snowball.gif",
    
  ]

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

    const i = Math.floor(Math.random() * 3);
    const prob = Math.floor(Math.random() * 100);


    response = response.replace(/\*/g, "");
    let result =
      `
    <div class="chat chat-start">
        <div class="chat-bubble">` +
      response +
      ` </div>
    </div>
`
    if (prob < 40){
    result += 
      `
          <div class="chat chat-start">
            <div class="chat-bubble p-5">
          <img src="../image/`+ arrPic[i]+`" style= "width:200px;" > 
          </div>
        </div>`;
    }
    $("#chat-box").append(result);
  });
});
