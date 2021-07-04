
let dataSet;
const fs=require('fs');
fs.readFile("./analysis.json" ,function(err,data){
    if(err) throw err;
    else{
        let treatedObj=data.toString().trim();
        // console.log((treatedObj));
        // console.log(treatedObj.length);
        let regex=/}\n{/gi;
       let dataSet= treatedObj.replace(regex,"},{");
        
        dataSet=JSON.parse(dataSet);
        // console.log((dataSet));
        // let ans=malformedJSON2Array(dataSet)
            // console.log(ans);

        let analysedObj=getAnalysedObj(dataSet);
        console.log("analysed Obj created");
        // console.log(analysedObj);
    }
});

function malformedJSON2Array (tar) {
    var arr = [];
    tar = tar.replace(/^\{|\}$/g,'').split('},{');
    for(var i=0,cur,pair;cur=tar[i];i++){
        arr[i] = {};
        pair = cur.split(':');
        arr[i][pair[0]] = /^\d*$/.test(pair[1]) ? +pair[1] : pair[1];
    }
    return arr;
}


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



let result = [];


let last_user_id = -1;
let last_timestamp = -1;

function getAnalysedObj(dataSet){
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

    return result;
}



// console.log(res);




