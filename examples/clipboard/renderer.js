const { clipboard } = require("electron");

document.getElementById("copy").addEventListener("click", () => {
  clipboard.writeText("Copied via Renderer!");
  alert("Text copied to clipboard!");
});

document.getElementById("paste").addEventListener("click", () => {
  const text = clipboard.readText();
  document.getElementById("output").textContent = `Pasted: ${text}`;
});
