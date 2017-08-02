$(document).ready(function() {
    $('body').css('display', 'none');
    $('body').fadeIn(1000);
});
$("#dashbtn").on("click",function (eventData) {
    var state=$("#dashbtn").val();
    switch (state) {
        case 'Show Dashboard' : {
            $(".subcontl").removeClass('visibilitynon');
            $("#dashbtn").addClass('dashbordred');
            $("#dashbtn").val('Hide Dashboard');
            break;
        }
        case 'Hide Dashboard' : {
            $(".subcontl").addClass('visibilitynon');
            $("#dashbtn").removeClass('dashbordred');
            $("#dashbtn").val('Show Dashboard');
        }
    }
});

$("#restart").on("click",function (eventData) {
    location.href="index.html";
});
$("#exit").on("click",function (eventData) {
    if (confirm("Close Window?")) {
        window.close();
    }
});

$("#changeside").click(function (eventData) {
    var side=$("#changeside").val();
    switch (side){
        case 'Play Black Side' :{
            changesidetoBlack()
            break;
        }
        case 'Play White Side' :{
            changesidetoWhite();
        }
    }

});
function changesidetoBlack() {
    $("#changeside").val('Play White Side');
    $('#board').addClass('changeBordBlack');
    $('#board').children().children().addClass('changePiecBlack');
    $('#board').removeClass('changeBordWhite');
    $('#board').children().children().removeClass('changePiecWhite');
    $('#board').children().children().fadeOut(300);
    $('#board').children().children().fadeIn(300);
    clean();
}
function changesidetoWhite() {
    $("#changeside").val('Play Black Side');
    $('#board').addClass('changeBordWhite');
    $('#board').children().children().addClass('changePiecWhite');
    $('#board').removeClass('changeBordBlack');
    $('#board').children().children().removeClass('changePiecBlack');
    $('#board').children().children().fadeOut(300);
    $('#board').children().children().fadeIn(300);
    clean();
}
function clean() {
    $(".white").removeClass('markParent');
    $(".black").removeClass('markParent');
    $(".white").removeClass('nextPos');
    $(".black").removeClass('nextPos');
    $(".white").removeClass('attack');
    $(".black").removeClass('attack');
    $(".white").off("click");
    $(".black").off("click");
    $("#whitePices").children().children().removeClass('changePiecBlack');
}
function reclean() {
    $(".white").removeClass('markParent');
    $(".black").removeClass('markParent');
    $(".white").removeClass('nextPos');
    $(".black").removeClass('nextPos');
    $(".white").removeClass('attack');
    $(".black").removeClass('attack');
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White pone
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".wp").on("click",function (eventData) {
    if($("#changeside").val()==="Play Black Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        if (row > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 8).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 8));
                    changesidetoBlack();
                });
            }
            if (col > 1) {
                if ($(id).parent().parent().children().eq(nowpos - 9).children().length === 1) {
                    if ($(id).parent().parent().children().eq(nowpos - 9).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - 9).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 9).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 9).on("click", function (eventData) {
                            $(id).parent().parent().children().eq(nowpos - 9).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                            $(id).appendTo($(id).parent().parent().children().eq(nowpos - 9));
                            changesidetoBlack();
                        });
                    }
                }
            }
            if (col < 8) {
                if ($(id).parent().parent().children().eq(nowpos - 7).children().length === 1) {
                    if ($(id).parent().parent().children().eq(nowpos - 7).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - 7).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 7).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 7).on("click", function (eventData) {
                            $(id).parent().parent().children().eq(nowpos - 7).children().appendTo($("#blackPices").children().eq(getfreespaceblack()));
                            $(id).appendTo($(id).parent().parent().children().eq(nowpos - 7));
                            changesidetoBlack();
                        });
                    }
                }
            }
        }
        if (nowpos > 47) {
            if ($(id).parent().parent().children().eq(nowpos - 16).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 16).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 16).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 16));
                    changesidetoBlack();
                });
            }

        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Black pone
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".bp").on("click",function (eventData) {
    if($("#changeside").val()==="Play White Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        if (row < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 8).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 8));
                    changesidetoWhite();
                });
            }
            if (col < 8) {
                if ($(id).parent().parent().children().eq(nowpos + 9).children().length === 1) {
                    if ($(id).parent().parent().children().eq(nowpos + 9).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + 9).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 9).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 9).on("click", function (eventData) {
                            $(id).parent().parent().children().eq(nowpos + 9).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                            $(id).appendTo($(id).parent().parent().children().eq(nowpos + 9));
                            changesidetoWhite();
                        });
                    }
                }
            }
            if (col > 1) {
                if ($(id).parent().parent().children().eq(nowpos + 7).children().length === 1) {
                    if ($(id).parent().parent().children().eq(nowpos + 7).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + 7).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 7).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 7).on("click", function (eventData) {
                            $(id).parent().parent().children().eq(nowpos + 7).children().appendTo($("#whitePices").children().eq(getfreespacewhite()));
                            $(id).appendTo($(id).parent().parent().children().eq(nowpos + 7));
                            changesidetoWhite();
                        });
                    }
                }
            }
        }
        if (nowpos < 16) {
            if ($(id).parent().parent().children().eq(nowpos + 16).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 16).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 16).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 16));
                    changesidetoWhite();
                });
            }

        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White rook
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".wr").on("click",function (eventData) {
    if($("#changeside").val()==="Play Black Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        for (var i = 1; i < col; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - col; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i < row; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - row; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Black rook
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".br").on("click",function (eventData) {
    if($("#changeside").val()==="Play White Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        for (var i = 1; i < col; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - col; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i < row; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - row; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White night
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".wn").on("click",function (eventData) {
    if($("#changeside").val()==="Play Black Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = $(id).parent().index();
        $(id).parent().addClass('markParent');
        var row = parseInt($(id).parent().attr("id").substring(0, 1));
        var col = parseInt($(id).parent().attr("id").substring(1, 2));

        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 3) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 1) {
                if ($(id).parent().parent().children().eq(nowpos - 17).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 17).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 17).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 17).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 3) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 8) {
                if ($(id).parent().parent().children().eq(nowpos - 15).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 15).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - 15).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 15).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 15).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 15).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 15).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 2) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) >= 3) {
                if ($(id).parent().parent().children().eq(nowpos - 10).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 10).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - 10).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 10).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 10).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 10).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 10).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 2) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) <= 6) {
                if ($(id).parent().parent().children().eq(nowpos - 6).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 6).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - 6).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 6).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 6).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 6).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 6).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 6) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 8) {
                if ($(id).parent().parent().children().eq(nowpos + 17).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 17).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + 17).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 17).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 17).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 17).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 17).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 6) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 1) {
                if ($(id).parent().parent().children().eq(nowpos + 15).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 15).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + 15).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 15).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 15).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 15).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 15).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 7) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) >= 3) {
                if ($(id).parent().parent().children().eq(nowpos + 6).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 6).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + 6).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 6).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 6).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 6).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 6).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 7) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) <= 6) {
                if ($(id).parent().parent().children().eq(nowpos + 10).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 10).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + 10).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 10).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 10).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 10).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 10).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoBlack();
                    });
                }
            }
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Black night
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".bn").on("click",function (eventData) {
    if($("#changeside").val()==="Play White Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = $(id).parent().index();
        $(id).parent().addClass('markParent');
        var row = parseInt($(id).parent().attr("id").substring(0, 1));
        var col = parseInt($(id).parent().attr("id").substring(1, 2));

        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 3) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 1) {
                if ($(id).parent().parent().children().eq(nowpos - 17).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - 17).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 17).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 17).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 17).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 17).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 3) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 8) {
                if ($(id).parent().parent().children().eq(nowpos - 15).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 15).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - 15).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 15).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 15).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 15).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 15).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 2) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) >= 3) {
                if ($(id).parent().parent().children().eq(nowpos - 10).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 10).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - 10).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 10).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 10).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 10).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 10).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) >= 2) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) <= 6) {
                if ($(id).parent().parent().children().eq(nowpos - 6).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos - 6).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - 6).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - 6).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - 6).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos - 6).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos - 6).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 6) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 8) {
                if ($(id).parent().parent().children().eq(nowpos + 17).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 17).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + 17).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 17).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 17).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 17).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 17).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 6) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) !== 1) {
                if ($(id).parent().parent().children().eq(nowpos + 15).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 15).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + 15).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 15).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 15).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 15).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 15).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 7) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) >= 3) {
                if ($(id).parent().parent().children().eq(nowpos + 6).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 6).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + 6).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 6).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 6).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 6).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 6).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
        if (parseInt($(id).parent().parent().children().eq(nowpos - 1).attr("id").substring(0, 1)) <= 7) {
            if (parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2)) <= 6) {
                if ($(id).parent().parent().children().eq(nowpos + 10).children().length > 0) {
                    if ($(id).parent().parent().children().eq(nowpos + 10).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + 10).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + 10).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + 10).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                    }
                } else {
                    $(id).parent().parent().children().eq(nowpos + 10).addClass('nextPos');
                    $(id).parent().parent().children().eq(nowpos + 10).on("click", function (eventData) {
                        $(id).appendTo(eventData.target);
                        changesidetoWhite();
                    });
                }
            }
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White bishop
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".wb").on("click",function (eventData) {
    if($("#changeside").val()==="Play Black Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = $(id).parent().index();
        $(id).parent().addClass('markParent');
        var row = parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(0, 1));
        var col = parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2));
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Black bishop
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".bb").on("click",function (eventData) {
    if($("#changeside").val()==="Play White Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = $(id).parent().index();
        $(id).parent().addClass('markParent');
        var row = parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(0, 1));
        var col = parseInt($(id).parent().parent().children().eq(nowpos).attr("id").substring(1, 2));
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White quen
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".wq").on("click",function (eventData) {
    if($("#changeside").val()==="Play Black Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        for (var i = 1; i < col; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - col; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i < row; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - row; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoBlack();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(0, 1) === "b" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "b") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                                $(id).appendTo(parent);
                                changesidetoBlack();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Black quen
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".bq").on("click",function (eventData) {
    if($("#changeside").val()==="Play White Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        for (var i = 1; i < col; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - col; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + i).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i < row; i++) {
            if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 1; i <= 8 - row; i++) {
            if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    $(id).appendTo(eventData.target);
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + i * 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + i * 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + i * 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + i * 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
                break;
            } else {
                break;
            }
        }
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 9)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(0, 1)) < row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos - (i * 7)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos - (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos - (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 7)).attr("id").substring(1, 2)) <= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 7)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 7)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
        for (var i = 0; i < 9 - row; i++) {
            if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(0, 1)) > row) {
                if (parseInt($(id).parent().parent().children().eq(nowpos + (i * 9)).attr("id").substring(1, 2)) >= col) {
                    if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length === 0) {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('nextPos');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).click(function (eventData) {
                            $(id).appendTo(eventData.target);
                            changesidetoWhite();
                        });
                    } else if ($(id).parent().parent().children().eq(nowpos + (i * 9)).children().length > 0 &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(0, 1) === "w" &&
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).children().attr("id").substring(1, 2) !== "k") {
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).addClass('attack');
                        $(id).parent().parent().children().eq(nowpos + (i * 9)).on("click", function (eventData) {
                            if (eventData.target.id.substring(0, 1) === "w") {
                                var parent = $("#" + eventData.target.id).parent();
                                $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                                $(id).appendTo(parent);
                                changesidetoWhite();
                            }
                        });
                        break;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//White king
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".wk").on("click",function (eventData) {
    if($("#changeside").val()==="Play Black Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        if (row > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 8).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 8));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 8).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (row < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 8).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 8));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 8).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (col > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 1).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 1).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 1).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 1));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 1).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 1).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - 1).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 1).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 1).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (col < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 1).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 1).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 1).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 1));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 1).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 1).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + 1).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 1).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 1).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (row > 1 && col > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 9).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 9).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 9).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 9));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 9).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 9).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - 9).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 9).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 9).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (row > 1 && col < 8) {
            if ($(id).parent().parent().children().eq(nowpos - 7).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 7).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 7).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 7));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 7).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 7).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos - 7).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 7).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 7).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (row < 8 && col > 1) {
            if ($(id).parent().parent().children().eq(nowpos + 7).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 7).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 7).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 7));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 7).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 7).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + 7).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 7).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 7).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
        if (row < 8 && col < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 9).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 9).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 9).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 9));
                    changesidetoBlack();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 9).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 9).children().attr("id").substring(0, 1) === "b" &&
                $(id).parent().parent().children().eq(nowpos + 9).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 9).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 9).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "b") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#blackPices").children().eq(getfreespaceblack()));
                        $(id).appendTo(parent);
                        changesidetoBlack();
                    }
                });
            }
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Black king
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".bk").on("click",function (eventData) {
    if($("#changeside").val()==="Play White Side") {
        reclean();
        var id = "#" + eventData.target.id;
        var nowpos = parseInt($(id).parent().index());
        var row = $(id).parent().attr("id").substring(0, 1);
        var col = $(id).parent().attr("id").substring(1, 2);
        $(id).parent().addClass('markParent');
        if (row > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 8).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 8));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 8).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (row < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 8).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 8).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 8).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 8));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 8).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 8).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + 8).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 8).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 8).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (col > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 1).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 1).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 1).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 1));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 1).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 1).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - 1).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 1).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 1).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (col < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 1).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 1).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 1).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 1));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 1).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 1).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + 1).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 1).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 1).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (row > 1 && col > 1) {
            if ($(id).parent().parent().children().eq(nowpos - 9).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 9).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 9).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 9));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 9).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 9).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - 9).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 9).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 9).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (row > 1 && col < 8) {
            if ($(id).parent().parent().children().eq(nowpos - 7).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos - 7).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos - 7).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos - 7));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos - 7).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos - 7).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos - 7).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos - 7).addClass('attack');
                $(id).parent().parent().children().eq(nowpos - 7).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (row < 8 && col > 1) {
            if ($(id).parent().parent().children().eq(nowpos + 7).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 7).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 7).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 7));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 7).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 7).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + 7).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 7).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 7).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
        if (row < 8 && col < 8) {
            if ($(id).parent().parent().children().eq(nowpos + 9).children().length === 0) {
                $(id).parent().parent().children().eq(nowpos + 9).addClass('nextPos');
                $(id).parent().parent().children().eq(nowpos + 9).on("click", function (eventData) {
                    $(id).appendTo($(id).parent().parent().children().eq(nowpos + 9));
                    changesidetoWhite();
                });
            } else if ($(id).parent().parent().children().eq(nowpos + 9).children().length === 1 &&
                $(id).parent().parent().children().eq(nowpos + 9).children().attr("id").substring(0, 1) === "w" &&
                $(id).parent().parent().children().eq(nowpos + 9).children().attr("id").substring(1, 2) !== "k") {
                $(id).parent().parent().children().eq(nowpos + 9).addClass('attack');
                $(id).parent().parent().children().eq(nowpos + 9).on("click", function (eventData) {
                    if (eventData.target.id.substring(0, 1) === "w") {
                        var parent = $("#" + eventData.target.id).parent();
                        $("#" + eventData.target.id).appendTo($("#whitePices").children().eq(getfreespacewhite()));
                        $(id).appendTo(parent);
                        changesidetoWhite();
                    }
                });
            }
        }
    }
});

