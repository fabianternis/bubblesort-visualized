let L = [];

const form_settings = document.getElementById('sortSettingsForm');
const input_lengh_list = document.getElementById('listLenghInput');
const btn_regenrate = document.getElementById('regenerateButton');
const table_output = document.getElementById('outputTable');

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
    table_output.innerHTML = '';
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

function generate_output_list(index = null, is_dirty = false) {
    let TMP_output = '';
    L.forEach((i, L_index) => {
        let TMP_str= `[${i}]`;
        if ((L_index == index || L_index == index + 1) && index != null) {
            if (is_dirty) {
                TMP_str= `<span class="current changed">[${i}]</span>`;
            } else {
                TMP_str= `<span class="current">[${i}]</span>`;
            }
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



function sort() {
    let TMP_list = [...L];
    let sorted = false;

    initialize_output_table(TMP_list);
    append_sorting_step_to_table(null, false, TMP_list);

    while (!sorted) {
        sorted = true;
        for (let index = 0; index < TMP_list.length - 1; index++) {
            let first = TMP_list[index];
            let second = TMP_list[index + 1];

            if (first > second) {
                TMP_list[index] = second;
                TMP_list[index + 1] = first;
                sorted = false;
                append_sorting_step_to_table(index, true, TMP_list);
            } else {
                append_sorting_step_to_table(index, false, TMP_list);
            }
        }
    }
    L = TMP_list;
}


document.getElementById('sortTrigger').addEventListener('click', sort); // ToDo: update this somewhen 

function initialize_output_table(list = L) {
    table_output.innerHTML = ''; // already in genrate_list() ... 
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    
    for (let i = 0; i < list.length; i++) {
        const th = document.createElement('th');
        th.textContent = `${i}`;
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table_output.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    table_output.appendChild(tbody);
}

function append_sorting_step_to_table(activeIndex = null, isChanged = false, list = L) {
    const tbody = table_output.querySelector('tbody');
    const tr = document.createElement('tr');
    
    list.forEach((value, i) => {
        const td = document.createElement('td');
        td.textContent = value;
        
        if (i === activeIndex || i === activeIndex + 1) {
            td.classList.add('current');
            if (isChanged) {
                td.classList.add('changed');
            }
        }
        
        tr.appendChild(td);
    });
    
    tbody.appendChild(tr);
}