let L = [];

const form_settings = document.getElementById('sortSettingsForm');
const input_lengh_list = document.getElementById('listLenghInput');
const btn_regenrate = document.getElementById('regenerateButton');
let Settings = {
    "list_len": 6,
    "big_start": 0,
}

function update_settings() {
    Settings['list_len'] = input_lengh_list.value;

    generate_list();
}

function generate_list() {
    L = [];
    for (let i = 0; i < Settings['list_len']; i++) {
       let tmp_max = genrate_list_max_dynamic(); 
       L.push(generate_random_int(1, tmp_max, L));
    };

    document.getElementById('currentListOutput').innerHTML = generate_output_list();
}

function generate_random_int(min = 1, max = 100, excludes = [67]) {
    /*if (min > max) {
        return("Range boundary error");
    }*/


    // THIS fn()-content mostly AI-generated – this code as actually way better than i would have done it – and way too over-powered for its use
    if (min > max) {
        throw new Error("Range boundary error: 'min' cannot be strictly greater than 'max'.");
    }

    // Filter exclusions strictly to the defined range and convert to a Set to remove duplicates
    // and optimize the while-loop lookup from O(N) to O(1).
    const validExcludes = new Set(excludes.filter(n => n >= min && n <= max));
    const rangeSize = max - min + 1;

    // Guard clause to prevent infinite loops if all numbers in the range are excluded.
    if (validExcludes.size >= rangeSize) {
        throw new Error("Parameter collision: The 'excludes' array invalidates all possible integers within the specified range.");
    }

    let result;
    do {
        result = Math.floor(Math.random() * rangeSize) + min;
    } while (validExcludes.has(result));

    return result;
}

function genrate_list_max_dynamic() { // ToDo ("STATIC" for now(for EVER))
    return Settings['list_len']*2
}

function generate_output_list(index = null) {
    let TMP_output = '';
    L.forEach((i, L_index) => {
        let TMP_str= `[${i}]`;
        if ((L_index == index || L_index == index + 1) && index != null) {
            TMP_str= `<span class="current">[${i}]</span>`;
        }
        TMP_output += TMP_str;
    });
    return TMP_output;
}

function generate_output_list_as_table(index = null) {
    let TMP_output = '<tr>';
    L.forEach((i, L_index) => {
        let TMP_str= `<td">[${i}]</td>`;
        if (L_index == index || L_index == index + 1 ) {
            TMP_str= `<td class="current">[${i}]</td>`;
        }
        TMP_output += TMP_str;
    });
    TMP_output += '</tr>';
    return TMP_output;
}

form_settings.addEventListener('submit', function(event) { event.preventDefault(); update_settings()});
btn_regenrate.addEventListener('click', generate_list);



async function sort() {
    let index = 0;
    let sorted = false;
    while (!sorted) {
        let first = L[index];
        let second = L[index + 1];
        let result = (first > second)

        while (index < L.length) {
            // ToDo: Think about the if-statements, so only two tmp-vars(Bools) are used ...
            if (Settings['big_start'] && result) {L[index] = second;
                L[index + 1] = first;
                sorted = false;
            } else if (Settings['big_start'] && !result) {
                // ToDo: may remove ... (or sth)
            } else {
                throw new Error("Stuff BROKE while sorting");
            }
            test_stuff(index);
            index += 1;
        }
        index = 0;
    }
}

async function test_stuff(index) {
    document.getElementById('currentListOutput').innerHTML = generate_output_list(index);
    sleep(100)
}


// from https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('sortTrigger').addEventListener('click', sort)