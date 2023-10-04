// background.js

// Listener for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1 and pad with '0'
    const day = String(today.getDate()).padStart(2, '0'); // Pad with '0' if the day is a single digit

    const formattedDate = `${year}-${month}-${day}`;

    const gmailQuery = encodeURIComponent(`before:${formattedDate}+in:inbox`);

    console.log(gmailQuery);

    const newUrl = tab.url;

    if (changeInfo.status === 'loading' || changeInfo.status === 'unloaded') {
        // Check the new URL in the tab
        console.log(`new url:${newUrl}`);
        
        if (newUrl.startsWith('https://mail.google.com/mail/u/0/#inbox')) {
            // Change the URL of the tab to a new URL
            const newTabUrl = `https://mail.google.com/mail/u/0/#search/${gmailQuery}`;

            chrome.tabs.update(tabId, { url: newTabUrl });
        }
        else if (newUrl === 'https://www.nytimes.com/'){
            const newTabUrl = `https://www.nytimes.com/section/todayspaper`;

            chrome.tabs.update(tabId, { url: newTabUrl });
        }
        else if (newUrl === 'https://news.ycombinator.com/'){
            const newTabUrl = `https://news.ycombinator.com/front`;

            chrome.tabs.update(tabId, { url: newTabUrl });
        }
    }
    
});

  