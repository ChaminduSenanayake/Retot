const baseURL = "http://localhost:8080/api/v1/";
function openOptimizationWindow() {
    location.href = baseURL+"testOptimization/"
    return false;
}
function openNavigationWindow() {
    location.href = baseURL + "home/";
    return false;
}