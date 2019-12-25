var grid = [
    [0, '1', 0, 0, 0, 0, '8', 0, 0, 0],
    [0, '1', 0, 0, 0, 0, '8', 0, 0, '7'],
    [0, '1', '2', 0, 0, 0, '8', 0, 0, '7'],
    [0, '1', '2', 0, 0, 0, '8', 0, 0, '7'],
    [0, '6,1', '2,6', '6', '6', '6', '8,6', '6', 0, '7'],
    [0, '1', '2', 0, 0, 0, '3,8', '3', '3', '7,3'],
    [0, '1', 0, 0, 0, 0, '8', 0, 0, '7'],
    [0, '1', 0, '4', 0, 0, '8', 0, 0, '7'],
    [0, '5,1', '5', '4,5', '5', 0, '8', 0, 0, '7'],
    [0, 0, 0, '4', 0, 0, '8', 0, 0, 0],
    [0, 0, 0, '4', 0, 0, 0, 0, 0, 0]
];

var clues = ["christmas",
    "pine",
    "card",
    "bell",
    "sled",
    "snowman",
    "reindeer",
    "santaclaus",
];

var answers = ["christmas",
    "pine",
    "card",
    "bell",
    "sled",
    "snowman",
    "reindeer",
    "santaclaus"
];


//Draw grid
$.each(grid, function(i) {
    var row = $('<tr></tr>');
    $.each(this, function(j) {
        if (this == 0) {
            $(row).append('<td class="square empty"></td>');
        } else {
            var question_number = String(grid[i][j]).split(",");

            var starting_number = '';
            var question_number_span = '';

            for (var k = 0; k < question_number.length; k++) {
                var direction = get_direction(question_number[k]);
                var startpos = get_startpos(question_number[k], direction);

                if (direction == "horizontal" && startpos[0] == i && startpos[1] == j) {
                    starting_number += question_number[k] + ",";

                } else if (direction == "vertical" && startpos[0] == j && startpos[1] == i) {
                    starting_number += question_number[k] + ",";
                }

            }
            if (starting_number != "") {
                question_number_span = '<span class="question_number">' + starting_number.replace(/(^,)|(,$)/g, "") + '</span>';
            }

            $(row).append('<td>' + question_number_span + '<div class="square letter" data-number="' + this + '" contenteditable="true"></div></td>');
        }
    });
    $("#puzzle").append(row);
});

// Draw hints
var vertical_hints = $('<div id="vertical_hints"></div>');
var horizontal_hints = $('<div id="horizontal_hints"></div>');
$.each(clues, function(index) {
    var direction = get_direction(index + 1);

    if (direction == "horizontal") {
        $(horizontal_hints).append('<div class="hint"><b>' + (index + 1) + '</b>.-' + clues[index] + '</hint>');
    } else if (direction == "vertical") {
        $(vertical_hints).append('<div class="hint"><b>' + (index + 1) + '</b>.-' + clues[index] + '</hint>');
    }
});
$("#vertical_hints_container").append(vertical_hints);
$("#horizontal_hints_container").append(horizontal_hints);