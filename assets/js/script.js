// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskDisplayEl =$('#taskDisplay')
const taskFormEl = $('#taskForm')
const taskNameInputEl = $('#taskName')
const taskDescriptionInputEl = $('#taskDescription')
const taskDateInputEl = $('#taskDueDate')

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
    console.log(task);
    const taskCard = $('<div>');

    taskCard.addClass('card task-card draggable my-3');
    taskCard.attr('taskId', task.id)

    const cardHeader = $('<div>')
        .addClass('card-header h4')
        .text(task.name);
    const cardBody = $('<div>')
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
        .attr('taskId', task.id);

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
    console.log(taskCard);
    return taskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log('here');
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(tasks);
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    tasks.forEach(task => {
        console.log(task.status);
        if (task.status === 'to-do') {
            $('#todo-cards').append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(createTaskCard(task));
        } else if (task.status === 'done') {
            $('#done-cards').append(createTaskCard(task));
        }
    });
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    console.log('here 2')
    event.preventDefault();
        const taskName = $('#taskName').val();
        const taskDescription = $('#taskDescription').val();
        const taskDueDate = $('#taskDueDate').val();

        const newTask = {
            id: generateTaskId(),
            name: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            status: 'to-do',
        };
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList))

       //createTaskCard(taskList);

        renderTaskList();
        $('#formModal').hide();
    }

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    $('.close').click(function() {
        $('#taskModal').hide();
    });

     $('#taskList').on('click', '.delete', function() {
        const taskId = $(this).attr('taskId');

        const taskIndex = task.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);

            renderTaskList(tasks);
        }
    });
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = renderTaskList();
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus= event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    
    taskFormEl.on('submit', handleAddTask)

    taskDisplayEl.on('click', '.btn', handleDeleteTask)
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#submit-btn').on('click', handleAddTask);
    
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});
