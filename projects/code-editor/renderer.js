const {ipcRenderer} = require("electron");

let newButton, saveButton, openButton;
let editor;

const updateInfo = (path) => {
    let typeDisplayed = "No document loaded";
    let type = "javascript";

    if(path) {
        let filename = path.match(/[^/]+$/)[0];
        document.getElementById("filename-span").innerHTML = filename;
        document.title = filename;

        if(path.match(/.html$/)) {
            type = "htmlmixe";
            typeDisplayed = "HTML";
        } else if(path.match(/.css$/)) {
            type = "css";
            typeDisplayed = "CSS";
        } else if(path.match(/.js$/)) {
            typeDisplayed = "Javascript";
        }

        editor.setOption("mode", type);
    }
    document.getElementById("type-span").innerHTML = typeDisplayed;
};

const handleNewButton = () => {
    editor.setValue("");
    updateInfo(null);
};
const handleSaveButton = () => {
    const editorContent = editor.getValue();
    const filePath = ipcRenderer.sendSync("file-save", editorContent);
    if(!filePath) {
        alert("Error saving the file");
    } else {
        updateInfo(filePath);
    }
};
const handleOpenButton = () => {
    const fileEntry = ipcRenderer.sendSync("file-open");
    if(fileEntry) {
        updateInfo(fileEntry.filePath);
        editor.setValue(fileEntry.content);
    }
};

onload = function() {
    newButton = this.document.getElementById("btn-new");
    saveButton = this.document.getElementById("btn-save");
    openButton = this.document.getElementById("btn-open");

    newButton.addEventListener("click", handleNewButton);
    saveButton.addEventListener("click", handleSaveButton);
    openButton.addEventListener("click", handleOpenButton);

    editor = CodeMirror(
        document.getElementById("editor"),
        {
            mode: {name: "javascript", json: true},
            lineNumbers: true,
            theme: "lesser-dark",
        }
    )

    updateInfo(null);
}
