 chrome.storage.local.get("theme14", function(items) {
        if (!chrome.runtime.error) {
            document.body.parentElement.classList = items.theme14;
        }
    });

let isVk = window.location.href.indexOf("https://vk.com/") != -1;
let isReadMe = window.location.href.indexOf("file:///") != -1;
let scheduleclone = document.createElement("scheduleclone");
let isShowed = localStorage.getItem("isScheduleShowed") != false;
console.log(localStorage.getItem("isScheduleShowed"));
if(!isVk) {
    isShowed = true;
}

let tagr = "#Расписание";
let tagf = "#Факультатив";

let les = ["русский", "литература",  "алгебра", "геометрия", "история", "обществознание", "физика", "биология", "химия",   "география", "английский", "информатика", "немецкий"];
let tip = ["y,t,p",   "y,t,p",       "y,t,p,d",  "y,t,p,d",    "y,t,r",   "y,t,r",          "y,l,t",  "y,t",      "y,t,q,s", "y,t,k",     "y,t,r",      "y,t",         "y,t"];
let abr = [',','y','t','p','l','d','r','q','s','k'];
let replaseOn = ['\n','Учебник','Тетрадь','Памятка','Лукашик','Дидактические материалы ','Рабочая тетрадь ','Таблица','Схема','Карты'];

/*

                    let tipp = tip[ind].replaceAll(",", " \n");
                    tipp = tipp.replaceAll("y", " Учебник");
                    tipp = tipp.replaceAll("t", " Тетрадь");
                    tipp = tipp.replaceAll("p", " Памятка");
                    tipp = tipp.replaceAll("l", " Лукашик");
                    tipp = tipp.replaceAll("d", " Дидактические материалы ");
                    tipp = tipp.replaceAll("r", " Рабочая тетрадь ");
                    tipp = tipp.replaceAll("q", " Таблица");
                    tipp = tipp.replaceAll("s", " Схема");
                    tipp = tipp.replaceAll("k", " Карты");

*/

function loadData(data) {
    console.log("Loading data: " + data);
    if(data == undefined)
        return;
    let dataLines = data.replaceAll('\\n','\n').split(';');

    // Tags
    let tags = dataLines[0].split('&');
    tagr = tags[0];
    tagf = tags[1];
    console.log(tagr + "\n" + tagf);

    // Tips
    les = dataLines[1].split('&');
    tip = dataLines[2].split('&');
    console.log(les + "\n" + tip);

    // Deshift
    abr = dataLines[3].split('&');
    replaseOn = dataLines[4].split('&');
    console.log(abr + "\n" + replaseOn);
}

function loadDataFromStorage() {
    chrome.storage.local.get("school14data", function(items) {
        if (!chrome.runtime.error) {
            console.log("Loading data from storage.local: ");
            if(items.school14data == undefined){
                 loadData('#Расписание&#Факультатив;русский&литература&алгебра&геометрия&история&обществознание&физика&биология&химия&география&английский&информатика&немецкий;y,t,p&y,t,p&y,t,p,d&y,t,p,d&y,t,r&y,t,r&y,l,t&y,t&y,t,q,s&y,t,k&y,t,r&y,t&y,t;,&y&t&p&l&d&r&q&s&k;\n&Учебник&Тетрадь&Памятка&Лукашик&Дидактические материалы &Рабочая тетрадь &Таблица&Схема&Карты');
            }else {
                loadData(items.school14data);
            }
        }
    });
}

window.onload = function () {
    // Update data
    // console.log("Updating data...");
    // try {
    //     var client = new XMLHttpRequest();
    //     client.onreadystatechange = handleStateChange;
    //     client.open('GET', 'https://raw.githubusercontent.com/Agzam-Ar/School-14---browser-extension/main/School14-Data/data.txt', true);
    //     client.send(null);
    //     if (client.status == 200) {
    //         loadData(client.responseText);
    //         chrome.storage.local.set({"school14data": data}, function() {
    //             console.log("Setting data: " + data);
    //         });
    //     }else {
    //         console.log("client.status: " + client.status);
    loadDataFromStorage();
    //     }
    // } catch (err) {
    //     console.log("Err: " + err);
    // }

    if(isReadMe) {
        setInterval(go, 1000 / 50);
    }
    if(!isVk)
        return;

    setInterval(go, 1000 / 50);


    if(isVk) {
        document.getElementById('ui_rmenu_business_notify').innerText = "";
        document.getElementById('ui_rmenu_business_notify').style.display = "none";
        document.getElementsByClassName('ui_actions_menu_icons')[0].parentElement.innerText = "";
        document.getElementsByClassName('im-page--header-call im-page--header-menu-button _im_dialog_call_action_wrapper')[0].onclick = "";
        document.getElementsByClassName('im-page--header-call im-page--header-menu-button _im_dialog_call_action_wrapper')[0].style.display = "none";;
    }

    let button = document.createElement('a');
    button.className = "schedulehide";
        if(isShowed) {
            scheduleclone.style.display = "none";
            button.innerText = "Показать";
        }else {
            scheduleclone.style.display = "block";
            button.innerText = "Скрыть"
        }
    button.onclick = function() {
        isShowed = !isShowed;
        localStorage.setItem("isScheduleShowed", isShowed);
        if(isShowed) {
            scheduleclone.style.display = "none";
            button.innerText = "Показать";
        }else {
            scheduleclone.style.display = "block";
            button.innerText = "Скрыть"
        }
        console.log(localStorage.getItem("isScheduleShowed"));
    };

    // document.getElementsByClassName('ui_rmenu')[0].before(document.createElement('br'));
    // document.getElementsByClassName('ui_rmenu')[0].before(button);
    // document.getElementsByClassName('ui_rmenu')[0].before(document.createElement('br'));
    // document.getElementsByClassName('ui_rmenu')[0].before(scheduleclone);
}



