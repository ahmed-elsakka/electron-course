const { ipcRenderer } = require("electron");

document.getElementById("btn-send").addEventListener("click", async () => {
  //ipcRenderer.send("log-message", "Hello from renderer prcoess!");
  const mainProcessResponse = 
  await ipcRenderer
  .invoke("log-message", "Hello from renderer prcoess!");

  alert(`Main process response: ${mainProcessResponse}`)
});


ipcMain.on('get-status', (event) => {
  event.sender.send('status-response', 'Running');
});

ipcRenderer.on('status-response', (event, status) => {
  console.log('Received:', status);
});
