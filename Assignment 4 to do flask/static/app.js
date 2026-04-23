const API="/api/tasks";


async function loadTasks(){

let res=
await fetch(API);

let data=
await res.json();

showTasks(data);

}



async function addTask(){

let title=
document.getElementById(
"title"
).value;

let description=
document.getElementById(
"desc"
).value;

let priority=
document.getElementById(
"priority"
).value;


if(title==""){
alert("Enter task title");
return;
}



await fetch(API,{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

title,
description,
priority

})

});


document.getElementById(
"title"
).value="";

document.getElementById(
"desc"
).value="";


loadTasks();

}



function showTasks(tasks){

let list=
document.getElementById(
"taskList"
);

list.innerHTML="";

let completed=0;


tasks.forEach(t=>{

if(t.completed)
completed++;

let li=
document.createElement("li");

li.className=
t.completed?
"completed":
"";


li.innerHTML=`

<input
type="checkbox"
${t.completed?"checked":""}
onchange=
"toggleTask(${t.id})"
>

<b>${t.title}</b>

<br>

${t.description}

<br>

<span class=
badge-${t.priority.toLowerCase()}>
${t.priority}
</span>

<br>

<button onclick=
"editTask(${t.id})">
Edit
</button>

<button onclick=
"deleteTask(${t.id})">
Delete
</button>

`;

list.appendChild(li);

});


document.getElementById(
"counter"
).innerText=

"Completed "
+completed+
" / Total "
+tasks.length;

}



async function toggleTask(id){

await fetch(
API+"/"+id+"/toggle",
{
method:"PATCH"
}
);

loadTasks();

}



async function deleteTask(id){

await fetch(
API+"/"+id,
{
method:"DELETE"
}
);

loadTasks();

}



async function editTask(id){

let title=
prompt(
"Enter New Title"
);

let description=
prompt(
"Enter Description"
);

let priority=
prompt(
"Low / Medium / High"
);


await fetch(
API+"/"+id,
{

method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
title,
description,
priority
})

}
);


loadTasks();

}



async function filterTasks(type){

let res=
await fetch(
API+"?status="+type
);

let data=
await res.json();

showTasks(data);

}


loadTasks();