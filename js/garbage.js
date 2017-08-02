$("#changeside").click(function (eventData) {
    var side=$("#changeside").val();
    switch (side){
        case 'Play Black' :{
            changesidetoBlack()
            break;
        }
        case 'Play White' :{
            changesidetoWhite();
        }
    }

});

function removeEevent() {
    $(".white").off("click");
    $(".black").off("click");
}

function changesidetoBlack() {
    removeEevent();
    $("#changeside").val('Play White');
    $('#board').addClass('changeBordBlack');
    $('.pieces').addClass('changePiecBlack');
    $('#board').removeClass('changeBordWhite');
    $('.pieces').removeClass('changePiecWhite');
    $('.pieces').fadeOut(500);
    $('.pieces').fadeIn(500);
    clearBord();
}
function changesidetoWhite() {
    removeEevent();
    $("#changeside").val('Play Black');
    $('#board').addClass('changeBordWhite');
    $('.pieces').addClass('changePiecWhite');
    $('#board').removeClass('changeBordBlack');
    $('.pieces').removeClass('changePiecBlack');
    $('.pieces').fadeOut(500);
    $('.pieces').fadeIn(500);
    clearBord();
}
function clearBord() {
    $(".pieces").parent().parent().children().removeClass('markParent');
    $(".pieces").parent().parent().children().removeClass('nextPos');
    $(".pieces").parent().parent().children().removeClass('attack');
}

