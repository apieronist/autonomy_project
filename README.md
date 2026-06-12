# AUTONOMY ASSISTANT
#### Video URL: <UR_DEL_VIDEO_AQUÍ>

#### Description:
**Autonomy Assistant** is a responsive, web-based application designed to support the independence and safety of vulnerable individuals (such as senior citizens or patients with chronic conditions) in managing their daily medication schedules and emergency contacts.

The project was conceived with a core philosophy: **accessibility and resilience**. Recognizing that individuals in vulnerable situations may experience cognitive challenges, vision impairment, or sudden loss of internet connectivity, this application shifts away from traditional cloud-reliant architectures. Instead, it adopts a **"Local-First" approach**, utilizing client-side storage to ensure continuous, uninterrupted operation.

---

## Key Features & Accessibility Design

1. **100% Offline Capability (Resilience):**
   Unlike standard web applications that rely on a remote database, all user data—including medication schedules, emergency contacts, and compliance logs—is stored directly within the device's internal browser memory using the `localStorage` API. Once the initial files are loaded, the core system requires no internet connection to operate, preventing service drops in critical moments.

2. **Mobile-First Responsive Interface:**
   The UI dynamically adjusts across devices (smartphones, tablets, and desktop computers) using Bootstrap 5. In mobile viewports, elements automatically stack vertically to maximize screen real estate and avoid clutter.

3. **High-Contrast, Misclick-Resistant Elements:**
   Inputs and buttons are styled with custom, scalable sizing (`rem` units) and generous padding to achieve an oversized layout. Interactive elements exceed standard target-size guidelines, making them easy to press for users with visual impairments or motor tremors.

4. **Background Schedule Monitoring:**
   A client-side background timer continuously evaluates the current time against the user's medication schedule. If a dose is missed, the UI immediately shifts state, triggering a prominent, high-contrast, pulsating visual alarm.

5. **Integrated Emergency Directory:**
   The contact registry formats telephone numbers into direct action hyperlinks (`tel:` protocol). In case of an emergency, the user or a caregiver can initiate a phone call with a single click, eliminating the need to navigate the phone's native contact app.

---

## Project Structure & Architecture

```text
project/
├── app.py                 # Minimal Flask server acting as the application dispatcher.
├── helpers.py             # Auxiliary Python utilities for server-side maintenance.
├── requirements.txt       # Server-side Python dependencies (Flask).
├── static/
│   ├── css/
│   │   └── styles.css     # Custom accessible styling, color palettes, and animations.
│   └── js/
│       ├── database.js    # The core engine: localStorage CRUD operations and background timer.
│       └── alerts.js      # Reserved for future asynchronous push-notification extensions.
└── templates/
    ├── layout.html        # Main container framework, viewport setup, and responsive navigation.
    ├── index.html         # User dashboard displaying daily tasks and active alert zones.
    ├── medications.html   # Management interface for configuring the medication database.
    └── contacts.html      # Emergency contact registry with direct-dial capabilities.
```

---

## Versión en Español / Spanish Version

# ASISTENTE DE AUTONOMÍA
#### URL del Video: <UR_DEL_VIDEO_AQUÍ>

#### Descripción:
**Autonomy Assistant** (Asistente de Autonomía) es una aplicación web responsiva diseñada para respaldar la independencia y seguridad de personas vulnerables (como adultos mayores o pacientes con condiciones crónicas) en la gestión de sus cronogramas diarios de medicación y contactos de emergencia.

El proyecto fue concebido bajo una filosofía central: **accesibilidad y resiliencia**. Reconociendo que los individuos en situaciones de vulnerabilidad pueden experimentar desafíos cognitivos, disminución visual o pérdidas repentinas de conectividad a Internet, esta aplicación se aleja de las arquitecturas tradicionales dependientes de la nube. En su lugar, adopta un **enfoque "Local-First"**, utilizando el almacenamiento del lado del cliente para garantizar un funcionamiento continuo e ininterrumpido.

---

## Características Clave y Diseño de Accesibilidad

1. **Capacidad 100% Offline (Resiliencia):**
   A diferencia de las aplicaciones web estándar que dependen de una base de datos remota, todos los datos del usuario —incluyendo horarios de remedios, contactos de emergencia y registros de cumplimiento— se guardan directamente en la memoria interna del navegador del dispositivo utilizando la API `localStorage`. Una vez cargados los archivos iniciales, el sistema central no requiere conexión a Internet para operar, previniendo caídas del servicio en momentos críticos.

2. **Interfaz Responsiva Mobile-First:**
   La interfaz de usuario se ajusta dinámicamente a través de diferentes dispositivos (smartphones, tablets y computadoras de escritorio) utilizando Bootstrap 5. En pantallas móviles, los elementos se apilan verticalmente de forma automática para maximizar el espacio útil y evitar el desorden visual.

3. **Elementos de Alto Contraste y Resistentes a Clics Erróneos:**
   Los campos de entrada y los botones están diseñados con tamaños personalizados y escalables (unidades `rem`) junto con márgenes internos generosos para lograr un diseño maximizado. Los elementos interactivos superan las pautas estándar de tamaño de objetivo, facilitando su pulsación para usuarios con discapacidades visuales o temblores motores.

4. **Monitoreo de Horarios en Segundo Plano:**
   Un temporizador en el lado del cliente evalúa continuamente la hora actual frente al cronograma de medicación del usuario. Si se omite una dosis, la interfaz cambia de estado inmediatamente, activando una alarma visual pulsante de alto contraste y gran visibilidad.

5. **Directorio de Emergencia Integrado:**
   El registro de contactos formatea los números telefónicos en hipervínculos de acción directa (protocolo `tel:`). En caso de emergencia, el usuario o un cuidador puede iniciar una llamada telefónica con un solo clic, eliminando la necesidad de navegar por la aplicación de contactos nativa del teléfono.

---

## Estructura del Proyecto y Arquitectura


project/
├── app.py                 # Servidor ligero en Flask que actúa como despachador de la aplicación.
├── helpers.py             # Utilidades auxiliares en Python para el mantenimiento del servidor.
├── requirements.txt       # Dependencias de Python del lado del servidor (Flask).
├── static/
│   ├── css/
│   │   └── styles.css     # Estilos accesibles personalizados, paletas de colores y animaciones.
│   └── js/
│       ├── database.js    # El motor central: operaciones CRUD en localStorage y reloj en segundo plano.
│       └── alerts.js      # Reservado para futuras extensiones de notificaciones push asincrónicas.
└── templates/
    ├── layout.html        # Estructura del contenedor principal, configuración de viewport y navegación.
    ├── index.html         # Panel del usuario que muestra las tareas diarias y zonas de alerta activas.
    ├── medications.html   # Interfaz de gestión para configurar la base de datos de medicamentos.
    └── contacts.html      # Registro de contactos de emergencia con funciones de marcado directo.
 ```






