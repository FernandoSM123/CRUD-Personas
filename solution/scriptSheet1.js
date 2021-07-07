var e;

function Person(nombre,apellido,edad){
this.nombre=nombre;
this.apellido=apellido;
this.edad=edad;
}

function insertPerson(){

    var nombre=document.forms["myForm1"]["nombre1"].value;
    var apellido=document.forms["myForm1"]["apellido1"].value;
    var edad=document.forms["myForm1"]["edad1"].value;
    
    if(nombre == null || nombre.length==0){
    alert("ERROR:"+'\n'+"Nombre no ingresado");
    return false;
    }   
    else if(apellido == null || apellido.length==0){
    alert("ERROR:"+'\n'+"Apellido no ingresado");
    return false;
    }
    else if(isNaN(edad) || edad<1 || edad>100){
    alert("ERROR:"+'\n'+"1-Edad no ingresada"+'\n'+"2-Edad debe ser un número entre(1-100)");
    return false;
    }
    else{
    var obj=new Person(nombre,apellido,edad);
    
    //clear inputs
    document.getElementById("formNombre1").value="";
    document.getElementById("formApellido1").value="";
    document.getElementById("formEdad1").value="";
    
    appendObjectToLocalStorage(obj);
    }
}

function appendObjectToLocalStorage(obj) {
    var persons = [],
    dataInLocalStorage = localStorage.getItem("Persons");

    if (dataInLocalStorage !== null) {
    persons = JSON.parse(dataInLocalStorage);
    }                
    persons.push(obj);
    localStorage.setItem("Persons", JSON.stringify(persons));
    loadFromLocalStorage();
}

function loadFromLocalStorage(){
    
    var persons = [],
    dataInLocalStorage = localStorage.getItem("Persons"),
    tableBody = document.querySelector("#myTable tbody");

    if (dataInLocalStorage !== null) {
    persons = JSON.parse(dataInLocalStorage);
    document.getElementById("txt1").style.display = "none";
    }
    else
    document.getElementById("txt1").style.display = "block";

    tableBody.innerHTML = '';
    persons.forEach(function (x, i) {
    var tr = document.createElement("tr"),
    tdNombre = document.createElement("td"),
    tdApellido = document.createElement("td"),
    tdEdad = document.createElement("td"),
    tdUpdate = document.createElement("td"),
    tdRemove = document.createElement("td"),
    btnUpdate = document.createElement("button"),
    btnRemove = document.createElement("button");

    tdNombre.innerHTML = x.nombre;
    tdApellido.innerHTML = x.apellido;
    tdEdad.innerHTML = x.edad;

        
    //Update button
    btnUpdate.textContent = 'Actualizar';
    btnUpdate.addEventListener('click', function(){
    update(x,i);
    });
    tdUpdate.appendChild(btnUpdate);
        
    //Remove button
    btnRemove.textContent = 'Eliminar';
    btnRemove.addEventListener('click', function(){
    removeFromLocalStorage(i);
    });
    tdRemove.appendChild(btnRemove);

    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEdad);
    tr.appendChild(tdUpdate);
    tr.appendChild(tdRemove);

    tableBody.appendChild(tr);
    });
}


function removeFromLocalStorage(index){
    var persons = [],
    dataInLocalStorage = localStorage.getItem("Persons");

    persons = JSON.parse(dataInLocalStorage);

    persons.splice(index, 1);
    
    if(persons.length===0)
    localStorage.clear();
    else
    localStorage.setItem("Persons", JSON.stringify(persons));

    loadFromLocalStorage();
}

function update(obj,index){
document.getElementById("overlay").style.visibility="visible";
document.getElementById("formNombre2").value=obj.nombre;
document.getElementById("formApellido2").value=obj.apellido;
document.getElementById("formEdad2").value=obj.edad;
e=function() {updateDataFromLocalStorage(index)};
document.getElementById("actualizar").addEventListener("click",e);
}

  function updateDataFromLocalStorage(i){

    var nombre=document.getElementById("formNombre2").value;
    var apellido=document.getElementById("formApellido2").value;
    var edad=document.getElementById("formEdad2").value;
    
    if(nombre == null || nombre.length==0){
    alert("ERROR:"+'\n'+"Nombre no ingresado");
    return false;
    }   
    else if(apellido == null || apellido.length==0){
    alert("ERROR:"+'\n'+"Apellido no ingresado");
    return false;
    }
    else if(isNaN(edad) || edad<1 || edad>100){
    alert("ERROR:"+'\n'+"1-Edad no ingresada"+'\n'+"2-Edad debe ser un número entre(1-100)");
    return false;
    }
    else{
    var obj=new Person(nombre,apellido,edad);
    var persons = [],
    dataInLocalStorage = localStorage.getItem("Persons");

    persons = JSON.parse(dataInLocalStorage);             
    persons[i]=obj;
    localStorage.setItem("Persons", JSON.stringify(persons));
    loadFromLocalStorage();
    hidePopUp();
    }
}


function clearAll(){
var answer = confirm("¿Realmente desea limpiar por completo el registro?");
if(answer){
localStorage.clear();
document.querySelector("#myTable tbody").innerHTML="";
document.getElementById("txt1").style.display = "block";
}
}

function CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}

function hidePopUp(){
document.getElementById("overlay").style.visibility="hidden";
document.getElementById("actualizar").removeEventListener("click",e);
}


