$(document).ready(function() {
    //ekleme
    $("#addTask").click(function() {
        let taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
            let newTask = $("<li>").text(taskText);
            let deleteBtn = $("<button>").text("Sil").addClass("delete-btn");

            newTask.append(deleteBtn);
            $("#taskList").append(newTask);
            $("#taskInput").val("");
        }
    });

    //tamamlandı olarak işaretleme
    $(document).on("click", "li", function() {
        $(this).toggleClass("completed");
    });

    //silme
    $(document).on("click", ".delete-btn", function(event) {
        event.stopPropagation();
        $(this).parent().remove();
    });
});
