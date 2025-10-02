document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    if (calendarEl) {
  
      // Cargar eventos desde JSON
      fetch('events.json')
        .then(response => response.json())
        .then(events => {
          var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'es',
            firstDay: 1,
            height: "auto",
  
            // Cabecera con botones
            headerToolbar: {
              left: 'prev',
              center: 'title',
              right: 'next todayButton' // botón Hoy al lado de next
            },
  
            // Botón personalizado “Hoy”
            customButtons: {
              todayButton: {
                text: 'Hoy',
                click: function() {
                  const today = new Date();
                  calendar.gotoDate(today); // mueve la vista al día actual
                }
              }
            },
  
            nowIndicator: true, // resalta el día actual
  
            events: events, // cargar desde JSON
  
            // Modal de eventos mejorado
            eventClick: function(info) {
              info.jsEvent.preventDefault();
  
              const props = info.event.extendedProps;
  
              // Título, subtitulo, descripción y participantes
              document.getElementById('eventTitle').innerText = info.event.title;
              document.getElementById('eventSubtitle').innerText = props.subtitle || "";
              document.getElementById('eventDescription').innerText = props.description || "";
              document.getElementById('participants').innerText = props.participate ||  "";
  
              // Columnas
              const imageCol = document.getElementById('imageCol');
              const contentCol = document.getElementById('contentCol');
  
                // Imagen
                const imgEl = document.getElementById('eventImage');
                // const imgLinkEl = document.getElementById('eventImageLink');

                if (props.image) {
                imgEl.src = props.image;
                imgEl.style.display = 'block';
                // imgLinkEl.href = props.image; // enlaza la misma imagen
                // imgLinkEl.style.display = 'block';
                imageCol.style.display = 'flex';
                contentCol.className = "col-md-6"; // ajustar contenido a la mitad
                } else {
                imgEl.style.display = 'none';
                // imgLinkEl.style.display = 'none';
                imageCol.style.display = 'none';
                contentCol.className = "col-md-12";
                }

                // Inicializar GLightbox cada vez que se abre el modal
                // if (props.image) {
                // const lightbox = GLightbox({
                //     selector: '#eventImageLink'
                // });
                // }
                const participantsBlock = document.getElementById('participantsBlock');
                const participantsEl = document.getElementById('participants');
                
                if (props.participate) {
                    participantsEl.innerText = props.participate;
                    participantsBlock.style.display = 'block';
                } else {
                    participantsBlock.style.display = 'none';
                }
                
    
              // Botón Web del evento
              const urlEl = document.getElementById('eventUrl');
              if (props.eventUrl) {
                urlEl.href = props.eventUrl;
                urlEl.style.display = 'inline-block';
              } else {
                urlEl.style.display = 'none';
              }
  
              // Botón Streaming
              const streamEl = document.getElementById('eventStreaming');
              if (props.streaming) {
                streamEl.href = props.streaming;
                streamEl.style.display = 'inline-block';
              } else {
                streamEl.style.display = 'none';
              }
  
              // Mostrar modal
              var eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
              eventModal.show();
            },
  
            // Formatear título del mes sin "de"
            datesSet: function(info) {
              const titleEl = document.querySelector('.fc-toolbar-title');
              if (titleEl) {
                const firstDayOfMonth = info.view.currentStart;
                const month = firstDayOfMonth.toLocaleString('es-ES', { month: 'long' });
                const year = firstDayOfMonth.getFullYear();
                titleEl.innerText = month.charAt(0).toUpperCase() + month.slice(1) + ' ' + year;
              }
            }
          });
  
          calendar.render();
        })
        .catch(error => console.error('Error cargando events.json:', error));
    }
  });
  