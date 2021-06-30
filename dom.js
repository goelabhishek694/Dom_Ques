let button=document.querySelectorAll('.delete');
let lis=document.querySelectorAll('li');
let ul=document.querySelector('#book-list ul');

for(let i=0;i<button.length;i++){
    button[i].addEventListener('click',function(){
        console.log("button is called");
    });
}

for(let i=0;i<lis.length;i++){
    lis[i].addEventListener('dbclick',function(){
        console.log("lis is called");
    });
}

ul.addEventListener('click',function(){
    console.log("ul is called");
});



