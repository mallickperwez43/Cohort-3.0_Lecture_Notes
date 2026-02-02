let todos = [];
function addToDo() {
    todos.push({
        title: document.querySelector("input").value
    })
    render();
}

function deleteLastTodo(){
    todos.splice(todos.length - 1, 1);
    render()
}

function deleteTodo(i) {
    todos.splice(i, 1);  
    render();
}
 
function createToDoComponent(todo, index){
    const divEl = document.createElement("div");
    const spanEl = document.createElement("span");
    const buttonEL = document.createElement("button");

    spanEl.innerHTML = todo.title;
    buttonEL.innerHTML = "delete";
    buttonEL.setAttribute("click", ()=>{
        deleteTodo(i);
    });
    
    divEl.append(spanEl);
    divEl.append(buttonEL);
   
    return divEl;
}

function render() {
    document.querySelector("#todos").innerHTML = ""
    for(let i = 0; i < todos.length; i++){
        const element = createToDoComponent(todos[i] ,i);
       
        document.querySelector("#todos").appendChild(element);
    }
}