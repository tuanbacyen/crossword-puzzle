$(".letter").click(function() {
    document.execCommand('selectAll', false, null);

    $(".letter").removeClass("active");
    $(this).addClass("active");

    $(".hint").css("color", "initial");

    var question_numbers = String($(this).data("number")).split(",");

    $.each(question_numbers, function() {
        $("#hints .hint:nth-child(" + this + ")").css("color", "red");
    });
});

$("#solve").click(function() {
    if (!$(".letter.active").length)
        return;
    var question_numbers = String($(".letter.active").data("number")).split(",");
    $.each(question_numbers, function() {
        fillAnswer(this);
        return false;
    });
});

$("#clear_all").click(function() {
    if (!$(".letter.active").length)
        return;
    var question_numbers = String($(".letter.active").data("number")).split(",");
    $.each(question_numbers, function() {
        clearAnswer(this);
    });
});

$("#check").click(function() {
    $("#puzzle td div").css("color", "initial");
    for (var i = 0; i < answers.length; i++) {
        checkAnswer(i + 1);
    }
});

$("#clue").click(function() {
    if (!$(".letter.active").length)
        return;
    var question_numbers = String($(".letter.active").data("number")).split(",");
    showClue(question_numbers[0], $(".letter.active").parent().index(), $(".letter.active").parent().parent().index());
});

$("#all").click(function() {
    $("#hints_container").show();
});

function fillAnswer(question_number) {
    $("#puzzle td div").css("color", "initial");

    var question_answer = answers[question_number - 1];
    var direction = get_direction(question_number);
    var startpos = get_startpos(question_number, direction);
    var answer_letters = question_answer.split("");

    if (direction == "horizontal") {
        for (var i = 0; i < answer_letters.length; i++) {
            $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text(answer_letters[i]);
        }

    } else if (direction == "vertical") {
        for (var i = 0; i < answer_letters.length; i++) {
            $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text(answer_letters[i]);
        }

    }
}

function clearAnswer(question_number) {
    $("#puzzle td div").css("color", "initial");

    var question_answer = answers[question_number - 1];
    var direction = get_direction(question_number);
    var startpos = get_startpos(question_number, direction);
    var answer_letters = question_answer.split("");

    if (direction == "horizontal") {
        for (var i = 0; i < answer_letters.length; i++) {
            $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text('');
        }

    } else if (direction == "vertical") {
        for (var i = 0; i < answer_letters.length; i++) {
            $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text('');
        }

    }
}

function checkAnswer(question_number) {
    var question_answer = answers[question_number - 1];
    var direction = get_direction(question_number);
    var startpos = get_startpos(question_number, direction);
    var answer_letters = question_answer.split("");

    if (direction == "horizontal") {
        for (var i = 0; i < answer_letters.length; i++) {
            if ($("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text() != question_answer[i] && $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").text() != "") {
                $("#puzzle tr:nth-child(" + (startpos[0] + 1) + ") td:nth-child(" + (startpos[1] + 1 + i) + ") div").css("color", "red");
            }
        }

    } else if (direction == "vertical") {
        for (var i = 0; i < answer_letters.length; i++) {
            if ($("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text() != question_answer[i] && $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").text() != "") {
                $("#puzzle tr:nth-child(" + (startpos[1] + 1 + i) + ") td:nth-child(" + (startpos[0] + 1) + ") div").css("color", "red");
            }
        }

    }
}

function showClue(question_number, i, j) {
    var question_answer = answers[question_number - 1];
    var direction = get_direction(question_number);
    var startpos = get_startpos(question_number, direction);
    var answer_letters = question_answer.split("");

    if (direction == "horizontal") {
        $("#puzzle tr:nth-child(" + (j + 1) + ") td:nth-child(" + (i + 1) + ") div").text(answer_letters[i - startpos[1]]).css("color", "initial");
    } else if (direction == "vertical") {
        $("#puzzle tr:nth-child(" + (j + 1) + ") td:nth-child(" + (i + 1) + ") div").text(answer_letters[j - startpos[1]]).css("color", "initial");
    }
}