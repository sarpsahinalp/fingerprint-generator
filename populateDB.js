async function getGeneratedFingerprints() {
    const response = await fetch('fingerprint.json')
    return response.json();
}

async function fetchGeneratorData() {
    const response = await fetch('https://raw.githubusercontent.com/apify/fingerprint-generator/master/src/data_files/fingerprint-network-definition.json')
    return response.json();
}

let index = document.getElementById("index").value
console.log("INDEX", index)

function getRandomBoolean() {
    return Math.random() < 0.5; // Returns true with 50% probability
}

function addRandomSuffixWithProbability(inputString) {
    const suffixProbabilities = {
        "slimerjs": 0.01,
        "headless": 0.01,
        "electron": 0.01
    };

    let random;
    random = Math.random();
    let selectedSuffix = "";

    for (const suffix in suffixProbabilities) {
        if (random < suffixProbabilities[suffix]) {
            selectedSuffix = suffix;
            break;
        } else {
            random -= suffixProbabilities[suffix];
        }
    }

    return inputString + selectedSuffix;
}

function getRandomElementFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function getRandomBrowser() {
    const browsers = ["unknown", "chrome", "firefox", "opera", "safari", "internet_explorer", "wechat", "edge"];
    const randomIndex = Math.floor(Math.random() * browsers.length);
    return browsers[randomIndex];
}

function getRandomRenderingEngine() {
    const renderingEngines = ["unknown", "chromium", "gecko", "webkit"];
    const randomIndex = Math.floor(Math.random() * renderingEngines.length);
    return renderingEngines[randomIndex];
}

function getRandomEvalLength() {
    const lengths = [33, 37, 39];
    const randomIndex = Math.floor(Math.random() * lengths.length);
    return lengths[randomIndex];
}

function getRandomArray() {
    const probability = 0.01;

    if (Math.random() < probability) {
        return [];
    } else {
        return [["lang"]];
    }
}

function getRandomBooleanTrue() {
    return Math.random() < 0.99;
}

function getRandomBooleanFalse() {
    return Math.random() > 0.99;
}

function getRandomWeightedNumber() {
    const maxNumber = 30;
    const exponent = 3; // Adjust the exponent to control the distribution shape

    // Generate a random number with a weighted distribution
    const weightedRandom = Math.pow(Math.random(), exponent);

    // Scale and round to get a number between 0 and maxNumber
    return Math.floor(weightedRandom * (maxNumber + 1));
}

function getRandomVendor() {
    const probabilityBrianPaul = 0.01;
    const entities = [
        "Google Inc.",
        "WebKit",
        "Apple Computer, Inc.",
        "Unknown"
    ];

    if (Math.random() < probabilityBrianPaul) {
        return "Brian Paul";
    } else {
        const randomIndex = Math.floor(Math.random() * entities.length);
        return entities[randomIndex];
    }
}

function getRandomRenderer() {
    const probabilityMesaOffScreen = 0.001;
    const graphicsInfoOptions = [
        "Intel(R) HD Graphics.",
        "WebKit WebGL",
        "ANGLE (Intel, Mesa Intel(R) Xe Graphics (TGL GT2), OpenGL 4.6)",
        "Unknown",
        "Mozilla"
    ];

    if (Math.random() < probabilityMesaOffScreen) {
        return "Mesa offScreen";
    } else {
        const randomIndex = Math.floor(Math.random() * graphicsInfoOptions.length);
        return graphicsInfoOptions[randomIndex];
    }
}

function extractScreenInfo(inputString) {
    const regex = /"innerHeight":(\d+),"outerHeight":(\d+),"outerWidth":(\d+),"innerWidth":(\d+)/;
    const match = inputString.match(regex);

    if (match) {
        const [, innerHeight, outerHeight, outerWidth, innerWidth] = match.map(Number);
        return {
            innerHeight,
            outerHeight,
            outerWidth,
            innerWidth
        };
    } else {
        return {
            innerHeight: 0,
            outerHeight: 0,
            outerWidth: 0,
            innerWidth: 0
        }; // Return null or any other value if the pattern is not found
    }
}

const generatorData = fetchGeneratorData()
const fingerprints = getGeneratedFingerprints()

