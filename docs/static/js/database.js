// ==========================================
// 1. DATABASE CORE FUNCTIONS (localStorage)
// ==========================================

// Helper to get data safely from local storage
function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Helper to save data safely to local storage
function saveLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ==========================================
// 2. MEDICATIONS MANAGEMENT LOGIC
// ==========================================
function saveMedication(name, dosage, time) {
    let medications = getLocalData('medications');
    let newMed = {
        id: 'med_' + Date.now(),
        name: name,
        dosage: dosage,
        schedule_time: time
    };
    medications.push(newMed);
    saveLocalData('medications', medications);
    renderMedicationsPage();
}

function deleteMedication(id) {
    let medications = getLocalData('medications');
    medications = medications.filter(med => med.id !== id);
    saveLocalData('medications', medications);

    // Also clean up logs associated with this medication
    let logs = getLocalData('medication_logs');
    logs = logs.filter(log => log.medication_id !== id);
    saveLocalData('medication_logs', logs);

    renderMedicationsPage();
}

// ==========================================
// 3. EMERGENCY CONTACTS LOGIC
// ==========================================
function saveContact(name, relationship, phone) {
    let contacts = getLocalData('contacts');
    let newContact = {
        id: 'contact_' + Date.now(),
        name: name,
        relationship: relationship,
        phone_number: phone
    };
    contacts.push(newContact);
    saveLocalData('contacts', contacts);
    renderContactsPage();
}

function deleteContact(id) {
    let contacts = getLocalData('contacts');
    contacts = contacts.filter(c => c.id !== id);
    saveLocalData('contacts', contacts);
    renderContactsPage();
}

// ==========================================
// 4. MEDICATION TRACKING LOGIC (LOGS)
// ==========================================
function takeMedication(id) {
    let logs = getLocalData('medication_logs');
    let todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    let newLog = {
        id: 'log_' + Date.now(),
        medication_id: id,
        date: todayStr,
        timestamp: new Date().toLocaleTimeString().substring(0, 5),
        status: 'Taken'
    };
    logs.push(newLog);
    saveLocalData('medication_logs', logs);

    // Refresh dashboard immediately to update button colors and check alerts
    renderDashboard();
}

// ==========================================
// 5. RENDERING ENGINE (UI GENERATION WITH EDIT/DELETE)
// ==========================================

