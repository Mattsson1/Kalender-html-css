let nav = 0;// Denna variabel ska vi ha för att hålla reda på vilken månad vi är på
let clicked = null;//Clicked kommer vi ha för att ta reda på vilken dag vi klickar på
let events = localStorage.getItem('events') ? JSON.parse (localStorage.getItem('events')) :[];//"events" kommer vara en array av så kallade bokningar
//"localstorage" gör så att vi sparar bokningarna
//Vi kan bara lagra "strings" i local storage, alltså inga objekt
//Med JSON.parse så konvertar vi en 

const calendar = document.getElementById("calendar");// Ger min const variabel värdet "calendar". Denna variabel har vi för att vi ska komma åt kalendern så att vi slipper att kalla på den hela tiden
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]//Denna const variabel kommer vi använda för att fylla ut de dagarna som månaden inte börjar med 


//Funktionen för bokningar
function openModal(date)//Vi behöver veta vilket datum användaren trycker på vid bokning så vi vill spara 'date'
{
clicked = date;

const eventForDay = events.find(e => e.date === clicked);//Vi försöker hitta ett event som redan finns för denna dag

if(eventForDay)
{
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display ='block';
}else
{
newEventModal.style.display = 'block';
}

backDrop.style.display = 'block';

}





function load()// Denna funktion ska köras så fort vi trycker på något som tillexempel en dag i månaden eller fram och tillbaka på månaderna
{//Denna function kommer vi att återanvända i koden
const dt = new Date();//"Date" är ett object som får fram min exakta tid.
//Vi vill få ur dag,månad och år ifrån "Date" objektet


if(nav !== 0)//Om vi varken har gått framåt eller bakåt i månaden så ska vi
{

    dt.setMonth(new Date().getMonth() + nav);//
}

const day = dt.getDate();//Plockar ur dagen ifrån "Date"
const month = dt.getMonth();//Månad
const year = dt.getFullYear();//År
//Kör jag detta i consolen nu kommmer månad visa den föregående månad, pg.a det är index värde(Typ som en array)
//Så detta betyder att vi måste köra (month + 1)


//Här näst behöver jag få reda på hur många dagar det är i en månad
//const daysInMonth = new Date(year, month + 1, 0).getDate();//Här tar vi 0 för att då får vi sista dagen på föregående månad, hade vi tagit -1 hade det blivit
//näst sista dagen föregående månad... hade vi sättit 1 hade det blivit första dagen på månaden
//Vi tar alltså första dagen på månaden -1 vilket blir sista dagen på föregående månad
//console.log(daysInMonth);
//I consolen får vi nu ut antal dagar som det är i månaden... Nu vet vi hur många rutor vi ska printa ut

//Vi behöver också få ut första dagen i månaden, vilket är lättare att få fram 
const firstDayOfMonth = new Date(year, month, 1,);// Vi sätter 1 vilket gör att vi får fram första dagen i december
const daysInMonth = new Date(year, month + 1, 0).getDate();
//Vi behöver veta vilken dag i veckan som månaden börjar på, te.x tisdag? onsdag? eller torsdag? med 
const dateString = firstDayOfMonth.toLocaleDateString('en-US', 
{weekday: 'long',
year: 'numeric', 
month: 'numeric',
day: 'numeric'});//Denna metod retunerar datumet i en "string"
//'numeric' alltså siffror


//Här näst ska vi räkna ut hur många utfyllnads dagar vi ska printa för att få fram rätt dag som månaden ska börja på

const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); //Vi delar stringen så vi får ut "dagen" som månaden börjar på, i detta fall tisdag vill jag få ut

document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-US', { month: 'long' })} ${year}`; 

calendar.innerHTML = '';//Rensar alla daysquares divs så vi kan printa nya ifall man vill gå fram och tillbaka mellan månaderna


for(let i = 1; i <= paddingDays + daysInMonth; i++)//Nu printar vi ut alla månadsdagar
{
    const daySquare = document.createElement('div');//Skapar en div för varje dag
    daySquare.classList.add('day');//

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    //i min if-else sat s ska vi besluta om vi ska printa en riktig dag eller en så kallad utfyllnadsdag 
    if(i > paddingDays)
    {
        daySquare.innerText = i - paddingDays;
        const eventForDay = events.find(e => e.date === dayString);


        

        if(eventForDay)
        {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = eventForDay.title;
            daySquare.appendChild(eventDiv);

        }

        daySquare.addEventListener('click', () => openModal(dayString));//Vi vill köra en funktion varje gång man klickar på en dag

    }
    else
    {
        daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);

}

}

function closeModal()
{
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();

}

function saveEvent()
{
    if(eventTitleInput.value)
    {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,});
        
        localStorage.setItem('events', JSON.stringify(events));//Sparar bokningar i localstorage i vår events array
        closeModal();//sparar bokning sen kör jag funktionen closemodal som stänger rutan
    }
    else
    {
        eventTitleInput.classList.add('error');
    }
    
}

function deleteEvent()
{
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}


function initButtons(){
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);

}
initButtons();
load();//