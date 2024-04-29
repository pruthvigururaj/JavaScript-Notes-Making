const addBox=document.querySelector('.add-box');

const popupBox=document.querySelector('.popup-box');

const closeIcon=popupBox.querySelector('header i');

const paragraph=popupBox.querySelector('header p');

const addbtn=popupBox.querySelector('button');

const inputTag=popupBox.querySelector('input');

const textTag=popupBox.querySelector('textarea');

const monthName=['January','February','March','April','May','June','July','August','September','October','November','December'];

let notes=JSON.parse(localStorage.getItem('notes') || '[]');
let update=false;
let updateind;

function showCase()
{
    document.querySelectorAll('.note').forEach(note=>note.remove());
    notes.forEach((note,index) => {
        let liTag=`<li class="note">
    <div class="details">
        <p>${note.title}</p>
        <span>${note.description}</span>
    </div>
    <div class="bottom-content">
        <span>${note.date}</span>
        <div class="settings">
            <i class="material-symbols-outlined">
                more_horiz
        </i>
        <div class="menu">
            <div onclick="editNote(${index})" class="menu-item"><i class="material-symbols-outlined">
                edit
            </i>Edit</div>
            <div onclick="deleteNote(${index})"  class="menu-item">
                <i class="material-symbols-outlined">
                    delete
                </i>Delete
            </div>
        </div>
        
        </div>
    </div>
</li>`
addBox.insertAdjacentHTML('afterend',liTag);

    });
    
}
showCase();

function editNote(ele)
{
    popupBox.classList.add('show');
    inputTag.value=notes[ele].title;
    textTag.value=notes[ele].description;
    update=true;
    updateind=ele;
    addbtn.innerText="Update Note";
    paragraph.innerText="Update Note";
    
}
function deleteNote(ele)
{
    notes.splice(ele,1);
    localStorage.setItem('notes',JSON.stringify(notes));
    showCase();

}
addBox.addEventListener('click',()=>{
    addbtn.innerText="Add Note";
    paragraph.innerText="Add New Note";
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click',()=>{
    inputTag.value="";
    textTag.value="";
    popupBox.classList.remove('show');
});

addbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let noteTitle=inputTag.value;
    let textTitle=textTag.value;
    if(noteTitle || textTitle)
    {
        let dateobj=new Date();
        let month=monthName[dateobj.getMonth()];
        let date=dateobj.getDate();
        let year=dateobj.getFullYear();

        let noteInfo={
            title:noteTitle,
            description:textTitle,
            date:`${month} ${date} ${year}`
        }
        if(update==false)
        {
            notes.push(noteInfo);
        }
        else
        {
            notes[updateind]=noteInfo;
            update=false;
        }
        
       
       

        localStorage.setItem('notes',JSON.stringify(notes));
        showCase();
        popupBox.classList.remove('show');
    }
});