function renderDashboard() {
    const listContainer = document.getElementById('medications-list');
    const alertContainer = document.getElementById('alert-container');
    if (!listContainer) return;

    let medications = getLocalData('medications');
    let logs = getLocalData('medication_logs');
    let todayStr = new Date().toISOString().split('T')[0];
    let currentTime = new Date().toTimeString().substring(0, 5);

    let todayLogs = logs.filter(log => log.date === todayStr && log.status === 'Taken');
    let takenIds = todayLogs.map(log => log.medication_id);

    if (medications.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center text-muted p-5 dashboard-card">
                <p class="fs-4 m-0">No medications configured yet.</p>
                <a href="/medications" class="btn btn-primary btn-lg mt-3">Add Medication</a>
            </div>`;
        alertContainer.innerHTML = "";
        return;
    }

    let html = "";
    let alertHtml = "";

    medications.forEach(med => {
        let isTaken = takenIds.includes(med.id);
        let isOverdue = currentTime > med.schedule_time && !isTaken;

        if (isOverdue) {
            alertHtml += `
                <div class="alert-urgent shadow text-center mb-3">
                    ⚠️ ALERT: It's past ${med.schedule_time}! Please take ${med.name} (${med.dosage}).
                </div>`;
        }

        html += `
            <div class="dashboard-card shadow-sm d-flex flex-column align-items-center justify-content-between p-4 mb-3">
                <div class="text-center mb-3">
                    <h2 class="fw-bold text-dark m-0">${med.name}</h2>
                    <p class="fs-4 text-muted m-0">${med.dosage} — ⏰ <strong>${med.schedule_time}</strong></p>
                </div>
                ${isTaken ?
                    `<button class="btn btn-success btn-accessible disabled" disabled>✓ Medication Taken</button>` :
                    `<button class="btn ${isOverdue ? 'btn-danger' : 'btn-primary'} btn-accessible" onclick="takeMedication('${med.id}')">
                        ${isOverdue ? '🚨 TAKE NOW' : '💊 Mark as Taken'}
                     </button>`
                }
            </div>`;
    });

    listContainer.innerHTML = html;
    alertContainer.innerHTML = alertHtml;
}

function renderMedicationsPage() {
    const container = document.getElementById('current-meds-list');
    if (!container) return;

    let medications = getLocalData('medications');
    if (medications.length === 0) {
        container.innerHTML = `<p class="text-muted fs-5">No medications added yet.</p>`;
        return;
    }

    let html = "";
    medications.forEach(med => {
        html += `
            <div class="dashboard-card shadow-sm p-3 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 class="fw-bold m-0">${med.name}</h4>
                        <span class="fs-5 text-muted">${med.dosage} at <strong>${med.schedule_time}</strong></span>
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col-6">
                        <button class="btn btn-warning w-100 fw-bold fs-5 p-2" onclick="editMedication('${med.id}')">✏️ Edit</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-danger w-100 fw-bold fs-5 p-2" onclick="deleteMedication('${med.id}')">🗑️ Delete</button>
                    </div>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

function renderContactsPage() {
    const container = document.getElementById('contacts-list');
    if (!container) return;

    let contacts = getLocalData('contacts');
    if (contacts.length === 0) {
        container.innerHTML = `<p class="text-muted fs-5">No contacts added yet.</p>`;
        return;
    }

    let html = "";
    contacts.forEach(c => {
        html += `
            <div class="dashboard-card shadow-sm p-4 mb-3">
                <div class="text-center mb-3">
                    <h3 class="fw-bold m-0">${c.name}</h3>
                    <span class="badge bg-info text-dark fs-6">${c.relationship}</span>
                </div>

                <a href="tel:${c.phone_number}" class="btn btn-success btn-accessible mb-3">
                    📞 Call: ${c.phone_number}
                </a>

                <div class="row g-2">
                    <div class="col-6">
                        <button class="btn btn-warning w-100 fw-bold fs-5 p-2" onclick="editContact('${c.id}')">✏️ Edit</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-danger w-100 fw-bold fs-5 p-2" onclick="deleteContact('${c.id}')">🗑️ Delete</button>
                    </div>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

// FUNCIONES PARA ENVIAR DATOS DE VUELTA AL FORMULARIO (EDITAR)
function editMedication(id) {
    let medications = getLocalData('medications');
    let med = medications.find(m => m.id === id);
    if (!med) return;

    // Cargamos los valores en el formulario
    document.getElementById('med-name').value = med.name;
    document.getElementById('med-dosage').value = med.dosage;
    document.getElementById('med-time').value = med.schedule_time;

    // Eliminamos el viejo de la lista para que al dar "Save" se guarde el actualizado
    medications = medications.filter(m => m.id !== id);
    saveLocalData('medications', medications);
    renderMedicationsPage();

    // Hacemos scroll suave hacia arriba para que el usuario vea el formulario cargado
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// FUNCIONES PARA ENVIAR DATOS DE VUELTA AL FORMULARIO (EDITAR)
function editContact(id) {
    let contacts = getLocalData('contacts');
    let c = contacts.find(item => item.id === id);
    if (!c) return;

    // Cargamos los valores en el formulario
    document.getElementById('contact-name').value = c.name;
    document.getElementById('contact-relationship').value = c.relationship;
    document.getElementById('contact-phone').value = c.phone_number;

    // Eliminamos el viejo de la lista
    contacts = contacts.filter(item => item.id !== id);
    saveLocalData('contacts', contacts);
    renderContactsPage();

    window.scrollTo({top: 0, behavior: 'smooth'});
}

// ==========================================
// 6. EVENT LISTENERS & BACKGROUND MONITOR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    renderDashboard();
    renderMedicationsPage();
    renderContactsPage();

    const medForm = document.getElementById('medication-form');
    if (medForm) {
        medForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('med-name').value;
            const dosage = document.getElementById('med-dosage').value;
            const time = document.getElementById('med-time').value;
            saveMedication(name, dosage, time);
            medForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const relationship = document.getElementById('contact-relationship').value;
            const phone = document.getElementById('contact-phone').value;
            saveContact(name, relationship, phone);
            contactForm.reset();
        });
    }

    setInterval(renderDashboard, 10000);
});
