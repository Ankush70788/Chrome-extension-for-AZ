const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";
const bookmarksection=document.getElementById("bookmarks");
const assetURLmap={
    "play":chrome.runtime.getURL("assets/play.png"),
    "delete":chrome.runtime.getURL("assets/delete.png"),
}
document.addEventListener("DOMContentLoaded",()=>{     
       chrome.storage.sync.get([AZ_PROBLEM_KEY],(result)=>{
        const bookmarks=result[AZ_PROBLEM_KEY] || [];
        viewbookmarks(bookmarks);
     })
    })
function viewbookmarks(bookmarks){
    bookmarksection.innerHTML="";
    if(bookmarks.length==0){
        bookmarksection.innerHTML="<i>No bookmarks added</i>";
        return;
    }
    bookmarks.forEach((bookmark)=>{
    addBookmarks(bookmark);
    })

}
function addBookmarks(bookmark){
    const bookmarkdiv=document.createElement("div");
    const bookmarknamediv=document.createElement("div");
    const bookmarkeditdiv=document.createElement("div");
    bookmarknamediv.textContent=bookmark.name;
    bookmarknamediv.classList.add("bookmark-name");
    bookmarkeditdiv.classList.add("bookmark-controls");
    bookmarkdiv.classList.add("bookmark");
    setControlAttributes(assetURLmap["play"],playHandler,bookmarkeditdiv);
    setControlAttributes(assetURLmap["delete"],deleteHandler,bookmarkeditdiv);
    bookmarkdiv.append(bookmarknamediv);
    bookmarkdiv.append(bookmarkeditdiv);
    bookmarkdiv.setAttribute("url",bookmark.url);
    bookmarksection.appendChild(bookmarkdiv);

}
function setControlAttributes(src,handler,parentDiv){
    const control=document.createElement("img");
    control.src=src;
    control.style.height="20px";
    control.style.width="20px";
    control.addEventListener("click",handler);
    parentDiv.appendChild(control);

}
function playHandler(e){
    const url=e.target.parentNode.parentNode.getAttribute("url");
    window.open(url,"_blank");


}
function deleteHandler(e){
    const bookmarkItem=e.target.parentNode.parentNode;
    bookmarkItem.remove();
    deleteItemFromStorage(bookmarkItem.getAttribute("url"));

}
function deleteItemFromStorage(url){
    chrome.storage.sync.get([AZ_PROBLEM_KEY],(result)=>{
        const bookmarks=result[AZ_PROBLEM_KEY] || [];
        const updatedBookmarks=bookmarks.filter((bookmark)=>bookmark.url!=url);
        chrome.storage.sync.set({AZ_PROBLEM_KEY:updatedBookmarks},()=>{
            alert("Bookmark Deleted");
        })
    })

}
