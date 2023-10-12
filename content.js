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
    
    const inboxLinkElement = document.querySelector('.wT > div:first-child > .byl:first-child .aim');
    const linkContainerElement = document.querySelector('.TK');

    if (linkContainerElement){
      clearInterval(inboxLinkPoller);
      console.log('inbox link container exists');
      console.log(linkContainerElement);

      hideInboxOnClick(linkContainerElement);
    }
    
  },20);

};

detectSearchBar = ()=>{

  searchBarPoller = setInterval(()=>{
    console.log('polling for search bar')
    
    const searchToolBar = document.querySelector('.a5E');

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