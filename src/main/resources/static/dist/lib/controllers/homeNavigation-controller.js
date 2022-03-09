$(document).ready(function () {
    $('#selectedItem').css('font-weight','bold')
});
function openOptimizationWindow() {
    location.href = baseURL+"testOptimization/"
    return false;
}
function openNavigationWindow() {
    location.href = baseURL + "home/";
    return false;
}
function openDocumentWindow() {
    swal("OOps!","This page is under construction", "error");
}
function logOut(){
    location.href = baseURL+"user/logout"
    return false;
}