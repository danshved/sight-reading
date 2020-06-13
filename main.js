// The 150 chorale excerpts, grouped by key.
const major = 0, minor = 1;
const groups = [
    // No flags or sharps.
    [
        // C major.
        [1, 4, 7, 19, 50, 59, 73, 75, 98, 116, 117, 128, 136],
        // A minor.
        [5, 9, 13, 15, 22, 63, 71, 72, 108, 110, 125, 138, 139, 141, 144],
    ],
    // One sharp.
    [
        // G major.
        [11, 12, 21, 30, 35, 42, 43, 46, 52, 60, 101, 103, 106, 112, 114, 132],
        // E minor.
        [8, 26, 58, 67, 91, 95, 99, 109],
    ],
    // One flat.
    [
        // F major.
        [20, 25, 28, 29, 64, 68, 76, 79, 82, 92, 118, 119, 122, 123, 129, 146, 148],
        // D minor.
        [14, 18, 31, 32, 37, 126, 130, 134],
    ],
    // Two sharps.
    [
        // D major.
        [10, 39, 40, 54, 56, 57, 97, 105, 107, 121, 127, 143],
        // B minor.
        [17, 66, 74, 100, 113, 137, 147],
    ],
    // Two flats.
    [
        // B-flat major.
        [33, 47, 48, 51, 61, 62, 94, 115, 142],
        // G minor.
        [2, 6, 16, 27, 38, 41, 49, 55, 65, 77, 80, 81, 86, 89, 96, 102, 131],
    ],
    // Three or more sharps or flats.
    [
        // Major.
        [
            // A major.
            3, 34, 69, 78, 85, 88, 93,
            // E-flat major.
            70, 84, 124, 133, 140, 145,
            // E major.
            45, 104, 120, 149,
        ],
        // Minor.
        [
            // F-sharp minor.
            44, 135,
            // C minor.
            24, 36, 83, 90, 111,
            // F minor.
            53,
            // B-flat minor.
            23, 87, 158,
        ],
    ],
];

// Random integer from [begin, end).
function randomInt(begin, end) {
    return Math.floor(Math.random() * (end - begin)) + begin;
}

function shuffleArray(arr) {
    for (var i = 0; i < arr.length; ++i) {
        var j = randomInt(i, arr.length);
        if (i != j) {
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}

function generateExam() {
    let result = [];

    // Determine which pieces will be in major and minor keys.
    // We want to have 3 pieces in major and 3 in minor.
    let keys = [major, major, major, minor, minor, minor];
    shuffleArray(keys);

    // Pick 6 pieces, one piece from every group, and so that there are
    // 3 in major keys and 3 in minor keys.
    for (let group_index = 0; group_index < groups.length; ++group_index) {
        let group = groups[group_index][keys[group_index]];
        result.push(group[randomInt(0, group.length)]);
    }

    // The pieces should be played in random order.
    shuffleArray(result);
    return result;
}

function formatExam(exam_pieces) {
    let result = "Pieces to play: ";
    for (let i = 0; i < exam_pieces.length; ++i) {
        if (i != 0) {
            result += ", ";
        }
        result += exam_pieces[i];
    }
    result += ".";
    return result;
}

function initialize() {
    let contentDiv = document.getElementById("content");
    contentDiv.innerHTML = formatExam(generateExam());
}
