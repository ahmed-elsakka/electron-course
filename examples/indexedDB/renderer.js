const STORE = "users";
const DB_NAME = "example_db";

let request = indexedDB.open(DB_NAME, 1);
let db;


request.onupgradeneeded = () => {
    db = request.result;
    if(!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, {keyPath: "id", autoIncrement: true})
    }
}

request.onsuccess = () => {
    db  = request.result;
}

request.onerror = () => {
    console.error("Couldn't open the database.")
}

document.getElementById("btn-write").addEventListener("click", () => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const username = document.getElementById("txt-username").value;
    const row = {name: username, createdAt: Date.now()}
    const addReq = store.add(row);

    addReq.onsuccess = () => {
        console.log("Wrote to DB");
    }

    addReq.onerror = () => {
        console.log("Failed to write to DB");
    }
})

document.getElementById("btn-read").addEventListener("click", () => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const readReq = store.getAll();

    readReq.onsuccess = () =>{
        const rows = readReq.result || [];
        console.log(rows);
    }
})