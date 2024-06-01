// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function displayTime() {
    const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const prefix = 'Task-';
    const randomNumber = Math.floor(Math.random() * 1000);
    const taskId = prefix +randomNumber.toString();
    
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>');

    taskCard.addClass('card task-card draggable my-3');
    taskCard.attr('task-id', task.id)

    const cardHeader = $('<div>')
        .addClass('card-header h4')
        .text(task.name);
    const cardBody = $('<div')
        .addClass('card-body')
    const cardDescription = $('<p>')
        .addClass('card-text')
        .text(task.description);
    const cardDueDate = $('<p>')
        .addClass('card-text')
        .text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('task-id', task.id);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        }
        else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
