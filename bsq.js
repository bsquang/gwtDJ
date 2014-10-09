var counterTimer = 0;
var bBreak = true;
var mainTIME = 0;

var mainDurationBGM = 0;
var counterNote = 0;

var arrayNote = [];
function breakApart(){
    for (var i = 0; i < dataRecord.length; i++) {
        var tempRecord = dataRecord[i].split(",");
        var tempTime = tempRecord[0];
        var tempNote = tempRecord[1];

        var temp1 = parseInt(tempTime);
        
        arrayNote[i] = {'time':temp1,'note':tempNote};
        
        
    }    
}

function playSound(id) {

    if (bPHONEGAP) {

        var tempID = parseInt(id);
        var url = strSnd[tempID];

        var my_media = new Media(url, function() { }, function(err) { } );
        
        
        my_media.play();

    } else {
        
        var tempID = parseInt(id);
        
        if (listAudio[tempID].currentTime > 0) {
            listAudio[tempID].pause();
            listAudio[tempID].currentTime = 0;
            listAudio[tempID].play();
        } else {
            listAudio[tempID].play();
        }
    }

    if (bRecord) {
        var temp;
        
        //NEW 091014
        temp = mainTIME;
        var tempRecord = temp + "," + id;
        dataRecord.push(tempRecord);
        
        if(bsqDebug) $("#time").html(tempRecord + " length : " + dataRecord.length);
        
        console.log(tempRecord);
        //END 091014
    }

}

//////// SUPERNEW
function chay() {
    bBreak = false;
    
    counterTimer = 0;
    counterNote = 0;
    
    mainTIME = 0;
    
    superPlayTimer();
}


function superPlayTimer(){    
    bBreak = false;    
    soundBGM.play();
    //draw();
}



// Draw loop
var time;
var elapsedDT = 0;
function draw() {
    requestAnimationFrame(draw);
    var now = new Date().getTime(),
        dt = now - (time || now);
    
    elapsedDT = dt;
    
    if(!bBreak) {
        
        if(bsqDebug) $("#time").text(mainTIME);
        
        mainTIME += dt;
        newCheckNote();    
    }    
    
    time = now;
}


// Check note loop
function newCheckNote() {
    
     if (bRecord) {        
        var percent = mainTIME / (mainDurationBGM) * 100;
        percent = Math.round(percent);
        
        $(".sprite-wave-overlay").width((percent * 1024 / 100) + "px");
        if (percent >= 100) {
            stopRecord();
        }
    }
    
    if (bReplay) {
        
        var lastMainTime = (mainTIME - elapsedDT);
        
         var percent = mainTIME / (mainDurationBGM) * 100;
            percent = Math.round(percent);
                        
            $("#slider").width((percent * 460 / 100) + "px");
        
            if (percent >= 100) {
               bBreak = true;
               bReplay = false;
               
               confirmState();               
               
            }else{
                
                var tempNote = arrayNote[counterNote];            
            
                if (lastMainTime <= tempNote.time && mainTIME >= tempNote.time) {
                    if (lastNote != counterNote) {
    
                        if (!bPHONEGAP) playSound(parseInt(tempNote.note));
                        else playSound(tempNote.note);
                        
                        if(bsqDebug) $("#time").html(counterNote);
                        
                        lastNote = counterNote;
                        
                        counterNote++;                    
                    }
                }
                
            }
    }
    
}
