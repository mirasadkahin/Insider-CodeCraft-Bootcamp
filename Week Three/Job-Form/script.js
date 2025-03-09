$(document).ready(function() {
    // açma ve kapama 
    $("#showForm").click(function() {
        $("#jobForm").fadeIn();
    });
    $("#closeForm").click(function() {
        $("#jobForm").fadeOut();
    });

    // jQuery Masked Input ile telefon formatı
    $("input[name='telefon']").mask("(999) 999-9999");
    
    // jQuery UI Datepicker
    $("#dob").datepicker({ dateFormat: "dd/mm/yy" });
    
    // validate ile form doğrulama
    $("#jobForm").validate({
submitHandler: function(form) {
$(".success").fadeIn().delay(3000).fadeOut();
setTimeout(() => {
    form.reset(); 
    $("#jobForm").fadeOut(); 
}, 3000); 
}
});

});