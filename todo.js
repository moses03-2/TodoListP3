const boxIn = document.querySelector(".inputField input")
const btn = document.querySelector(".inputField button")
const todoLista = document.querySelector(".todoLista")
const deleteAll = document.querySelector(".footer button")

boxIn.onkeyup = ()=>{
    let userD = boxIn.value;
    if(userD.trim() != 0){
        btn.classList.add("active"); 
    }else{
        btn.classList.remove("active"); 
    }
}

showTask();

btn.onclick = ()=>{
    let userD = boxIn.value;
    let getLocalStorage = localStorage.getItem("Ny Todo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userD);
    localStorage.setItem("Ny Todo", JSON.stringify(listArr));
    showTask();
    btn.classList.remove("active"); 
}

function showTask(){
    let getLocalStorage = localStorage.getItem("Ny Todo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const antal = document.querySelector(".antal")
    antal.textContent = listArr.length;
    if(listArr.length > 0){
        deleteAll.classList.add("active")
    }else{
        deleteAll.classList.remove("active")
    }
    let newTag = "";
    listArr.forEach((element, index) => {
        newTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoLista.innerHTML = newTag;
    boxIn.value = "";
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("Ny Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("Ny Todo", JSON.stringify(listArr));
    showTask();
}

deleteAll.onclick = ()=>{
    listArr = [];
    localStorage.setItem("Ny Todo", JSON.stringify(listArr));
    showTask();
}