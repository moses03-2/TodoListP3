//De element som behövs
const boxIn = document.querySelector(".inputField input")
const btn = document.querySelector(".inputField button")
const todoLista = document.querySelector(".todoLista")
const deleteAll = document.querySelector(".footer button")

boxIn.onkeyup = ()=>{
    let userD = boxIn.value; //Får värdet som användaren skrivit in 
    if(userD.trim() != 0){  //Om värdet användaren matar in inte bara är mellanslag
        btn.classList.add("active"); //Så aktiveras plus knappen
    }else{
        btn.classList.remove("active"); //Annars avaktiveras den
    }
}

showTask(); //Anropar showTask funktionen

btn.onclick = ()=>{
    let userD = boxIn.value; //Får användarens värde
    let getLocalStorage = localStorage.getItem("Ny Todo"); //Använder localstorage
    if(getLocalStorage == null){  //Om localstorage är null
        listArr = []; //En blank array skapas
    }else{
        listArr = JSON.parse(getLocalStorage); //Omvandlar string till ett objekt
    }
    listArr.push(userD); //Lägger till användarens data
    localStorage.setItem("Ny Todo", JSON.stringify(listArr)); //Omvandlar objekt till string
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
    antal.textContent = listArr.length; //Får arrayens längd värde in i antal 
    if(listArr.length > 0){ //Om arrayen är större än 0 
        deleteAll.classList.add("active") //Aktiveras "Tabort alla" knappen
    }else{
        deleteAll.classList.remove("active") //Annars avaktiveras den
    }
    let newTag = "";
    listArr.forEach((element, index) => {
        newTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoLista.innerHTML = newTag; //Lägger till nya li taggar i ul
    boxIn.value = ""; //När användaren har matat in så blir input field blankt
}

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("Ny Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //Tar bort en specifik li 
    //Localstorage uppdateras 
    localStorage.setItem("Ny Todo", JSON.stringify(listArr)); 
    showTask();
}

deleteAll.onclick = ()=>{
    listArr = []; //Gör Arrayen tom
    localStorage.setItem("Ny Todo", JSON.stringify(listArr));
    showTask();
}