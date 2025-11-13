const HomePage = document.getElementById("book-and-card-page");
const CommonPart = document.getElementById("common-part");
const CardDisplayPage = document.getElementById("card-page");
const CreatePage = document.getElementById("form-page");
const UpdatePage = document.getElementById("form-to-update-page");

const tableBtn = document.getElementById("table-btn");
const cardBtn = document.getElementById("card-btn");

const plusBtn = document.getElementById("plus-btn");
const backBtnOnUpdatePage = document.getElementById("back-btn-update-page");
const backBtnOnCreatePage = document.getElementById("back-btn");


const NameColForTable = document.getElementById("added-to-table-col-name");
const TitleColForTable = document.getElementById("added-to-column-title");
const AuthorColForTable = document.getElementById("added-to-column-author");
const PublishYrColForTable = document.getElementById("added-to-column-publish-year");
const OperationColForTable = document.getElementById("added-to-column-operations");


let current = "table"; // bc the current part is 

CommonPart.style.display = "block";
HomePage.style.display = "block";

// all the three pages will be hidden
[UpdatePage , CardDisplayPage , CreatePage].forEach(
    hiddenPages => {
        hiddenPages.style.display = "none";
    }
)



tableBtn.addEventListener('click' , (e) => {
    current = "table";
    CommonPart.style.display = "block";
    HomePage.style.display = "block";
    CardDisplayPage.style.display = "none";
    UpdatePage.style.display = "none";

})

cardBtn.addEventListener('click' , (e) => {
    current = "card";
    CommonPart.style.display = "block";
    HomePage.style.display = "none";
    UpdatePage.style.display = "none";
    CardDisplayPage.style.display = "grid";
})




plusBtn.addEventListener('click' , (e) => {
    // create book page will be visible
    CommonPart.style.display = "none";
    HomePage.style.display = "none";
    CardDisplayPage.style.display = "none";
    CreatePage.style.display = "block";
    UpdatePage.style.display = "none";
})


let ArrayOfBtns = [backBtnOnCreatePage , backBtnOnUpdatePage];

ArrayOfBtns.forEach(
    backBtn => backBtn.addEventListener( 'click'  , ()  => {
        CommonPart.style.display = "block";
        let InvisibleParts = [ CreatePage , UpdatePage]
        

        if (current === "table"){
            // then make the table page visible
            HomePage.style.display = "block";
            InvisibleParts.push(CardDisplayPage);

        }

        else{
            CardDisplayPage.style.display = 'block';
            InvisibleParts.push(HomePage);
        }

        InvisibleParts.forEach( invisible => {
            invisible.style.display = "none";
        })
    }
)
)

// then u do a request for the info which will be returned as an array of json files
function CreateADivAndAppendToTableCol(JsonObj){
    // this will return a div to be added to the column
    // {id , title , author , publishedYr}

    // then associate the id with operations div
    // and put the other values to the cols

    // for each value of the object create a div and append


}


function CreateDiv(value){
    // if id is given associate it

    let NewDiv = document.createElement('div');

    NewDiv.innerText = value;
    NewDiv.classList.add('to-be-bordered')

    return NewDiv;
}


function CreateOperationsDiv(id){
    // the new div will have the operations elemetns + the id 
}





