// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
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
        const taskDueDate = dayjs(taskDueDate, 'DD/MM/YYYY');

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
function renderTaskList(task) {
    const taskListContainer = $('.container');

    taskListContainer.empty();

    task.forEach(task => {
        const taskCard = createTaskCard(task);

        if (taskCard) {
            taskListContainer.append(taskCard);
            taskCard.draggable ({
                containment: 'parent',
                cursor: 'move', 
        });
        }
    });
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    $('#submitTask').click(function() {
        $('#taskModal').show();
        $('#taskForm').submit(function(event) {
            event.preventDefault();

        const taskName = $('#taskName').val();
        const taskDescription = $('#taskDescription').val();
        const taskDueDate = $('#taskDueDate').val();

        createTaskCard();

        dialog.dialog('close');

        const newTask = {
            id: generateTaskId(),
            name: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            status: 'to-do',
        };
        task.push(newTask);

        $('#taskModal').hide();

        renderTaskList(task);
        }) 
    });
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
    $(function () {
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });
    
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
    });
})
