//confirm js script sourced
// console.log('Ready, Set...');

//call jQuery
$(document).ready(onReady)

//functions to run upon DOM render
function onReady(){
    // console.log('GO!');
    getAndRenderTasks();
    $('#taskSubmit').on('click', postTask);
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
        $('#taskList').append(`
        <tr data-id=${item.id}>
            <td>${removeTime(item.date)}</td>
            <td>${item.freq}</td>
            <td>${item.task}</td>
            <td>${item.complete}</td>
            <td><button class="markComplete"> ✔️ </button></td>
            <td><button class="deleteTask"> Delete </button></td>
        </tr>
        `)
    }
}

//make new task object from input fields
function createNewTask(){
    let newTask = {
        date: $('#dateInput').val(),
        freq: $('#freqInput').val(),
        task: $('#discInput').val(),
        complete: 'N'
    };
    return newTask;
}

//post new task to server then re-render DOM
function postTask(){
    console.log('posting to server');
    let newTask = createNewTask();
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

//reformat sql date function 
function removeTime(SQLdate){
    let newDate = '';
    for (let i = 0; i < 10; i++){
        newDate += SQLdate[i];
    }
    return newDate;
} //find a way to make the date look nicer 