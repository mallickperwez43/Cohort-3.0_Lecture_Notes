function addToDo(){
    const value = document.querySelector("input").value;
    const spanEL = document.createElement("span");
    const buttonEL = document.createElement("button");
    spanEL.innerHTML = value;
    buttonEL.innerHTML = "Delete";
    
    const divEL = document.createElement("div");
    divEL.appendChild(spanEL);
    divEL.appendChild(buttonEL);

    document.querySelector("body").appendChild(divEL);
}