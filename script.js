const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert("You must write something");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function printTasks() {
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<html><head><title>Print Tasks</title></head><body>');
    printWindow.document.write('<h2>My To-Do List</h2>');
    printWindow.document.write('<ul>');

    const tasks = listContainer.querySelectorAll("li");
    tasks.forEach(task => {
        const text = task.textContent.replace("×", "").trim();
        const isChecked = task.classList.contains("checked") ? "✔️ " : "";
        printWindow.document.write(`<li>${isChecked}${text}</li>`);
    });

    printWindow.document.write('</ul>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

showTask();
