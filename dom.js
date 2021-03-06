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

// serch bar 
const searchBook=document.forms["search-books"].querySelector('input');
searchBook.addEventListener("keyup",function(e){
    let val=e.target.value.toLowerCase();
    const books=ul.getElementsByTagName('li');
    // console.log(books);
    for(let i=0;i<books.length;i++){
        const title=books[i].querySelector('.name').textContent.toLowerCase();
        if(title.includes(val)){
            books[i].style.display="block";
        }
        else{
            books[i].style.display="none";
        }
    }

});

//tabbed content

let tabs=document.querySelector(".tabs");
let panels=document.querySelectorAll(".panel");
console.log(panels);
tabs.addEventListener("click",function(e){
    // console.log(e.target.tagName);
    if(e.target.tagName=="LI"){
        console.log("clicked");
        let currTab=e.target;
        // let allTabs=tabs.querySelectorAll("li");
        // allTabs.forEach((tab)=>{
        //     tab.classList.remove("active");
        //     tab.style.display=""
        // })
        // currTab.classList.add("active");
        panels.forEach(panel=>{
            panel.classList.remove("active");
        })
        let id=currTab.getAttribute("data-target");
        console.log(id);
        let currPanel=document.querySelector(id);
        currPanel.classList.add("active");
    }
});

