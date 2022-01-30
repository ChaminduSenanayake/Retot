const baseURL = "http://localhost:8080/api/v1/";
$(document).ready(function () {
    $('#login').submit(function (event) {
        event.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();

        let dataObj = JSON.stringify({
                "userId": "",
                "firstName": "",
                "lastName": "",
                "email": email,
                "password": password
        });

        $.ajax({
            type: "POST",
            url: baseURL + "user/validate",
            data: dataObj,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if(response!=null){
                    openNavigationWindow();
                }else{
                    openLoginWindow();
                }
            },
            error: function (error) {
                swal("OOps!", "User Login Failed!", "error");
            }
        })

    });
})

function openRegistrationWindow() {
    location.href = baseURL + "user/regPage";
    return false;
}

function openLoginWindow() {
    location.href = "http://localhost:8080";
    return false;
}
function openNavigationWindow() {
    location.href = baseURL + "home/";
    return false;
}