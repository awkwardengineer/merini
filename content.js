console.log('Gmail Addict content script running');

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1 and pad with '0'
const day = String(today.getDate()).padStart(2, '0'); // Pad with '0' if the day is a single digit

const formattedDate = `${year}-${month}-${day}`;

const gmailQuery = `before:${formattedDate} in:inbox`



//const InboxArea = '.aeF';
//const InboxLink = '.wT > div:first-child > .byl:first-child .aim';


const detectInboxArea = setInterval(()=>{

  console.log('polling for inbox area');
  
  const area = document.querySelector('.aeF');

  if (area){
    clearInterval(detectInboxArea);
    console.log('Inbox area exists!');
    console.log(area);
  }

},20);

const detectInboxLink = setInterval(()=>{
  console.log('polling for inbox link');

  const inboxLinkDetail = document.querySelector('.aio.UKr6le');

  if (inboxLinkDetail){
    if (inboxLinkDetail.hasChildNodes()){
      clearInterval (detectInboxLink);
      console.log('Inbox link exists');
      console.log(inboxLinkDetail);
      console.log('Child Nodes');
      console.log(inboxLinkDetail.childNodes);


      requestIdleCallback(init);
    }
  };
},20) 


init = ()=>{
  console.log('init fired!');

  const inboxArea = document.querySelector('.aeF');

  pollSearchAndShow = setInterval(()=>{
    console.log('polling for search bar')
    
    const searchToolBar = document.querySelector('.Th');

    if (searchToolBar){
      clearInterval(pollSearchAndShow);

      pollVisibility = setInterval(()=>{
        console.log('polling for searchbar visibility');

        if (searchToolBar.checkVisibility){
          clearInterval(pollVisibility);
          console.log("search bar visibile");

          inboxArea.style.visibility = 'visible';

          const inboxLink = document.querySelector('.wT > div:first-child > .byl:first-child .aim');
          console.log('inbox link:')
          console.log(inboxLink);
          inboxLink.onclick = ()=>{
            console.log('onclick and hidden');
            inboxArea.style.visibility='hidden';
            
            setTimeout(init,1000);
          }

        }
      },20);
    }



  },20);

}




/*
showAfterDelay = ()=>{
  setTimeout(()=>{
    console.log("show it!");
    document.querySelector(InboxArea).style.visibility='visible';
  },1000)
};



afterInitialLoading = ()=>{

  console.log('after idle');
 
  const link = document.querySelector(InboxLink);
  const linkObserver = new MutationObserver();
  linkObserver.observer(link,{childList:true});

  const onLinkChildChange = (mutationList, observer)=>{

  }
  
  console.log(link);

  link.onclick = ()=>{
    document.querySelector(InboxArea).style.visibility='hidden';
    console.log('on click hidden');
  };

  window.addEventListener("hashchange", ()=>{
    const hash = window.location.hash.split('/')[0];
    
    if (hash === '#search'){
      requestIdleCallback(()=>{
        showAfterDelay();
      })
    } 
  });

  const watchInboxLink = querySelector(InboxLink)

  showAfterDelay();
}


requestIdleCallback(()=>{
  setTimeout(
    afterInitialLoading,
    1500
  )
});
*/
