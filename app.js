let L = []

const form_settings = document.getElementById('settingsForm');
const input_lengh_list = document.getElementByID('listLenghInput');
let Settings = {
    "list_len": 6,
}

function update_settings() {
    Settings['list_len'] = input_lengh_list.value;
}

function generate_list() {
    let L = [];
    const TMP_len = Settings['list_len'].integer;

    for (let i = 0; i < limit; i++) {
        L.push(i); // ToDo
    }
}

form_settings.addEventListener('submit', update_settings);