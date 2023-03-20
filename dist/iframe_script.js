//親へ
document.getElementById("send-message").addEventListener("click", () => {
  window.parent.postMessage(
    {
      source: "iframe",
      message: "Hello from Iframe!",
    },
    "*"
  );
});

//親から
window.addEventListener("message", (event) => {
  if (event.data.source === "parent") {
    document.getElementById("message-from-parent").textContent = event.data.message;
  }
});
