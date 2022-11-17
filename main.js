let nav = 0;// Denna variabel ska vi ha för att hålla reda på vilken månad vi är på
let clicked = null;//Clicked kommer vi ha för att ta reda på vilken dag vi klickar på
let events = localStorage.getItem('events') ? JSON.parse (localStorage.getItem('events')) :[];//"events" kommer vara en array av så kallade bokningar
//"localstorage" gör så att vi sparar bokningarna
//Vi kan bara lagra "strings" i local storage, alltså inga objekt
//Med JSON.parse så konvertar vi en 

const calendar = document.getElementById("calendar");// Ger min const variabel värdet "calendar". Denna variabel har vi för att vi ska komma åt kalendern så att vi slipper att kalla på den hela tiden
const weekdays = ["Monday", "Tuesday", "Wednesday","Tuesday","Friday","Saturday","Sunday"]//Denna const variabel kommer vi använda för att fylla ut de dagarna som månaden inte börjar med 

function load()// Denna funktion ska köras så fort vi trycker på något som tillexempel en dag i månaden eller fram och tillbaka på månaderna
{//Denna function kommer vi att återanvända i koden
const dt = new Date();//"Date" är ett object som får fram min exakta tid.
//Vi vill få ur dag,månad och år ifrån "Date" objektet
const day = dt.getDate();//Plockar ur dagen ifrån "Date"
const month = dt.getMonth();//Månad
const year = dt.getFullYear();//År
//Kör jag detta i consolen nu kommmer månad visa den föregående månad, pg.a det är index värde(Typ som en array)
//Så detta betyder att vi måste köra (month + 1)


//Här näst behöver jag få reda på hur många dagar det är i en månad
const daysInMonth = new Date(year, month + 1, 0).getDate();//Här tar vi 0 för att då får vi sista dagen på föregående månad, hade vi tagit -1 hade det blivit
//näst sista dagen föregående månad... hade vi sättit 1 hade det blivit första dagen på månaden
//Vi tar alltså första dagen på månaden -1 vilket blir sista dagen på föregående månad
console.log(daysInMonth);
//I consolen får vi nu ut antal dagar som det är i månaden... Nu vet vi hur många rutor vi ska printa ut

//Vi behöver också få ut första dagen i månaden, vilket är lättare att få fram 
const firstDayOfMonth = new Date(year, month, 1)// Vi sätter 1 vilket gör att vi får fram första dagen i december

const dateString = firstDayOfMonth.toLocaleDateString('de-DE')//Denna metod retunerar datumet i en "string"
console.log(dateString);
}
load();//