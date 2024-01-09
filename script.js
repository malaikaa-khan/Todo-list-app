let input=document.querySelector(".input");
let btn=document.querySelector("#plus");
let newBtn=btn.innerHTML;
let record=document.querySelector(".items");
let userArray=[];
let editInfo= null;

let objstr = localStorage.getItem('users');
if(objstr!=null){
	
    userArray = JSON.parse(objstr);
}
display();
console.log(userArray);

btn.onclick=()=>{
	const name =input.value; 
	if(editInfo!=null){
		//edit
		userArray.splice(editInfo,1,{'name': name});
		editInfo=null;
	}else{
		userArray.push({'name': name});
	}
	saveInfo(userArray);
	input.value = '';
	
	btn.innerHTML=newBtn;
	
}


function saveInfo(userArray){
	let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   display();
}


function display(){
  let statement ='';
  userArray.forEach((user,i) => {
	statement +=`	<div class="todo-list">
	<div class="todo-content">
	    <h3>${user.name}</h3>
	</div>
	   <div class="actions">
		   <button class="btn edit" onclick=edit(${i})><i class="fa-regular fa-pen-to-square"></i></button>
		   <button class="btn delete" onclick=delet(${i})><i class="fa-solid fa-trash-can"></i></button>

	   </div>
    </div>`
  });
   record.innerHTML=statement;
}


function delet(id){
    userArray.splice(id,1);
	saveInfo(userArray);
	display();
}


function edit(id){
     editInfo=id;
	 input.value=userArray[id].name;
	 btn.innerHTML =`<i class="fas fa-save"></i>`;
}
