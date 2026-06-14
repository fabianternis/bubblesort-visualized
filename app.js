let L = [];

const form_settings = document.getElementById('sortSettingsForm');
const input_lengh_list = document.getElementById('listLenghInput');
const btn_regenrate = document.getElementById('regenerateButton');
let Settings = {
    "list_len": 6,
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
        if (L_index == index || L_index == index + 1 ) {
            TMP_str= `<span class="current">[${i}]</span>`;
        }
        TMP_output += TMP_str;
    });
    return TMP_output;
}

form_settings.addEventListener('submit', function(event) { event.preventDefault(); update_settings()});
btn_regenrate.addEventListener('click', generate_list);