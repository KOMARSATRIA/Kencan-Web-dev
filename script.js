// Mengunci tanggal minimal agar hari ini (tidak bisa pilih tanggal lampau)
const today = new Date().toISOString().split('T')[0];
document.getElementById('dateValue').min = today;
document.getElementById('dateValue').value = today;

function generateTicket() {
    const name = document.getElementById('partnerName').value.trim();
    const rawDate = document.getElementById('dateValue').value;
    const time = document.getElementById('timeValue').value;
    const timezone = document.getElementById('timezone').value;
    const activity = document.getElementById('activity').value;

    // Validasi jika input nama masih kosong
    if (name === "") {
        alert("Harap tulis nama dulu ya! 🥰");
        return;
    }

    // Mengubah format tanggal (Contoh: 12 Juni 2026)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(rawDate).toLocaleDateString('id-ID', options);

    // Menggabungkan waktu kustom (Contoh: "18:30 WIB - Selesai")
    const formattedTime = `${time} ${timezone} - Selesai`;

    // Membuat kode tiket acak unik
    const randomCode = "DATE-" + Math.floor(1000 + Math.random() * 9000);

    // Memasukkan input user ke template tiket text
    document.getElementById('lblTarget').innerText = name;
    document.getElementById('lblDate').innerText = formattedDate;
    document.getElementById('lblTime').innerText = formattedTime;
    document.getElementById('lblActivity').innerText = activity;
    document.getElementById('lblCode').innerText = randomCode;

    // Sembunyikan bagian form input, lalu tampilkan tiket wrapper
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('ticketWrapper').style.display = 'block';
}

function resetForm() {
    // Mengembalikan form ke keadaan semula
    document.getElementById('partnerName').value = "";
    document.getElementById('timeValue').value = "16:00";
    document.getElementById('timezone').value = "WIB";
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('ticketWrapper').style.display = 'none';
}
