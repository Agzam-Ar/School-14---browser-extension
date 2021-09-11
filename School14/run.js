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

window.onload = function () {
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
    let les = ["русский", "литература",  "алгебра", "геометрия", "история", "обществознание", "физика", "биология", "химия",   "география", "английский", "информатика", "немецкий"];
    let tip = ["y,t,p",   "y,t,p",       "y,t,p,d",  "y,t,p,d",    "y,t,r",   "y,t,r",          "y,l,t",  "y,t",      "y,t,q,s", "y,t,k",     "y,t,r",      "y,t",         "y,t"];

    let isPinned = msg.parentElement.classList.contains("_im_mess_pinned");
    let txt = msg.innerText;
    if(msg.innerText.indexOf("#Расписание") != -1) {
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
        date.innerText = lines[0].replaceAll('#Расписание', '');


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
            if(data[0] != undefined) {
                // if(data[0].toLowerCase().toUpperCase() == data[0]) {
                let lesson = document.createElement(line == "" ? 'emptyline' : 'lesson');
                if(data[1] != undefined)
                lesson.className = data[1].toLowerCase();
                lesson.innerText = line;
                if(data[1] != undefined){
                let ind = les.indexOf(data[1].toLowerCase());
                if(ind != -1){
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
                    lesson.setAttribute('data-name', tipp); 
                }
            }
            schedulebody.append(lesson);
            // }
        }
    }
    schedulebody.append(document.createElement('br'));

            msg.innerText = "";
            msg.append(schedule);

            if(isPinned){
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
        } else if(msg.innerText.indexOf("#Факультатив") != -1 
            && !msg.classList.contains("textongradientused")
            && !msg.parentElement.classList.contains("textongradientused")) {
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

            // msg.parentElement.style.border = "#333 1px solid";
            // msg.parentElement.style.boxShadow = "0 0 7px #333333c7";
        }

}

// module.exports = {
//     createSchedule: createSchedule
// };