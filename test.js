// const DEVICE_ID_GROUP = {
//     10000:'bulb',
//     20000:'plug',
//     30000:'acRemote',
//     31000:'tvRemote',
//     0:'others'
// }

// const DEVICE_USAGE_TYPE = {
//     10000: ['toggle', 'quickAction', 'colorChange', 'modeChange', 'scheduler'],
//     20000: ['toggle', 'quickAction', 'scheduler'],
//     30000: ['toggle', 'quickAction', 'scheduler'],
//     31000: ['toggle', 'quickAction', 'scheduler', 'tempChange'],
//     0: ['genericAction']
// };

let deviceID_group = {
    '404': 'bulb_toggle',
    '403': 'bulb_quickAction',
    '405': 'bulb_colorChange',
    '406': 'bulb_modeChange',
    '407': 'bulb_scheduler',
    '504': 'plug_toggle',
    '503': 'plug_quickAction',
    '507': 'plug_scheduler',
    '704': 'acRemote_toggle',
    '703': 'acRemote_quickAction',
    '707': 'acRemote_scheduler',
    '705': 'acRemote_tempChange',
    '706': 'acRemote_tempChange',
    '303': 'others_genericAction',
    '903': 'others_genericAction',
    '604': 'others_genericAction',
    '605': 'others_genericAction'
}

function getDate(epochTime) {
    epochTime = Math.floor(epochTime / 1000);
    //date is an object
    let date = new Date(epochTime);
    //extract date
    let day = date.getDate().toString();
    day.length == 1 ? day = "0" + day : day;

    //extract month
    let month = (date.getMonth() + 1).toString();
    month.length == 1 ? month = "0" + month : month;

    //extract year
    let year = date.getFullYear().toString();

    //concatenate them format=> yyyymmdd
    let ans = year + month + day;
    return ans;
}

// console.log(getDate(1625030267705007));


const dataSet = [
    {
        "user_id": "+917042516397",
        "action": "303",
        "action_type": "selecting_month_em_screen",
        "event_timestamp": "1625030267705007"
    },
    {
        "user_id": "+917042516397",
        "action": "303",
        "action_type": "selecting_month_em_screen",
        "event_timestamp": "1625030271264009"
    },
    {
        "user_id": "+917042516397",
        "action": "303",
        "action_type": "selecting_month_em_screen",
        "event_timestamp": "1625030271974010"
    },
    {
        "user_id": "+917042516397",
        "action": "303",
        "action_type": "selecting_month_em_screen",
        "event_timestamp": "1625030267393006"
    }
]
let result = [];


let last_user_id = -1;
let last_timestamp = -1;


for (let i = 0; i < dataSet.length; i++) {

    let curr_user_id = dataSet[i].user_id;
    let curr_timestamp = getDate(dataSet[i].event_timestamp);
    let curr_action_type = deviceID_group[dataSet[i].action];


    if (last_user_id == curr_user_id) {
        if (last_timestamp == curr_timestamp) {

            //if action_type exists increase count
            if (result[last_user_id][last_timestamp][curr_action_type] !== undefined) {
                result[last_user_id][last_timestamp][curr_action_type] += 1;
            }
            else {
                result[last_user_id][last_timestamp][curr_action_type] = 0;
            }
        }
        else {
            result[last_user_id][curr_timestamp] = {};

            //new action_type is added
            result[last_user_id][curr_timestamp][curr_action_type] = 0;
        }
    }
    else {
        // if new user_id then create it's object 
        result[curr_user_id] = {};
        result[curr_user_id][curr_timestamp] = {};
        result[curr_user_id][curr_timestamp][curr_action_type] = 0;
    }


    last_user_id = curr_user_id;
    last_timestamp = curr_timestamp;
}



console.log(res);




