//confirm js script sourced
// console.log('Ready, Set...');

//call jQuery
$(document).ready(onReady)

//functions to run upon DOM render
function onReady(){
    // console.log('GO!');
    getAndRenderTasks();
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
        console.log('GET http request could not be completed', err);
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
        </tr>
        `)
    }
}

//reformat sql date function 
function removeTime(SQLdate){
    let newDate = '';
    for (let i = 0; i < 10; i++){
        newDate += SQLdate[i];
    }
    return newDate;
} //find a way to make the date look nicer 