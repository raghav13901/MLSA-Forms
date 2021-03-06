var obj = {};
var arr = [];
var prr = [];
var s = "", formDesc = "";
var heading = "";

/* Don't touch this */

function QuestionBlock() {

    this.question = "";
    this.answerType = "";
    this.menu = [];
    this.required = false;

}

function Template() {

    this.heading = "";
    this.description = "";
    this.backgroundColor = "#fafafa";
    this.arr = [];

    this.setBackgroundColor = function (bgColor)  { this.backgroundColor = bgColor; };

    this.setTitle = function (heading) {  this.heading = heading; };
    this.getTitle = function () { return this.heading; };

    this.setDescription = function (description) {  this.description = description; };
    this.getDescription = function () { return this.description; };

    this.set = function (q, type, req) {
        if(type !== "radio" && type != "checkbox") {
            var qb = new QuestionBlock();
            qb.question = q;
            qb.answerType = type;
            qb.required = req;
            this.arr.push(qb);
        }
    };

    this.setMultiValued = function (q, type, menu, req) {
        if(type == "radio" || type == "checkbox") {
            var qb = new QuestionBlock();
            qb.question = q;
            qb.answerType = type;
            qb.menu = menu;
            qb.required = req;
            this.arr.push(qb);           
        }
    };

    this.get = function () { return this.arr; };

    this.render = function () {

        document.getElementById("head").innerText = this.heading;
        document.getElementById("heading").value = this.heading;
        document.getElementById("formDesc").value = this.description;
        document.getElementsByTagName("body")[0].style.backgroundColor = this.backgroundColor;
        document.getElementById("bgcolor").value = this.backgroundColor;

        var questionBlocks = this.arr;

        for(var i = 0; i<questionBlocks.length; i++) {

            console.log(questionBlocks[i]);

            var obj = {  desc : questionBlocks[i].question,
            option : questionBlocks[i].answerType,
            noOfItem : questionBlocks[i].menu,
            required : questionBlocks[i].required };

            arr.push(obj);

        }

        printData();   
        
    }

}

/* start touching */





/* Kharkia's functions are below this */





function addHeading() {
    heading = document.getElementById('heading').value;
    document.querySelector('h1').innerText = heading;
}

function add() {
    var desc = document.getElementById('desc').value;
    var option = document.getElementById('options').value;
    obj = {
        'desc': desc,
        'option': option,
        'noOfItem': [],
        required: false
    };
    arr.push(obj);
    document.getElementById('desc').value = "";
    console.log(arr);
    printData();
}

function deleteItem(e) {
    arr[e.id].noOfItem.splice(e.value, 1);
    printData();
}

function addDesc() {
    formDesc = document.getElementById('formDesc').value;
}

function deleteOption(e) {
    arr.splice(e.id, 1);
    printData();
}

function addMultiple(e) {
    document.getElementById(e).toggleAttribute('multiple');
    document.getElementById(e).value = null;
}

function addOption(e) {
    // console.log(e.classList[0]);
    arr[e.classList[0]].noOfItem.push(document.getElementsByClassName(e.id)[0].value);
    console.log(arr[e.id]);
    printData();
    // console.log(e.id);
    // console.log();
}

function openNav() {
    var x = document.getElementById("mySidepanel");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.width = "22vw";
    } else {
        x.style.width = "0";
        x.style.display = "none";
    }
}

function apply() {
    document.querySelector('#head').style.color = document.getElementById('color').value;
    document.querySelector('#head').style.fontFamily = document.getElementById('ffamily').value;
    document.querySelector('#customForm').style.color = document.getElementById('color').value;
    document.querySelector('#customForm').style.fontSize = document.getElementById('fsize').value+"px";
    if(screen.width > 1200){
        document.querySelector('h1').style.fontSize = "4.2rem";
        document.querySelector('h1').style.fontWeight = "400";
    }else if(screen.width > 700){
        document.querySelector('h1').style.fontSize = "2.8rem";
    }else if(screen.width > 500){
        document.querySelector('h1').style.fontSize = "2rem";
    }
    document.querySelector('#customForm').style.fontFamily = document.getElementById('ffamily').value;
    if (document.getElementById('image1').value == "") {
        document.querySelector('body').style.backgroundImage = "url()";
        document.querySelector('body').style.backgroundColor = document.getElementById('bgcolor').value;
    } else {
        document.querySelector('body').style.backgroundColor = "#3b8cb5";
        document.querySelector('body').style.backgroundImage = "url(document.getElementById('image1').value)";
    }
    printData();
}

