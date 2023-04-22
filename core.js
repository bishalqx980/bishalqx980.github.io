function load() {
    var main = new Date();
    var year = main.getFullYear();
    document.getElementById("year").innerHTML = year;
}
function load_vdani() {
    var main = document.getElementById("vd");
    var credit = document.getElementById("credit");
    credit.style.display = "none";
    main.style.display = "";
    main.className = "vd vd_ani";
}
function x() {
    var main = document.getElementById("vd");
    var credit = document.getElementById("credit");
    main.className = "vd vd_ani2";
    setTimeout(() => {
        credit.style.display = "";
        main.style.display = "none";
    }, 500);
}