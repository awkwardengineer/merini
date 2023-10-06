console.log('Gmail Addict content script running');

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1 and pad with '0'
const day = String(today.getDate()).padStart(2, '0'); // Pad with '0' if the day is a single digit

const formattedDate = `${year}-${month}-${day}`;

const gmailQuery = `before:${formattedDate} in:inbox`

//const InboxArea = '.aeF';
//const InboxLink = '.wT > div:first-child > .byl:first-child .aim';

const detectInboxLink = ()=>{

  console.log('polling for inbox link');
  const inboxLinkPoller = setInterval(()=>{
    
    const inboxLinkElement = document.querySelector('.aio.UKr6le');
    const linkContainerElement = document.querySelector('.TK');

    //gmail upates the inbox link (i think with the number of messages), removes it, and reattaches it
    //so the MutationObserver watches for that behavior and makes sure to reattach the onclick handler
    const observer = new MutationObserver((mutationList,observer)=>{
      console.log('inbox link mutation found, calling detection again');
      detectInboxLink();
    });


    if (inboxLinkElement){
      if (inboxLinkElement.hasChildNodes()){

        clearInterval(inboxLinkPoller);
        console.log('inbox link exists, has nodes');
        console.log(inboxLinkElement);
        console.log(linkContainerElement);

        hideInboxOnClick(inboxLinkElement);

        observer.observe(linkContainerElement, {childList:true, subtree:true, attributes:false});
      }
    }

  },20);

};

detectSearchBar = ()=>{

  searchBarPoller = setInterval(()=>{
    console.log('polling for search bar')
    
    const searchToolBar = document.querySelector('.Th');

    if (searchToolBar){
      clearInterval(searchBarPoller);

      pollVisibility = setInterval(()=>{
        console.log('polling for searchbar visibility');

        if (searchToolBar.checkVisibility){
          clearInterval(pollVisibility);
          console.log("search bar visibile");

          showInbox();

        }

      },20);
    }
  },20);
}

const hideInboxOnClick = (element)=>{
  element.onclick = ()=>{
    hideInbox();
    console.log('clicked on inbox link');
  }

};

const hideInbox = ()=>{
  document.querySelector('.aeF').style.visibility='hidden';
  console.log('hidden');
  detectSearchBar();
};

const showInbox = ()=>{
 
  //even when the search bar is logically computed as visibile, the inbox is still seen for a split second
  //before the search results are shown. a brief delay fixes that.
  setTimeout(()=>{
    document.querySelector('.aeF').style.visibility='visible';
    console.log('shown');
  },500)

};

detectInboxLink();
detectSearchBar();