generatorData.then(generatorData => {
    fingerprints.then(fingerprints => {

        for (let i = 0; i < 1000; i++) {
            const botPromise = import('https://openfpcdn.io/botd/v1').then((Botd) =>
                Botd.load()
            );

            console.log(index)

            let jsonData = {
                bot: false,
                android: false,
                appVersion: "",
                browserEngineKind: "",
                browserKind: "",
                distinctiveProps: [],
                documentElementKeys: [],
                documentFocus: false,
                evalLength: 0,
                functionBind: "",
                languages: [],
                mimeTypesConsistent: false,
                notificationPermissions: false,
                pluginsArray: false,
                pluginsLength: 0,
                productSub: 0,
                process: 0,
                rtt: 0,
                userAgent: "",
                webDriver: false,
                webGlVendor: "",
                webGlRenderer: "",
                windowExternal: "",
                innerHeight: 0,
                innerWidth: 0,
                outerHeight: 0,
                outerWidth: 0
            }

            botPromise
                .then((bot) => {
                    bot.components.android.value = getRandomBooleanFalse();
                    bot.components.appVersion.value = addRandomSuffixWithProbability(fingerprints[index].fingerprint.navigator.appVersion);
                    bot.components.browserEngineKind.value = getRandomRenderingEngine();
                    bot.components.browserKind.value = getRandomBrowser();
                    bot.components.documentFocus.value = getRandomBoolean();
                    bot.components.evalLength.value = getRandomEvalLength();
                    bot.components.languages.value = [fingerprints[index].fingerprint.navigator.languages];
                    bot.components.mimeTypesConsistent.value = getRandomBooleanTrue();
                    bot.components.notificationPermissions.value = getRandomBoolean();
                    bot.components.pluginsArray.value = getRandomBooleanTrue();
                    bot.components.pluginsLength.value = fingerprints[index].fingerprint.pluginsData.plugins.length;
                    bot.components.productSub.value = fingerprints[index].fingerprint.navigator.productSub;
                    bot.components.rtt.value = getRandomBooleanFalse() ? -1 : Math.floor(Math.random() * 251);
                    bot.components.userAgent.value = fingerprints[index].fingerprint.navigator.userAgent;
                    bot.components.webDriver.value = getRandomBooleanFalse();
                    bot.components.webGL.value.vendor = getRandomVendor();
                    bot.components.webGL.value.renderer = getRandomRenderer();
                    let screenInfo = extractScreenInfo(getRandomElementFromArray(generatorData.nodes[17].possibleValues));
                    bot.components.windowSize.value.innerHeight = screenInfo.innerHeight;
                    bot.components.windowSize.value.innerWidth = screenInfo.innerWidth;
                    bot.components.windowSize.value.outerHeight = screenInfo.outerHeight;
                    bot.components.windowSize.value.outerWidth = screenInfo.outerWidth;

                    jsonData.android = bot.components.android.value
                    jsonData.appVersion = bot.components.appVersion.value
                    jsonData.browserEngineKind = bot.components.browserEngineKind.value;
                    jsonData.browserKind = bot.components.browserKind.value;
                    jsonData.distinctiveProps = JSON.stringify(bot.components.distinctiveProps.value).split(",");
                    jsonData.documentElementKeys = bot.components.documentElementKeys.value;
                    jsonData.documentFocus = bot.components.documentFocus.value;
                    jsonData.evalLength = bot.components.evalLength.value;
                    jsonData.functionBind = bot.components.functionBind.value;
                    jsonData.languages = bot.components.languages.value;
                    jsonData.mimeTypesConsistent = bot.components.mimeTypesConsistent.value;
                    jsonData.notificationPermissions = bot.components.notificationPermissions.value;
                    jsonData.pluginsArray = bot.components.pluginsArray.value;
                    jsonData.pluginsLength = bot.components.pluginsLength.value;
                    jsonData.process = 0;
                    jsonData.productSub = bot.components.productSub.value;
                    jsonData.rtt = bot.components.rtt.value;
                    jsonData.userAgent = bot.components.userAgent.value;
                    jsonData.webDriver = bot.components.webDriver.value;
                    jsonData.webGlVendor = bot.components.webGL.value.vendor;
                    jsonData.webGlRenderer = bot.components.webGL.value.renderer;
                    jsonData.windowExternal = bot.components.windowExternal.value;
                    jsonData.innerHeight = bot.components.windowSize.value.innerHeight;
                    jsonData.innerWidth = bot.components.windowSize.value.innerWidth;
                    jsonData.outerHeight = bot.components.windowSize.value.outerHeight;
                    jsonData.outerWidth = bot.components.windowSize.value.outerWidth;
                    jsonData.bot = bot.detect().bot

                    const apiEndpoint = "http://localhost:8080/api/bot-data";

                    let headers;
                    headers = {
                        "Content-Type": "application/json",
                    };

                    // Make the POST request
                    fetch(apiEndpoint, {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(jsonData),
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        console.log("POSTED", i)
                    })
                        .then((data) => {
                            console.log("POST request successful!");
                            console.log("Response:", data);
                        })
                        .catch((error) => {
                            console.error("POST request failed:", error);
                        });
                    document.getElementById("index").value = index++
                })
        }
    })
})
