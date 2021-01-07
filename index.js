let form = document.querySelector('.book-form')
let list  =  document.querySelector('.book-list')


form.addEventListener('submit',addBookList)
list.addEventListener('click',removeBook)
document.addEventListener('DOMContentLoaded',getDataFromLS)

 
// define Class

class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}



class UI{
    static  addToBookList(book){

        let row = document.createElement('tr')
        row.innerHTML = 
        `<th scope="row">${book.title}</th>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = 'btn btn-danger btn-sm delete'>X</a></td>`
        list.appendChild(row)

    }
    static  showAlert(message,classname){

        let container = document.querySelector('.container')
        let div = document.createElement('div')
        div.className = `alert ${classname}`
        div.appendChild(document.createTextNode(message))
        container.insertBefore(div,form)

        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },1000)
    }
    static  clear(){

        
 document.querySelector('#title').value = ''
 document.querySelector('#author').value = ''
 document.querySelector('#isbn').value = ''

    }
  
}

class StoreinLs{

    static  getBookfromLs(){
        let books
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }
    static  addBookInLs(book){

       let books = StoreinLs.getBookfromLs()
       
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
          
  
      }
      static  removefromLS(isbn){
        let books = StoreinLs.getBookfromLs()
         books.forEach((book,index) =>{
             if(book.isbn.trim() == isbn){
                 books.splice(index,1)

             }

         })
         localStorage.setItem('books',JSON.stringify(books))
  
      }
}






///funnction    
function addBookList(e){
 let title = document.querySelector('#title').value
 let author= document.querySelector('#author').value
 let isbn  = document.querySelector('#isbn').value

if(title === '' || author ===  ''  || isbn === '' ){
    UI.showAlert('Fill the Field Correctly' ,'error')
}
else{
    let book  = new Book(title,author,isbn)
    UI. addToBookList(book)
    StoreinLs.addBookInLs(book)
    UI.showAlert('Added SuccessFully','success')  
}
UI.clear()
e.preventDefault()
}

function removeBook(e){
 if(e.target.hasAttribute('href')){
     let ele = e.target.parentElement.parentElement
     ele.remove()
     StoreinLs.removefromLS( e.target.parentElement.previousElementSibling.textContent.trim())
     UI.showAlert('Removed SuccessFully','success')
 }
}
 function getDataFromLS(){

     let books = StoreinLs.getBookfromLs()
     books.forEach((book)=> UI.addToBookList(book))

 }