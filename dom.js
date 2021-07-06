let button=document.querySelectorAll('.delete');
let lis=document.querySelectorAll('li');
let ul=document.querySelector('#book-list ul');

// bubbling example
// for(let i=0;i<button.length;i++){
//     button[i].addEventListener('click',function(){
//         console.log("button is called");
//     });
// }

// for(let i=0;i<lis.length;i++){
//     lis[i].addEventListener('dbclick',function(){
//         console.log("lis is called");
//     });
// }

// ul.addEventListener('click',function(){
//     console.log("ul is called");
// });
//bubbling example ends

// deleting element using bubbling concept
ul.addEventListener("click",function(e){
    console.log(e.target.parentElement);
    if(e.target.className=="delete"){
        let li=e.target.parentElement;
        ul.removeChild(li);
    }
})


const addBook=document.forms["add-book"];
addBook.addEventListener("submit",function(e){
    e.preventDefault();
    let book=addBook.querySelector('input[type="text"]').value;

// creating elements
const li=document.createElement('li');
const bookName=document.createElement('span');
const deleteBtn=document.createElement('span');
//apending children
li.appendChild(bookName);
li.appendChild(deleteBtn);
ul.appendChild(li);

//adding class
bookName.classList.add("name");
deleteBtn.classList.add("delete");

bookName.textContent=book;
deleteBtn.textContent="delete";

});

