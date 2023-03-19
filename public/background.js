chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: `index.html?url=${encodeURIComponent(tab.url)}`,
    type: "popup",
    width: 300,
    height: 400,
  });
});
