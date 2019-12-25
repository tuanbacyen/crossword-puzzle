function get_direction(question_number) {
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (String(grid[i][j]).indexOf(question_number) != -1) {
                if (grid[i + 1][j] == question_number || grid[i - 1][j] == question_number) {
                    return "vertical";
                }

                if (grid[i][j + 1] == question_number || grid[i][j - 1] == question_number) {
                    return "horizontal";
                }
            }
        }
    }
}

function get_startpos(question_number, direction) {
    if (direction == "horizontal") {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (String(grid[i][j]).indexOf(question_number) != -1) {
                    return [i, j];
                }
            }
        }
    } else if (direction == "vertical") {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                if (String(grid[j][i]).indexOf(question_number) != -1) {
                    return [i, j];
                }
            }
        }
    }
}