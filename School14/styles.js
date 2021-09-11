let styles;

window.onload = function () {
    styles = document.getElementsByTagName('style')[0];
    chrome.storage.sync.get("theme14", function(items) {
        loadTheme(items.theme14);
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

function loadTheme(id) {
    let style = styles.innerHTML;
    style += getStyle("gradient", getGradient(id));

    // console.log(style);
    styles.innerHTML = style;
}

function getStyle(e, s) {
    return e + "{" + s + "}";
}

let gradientColor1 = [
    '#ff00f5',
    '#ff00f5',
    '#007eff'
];

let gradientColor2 = [
    '#007eff',
    '#b600ff',
    '#b600ff'
];

function getGradient(id) {
    return 'background: linear-gradient(45deg, ' 
        + gradientColor1[id]
        + ' 0%, ' 
        + gradientColor2[id] 
        + ' 100%);';
}