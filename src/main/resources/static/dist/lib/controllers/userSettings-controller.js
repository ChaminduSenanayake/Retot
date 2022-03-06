function openUserSettingsModal() {
    let userSettingsModal = new bootstrap.Modal(document.getElementById('updateUserModal'));
    $('#updateUserModal').on('show.bs.modal', function (event) {
        let modal = $(this);

        // modal.find('#generatedTestCasesMsg').text(response.message);
        // modal.find('#downloadDocBtn').attr("href",response.fileDownloadUri);
    })
    userSettingsModal.show();
}