function printData() {
    s = "";
    arr.map(function(item, index) {
        if (item.option === 'radio' || item.option === 'checkbox') {
            s += ("<div class='contentItems'><div class='itemDesc'>" + (index + 1) + " - " + item.desc + "</div><input type='text' placeholder='Add Option' class='" + index + item.desc + "'><button id=" + index + item.desc + " class='" + index + " btn btn-primary blue' onclick='addOption(this)'><i class='fas fa-plus'></i></button><br>");
            if (item.noOfItem != []) {
                item.noOfItem.map(function(items, oindex) {
                    s += ("<span class='disable'><input type =" + item.option + " class=' " + index + "' name=" + index + item.desc + "></input></span>      " + items + "<button value=" + oindex + " id=" + index + " class='btn btn-sm btn-danger red edit' onclick='deleteItem(this)'><i class='fas fa-trash-alt'></i></button><br>");
                });
            }
            s += ("<div class='exop text-right'><input type='checkbox' onchange='requi(this)' value=" + index + " onchange='requi(this)' value=" + index + ">Required<button id=" + index + " class='btn btn-danger red edit' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button><button class='btn btn-primary blue edit'><i class='fas fa-pencil-alt'></i></button></div></div>");
        } else if (item.option === 'text') {
            s += ("<div class='contentItems'><div class='itemDesc'>" + (index + 1) + " - " + item.desc + "</div><span class='disable'><input type =" + item.option + " id = " + index + " class='textF'></span><div class='exop text-right'><input type='checkbox' onchange='requi(this)' value=" + index + ">Required<button id=" + index + " class='btn btn-danger red edit' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button><button class='btn btn-primary blue edit'><i class='fas fa-pencil-alt'></i></button></div></div>");
        } else if (item.option === 'textarea') {
            s += ("<div class='contentItems'><div class='itemDesc'>" + (index + 1) + " - " + item.desc + "</div><span class='disable'><textarea id=" + index + "></textarea></span><div class='exop text-right'><input type='checkbox' onchange='requi(this)' value=" + index + ">Required<button id=" + index + " class='btn btn-danger red edit' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button><button class='btn btn-primary blue edit'><i class='fas fa-pencil-alt'></i></button></div></div>");
        } else {
            s += ("<div class='contentItems'><div class='itemDesc'>  " + (index + 1) + " - " + item.desc + "</div><span class='disable'><input type =" + item.option + " id = " + index + "></span><div class='exop text-right'><input type='checkbox' onchange='requi(this)' value=" + index + ">Required<button id=" + index + " class='btn btn-danger red edit' onclick='deleteOption(this)'><i class='fas fa-trash-alt'></i></button><button class='btn btn-primary blue edit'><i class='fas fa-pencil-alt'></i></button></div></div>");
        }
    });
    document.getElementById('customForm').innerHTML = s;
}

async function submit() {
    console.log(arr);
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let formData = new FormData();
    let data = JSON.stringify({
        data: arr,
        heading: document.getElementById('heading').value,
        description: document.getElementById('formDesc').value,
        fontFamily: document.getElementById('ffamily').value,
        fontSize: document.getElementById('fsize').value,
        textColor: document.getElementById('color').value,
        backgroundColor: document.getElementById('bgcolor').value,
    });
    formData.append("data", JSON.stringify(data));
    if (document.getElementById('image').files.length > 0) {
        console.log(document.getElementById('image').files[0])
        formData.append('logo', document.getElementById('image').files[0])
    }
    if (document.getElementById('image1').files.length > 0) {
        console.log(document.getElementById('image1').files[0])
        formData.append('background', document.getElementById('image1').files[0])
    }
    fetch('/user/form/create', {
            credentials: 'same-origin',
            headers: {
                'CSRF-Token': token,
            },
            method: 'POST',
            body: formData
        })
        .then(d => {
            return d.json();
        }).then(data => {
            console.log(data)
            if (data.msg === 'OK') {
                location.replace(data.url);
            } else {
                alert('Something went wrong');
            }
        }).catch(e => {
            console.log(e);
        })
}

const generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = e => resolve(e.target.result);
        reader.onerror = err => reject(err);
    });

    reader.readAsDataURL(imageFile);
    return promise;
};

function requi(s) {
    arr[s.value].required = true;
}


async function viewImage() {
    var src = await generateBase64FromImage(document.getElementById("image").files[0]);
    var img = document.getElementById("img-logo");
    var imgBg = document.getElementById("img-logo-bg");
    img.setAttribute("src", src);
    imgBg.setAttribute("src", src);
    var container = document.getElementById("img-logo-container");
    container.style.display = "block";
}