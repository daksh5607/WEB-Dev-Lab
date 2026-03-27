const API = "http://localhost:3000/tasks";

function loadTasks(){
fetch(API)
.then(res=>res.json())
.then(data=>{
displayTasks(data);
});
}

function addTask(){

let title=document.getElementById("taskTitle").value;
let priority=document.getElementById("priority").value;

if(title===""){
alert("Task cannot be empty");
return;
}

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({title,priority})
})
.then(()=>loadTasks());

}

function deleteTask(id){

fetch(API+"/"+id,{
method:"DELETE"
})
.then(()=>loadTasks());

}

function toggleTask(id){

fetch(API+"/"+id+"/status",{
method:"PATCH"
})
.then(()=>loadTasks());

}

function displayTasks(tasks){

let list=document.getElementById("taskList");
list.innerHTML="";

let completed=0;

tasks.forEach(task=>{

let li=document.createElement("li");

if(task.isDone==1){
li.classList.add("completed");
completed++;
}

li.innerHTML=`
<span onclick="toggleTask(${task.id})">
${task.title} (${task.priority})
</span>

<button onclick="deleteTask(${task.id})">Delete</button>
`;

list.appendChild(li);

});

document.getElementById("counter").innerText=
"Completed: "+completed+" / Total: "+tasks.length;

}

loadTasks();
