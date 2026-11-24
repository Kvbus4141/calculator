const liczby = document.querySelectorAll('.liczba')
const operatory = document.querySelectorAll('.operator')
const wyczysc = document.querySelector('.wyczysc')
const usun = document.querySelector('.usun')
const rownosc = document.querySelector('.rownosc')
const aktualnywynik = document.querySelector('.aktualny-wynik')
const poprzedniwynik = document.querySelector('.poprzedni-wynik')

var poprzedniedzialanie = ''
var aktualnedzialanie = ''
var operacja = undefined


const oblicz = () =>
{
	let dzialanie
	if(!poprzedniedzialanie || !aktualnedzialanie)
	{
		return
	}
	const poprzednie = parseFloat(poprzedniedzialanie)
	const aktualne = parseFloat(aktualnedzialanie)
	if(isNaN(poprzednie) || isNaN(aktualne))
	{
		return
	}
	switch(operacja)
	{
		case '+':
			dzialanie = poprzednie + aktualne
			break;
		case '-':
			dzialanie = poprzednie - aktualne
			break;
		case '×':
			dzialanie = poprzednie * aktualne
			break;
		case '÷':
			if(aktualne === 0)
			{
				wyczyscwynik()
				return
			}
			dzialanie = poprzednie / aktualne
			break;
		
		
		default: return
	}
	aktualnedzialanie = dzialanie
	operacja = undefined
	poprzedniedzialanie = ''
}

const wybierzoperacje = (operator) =>
{
	if(aktualnedzialanie === '')
	{
		return
	}
	if(poprzedniedzialanie !== '')
	{
		const poprzednie = wynikpoprzednie.innerText
		if(aktualnedzialanie.toString() === '0' && poprzednie[poprzednie.length-1] === '÷')
		{
			wyczyscwynik()
			return
		}
		oblicz()
	}
	operacja = operator
	poprzedniedzialanie = aktualnedzialanie
	aktualnedzialanie = ''
}

const aktualizujwynik = () => 
{
	aktualnywynik.innerText = aktualnedzialanie
	if(operacja != null)
	{
		poprzedniwynik.innerText = poprzedniedzialanie + operacja
	} else
	{
		poprzedniwynik.innerText = ''
	}
}

const dodajliczbe = (liczba) =>
{
	if(liczba === '•')
	{
		if(aktualnedzialanie.includes('.'))
		{
			return
		}
		liczba='.';
	}
	aktualnedzialanie = aktualnedzialanie.toString() + liczba.toString()
}

const usunliczbe = () =>
{
	aktualnedzialanie = aktualnedzialanie.toString().slice(0, -1)
}

const wyczyscwynik = () =>
{
	poprzedniedzialanie = ''
    aktualnedzialanie = ''
    operacja = undefined
}

liczby.forEach((liczba) =>
{
	liczba.addEventListener('click', () =>
	{
		dodajliczbe(liczba.innerText)
		aktualizujwynik()
	})
})

usun.addEventListener('click', () =>
{
	usunliczbe()
	aktualizujwynik()
})

operatory.forEach((operator) =>
{
	operator.addEventListener('click', () =>
	{
		wybierzoperacje(operator.innerText)
		aktualizujwynik()
	})
})

rownosc.addEventListener('click', () =>
{
	oblicz()
	aktualizujwynik()
})

wyczysc.addEventListener('click', () =>
{
	wyczyscwynik()
	aktualizujwynik()
})