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
function logOut(){
    location.href = baseURL+"user/logout"
    return false;
}