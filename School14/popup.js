let tagr = "#Расписание";
let tagf = "#Факультатив";

let les = ["русский", "литература",  "алгебра", "геометрия", "история", "обществознание", "физика", "биология", "химия",   "география", "английский", "информатика", "немецкий"];
let tip = ["y,t,p",   "y,t,p",       "y,t,p,d",  "y,t,p,d",    "y,t,r",   "y,t,r",          "y,l,t",  "y,t",      "y,t,q,s", "y,t,k",     "y,t,r",      "y,t",         "y,t"];
let abr = [',','y','t','p','l','d','r','q','s','k'];
let replaseOn = ['\n','Учебник','Тетрадь','Памятка','Лукашик','Дидактические материалы ','Рабочая тетрадь ','Таблица','Схема','Карты'];


function loadDataFromStorage() {
    chrome.storage.local.get("school14data", function(items) {
        if (!chrome.runtime.error) {
            loadData(items.school14data);
        }
    });
}

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

let isSettingsOpen = false;

loadDataFromStorage();

 chrome.storage.local.get("theme14", function(items) {
        if (!chrome.runtime.error) {
            document.body.parentElement.classList = items.theme14;
        }
    });

    window.onload = function() {
    chrome.storage.sync.get("pinned_msg", function(items) {
        if (!chrome.runtime.error) {
            console.log(items);
            console.log(items.pinned_msg);
            let pinned_msg = document.getElementById('pinned_msg');
            console.log(pinned_msg);
            pinned_msg.innerText = items.pinned_msg;
            // run.createSchedulehead(pinned_msg);

            // var run = require('./script');
            createSchedule(pinned_msg);
        }
    });

    let themesCount = 10;
    for (var i = 0; i < themesCount; i++) {
        let ctk = document.getElementById('ctk');
        let ct = document.createElement('ct');
        ct.classList = "changetheme " + ("theme" + i);
        ct.id = "theme" + i;
        // ct.innerText =  '' + (i+1);

        ct.onclick = function() {
            chrome.storage.local.set({"theme14": ct.id}, function() {
            });
            document.body.parentElement.classList = ct.id;
        }
        document.body.append(ct);
    }


    let chngt = document.getElementById('chngt');
    for (var i = 0; i < themesCount; i++) {
        let ct2 = document.createElement('ct');
        ct2.classList = "changetheme2 " + ("theme" + i);
        // ct2.innerText = "Тема " + (i+1);
        ct2.id = "theme" + i;

        ct2.onclick = function() {
            chrome.storage.local.set({"theme14": ct2.id}, function() {
            });
            document.body.parentElement.classList = ct2.id;
        }
        chngt.append(ct2);
    }


    let settingsbutton = document.getElementById('settingsbutton');
    let settingsback = document.getElementById('back');
    let settingsbody = document.getElementById('settingsbody');
    settingsbutton.onclick = function() {
            settingsbody.style.height = "100%";
            settingsbody.style.display = "block";
    }
    settingsback.onclick = function() {
            settingsbody.style.height = "0px";
            settingsbody.style.display = "none";
    }
}






function createSchedule(msg) {
    console.log("Creating element");

    let txt = msg.innerText;
    if(msg.innerText.indexOf(tagr) != -1) {
        let lines = txt.split('\n');
        let schedule = document.createElement('schedule');
        console.log(txt);

        // Href
        let href = document.createElement('aa');//msg.getElementsByTagName('a')[0];
        if(href != undefined ) {
            href.className = "schedulehref";
            href.innerText = tagr.replaceAll('#', '');
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
            if(data[0] != undefined) {
                let lesson = document.createElement(line == "" ? 'emptyline' : 'lesson');
                if(data[1] != undefined)
                lesson.className = data[1].toLowerCase();
                lesson.innerText = line;
                if(data[1] != undefined) {
                    let ind = les.indexOf(data[1].toLowerCase());
                    if(ind != -1){
                        let tipp = tip[ind];
                        for (var j = 0; j < abr.length; j++) {
                            tipp = tipp.replaceAll(abr[j], " " + replaseOn[j]);
                        }
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

        // let clone = schedule.cloneNode(true);
        // clone.style.boxShadow = "#000 0px 0px 5px 0px";
        // clone.style.zIndex = 999;

        // scheduleclone.innerText = "";
        // scheduleclone.append(clone);

        // chrome.storage.sync.set({"pinned_msg": txt}, function() {
        //     console.log('Value is set to ' + txt);
        // });
    }
}