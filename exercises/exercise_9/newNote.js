document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-close").addEventListener("click", () => {
        window.close();
    });

    window.electronAPI.onFileLoaded(({canceled, contents}) => {
    if(!canceled) {
          document.getElementById("area-content").value = contents;
      }
    })
})

document.getElementById("btn-open-file").addEventListener("click", () => {
    window.electronAPI.displayOpenFileDialog();
})

document.getElementById("btn-save-file").addEventListener("click", () => {
    const content = document.getElementById("area-content").value;
    window.electronAPI.displaySaveFileDialog(content);
})

