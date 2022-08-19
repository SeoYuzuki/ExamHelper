const charCodeMap = {
    1: "A",
    A: "A",
    2: "B",
    B: "B",
    3: "C",
    C: "C",
    4: "D",
    D: "D",
    5: "E",
    E: "E",
    6: "F",
    F: "F",
    7: "G",
    G: "G",
    8: "H",
    H: "H",
    9: "I",
    I: "I"
};

// array 是否相同 不計排序
const arraysEqual = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    a = a.sort();
    b = b.sort();
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

/**
 * 讀檔 回傳Topic物件
 * @param {*} file 檔案
 */
const getTopicByFile = async function (file) {
    return new Promise(resolve => {
        if (!file.name.includes(".txt") && !file.name.includes(".json")) {
            this.$Message.warning("不合規副檔名");
            resolve({});
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            let topic = JSON.parse(reader.result);
            if (topic.topicName) {
                console.log("working on " + topic.topicName);
            } else {
                this.$Message.warning("不合規檔案");
            }

            resolve(topic);
        };
        reader.onerror = err => {
            this.$Message.warning("讀檔錯誤");
            console.log("readFile error");
        };
        reader.readAsText(file);
    });
};


const getTopicsByFile = async function (files) {
    console.log(files, files.length)
    let topicList = [];
    for (let i = 0; i < files.length; i++) {
        topicList.push(await getTopicByFile(files[i]));
    }

    return topicList;
}