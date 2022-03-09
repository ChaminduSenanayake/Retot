function openUserSettingsModal() {
    let userSettingsModal = new bootstrap.Modal(document.getElementById('updateUserModal'));
    $('#updateUserModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        let userId = $('#userId').text();
        $.ajax({
            type: "GET",
            url: baseURL + "user/get/"+userId,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                modal.find('#txtUpdateUserId').val(userId);
                modal.find('#txtUpdateUserName').val(response.firstName+" "+response.lastName);
                modal.find('#txtUpdateUserEmail').val(response.email);
            },
            error: function (error) {

            }
        })
    })
    userSettingsModal.show();
}
