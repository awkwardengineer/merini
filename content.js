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

      // after the link is detected, we can initiate some other things
      hideInboxOnClick(linkContainerElement);
      listenForSearchEvent();
    }
    
  },20);

};

detectSearchBar = ()=>{

  const searchBarPoller = setInterval(()=>{
   
    // on the initial load, there is only one toolbar
    // on subsequent updates, I think gmail renders a second one, and removes/hides the first
    const searchToolBars = document.querySelectorAll('.a5E');


    if (searchToolBars.length >= 1){

      const searchToolBar = searchToolBars[searchToolBars.length-1];
      console.log('polling for searchbar visibility');

      if (searchToolBar.checkVisibility()){
        clearInterval(searchBarPoller);
        console.log("search bar visibile");

        showInbox();

      }

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
  inboxes = document.querySelectorAll('.Nr.UI.S2.vy');

  console.log(inboxes);

  inboxes.forEach((inbox)=>{
    inbox.style.visibility='hidden';
  })

  console.log('hidden');
  //detectSearchBar();
};

const showInbox = ()=>{
  //gmail keeps appending inboxes and i think removing earlier ones
  //so we need to make sure the last one added to the list is visibile
  inboxes = document.querySelectorAll('.Nr.UI.S2.vy');

  //console.log(inboxes);

  const inbox = inboxes[inboxes.length-1];
  inbox.style.visibility = 'visible';
  
  console.log('shown');

};

const listenForSearchEvent = ()=> {
  window.onhashchange = ()=>{

    const currentHash = window.location.hash;
    
    console.log('hash change '+ currentHash );
   
    if (!currentHash.startsWith('#inbox')){
      console.log('non-inbox hash change');

      const pieces = currentHash.split('/');
      console.log(pieces);

      if(pieces.length < 3){
        // the "/" symbol only appears in the hash when reading an individual message
        // no need to detect the search bar then
        console.log("hash has one or no slash, initiating search");
        detectSearchBar(); 
      }
    }
  };
};


detectInboxLink();
