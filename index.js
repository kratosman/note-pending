var btnAdd = document.getElementById('btnAdd');
var note = document.getElementById('note');

let noteArr = JSON.parse(localStorage.getItem('note')) || [];

btnAdd.addEventListener('click', () => {
    const noteElements = {
        id:Date.now(),
        noteName:note.value,
        content: [],
    };

    if (note.value === "") {
        alert("Please fill input by text");
    } else {
        noteArr.push(noteElements)
        localStorage.setItem('note', JSON.stringify(noteArr));
        console.log(noteArr)
        note.value = "";
        window.location.reload();
    }
    
})

function getNoteArr() {
    var storeValue = JSON.parse(localStorage.getItem('note')) || '';
    for (let i = 0; i < storeValue.length; i++) {
        console.log(storeValue[i].noteName)

        var main_container = document.querySelector('.main_container');
        var date = new Date(storeValue[i].id)        
        var note_log = `
            <div class="note-log">
                <header class="title">
                    <h2>${storeValue[i].noteName}</h2>
                    <button id="btnTrash">Trash</button>
                </header>
                <div class="content">
                    <textarea name="" id="textAreaId"  cols="30" rows="10" placeholder="Notes here..."></textarea>
                </div>
                <div class="date">
                    ${date.toDateString()}
                </div>
            </div>
        `;

        main_container.innerHTML += note_log;
        var textAreaId = document.querySelectorAll('#textAreaId');
        textAreaId.forEach((el, index) => {
            el.addEventListener('blur', (event) => {
                console.log(storeValue[index])
                storeValue[index].content.push({
                    text: event.target.value
                });
                localStorage.setItem('note', JSON.stringify(storeValue));
            })
            storeValue[index].content.forEach(newEl => {
                console.log(newEl.text)
                el.value = newEl.text;
            })
            
        })
     
        var btnTrash = document.querySelectorAll('#btnTrash');
        btnTrash.forEach((el, index) => {
            el.addEventListener('click', () => {
                storeValue.splice(index, 1)
                localStorage.setItem('note', JSON.stringify(storeValue));
                window.location.reload();
            })
        })

    }
}

getNoteArr();

var modal = document.querySelector('.modal');
var txt_name = document.getElementById('txt_name');
var txt_header_unname = document.querySelector('.txt_header_unname');

btnOkay.addEventListener('click', () => {
    if (txt_name.value === "") {
        alert("Please type name")        
    } else {
        modal.style.display = "none";
        localStorage.setItem('name', txt_name.value);
        window.location.reload();
    }
})

txt_header_unname.textContent = localStorage.getItem('name');
if (localStorage.getItem('name')) {
    modal.style.display = "none";
}