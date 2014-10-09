// BSQ DJ 2014
// Property of CHERRY
// LOOP
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

var bsqDebug = false;
if(!bsqDebug)  {
    $("#time").hide();
}

var soundBGM;
var arrBGM = [];
var arrVOICE = [];
var currentBGM = 0;

var dataRecord = [];

var position = 0;

var lastNote = -1;


var strSnd = [];
strSnd[0] = "res/SOUND/snd-0.mp3";
strSnd[1] = "res/SOUND/snd-2.mp3";
strSnd[2] = "res/SOUND/snd-3.mp3";
strSnd[3] = "res/SOUND/snd-1.mp3";
strSnd[4] = "res/SOUND/snd-4.mp3";
strSnd[5] = "res/SOUND/snd-5.mp3";

strSnd[6] = "res/SOUND/beat-edm.mp3";
strSnd[7] = "res/SOUND/beat-hiphop.mp3";
strSnd[8] = "res/SOUND/beat-house.mp3";

strSnd[9] = "res/SOUND/voice-1.mp3";
strSnd[10] = "res/SOUND/voice-2.mp3";
strSnd[11] = "res/SOUND/voice-3.mp3";

var listAudio = [];
var beat = [];


var counter = 0;

function playSound(id) {

    if (bPHONEGAP) {

        var tempID = parseInt(id);

        //beat[tempID].pause();
        //beat[tempID].seekTo(0);
        //beat[tempID].play();

        var url = strSnd[tempID];

        var my_media = new Media(url,
            // success callback
            function() {
                //console.log("playAudio():Audio Success");
                //my_media.release();
            },
            // error callback
            function(err) {
                //console.log("playAudio():Audio Error: " + err);
            }
        );
        // Play audio
        my_media.play();

    } else {
        if (listAudio[id].currentTime > 0) {
            listAudio[id].pause();
            listAudio[id].currentTime = 0;
            listAudio[id].play();
        } else {
            listAudio[id].play();
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
        
        //OLD
        //if (!bPHONEGAP) {
        //    temp = Math.round(soundBGM.currentTime * 1000);
        //
        //
        //    var tempRecord = temp + "," + id;
        //
        //    dataRecord.push(tempRecord);
        //
        //    $("#time").html(tempRecord + " length : " + dataRecord.length);
        //    console.log(tempRecord);
        //} else {
        //    soundBGM.getCurrentPosition(
        //        // success callback
        //        function(position) {
        //            if (position > -1) {
        //                temp = (position * 1000) + 10;
        //
        //                var tempRecord = temp + "," + id;
        //
        //                dataRecord.push(tempRecord);
        //
        //                $("#time").html(tempRecord + " length : " + dataRecord.length);
        //
        //                console.log(tempRecord);
        //                //console.log((position) + " sec");
        //            }
        //        },
        //        // error callback
        //        function(e) {
        //            //console.log("Error getting pos=" + e);
        //        }
        //    );
        //}


    }

}


if (bPHONEGAP) document.addEventListener("deviceready", onDeviceReady, false);
else {
    $(document).ready(function() {
        onDeviceReady();
    })
}


function onDeviceReady() {


    if (bPHONEGAP) {
        beat[0] = new Media(strSnd[0], function() {}, function() {});
        beat[1] = new Media(strSnd[1], function() {}, function() {});
        beat[2] = new Media(strSnd[2], function() {}, function() {});
        beat[3] = new Media(strSnd[3], function() {}, function() {});
        beat[4] = new Media(strSnd[4], function() {}, function() {});
        beat[5] = new Media(strSnd[5], function() {}, function() {});

        arrVOICE[0] = new Media(strSnd[9], function() {}, function() {});
        arrVOICE[1] = new Media(strSnd[10], function() {}, function() {});
        arrVOICE[2] = new Media(strSnd[11], function() {}, function() {});
    } else {

        listAudio[0] = new Audio(strSnd[0]);
        listAudio[1] = new Audio(strSnd[1]);
        listAudio[2] = new Audio(strSnd[2]);
        listAudio[3] = new Audio(strSnd[3]);
        listAudio[4] = new Audio(strSnd[4]);
        listAudio[5] = new Audio(strSnd[5]);

        arrVOICE[0] = new Audio(strSnd[9]);
        arrVOICE[1] = new Audio(strSnd[10]);
        arrVOICE[2] = new Audio(strSnd[11]);

    }

    window.addEventListener("touchmove", function(e) {
        e.preventDefault();
    })


   

    if (!bPHONEGAP) {

        arrBGM[0] = new Audio(strSnd[6]); arrBGM[0].volume = 0.5;
        arrBGM[1] = new Audio(strSnd[7]); arrBGM[1].volume = 0.3;
        arrBGM[2] = new Audio(strSnd[8]); arrBGM[2].volume = 0.5;

        soundBGM = arrBGM[currentBGM];

    } else {

        arrBGM[0] = new Media(strSnd[6], function() {}, function() {});
        arrBGM[1] = new Media(strSnd[7], function() {}, function() {});
        arrBGM[2] = new Media(strSnd[8], function() {}, function() {});
        
        arrBGM[0].setVolume(0.5);
        arrBGM[1].setVolume(0.3);
        arrBGM[2].setVolume(0.5);
        
        soundBGM = arrBGM[currentBGM];

    }

    introState();

    $(".buttonStyle").bind('touchstart', function() {
        var tempID = $(this).attr('style-id');

        soundBGM.pause();
        if (!bPHONEGAP) {
            soundBGM.currentTime = 0;
        } else {
            soundBGM.seekTo(0);
        }

        soundBGM = arrBGM[tempID];
        currentBGM = tempID;



        $(".posterStyle").hide();
        $(".posterStyle[style-id=" + tempID + "]").fadeIn();

        $(".buttonOverlay").hide();
        $(".buttonOverlay[style-id=" + tempID + "]").fadeIn();

        $(".buttonNext").fadeIn();
        
        soundBGM.play();
    })

    $(".buttonNext").bind('touchstart', function() {

        soundBGM.pause();
        if (!bPHONEGAP) {
            soundBGM.currentTime = 0;
        } else {
            soundBGM.seekTo(0);
        }
        
        if (!bPHONEGAP) mainDurationBGM = soundBGM.duration * 1000;    
        else { mainDurationBGM = soundBGM.getDuration() * 1000;
        }

        gotoScene("#panelGame");
        //startRecord();
    })

    //$("#doneReplay").bind('touchstart',function(){
    //    
    //    gotoScene("#panelSend");
    //})


    $("#buttonCONFIG").bind('touchstart', function() {
        var tempPass = prompt("Input password");
        if (tempPass == "a") {
            $("#panelConfig").fadeIn();

            loadUser();

        }
    })
    
    

    $(".buttonRecord").bind('touchstart', function() {

        if (!bTutorial && !bRecord) {

            $(".buttonRecord").fadeOut();
            $(".buttonRecord").removeClass('bounce-zoom');
            startRecord();
        }
    });

    $(".buttonMusic").bind("touchstart", function() {
        var tempid = $(this).attr("bsq-id");

        if (bTutorial) {
            if (tempid == stepTut) {

                stepTut++;

                if (stepTut == 4) {

                    $(".buttonRecord").fadeIn();
                    $(".buttonRecord").addClass('bounce-zoom');
                    $(".buttonTut").fadeOut();

                    bTutorial = false;
                    stepTut = 0;
                } else {

                    $(".buttonMusic[bsq-id=" + stepTut + "]").addClass('bounce-red');
                }

                $(".buttonMusic[bsq-id=" + tempid + "]").removeClass('bounce-red');

            }
        }
        
        if (tempid == 0 || tempid == 1) {
            $($(".sprite-disc")[0]).addClass("pauseAni");
        }
        if (tempid == 2 || tempid == 3) {
            $($(".sprite-disc")[1]).addClass("pauseAni");
        }

        playSound(tempid);

    })
    
    $(".buttonMusic").bind("touchend", function() {
        var tempid = $(this).attr("bsq-id");
        
       if (tempid == 0 || tempid == 1) {
            $($(".sprite-disc")[0]).removeClass("pauseAni");
        }
        if (tempid == 2 || tempid == 3) {
            $($(".sprite-disc")[1]).removeClass("pauseAni");
        }
    });
    
    
    
    draw();
}

var bTutorial = true;
var stepTut = 0;

function introState() {
    gotoScene("#panelIntro");

    setTimeout(function() {

        gotoScene("#panelSelectStyle");

        soundBGM = arrBGM[0];
        currentBGM = 0;

        //soundBGM.play();

        arrVOICE[0].play();

    }, 2000)
}

function sendState() {
    gotoScene("#panelSend");

    arrVOICE[2].play();
}

function sendAction() {
    var username = $("#userName").val();
    var useremail = $("#userEmail").val();
    var usertel = $("#userTel").val();

    if (username == "" || useremail == "" || usertel == "") {
        alert("Yêu cầu điền đầy đủ thông tin vào các ô trống");

        return;
    }

    var tempRecord = dataRecord.join("|");


    var db = {
        "style": currentBGM,
        "name": username,
        "email": useremail,
        "tel": usertel,
        "record": tempRecord
    };
    
    //if (window.navigator.onLine) {
    //    
    //    ajaxSend(db, function(msg){
    //        
    //        if (JSON.parse(msg).result == 1) {
    //            thankState();
    //        }
    //        
    //    });
    //    
    //}else{
    //    
    //    localStorage.setItem(localStorage.length, JSON.stringify(db));
    //    thankState();        
    //}
    
    localStorage.setItem(localStorage.length, JSON.stringify(db));
    thankState();
    
}


function thankState() {

    document.activeElement.blur();

    resetGame();
    gotoScene("#panelThank");
    setTimeout(function() {

        window.location.href = "";

        //introState();

    }, 2000);
}

function confirmState(){
    gotoScene("#panelConfirm");
}

function gotoScene(id) {
    $(".panel").hide();
    $(id).fadeIn();
}


function resetGame() {

    dataRecord = [];
    lastNote = undefined;

    $(".confirmSend").hide();
    $("#icon3").hide();
    $("#slider").hide();

    bReplay = false;
    bRecord = false;

    stopMusic();
}


////////////////////////////////
var bRecord = false;
function startRecord() {

    bRecord = true;
    //soundBGM.play();
    chay();
}

var bReplay = false;

function stopMusic() {


    soundBGM.pause();
    if (!bPHONEGAP) {
        if (soundBGM.currentTime != 0) {
            soundBGM.currentTime = 0;
        }

    } else {
        soundBGM.seekTo(0);
    }

    if (bRecord) {
        bRecord = false;
    }
    if (bReplay) {
        bReplay = false;
        
        bBreak = true;
    }

}

function stopRecord() {
    
    bBreak = true;
    
    soundBGM.pause();
    bRecord = false;

    if (!bPHONEGAP) {
        soundBGM.currentTime = 0;
    } else {
        soundBGM.seekTo(0);
    }
    
    breakApart();
    
    gotoScene("#panelReplay");
    arrVOICE[1].play();
    
    if (!bPHONEGAP) {
        soundBGM.volume = 0.8;
    }else{
        soundBGM.setVolume(0.8);
    }
}


////////////////////////////////
function startReplay() {
    if (!bReplay) {

        //soundBGM.play();
        $("#icon3").fadeIn();
        $("#slider").fadeIn();

        $("#icon").removeClass("bounce-opacity");
        
       

        bReplay = true;
        chay();


    } else {
        stopMusic();
        $("#icon3").fadeOut();
        $("#slider").fadeOut();

        $("#icon").addClass("bounce-opacity");

        bReplay = false;
    }

}

function pauseReplay() {
    if (bReplay) {
        stopMusic();
        $("#icon3").fadeOut();
        $("#slider").fadeOut();

        //$("#icon").addClass("bounce-opacity");

        bReplay = false;
        
        confirmState();        
    }
}

function stopReplay() {
    stopMusic();
}

////////////////////////////////
function reload() {
    var temp = confirm("Do you want to reload ?");
    if (temp) window.location.href = "";
}

///////////////////////////////
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

///////////////////////
var counterTimer = 0;
var bBreak = true;
var mainTIME = 0;

function testBSQ() {
    setTimeout(function() {
       
        if (bBreak == false) {            
            
            checkNote();            
            testBSQ();
        }
        
    }, 5)
}

//////// SUPERNEW
var mainDurationBGM = 0;
var counterNote = 0;

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
                
                if(tempNote!=undefined)            
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





//function checkNote() {
//
//    if (bRecord) {
//
//        var temp;
//
//        if (!bPHONEGAP) {
//            temp = Math.round(soundBGM.currentTime * 1000);
//
//            var percent = temp / (soundBGM.duration * 1000) * 100;
//            percent = Math.round(percent);
//            
//            $(".sprite-wave-overlay").width((percent * 1024 / 100) + "px");
//
//            if (percent >= 100) {
//                stopRecord();
//            }
//
//        } else {
//            
//            soundBGM.getCurrentPosition(
//                // success callback
//                function(position) {
//                    if (position > -1) {
//                        temp = (position * 1000);
//
//
//                        var percent = temp / (soundBGM.getDuration() * 1000) * 100;
//                        percent = Math.round(percent);
//                        
//                        $(".sprite-wave-overlay").width((percent * 1024 / 100) + "px");
//
//                        if (percent >= 100) {
//
//                            bBreak = true;
//                            stopRecord();
//                        }
//
//                    }
//                },
//                // error callback
//                function(e) {}
//            );
//
//        }
//
//    }
//
//    if (bReplay) {
//
//        if (!bPHONEGAP) {
//            var temp;
//            //temp = Math.round(soundBGM.currentTime * 1000);
//            temp = mainTIME;
//
//            var percent = temp / (soundBGM.duration * 1000) * 100;
//            percent = Math.round(percent);
//
//
//            $("#slider").width((percent * 460 / 100) + "px");
//
//            if (percent >= 100) {
//                bBreak = true;
//
//                bReplay = false;
//                confirmState();
//            }
//            
//            for(var i=0;i<arrayNote.length;i++){
//                var tempNote = arrayNote[i];
//                
//                if ((tempNote.time - 10) < temp && (tempNote.time + 10) > temp) {
//
//                    if (lastNote != i) {
//
//                        playSound(parseInt(tempNote.note));
//
//                        counterNote++;
//
//                        $("#time").html(counterNote);
//                        //console.log(temp1 + " " + parseInt(tempNote));
//
//                        lastNote = i;
//                    }
//                }
//            }
//
//            //for (var i = 0; i < dataRecord.length; i++) {
//            //    var tempRecord = dataRecord[i].split(",");
//            //    var tempTime = tempRecord[0];
//            //    var tempNote = tempRecord[1];
//            //
//            //    var temp1 = parseInt(tempTime);
//            //
//            //
//            //
//            //    if ((temp1 - 10) < temp && (temp1 + 10) > temp) {
//            //
//            //        if (lastNote != i) {
//            //
//            //            playSound(parseInt(tempNote));
//            //
//            //            counterNote++;
//            //
//            //            //$("#time").html(counterNote);
//            //
//            //            //console.log(temp1 + " " + parseInt(tempNote));
//            //
//            //            lastNote = i;
//            //        }
//            //    }
//            //}
//        } else {
//            soundBGM.getCurrentPosition(
//                // success callback
//                function(position) {
//                    if (position > -1) {
//                        temp = (position * 1000);
//
//                        var percent = temp / (soundBGM.getDuration() * 1000) * 100;
//                        percent = Math.round(percent);
//
//
//                        $("#slider").width((percent * 460 / 100) + "px");
//
//                        if (percent >= 100) {
//                            bBreak = true;
//
//                            bReplay = false;
//                            confirmState();
//                        }
//                        
//                        for(var i=0;i<arrayNote.length;i++){
//                            var tempNote = arrayNote[i];
//                            
//                            if ((tempNote.time - 10) < temp && (tempNote.time + 10) > temp) {
//
//                                if (lastNote != i) {
//
//                                    playSound(tempNote.note);
//
//                                    counterNote++;
//
//                                    $("#time").html(counterNote);
//                                    //console.log(temp1 + " " + parseInt(tempNote));
//
//                                    lastNote = i;
//                                }
//
//
//                            }
//                        }
//
//
//                        //for (var i = 0; i < dataRecord.length; i++) {
//                        //    var tempRecord = dataRecord[i].split(",");
//                        //    var tempTime = tempRecord[0];
//                        //    var tempNote = tempRecord[1];
//                        //
//                        //    var temp1 = parseInt(tempTime);
//                        //
//                        //    if ((temp1 - 10) < temp && (temp1 + 10) > temp) {
//                        //
//                        //        if (lastNote != i) {
//                        //
//                        //            playSound(tempNote);
//                        //
//                        //            counterNote++;
//                        //
//                        //            $("#time").html(counterNote);
//                        //            //console.log(temp1 + " " + parseInt(tempNote));
//                        //
//                        //            lastNote = i;
//                        //        }
//                        //
//                        //
//                        //    }
//                        //}
//
//                    }
//                },
//                // error callback
//                function(e) {
//                    //console.log("Error getting pos=" + e);
//                }
//            );
//        }
//
//    }
//}

//////////////
function loadUser() {
    if (localStorage.length>0) {
        $("#buttonSendAjax").text("Send to server " + "("+localStorage.length+")");
    }   
    
}

function sendAjaxDB(){
    if (navigator.onLine) {
        var tempArray = [];
        for (var i = 0; i < localStorage.length; i++) {
            tempArray.push(JSON.parse(localStorage[i]));
        }
        
        $.ajax({
            type:'POST',
            url:'http://bsq.cherryvietnam.com/goldworld/ajax.php',
            data:{            
                'dbdj':JSON.stringify(tempArray)            
            },
            success:function(msg){
               var temp = JSON.parse(msg);
                
               if (temp.result == "1") {
                
                    alert("Done to send server");
                    $("#buttonSendAjax").text("None");
                    
                    localStorage.clear();
               }
               
               
        }});
    }else{
        
        alert("Thiet bi hien tai chua ket noi vao internet !");
        
    }
    
}