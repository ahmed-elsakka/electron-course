const divTitle = document.getElementById("div-title");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-close").addEventListener("click", () => {
        window.close();
    });


    window.electronAPI.onFileLoaded(({canceled, contents, fileName}) => {
    if(!canceled) {
          document.getElementById("area-content").value = contents;
          divTitle.innerText = fileName;
      }
    })    
    
    window.electronAPI.onFileSaved(({success, fileName}) => {
    if(success) {
          divTitle.innerText = fileName;
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