function getfreespacewhite() {
    var freeSpace=17;
    for(var i=0;i<16;i++){
        if ($("#whitePices").children().eq(i).children().length<=0){
            freeSpace=i;
            break;
        }
    }
    return freeSpace;
}
function getfreespaceblack() {
    var freeSpace=17;
    for(var i=0;i<16;i++){
        if ($("#blackPices").children().eq(i).children().length<=0){
            freeSpace=i;
            break;
        }
    }
    return freeSpace;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//white pone
$(".wp").on("click",function (eventData) {
    removeEevent();
    var id=eventData.target.id;
    var nowPos=$("#"+id).parent().index();
    var nxtPos=parseInt(nowPos)-8;
    clearBord();
    $("#"+id).parent().addClass('markParent');
    if(nxtPos>0){
        if(id.substring(0,2)==="wp"){
            if($("#"+id).parent().parent().children().eq(nxtPos).children().length<1){
                $($("#"+id).parent().parent().children().eq(nxtPos)).addClass('nextPos');
                $($("#"+id).parent().parent().children().eq(nxtPos)).on("click",function (eventData) {
                    $("#" + id).appendTo($("#" + id).parent().parent().children().eq(nxtPos));
                    // changesidetoBlack();
                });
            }
            if(nowPos>47){
                if ($("#"+id).parent().parent().children().eq(parseInt(nxtPos)-8).children().length<1) {
                    $($("#" + id).parent().parent().children().eq(parseInt(nxtPos) - 8)).addClass('nextPos');
                    $($("#" + id).parent().parent().children().eq(parseInt(nxtPos) - 8)).click(function (eventData) {
                        $("#" + id).appendTo($("#" + id).parent().parent().children().eq(parseInt(nxtPos) - 8));
                        // changesidetoBlack();
                    });
                }
            }
        }
    }
    if($("#"+id).parent().parent().children().eq(nxtPos+1).children().length>0){
        if($("#"+id).parent().parent().children().eq(nxtPos+1).children().attr("id").substring(0,1)==="b"){
            if((parseInt($("#"+id).parent().attr("id").substring(0,1)))-1 === parseInt($("#"+id).parent().parent().children().eq(nxtPos+1).attr("id").substring(0,1))) {
                $("#" + id).parent().parent().children().eq(nxtPos + 1).addClass('attack');
                $("#" + id).parent().parent().children().eq(nxtPos + 1).click(function (eventData) {
                    var removePice = $("#" + id).parent().parent().children().eq(nxtPos + 1).children().attr("id");
                    if (removePice.substring(0, 1) === "b") {
                        $("#" + id).parent().parent().children().eq(nxtPos + 1).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $("#" + id).appendTo($("#" + id).parent().parent().children().eq(nxtPos + 1));
                        // changesidetoBlack();
                    }
                });
            }
        }
    }
    if($("#"+id).parent().parent().children().eq(nxtPos-1).children().length>0){
        if($("#"+id).parent().parent().children().eq(nxtPos-1).children().attr("id").substring(0,1)==="b") {
            if((parseInt($("#"+id).parent().attr("id").substring(0,1)))-1 === parseInt($("#"+id).parent().parent().children().eq(nxtPos-1).attr("id").substring(0,1))){
                $("#" + id).parent().parent().children().eq(nxtPos - 1).addClass('attack');
                $("#" + id).parent().parent().children().eq(nxtPos - 1).click(function (eventData) {
                    var removePice=$("#" + id).parent().parent().children().eq(nxtPos-1).children().attr("id");
                    if(removePice.substring(0,1)==="b") {
                        $("#" + id).parent().parent().children().eq(nxtPos - 1).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $("#" + id).appendTo($("#" + id).parent().parent().children().eq(nxtPos - 1));
                        // changesidetoBlack();
                    }
                });
            }
        }
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//black pone
$(".bp").click(function (eventData) {
    removeEevent();
    var id=eventData.target.id;
    var nowPos=$("#"+id).parent().index();
    var nxtPos=parseInt(nowPos)+8;
    clearBord();
    $("#"+id).parent().addClass('markParent');
    if(nxtPos>0){
        if(id.substring(0,2)==="bp"){
            if($("#"+id).parent().parent().children().eq(nxtPos).children().length<1){
                $($("#"+id).parent().parent().children().eq(nxtPos)).addClass('nextPos');
                $($("#"+id).parent().parent().children().eq(nxtPos)).click(function (eventData) {
                    $("#" + id).appendTo($("#" + id).parent().parent().children().eq(nxtPos));
                    // changesidetoWhite()
                });
            }
            if(nowPos<17){
                if ($("#"+id).parent().parent().children().eq(parseInt(nxtPos)+8).children().length<1) {
                    $($("#" + id).parent().parent().children().eq(parseInt(nxtPos) + 8)).addClass('nextPos');
                    $($("#" + id).parent().parent().children().eq(parseInt(nxtPos) + 8)).click(function (eventData) {
                        $("#" + id).appendTo($("#" + id).parent().parent().children().eq(parseInt(nxtPos) + 8));
                        // changesidetoWhite()
                    });
                }
            }
        }
    }
    if($("#"+id).parent().parent().children().eq(nxtPos+1).children().length>0){
        if($("#"+id).parent().parent().children().eq(nxtPos+1).children().attr("id").substring(0,1)==="w"){
            if((parseInt($("#"+id).parent().attr("id").substring(0,1)))+1 === parseInt($("#"+id).parent().parent().children().eq(nxtPos+1).attr("id").substring(0,1))) {
                $("#" + id).parent().parent().children().eq(nxtPos + 1).addClass('attack');
                $("#" + id).parent().parent().children().eq(nxtPos + 1).click(function (eventData) {
                    var removePice = $("#" + id).parent().parent().children().eq(nxtPos + 1).children().attr("id");
                    if (removePice.substring(0, 1) === "w") {
                        $("#" + id).parent().parent().children().eq(nxtPos + 1).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $("#" + id).appendTo($("#" + id).parent().parent().children().eq(nxtPos + 1));
                        // changesidetoWhite()
                    }
                });
            }
        }
    }
    if($("#"+id).parent().parent().children().eq(nxtPos-1).children().length>0){
        if($("#"+id).parent().parent().children().eq(nxtPos-1).children().attr("id").substring(0,1)==="w") {
            if((parseInt($("#"+id).parent().attr("id").substring(0,1)))+1 === parseInt($("#"+id).parent().parent().children().eq(nxtPos-1).attr("id").substring(0,1))){
                $("#" + id).parent().parent().children().eq(nxtPos - 1).addClass('attack');
                $("#" + id).parent().parent().children().eq(nxtPos - 1).click(function (eventData) {
                    var removePice=$("#" + id).parent().parent().children().eq(nxtPos-1).children().attr("id");
                    if(removePice.substring(0,1)==="w") {
                        $("#" + id).parent().parent().children().eq(nxtPos - 1).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $("#" + id).appendTo($("#" + id).parent().parent().children().eq(nxtPos - 1));
                        // changesidetoWhite()
                    }
                });
            }
        }
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//white casal
$(".wr").click(function (eventData) {
    removeEevent();
    var id="#"+eventData.target.id;
    var nowpos=$(id).parent().index();
    clearBord();
    $(id).parent().addClass('markParent');
    var siderow=$(id).parent().attr("id").substring(1,2);
    var uprow=$(id).parent().attr("id").substring(0,1);
    var sidemoves=new Array();
    var attack=new Array();
    //leftmove
    for(var i=1;i<siderow;i++){
        if($(id).parent().parent().children().eq(nowpos-i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
        }else {
            break;
        }
    }
    //rightmove
    for(var i=1;i<=8-siderow;i++){
        if($(id).parent().parent().children().eq(nowpos+i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
        }else {
            break;
        }
    }
    //upmove
    for(var i=1;i<uprow;i++){
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i*8).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos - i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
        }else {
            break;
        }
    }
    //downtmove
    for(var i=1;i<=8-uprow;i++){
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i*8).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos + i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
        }else {
            break;
        }
    }
    if (sidemoves.length>0){
        for(var a=0;a<sidemoves.length;a++){
            $("#"+sidemoves[a]).click(function (eventData) {
                $(id).appendTo(eventData.target);
                // changesidetoBlack();
            });
        }
    }
    if (attack.length>0){
        for(var a=0;a<attack.length;a++){
            $("#"+attack[a]).click(function (eventData) {
                alert(attack[a]);
                if(eventData.target.id.substring(0,1)==="b") {
                    // $("#blackPices").append(eventData.target);
                    // $(id).appendTo(eventData.target);
                    // $("#"+attack[a]).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                    // $(id).appendTo($("#" + attack[a]));
                    // changesidetoBlack();
                }
            });
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//blackcasal
$(".br").click(function (eventData) {
    var id="#"+eventData.target.id;
    var nowpos=$(id).parent().index();
    clearBord();
    $(id).parent().addClass('markParent');
    var siderow=$(id).parent().attr("id").substring(1,2);
    var uprow=$(id).parent().attr("id").substring(0,1);
    var sidemoves=new Array();
    var attack=new Array();
    //leftmove
    for(var i=1;i<siderow;i++){
        if($(id).parent().parent().children().eq(nowpos-i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
        }else {
            break;
        }
    }
    //rightmove
    for(var i=1;i<=8-siderow;i++){
        if($(id).parent().parent().children().eq(nowpos+i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
        }else {
            break;
        }
    }
    //upmove
    for(var i=1;i<uprow;i++){
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i*8).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos - i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
        }else {
            break;
        }
    }
    //downtmove
    for(var i=1;i<=8-uprow;i++){
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i*8).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos + i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
        }else {
            break;
        }
    }
    if (sidemoves.length>0){
        for(var a=0;a<sidemoves.length;a++){
            $("#"+sidemoves[a]).click(function (eventData) {
                $(id).appendTo(eventData.target);
            });
        }
    }
    alert(attack.length);
    if (attack.length>0){
        for(var a=0;a<attack.length;a++){
            $("#"+attack[a]).click(function (eventData) {
                if(eventData.target.id.substring(0,1)==="b") {
                    // $("#blackPices").append(eventData.target);
                    // $(id).appendTo(eventData.target);
                }
            });
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//whitenight
$(".wn").on("click",function (eventData) {
    removeEevent();
    var id="#"+eventData.target.id;
    // alert(id);
    var nowpos=$(id).parent().index();
    // alert(nowpos);
    clearBord();
    $(id).parent().addClass('markParent');

    // alert($(id).parent().attr("id").substring(1,2));
    var row=parseInt($(id).parent().attr("id").substring(0,1));
    var col=parseInt($(id).parent().attr("id").substring(1,2));
    // alert("row : "+row+" col : "+col);
    // alert($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1));
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=3){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==1){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 17).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 17).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 17).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 17).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 17));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 17).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 17));
                    changesidetoBlack();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=3){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==8){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 15).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 15).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 15).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 15).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 15).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 15));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 15).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 15).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 15));
                    changesidetoBlack();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=2){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))>=3){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 10).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 10).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 10).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 10).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 10).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 10));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 10).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 10).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 10));
                    changesidetoBlack();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=2){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))<=6){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 6).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 6).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 6).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 6).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 6).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 6));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 6).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 6).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 6));
                    changesidetoBlack();
                });
            }
        }
    }

    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=6){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==8){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 17).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 17).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 17).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 17).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 17).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 17));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 17).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 17).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 17));
                    changesidetoBlack();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=6){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==1){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 15).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 15).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 15).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 15).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 15).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 15));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 15).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 15).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 15));
                    changesidetoBlack();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=7){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))>=3){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 6).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 6).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 6).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 6).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 6).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 6));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 6).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 6).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 6));
                    changesidetoBlack();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=7){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))<=6){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 10).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 10).children().attr("id").substring(0,1)==="b"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 10).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 10).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 10).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 10));
                        changesidetoBlack();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 10).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 10).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 10));
                    changesidetoBlack();
                });
            }
        }
    }

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//blacknight
$(".bn").on("click",function (eventData) {
    removeEevent();
    var id="#"+eventData.target.id;
    // alert(id);
    var nowpos=$(id).parent().index();
    // alert(nowpos);
    clearBord();
    $(id).parent().addClass('markParent');

    // alert($(id).parent().attr("id").substring(1,2));
    var row=parseInt($(id).parent().attr("id").substring(0,1));
    var col=parseInt($(id).parent().attr("id").substring(1,2));
    // alert("row : "+row+" col : "+col);
    // alert($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1));
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=3){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==1){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 17).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 17).addClass('attack');
                    // $(id).parent().parent().children().eq(nowpos - 17).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                    // $(id).appendTo($(id).parent().parent().children().eq(nowpos - 17));
                    $(id).parent().parent().children().eq(nowpos - 17).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 17).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 17));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 17).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 17));
                    changesidetoWhite();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=3){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==8){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 15).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 15).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 15).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 15).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 15).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 15));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 15).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 15).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 15));
                    changesidetoWhite();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=2){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))>=3){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 10).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 10).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 10).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 10).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 10).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 10));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 10).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 10).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 10));
                    changesidetoWhite();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))>=2){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))<=6){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos - 6).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos - 6).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos - 6).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos - 6).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos - 6).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos - 6));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos - 6).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 6).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 6));
                    changesidetoWhite();
                });
            }
        }
    }

    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=6){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==8){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 17).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 17).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 17).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 17).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 17).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 17));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 17).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 17).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 17));
                    changesidetoWhite();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=6){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))!==1){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 15).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 15).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 15).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 15).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 15).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 15));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 15).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 15).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 15));
                    changesidetoWhite();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=7){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))>=3){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 6).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 6).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 6).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 6).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 6).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 6));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 6).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 6).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 6));
                    changesidetoWhite();
                });
            }
        }
    }
    if (parseInt($(id).parent().parent().children().eq(nowpos-1).attr("id").substring(0,1))<=7){
        if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2))<=6){
            // alert($(id).parent().parent().children().eq(nowpos).attr("id"));
            // $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
            // alert($(id).parent().parent().children().eq(nowpos - 17).children().length);
            if($(id).parent().parent().children().eq(nowpos + 10).children().length>0){
                // alert($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0,1));
                if($(id).parent().parent().children().eq(nowpos + 10).children().attr("id").substring(0,1)==="w"){
                    // alert("attack");
                    $(id).parent().parent().children().eq(nowpos + 10).addClass('attack');
                    $(id).parent().parent().children().eq(nowpos + 10).children().click(function (eventData) {
                        $(id).parent().parent().children().eq(nowpos + 10).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo($(id).parent().parent().children().eq(nowpos + 10));
                        changesidetoWhite();
                    });
                }
            }else {
                $(id).parent().parent().children().eq(nowpos + 10).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 10).click(function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 10));
                    changesidetoWhite();
                });
            }
        }
    }

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//white bishop

