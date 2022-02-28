$(document).ready(function () {
    $('#registration').submit(function (event) {
        event.preventDefault();
        let fName = $('#fName').val();
        let lName = $('#lName').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();

        if (password == confirmPassword) {
            let dataObj = JSON.stringify({
                "userId": null,
                "firstName": fName,
                "lastName": lName,
                "email": email,
                "password": password
            });
            $.ajax({
                type: "POST",
                url: baseURL + "user/save",
                data: dataObj,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    if (response['success']) {
                        swal({
                            title: "Successful",
                            text: response['message'],
                            icon: "success",
                            buttons: true,
                            dangerMode: false,
                        })
                            .then((willRedirect) => {
                                if (willRedirect) {
                                    openLoginWindow();
                                }
                            });

                    } else {
                        swal("OOps!", "User Registration Failed!", "error");
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }else{
            swal("Invalid Password", "Entered Passwords are not matching!", "error");
        }

    });
})

function openLoginWindow() {
    location.href = "http://localhost:8080";
    return false;
}