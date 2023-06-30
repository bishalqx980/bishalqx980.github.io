function load() {
    if (/Mobi/.test(navigator.userAgent)) {
        alert_msg = "Mobile Version is Under Development!!\nShowing Desktop Version Preview...";
        alert(alert_msg);
    }
}

```
async function fetchData(){
    let req = await fetch('./links.json');
    let res = await req.json();
    let link = res.links;

    let main = document.getElementById("main");
    main.href = link.main;
    let home = document.getElementById("home");
    home.href = link.main;

    console.log(link);
}

fetchData();
```


