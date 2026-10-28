function tryAutoplayMusic()
{
	const m = document.getElementById('music');
	m.volume = .4;
	m.play().then(() =>
	{
		document.getElementById('musicBtn').innerHTML = '♫ <span>Pausar música</span>'
	}).catch(() =>
	{});
}
window.addEventListener('DOMContentLoaded', tryAutoplayMusic);
document.addEventListener('pointerdown', () =>
{
	const m = document.getElementById('music');
	if (m.paused && !window.musicUserPaused)
	{
		tryAutoplayMusic()
	}
},
{
	once: true
});
const $ = id => document.getElementById(id);
const music = $('music');
$('musicBtn').addEventListener('click', async () =>
{
	if (music.paused)
	{
		window.musicUserPaused = false;
		try
		{
			music.volume = .4;
			await music.play();
			$('musicBtn').innerHTML = '♫ <span>Pausar música</span>'
		}
		catch (e)
		{
			alert('Toca otra vez para activar la música.')
		}
	}
	else
	{
		window.musicUserPaused = true;
		music.pause();
		$('musicBtn').innerHTML = '♫ <span>Activar música</span>'
	}
});

function countdown()
{
	const now = Date.now(),
		dest = new Date('2027-02-06T10:30:00-06:00').getTime();
	let seconds = Math.max(0, Math.floor((dest - now) / 1000));
	if (!seconds)
	{
		$('clock').textContent = '¡Hoy es el gran día!';
		return
	}
	const dd = Math.floor(seconds / 86400);
	seconds %= 86400;
	const hh = Math.floor(seconds / 3600);
	seconds %= 3600;
	$('days').textContent = dd;
	$('hours').textContent = String(hh).padStart(2, '0');
	$('minutes').textContent = String(Math.floor(seconds / 60)).padStart(2, '0');
	$('seconds').textContent = String(seconds % 60).padStart(2, '0')
}
countdown();
setInterval(countdown, 1000);
const event = {
	title: 'Boda de Issa y Orlando',
	details: 'Celebración cristiana de nuestra boda. Invitación digital.',
	location: 'Puente de Tierra, Michoacán',
	start: '20270206T103000',
	end: '20270206T173000'
};
$('gcal').onclick = () => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(event.title) + '&dates=20270206T163000Z%2F20270206T233000Z&details=' + encodeURIComponent(event.details) + '&location=' + encodeURIComponent(event.location), '_blank', 'noopener');
$('ics').onclick = () =>
{
	const txt = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Issa y Orlando//Boda//ES', 'BEGIN:VEVENT', 'UID:boda-issa-orlando-20270206', 'DTSTAMP:20261026T120000Z', 'DTSTART:20270206T163000Z', 'DTEND:20270206T233000Z', 'SUMMARY:Boda de Issa y Orlando', 'DESCRIPTION:Celebración cristiana de nuestra boda', 'LOCATION:Puente de Tierra\, Michoacán', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
	const a = document.createElement('a');
	a.href = URL.createObjectURL(new Blob([txt],
	{
		type: 'text/calendar;charset=utf-8'
	}));
	a.download = 'boda-issa-orlando.ics';
	a.click();
	setTimeout(() => URL.revokeObjectURL(a.href), 1000)
};
const dialog = $('lightbox');
document.querySelectorAll('#photos img').forEach(img => img.onclick = () =>
{
	$('lightboximg').src = img.src;
	dialog.showModal()
});
$('closebox').onclick = () => dialog.close();
dialog.addEventListener('click', e =>
{
	if (e.target === dialog) dialog.close()
});