$(".wb").on("click",function (eventData) {
    clearBord();
    var id="#"+eventData.target.id;
    // alert(id);
    var nowpos=$(id).parent().index();
    // alert(nowpos);
    $(id).parent().addClass('markParent');
    var row=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(0,1));
    // alert(row);
    var col=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2));
    // alert(col);
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*9)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('attack');

                    // $(id).parent().parent().children().eq(nowpos-(i*9)).children().click(function (eventData) {
                    //     $(id).parent().parent().children().eq(nowpos-(i*9)).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                    //     $(id).appendTo($(id).parent().parent().children().eq(nowpos-(i*9)));
                    //     alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().attr("id"));
                    // });
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*7)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*7)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*9)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//black bishop
$(".bb").click(function (eventData) {
    clearBord();
    var id="#"+eventData.target.id;
    // alert(id);
    var nowpos=$(id).parent().index();
    // alert(nowpos);
    $(id).parent().addClass('markParent');
    var row=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(0,1));
    // alert(row);
    var col=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2));
    // alert(col);
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*9)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*7)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*7)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*9)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//white quen
$(".wq").click(function (eventData) {
    var id="#"+eventData.target.id;
    var nowpos=$(id).parent().index();
    clearBord();
    $(id).parent().addClass('markParent');
    var siderow=$(id).parent().attr("id").substring(1,2);
    var uprow=$(id).parent().attr("id").substring(0,1);
    var sidemoves=new Array();
    var attack=new Array();
    //leftmove
    for(var i=1;i<siderow;i++){
        if($(id).parent().parent().children().eq(nowpos-i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
        }else {
            break;
        }
    }
    //rightmove
    for(var i=1;i<=8-siderow;i++){
        if($(id).parent().parent().children().eq(nowpos+i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
        }else {
            break;
        }
    }
    //upmove
    for(var i=1;i<uprow;i++){
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i*8).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos - i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
        }else {
            break;
        }
    }
    //downtmove
    for(var i=1;i<=8-uprow;i++){
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i*8).children().attr("id").substring(0, 1) === "b") {
                $(id).parent().parent().children().eq(nowpos + i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
        }else {
            break;
        }
    }
    if (sidemoves.length>0){
        for(var a=0;a<sidemoves.length;a++){
            $("#"+sidemoves[a]).click(function (eventData) {
                $(id).appendTo(eventData.target);
            });
        }
    }
    alert(attack.length);
    if (attack.length>0){
        for(var a=0;a<attack.length;a++){
            $("#"+attack[a]).click(function (eventData) {
                if(eventData.target.id.substring(0,1)==="b") {
                    // $("#blackPices").append(eventData.target);
                    // $(id).appendTo(eventData.target);
                }
            });
        }
    }


    var row=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(0,1));
    // alert(row);
    var col=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2));
    // alert(col);
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*9)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*7)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*7)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*9)).children().attr("id").substring(0,1)==="b"){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//black quen
$(".bq").click(function (eventData) {
    var id="#"+eventData.target.id;
    var nowpos=$(id).parent().index();
    clearBord();
    $(id).parent().addClass('markParent');
    var siderow=$(id).parent().attr("id").substring(1,2);
    var uprow=$(id).parent().attr("id").substring(0,1);
    var sidemoves=new Array();
    var attack=new Array();
    //leftmove
    for(var i=1;i<siderow;i++){
        if($(id).parent().parent().children().eq(nowpos-i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i).attr("id"));
        }else {
            break;
        }
    }
    //rightmove
    for(var i=1;i<=8-siderow;i++){
        if($(id).parent().parent().children().eq(nowpos+i).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i).attr("id"));
        }else {
            break;
        }
    }
    //upmove
    for(var i=1;i<uprow;i++){
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos - i*8).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos - i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos-i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos - i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos - i*8).attr("id"));
        }else {
            break;
        }
    }
    //downtmove
    for(var i=1;i<=8-uprow;i++){
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length===1) {
            if ($(id).parent().parent().children().eq(nowpos + i*8).children().attr("id").substring(0, 1) === "w") {
                $(id).parent().parent().children().eq(nowpos + i*8).addClass('attack');
                attack.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
            }
        }
        if($(id).parent().parent().children().eq(nowpos+i*8).children().length<1) {
            $(id).parent().parent().children().eq(nowpos + i*8).addClass('nextPos');
            sidemoves.push($(id).parent().parent().children().eq(nowpos + i*8).attr("id"));
        }else {
            break;
        }
    }
    if (sidemoves.length>0){
        for(var a=0;a<sidemoves.length;a++){
            $("#"+sidemoves[a]).click(function (eventData) {
                $(id).appendTo(eventData.target);
            });
        }
    }
    alert(attack.length);
    if (attack.length>0){
        for(var a=0;a<attack.length;a++){
            $("#"+attack[a]).click(function (eventData) {
                if(eventData.target.id.substring(0,1)==="b") {
                    // $("#blackPices").append(eventData.target);
                    // $(id).appendTo(eventData.target);
                }
            });
        }
    }

    var row=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(0,1));
    // alert(row);
    var col=parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1,2));
    // alert(col);
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*9)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos-(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(0,1))<row){
            if(parseInt($(id).parent().parent().children().eq(nowpos-(i*7)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos-(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos-(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos-(i*7)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos-(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*7)).attr("id").substring(1,2))<=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*7)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*7)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*7)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*7)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos+(i*7)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }
    for(var i=0;i<8-row;i++){
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(0,1));
        // alert($(id).parent().parent().children().eq(nowpos-(i*9)).attr("id").substring(1,2));
        if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(0,1))>row){
            if(parseInt($(id).parent().parent().children().eq(nowpos+(i*9)).attr("id").substring(1,2))>=col){
                // alert($(id).parent().parent().children().eq(nowpos-(i*9)).children().length);
                if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length===0){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos+(i*9)).click(function (eventData) {
                        $(id).appendTo(eventData.target);
                    });
                }else if($(id).parent().parent().children().eq(nowpos+(i*9)).children().length>0 &&
                    $(id).parent().parent().children().eq(nowpos+(i*9)).children().attr("id").substring(0,1)==="w"){
                    $(id).parent().parent().children().eq(nowpos+(i*9)).addClass('attack');
                    break;
                }else{
                    break;
                }
            }else{
                break;
            }
        }
    }

});


