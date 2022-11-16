let nav = 0;// Denna variabel ska vi ha för att hålla reda på vilken månad vi är på
let clicked = null;//Clicked kommer vi ha för att ta reda på vilken dag vi klickar på
let events = localStorage.getItem('events') ? JSON.parse (localStorage.getItem('events')) :[];//"events" kommer vara en array av så kallade bokningar
//"localstorage" gör så att vi sparar bokningarna
//Vi kan bara lagra "strings" i local storage, alltså inga objekt
//Med JSON.parse så konvertar vi en 