function go() {

    try {
        chrome.storage.local.get("theme14", function(items) {
            if (!chrome.runtime.error) {
                document.body.parentElement.classList = items.theme14;
            }
        });
    } catch (err) {
    }
    
    //_im_mess_pinned

// document.getElementsByClassName('im-mess--text wall_module _im_log_body')[28].parentElement

    let msgs = document.getElementsByClassName('im-mess--text wall_module _im_log_body');
    for (var i = 0; i < msgs.length; i++) {
        let msg = msgs[i];
        createSchedule(msg);
    }
}

function createSchedule(msg) {
    let isPinned = msg.parentElement.classList.contains("_im_mess_pinned");
    let txt = msg.innerText;
    if(msg.innerText.indexOf("NEW$DATA%") != -1) {
        // Save Data To chrome storage
        let edits = msg.getElementsByClassName('im-mess--lbl-was-edited _im_edit_time');
        for (var i = 0; i < edits.length; i++) {
           edits[i].innerText = "";
        }
        console.log("New Data: " + msg.innerText.replaceAll('NEW$DATA%', ''));
        chrome.storage.local.set({"school14data": msg.innerText.replaceAll('NEW$DATA%', '')}, function() {});
        loadData(msg.innerText.replaceAll('NEW$DATA%', ''));
        msg.innerText = "<data>";
        msg.style.color = '#999';
        msg.style.fontFamily = 'monospace';
    }else if(msg.innerText.indexOf(tagr) != -1 && tagr != undefined) {
        let edits = msg.getElementsByClassName('im-mess--lbl-was-edited _im_edit_time');
        for (var i = 0; i < edits.length; i++) {
           edits[i].innerText = "";
        }
        txt = msg.innerText;
        let lines = txt.split('\n');
        let schedule = document.createElement('schedule');
        console.log(txt);

        // Href
        href = msg.getElementsByTagName('a')[0];
        if(href != undefined ) {
            href.className = "schedulehref";
            href.innerText = href.innerText.substring(1, href.innerText.length);
        }

        // Date
        let date = document.createElement('scheduledate');
        date.innerText = lines[0].replaceAll(tagr, '');


        // Schedule Head
        let schedulehead = document.createElement('schedulehead');
        schedulehead.append(href);
        schedulehead.append(date);
        schedule.append(schedulehead);

        // Schedule Body
        let schedulebody = document.createElement('schedulebody');
        schedulebody.append(document.createElement('br'));
        schedule.append(schedulebody);

        for (var i = 1; i < lines.length; i++) {
            let line = lines[i];
            let data = line.split(" ");
            let lesson = document.createElement(line == "" ? 'emptyline' : 'lesson');
            if(data[1] != undefined){
                lesson.className = data[1].toLowerCase();
            }
            lesson.innerText = line;
            if(data[1] != undefined){
                let ind = les.indexOf(data[1].toLowerCase());
                if(ind != -1) {
                    let tipp = tip[ind];
                    for (var j = 0; j < abr.length; j++) {
                        tipp = tipp.replaceAll(abr[j], " " + replaseOn[j]);
                    }
                    lesson.setAttribute('data-name', tipp); 
                }
            }
            schedulebody.append(lesson);
        }
        schedulebody.append(document.createElement('br'));

        msg.innerText = "";
        msg.append(schedule);

        if(isPinned) {
                // let clone = schedule.cloneNode(true);
                // clone.style.boxShadow = "#000 0px 0px 5px 0px";
                // clone.style.zIndex = 999;

                // scheduleclone.innerText = "";
                // scheduleclone.append(clone);

            console.log('Value to set: ' + txt);
            chrome.storage.sync.set({"pinned_msg": txt}, function() {
                console.log('Value is set to ' + txt);
            });
        }
    } else if(msg.innerText.indexOf("tagf") != -1 
        && !msg.classList.contains("textongradientused")
        && !msg.parentElement.classList.contains("textongradientused")) {
        let edits = msg.getElementsByClassName('im-mess--lbl-was-edited _im_edit_time');
        for (var i = 0; i < edits.length; i++) {
           edits[i].innerText = "";
        }
        txt = msg.innerText;

        msg.parentElement.className = msg.parentElement.classList + " optionalcourse textongradientused";

        let gradient = document.createElement('gradient');
        let textongradient = document.createElement('textongradient');
        gradient.append(document.createElement('br'));
        gradient.append(textongradient);
        gradient.append(document.createElement('br'));

        let inclone = msg.cloneNode(true);
        textongradient.append(inclone);
        inclone.className = inclone.classList + " textongradientused";
        textongradient.append(inclone);

        msg.innerText = "";
        msg.append(gradient);
    }
}

// module.exports = {
//     createSchedule: createSchedule
// };