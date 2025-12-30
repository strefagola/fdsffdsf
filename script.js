// 🔥 script.js
let isAdmin = false;
let currentDocId = null;
let currentSection = null;

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    const section = link.getAttribute('data-section');
    showSection(section);
  });
});

function showSection(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id !== 'home') loadSection(id);
}

auth.onAuthStateChanged(user => {
  isAdmin = user && user.email === "admin@sgstrefagola.pl";
  document.getElementById('loginForm').classList.toggle('hidden', isAdmin);
  document.getElementById('adminTools').classList.toggle('hidden', !isAdmin);
  if (isAdmin) {
    ['news','results','analysis','media','history','schedule'].forEach(loadSection);
  }
});

function loginAdmin() {
  const pass = document.getElementById('adminPass').value;
  auth.signInWithEmailAndPassword("admin@sgstrefagola.pl", pass)
    .catch(() => document.getElementById('loginErr').textContent = "Błędne hasło");
}

function logoutAdmin() {
  auth.signOut();
}

function openAddForm(section) {
  if (!isAdmin) return;
  currentDocId = null;
  currentSection = section;
  document.getElementById('modalTitle').textContent = "Dodaj treść";
  document.getElementById('modalSection').value = section;
  resetModal();
  document.getElementById('modal').classList.remove('hidden');
}

function openEditForm(section, docId, data) {
  if (!isAdmin) return;
  currentDocId = docId;
  currentSection = section;
  document.getElementById('modalSection').value = section;
  document.getElementById('modalTitleInput').value = data.title || '';
  document.getElementById('modalContent').value = data.content || '';
  document.getElementById('modalImage').value = data.imageUrl || '';
  document.getElementById('modalVideo').value = data.videoUrl || '';
  document.getElementById('modalDelBtn').classList.remove('hidden');
  document.getElementById('modal').classList.remove('hidden');
}

function resetModal() {
  document.getElementById('modalTitleInput').value = '';
  document.getElementById('modalContent').value = '';
  document.getElementById('modalImage').value = '';
  document.getElementById('modalVideo').value = '';
  document.getElementById('modalDelBtn').classList.add('hidden');
  document.getElementById('modalErr').textContent = '';
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  resetModal();
}

function embedVideo(url) {
  if (!url) return '';
  const yt = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (yt) return `<iframe src="https://www.youtube.com/embed/${yt[1]}" frameborder="0" allowfullscreen></iframe>`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `<iframe src="https://player.vimeo.com/video/${vimeo[1]}" frameborder="0" allowfullscreen></iframe>`;
  if (url.endsWith('.mp4') || url.endsWith('.webm')) return `<video controls style="width:100%"><source src="${url}" type="video/mp4"></video>`;
  return `<a href="${url}" target="_blank" style="display:inline-block;padding:8px 16px;background:#1d4ed8;color:white;border-radius:8px;text-decoration:none;">Otwórz film</a>`;
}

async function saveContent() {
  const title = document.getElementById('modalTitleInput').value.trim();
  const content = document.getElementById('modalContent').value.trim();
  const imageUrl = document.getElementById('modalImage').value.trim();
  const videoUrl = document.getElementById('modalVideo').value.trim();
  const section = document.getElementById('modalSection').value;

  const err = document.getElementById('modalErr');
  if (!title || !content) {
    err.textContent = "Tytuł i treść są wymagane.";
    return;
  }

  const data = { title, content, imageUrl: imageUrl || null, videoUrl: videoUrl || null };

  try {
    if (currentDocId) {
      await db.collection(section).doc(currentDocId).update(data);
    } else {
      await db.collection(section).add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    }
    closeModal();
    loadSection(section);
  } catch (e) {
    err.textContent = "Błąd zapisu.";
  }
}

async function deleteContent() {
  if (!confirm("Na pewno chcesz usunąć tę treść?")) return;
  try {
    await db.collection(currentSection).doc(currentDocId).delete();
    closeModal();
    loadSection(currentSection);
  } catch (e) {
    document.getElementById('modalErr').textContent = "Błąd usuwania.";
  }
}

async function loadSection(section) {
  const container = document.getElementById(section + '-list');
  try {
    const snap = await db.collection(section).orderBy("createdAt", "desc").get();
    if (snap.empty) {
      container.innerHTML = "<p>Brak treści.</p>";
      return;
    }

    let html = '';
    snap.forEach(doc => {
      const d = doc.data();
      const editBtn = isAdmin ? 
        `<button class="edit-btn" onclick="openEditForm('${section}', '${doc.id}', ${JSON.stringify(d).replace(/"/g, '&quot;')})">✎ Edytuj</button>` : '';

      let media = '';
      if (d.imageUrl) media += `<img src="${d.imageUrl}" alt="Zdjęcie">`;
      if (d.videoUrl) media += embedVideo(d.videoUrl);

      html += `
        <div class="content-item">
          ${editBtn}
          <h3>${d.title}</h3>
          <p>${d.content}</p>
          ${media}
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = "<p>Błąd ładowania treści.</p>";
  }
}

// Start
showSection('home');