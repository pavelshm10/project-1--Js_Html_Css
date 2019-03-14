 
//initialize old tasks
function initialize(){
var jasonString=localStorage.getItem("task");
var alltasks=JSON.parse(jasonString);

if (alltasks!=null){    
    for (var i=0; i < alltasks.length; i++){
            
        var dec=alltasks[i].dec;
        var date=alltasks[i].date;
        var time=alltasks[i].time;
        var index=alltasks[i].index;

        TaskOnBoard(index,dec,date,time); //reload history from local storage
    }
}
}

//create new task drom user input
function createNewTask(){

    var jasonString=localStorage.getItem("task");
    var alltasks=JSON.parse(jasonString);
    
    //get the last task index
    if (alltasks!=null){
        var len=alltasks.length;
    }
    else{
        var len=0;
    }
        
    //get the input
    var dec=document.getElementById("description").value; 
    var date=document.getElementById("date").value;
    var time=document.getElementById("time").value; 
    
        //validation
        if (dec!="" && date!=""){
            saveTaskInLocal(len,alltasks,dec,date,time)
            TaskOnBoard(len,dec,date,time);
        }
        else{
              alert("Please fill the 'task' and 'date' fields");
        }
    }

function saveTaskInLocal(len,alltasks,dec,date,time){
        var allTasks=[];
        
        if (alltasks!=null){    
            for (i=0;i<alltasks.length;i++){    
                allTasks.push(alltasks[i]);
            }
        }
        
        var task ={
            index:len+1,
            dec:dec,
            date:date,
            time:time
        }

        allTasks.push(task);
        var stringTasks=JSON.stringify(allTasks);
        localStorage.setItem("task",stringTasks);
        //window.location.reload;
}

//create new task on html board
function TaskOnBoard(len,dec,date,time){
    
    //convert the input to text
    var decs = document.createTextNode(dec);
    var dates = document.createTextNode(date);
    var times = document.createTextNode(time);
    
    var text=createText(decs);
    var footer=createFooter(dates,times);
    var button=createButton();
    createSection(text,footer,button,len);
    clearData();   
}

//create text area for the task description
function createText (decs){
    var text = document.createElement("textarea");
    text.setAttribute("rows","7");
    text.style.width="100%";
    text.style.overflow="auto";
    text.style.background= "transparent";
    text.style.resize="none";
    text.style.border= "none";    
    text.style.textAlign="left";
    text.style.marginBottom="0px";

    //add the converstion text into the textarea
    text.appendChild(decs);
    return text;
}    

//create footer for the date&time
function createFooter(dates,times){
    // set the date&time to the footer
    var foot=document.createElement("footer");
    var br=document.createElement("br");
    foot.appendChild(dates);
    foot.appendChild(br);
    foot.appendChild(times);
    return foot;
}    
 
//close task button
function createButton(){
    //button for the closing task
    var button=document.createElement("button");
    button.style.height="20px";
    button.style.width="20px";
    button.style.border="none";
    button.style.background="none";
    return button;
}


//create section for the whole task
function createSection(text,footer,button,len){
    
    //create section for the task notice and add unique index
    var section=document.createElement("section")
    section.setAttribute("id",len+1);
    section.style.margin="auto";
    
    section.appendChild(button);
    section.appendChild(text);
    section.appendChild(footer);
    
    setSectionAttribute(section,button);
}

//fade-in
function setSectionAttribute(section,button){
    section.style.cssFloat="left";
    section.style.backgroundImage="url(/assets/images/task.jpg)";
    section.style.backgroundRepeat= "no-repeat";
    section.style.backgroundPosition= "center";
    section.style.backgroundSize= "cover";
    section.style.height= "220px";
    section.style.width= "130px";
    section.style.textAlign= "left";
    section.style.marginLeft= "15px";
    section.style.marginTop= "20px";
    
    //add the section (task) to the html div (board task)
    
    document.getElementById("con").appendChild(section);

    //fade-in effect the mouse on task
    section.style.opacity=0.5;
    section.style.transition="opacity 1s ease-in-out";
    
    function fade(){
        section.style.opacity="1"; 
        
        //add bootstrap class for the 'x' closing task
        button.className="glyphicon glyphicon-remove"; 
        var index=section.getAttribute("id");
        button.onclick = function() {deleteTask(index)};
    }

    function unfade(){
        section.style.opacity="0.5"; 
        button.className=button.className.replace(/\bglyphicon glyphicon-remove\b/g, "");
    }
    
    section.addEventListener("mouseover",fade);
    section.addEventListener("mouseleave",unfade);     
}

//delete task from board and localstorage
function deleteTask(index){
    //delete from task board
    var allTasks=[];
    var del=document.getElementById(index);
    del.parentNode.removeChild(del);

    //delete from local storage
    var jasonString=localStorage.getItem("task");
    var alltasks=JSON.parse(jasonString);
    for (var i=0; i < alltasks.length; i++){
        if (alltasks[i].index!=index){
            allTasks.push(alltasks[i]);
        }
    var string=JSON.stringify(allTasks);
    localStorage.setItem("task",string);
    }    
}

function clearData(){
    document.getElementById("description").value=""; 
    document.getElementById("date").value="";
    document.getElementById("time").value="";
}

function clearMemory(){
    localStorage.clear();
    location.reload();
}