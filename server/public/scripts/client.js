//confirm js script sourced
// console.log('Ready, Set...');

//call jQuery
$(document).ready(onReady)

//functions to run upon DOM render
function onReady(){
    // console.log('GO!');
    getAndRenderTasks();
    $('#taskSubmit').on('click', postTask);
    $('#taskList').on('click', '.markComplete', changeCompletionStatus);
    $('#taskList').on('click', '.deleteTask', deleteTaskFromDatabase);
}

//get request
function getAndRenderTasks(){
    console.log('getting tasks');
    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
    .then((res) => {
        renderTasks(res);
    })
    .catch((err) => {
        console.log('GET http request failed', err);
    })
}

//render tasks
function renderTasks(array){
    $('#taskList').empty();
    for (let item of array){
        // console.log(removeTime(item.date_completed));
        $('#taskList').append(`
        <tr ${conditionallyAddTaskClass(item)} data-id=${item.id}>
            <td class="border border-dark">${removeTime(item.date)}</td>
            <td class="border border-dark">${item.task}</td>
            <td class="border border-dark">${item.complete}</td>
            <td class="border border-dark"><button 
            class="markComplete rounded-circle btn btn-success" ${disableIfComplete(item)}>
            ✓ </button></td>
            <td class="border border-dark">${removeTime(item.date_completed)}</td>
            <td class="border border-dark"><button class="deleteTask btn btn-danger"> Delete </button></td>
        </tr>
        `)
    }
}

//make new task object from input fields
function createNewTask(){
    let newTask = {
        date: $('#dateInput').val(),
        task: $('#discInput').val(),
        complete: 'N'
    };
    return newTask;
}

//post new task to server then re-render DOM
function postTask(){
    console.log('posting to server');
    let newTask = createNewTask();
    clearInputs();
    // console.log(newTask);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then((res) => {
        console.log(res);
        getAndRenderTasks();
    })
    .catch((err) => {
        console.log('POST http request failed', err);
    })
}

//post request
function changeCompletionStatus(){
    console.log('complete button working');
    let completeDate = captureCompleteDate();
    let idToUpdate = $(this).parent().parent().data().id;
    console.log(idToUpdate);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`,
        data: {date_completed: completeDate} 
    })
    .then((res)=>{
        getAndRenderTasks();
    })
    .catch((err)=>{
        console.log('error in PUT request', err);
    })
    }

//delete request    
function deleteTaskFromDatabase(){
    console.log('delete button working');
    let idToDelete = $(this).parent().parent().data().id;
    console.log(idToDelete);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}` 
    }).then((res)=>{
        getAndRenderTasks();
    })
    .catch((err)=>{
        console.log('error in DELETE request', err);
    })
    }


//conditional render background for completed tasks
function conditionallyAddTaskClass(task){
if (task.complete === 'Y'){
    return 'class="finished-task"';
} else {
    return 'class="to-do-task"';
}
}

//conditional disable complete button if task already complete
function disableIfComplete (task){
    if (task.complete === 'Y'){
        return 'disabled'
    } 
}

//reformat sql date function 
function removeTime(SQLdate){
    if (SQLdate === null){
        return 'task not complete'
    } else {
    let newDate = '';
    for (let i = 0; i < 10; i++){
        newDate += SQLdate[i];
    }
    return newDate;
    }
} //



//clear inputs
function clearInputs(){
    $('#dateInput').val('');
    $('#discInput').val('');
}


function captureCompleteDate(){
    let newDate = formatDate(new Date());
    return newDate;
}

//capture and format date
//got code from https://bobbyhadz.com/blog/javascript-format-date-dd-mm-yyyy

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
].join('-');
}