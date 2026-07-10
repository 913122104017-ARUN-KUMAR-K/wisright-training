const input=document.getElementById('taskInput');
const btn=document.getElementById('addBtn');
const ul=document.getElementById('taskList');
btn.addEventListener("click",(e)=>{
        
        if(input.value.trim()==="")
            return;
        const li=document.createElement("li");
        li.textContent=input.value;
        const del = document.createElement("button");
        del.textContent="delete"
        del.style.backgroundColor="red";
        let checkbox = document.createElement("input");
checkbox.type = "checkbox";
 li.appendChild(checkbox)
        li.appendChild(del);
        ul.appendChild(li);
        del.addEventListener("click",(e)=>{
    e.target.parentElement.remove(); 
})
checkbox.addEventListener("change", function () {
    li.classList.toggle("completed");
});
})

