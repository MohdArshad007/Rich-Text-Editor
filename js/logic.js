window.onload = function(){
    workbook.document.designMode = "On";
    var x = localStorage.length;
    var tbody = document.getElementById("tbody");
    for(let i = 0; i < x; i++){
        var fileName = localStorage.key(i);
        var tr = document.createElement("TR");
        var td_name = document.createElement("TD");
        var td_edit = document.createElement("TD");
        var td_delete = document.createElement("TD");

        var edit = document.createElement("I");
        edit.className = "fa fa-edit edit";
        var del = document.createElement("I");
        del.className = "fa fa-trash del";
        td_name.className = "name";
        // ADD DATA
        td_name.innerHTML = fileName;
        td_edit.append(edit);
        td_delete.append(del);
        tr.append(td_name);
        tr.append(td_edit);
        tr.append(td_delete);
        // ADD ROW
        tbody.append(tr);

    }
    // FILE DELETE CODING
    function deleteFile(){
        var del = document.querySelectorAll(".del");
        del.forEach(index=>{
            index.onclick = function(){
                var tr = index.parentElement.parentElement;
                var td = tr.querySelector(".name");
                var fileName = td.innerHTML;
                var response = confirm("Do you want to delete");
                if(response == true){
                    localStorage.removeItem(fileName);
                    tr.remove();
                }
            }
        });          
    }
    deleteFile();
    // FILE EDIT CODING
    function editFile(){
        var edit = document.querySelectorAll(".edit");
        var hide = document.querySelector("#hideModal");
        var input = document.querySelector("#file-name");
        edit.forEach(index=>{
            index.onclick = function(){
                var tr = index.parentElement.parentElement;
                var td = tr.querySelector(".name");
                var fileName = td.innerHTML;
                var data = localStorage.getItem(fileName);
                workbook.document.body.innerHTML = data;
                input.value= fileName;
                hide.click();
            }
        });          
    }
    editFile();

}
function myCmd(cmd){
    workbook.document.execCommand(cmd,false,null);
}

function myCmdWithArg(cmd,arg){
    workbook.document.execCommand(cmd,false,arg);
}
function save(){
    var fileName = document.getElementById("file-name");
    if(fileName.value == ""){
        alert("Please Enter file name");
        fileName.focus();
        return false;
    } else {
        var data = workbook.document.body.innerHTML;
        localStorage.setItem(fileName.value,data);
        alert("Success!");
        history.go(0);
    }
    fileName.value = "";
}

var editor = "true";
function editorToggle(elm){
    if(editor == "true"){
        workbook.document.body.innerText = workbook.document.body.innerHTML;
        elm.classList.remove("btn-dark")
        elm.classList.add("btn-success");
        editor = "false";
    } else{
        workbook.document.body.innerHTML = workbook.document.body.innerText;
        elm.classList.remove("btn-success");
        elm.classList.add("btn-dark")
        editor = "true";
    }
}

function editorOnOff(elm){
    if(elm.innerHTML == "Editor On"){
        elm.innerHTML = "Editor Off";
        elm.style.background = "#ddd";
        elm.style.color = "#000";
        workbook.document.designMode = "Off";
    } else {
        elm.innerHTML = "Editor On";
        elm.style.background = "#000";
        elm.style.color = "#fff";
        workbook.document.designMode = "On";
    }
}
workbook.document.addEventListener("keydown",function(e){
    // 17 83 79 27
    if(e.keyCode == 27){
        document.querySelector("#hideModal").click();
    }
    if(!e.ctrlKey) return;
    if(e.keyCode == 83){
        e.preventDefault();
        save();
    } else if(e.keyCode == 79){
        e.preventDefault();
        document.querySelector("#open-file").click();
    }
});
document.addEventListener("keydown",function(e){
    // 17 83 79 27
    if(e.keyCode == 27){
        document.querySelector("#hideModal").click();
    }
    if(!e.ctrlKey) return;
    if(e.keyCode == 83){
        e.preventDefault();
        save();
    } else if(e.keyCode == 79){
        e.preventDefault();
        document.querySelector("#open-file").click();
    }
});
