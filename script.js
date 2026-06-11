// Mengunci tanggal minimal agar hari ini (tidak bisa pilih tanggal lampau)
const today = new Date().toISOString().split('T')[0];
document.getElementById('dateValue').min = today;
document.getElementById('dateValue').value = today;

// Variabel global untuk menyimpan data yang akan dikirim ke WA
let ticketData = {};

function generateTicket() {
    const name = document.getElementById('partnerName').value.trim();
    const rawDate = document.getElementById('dateValue').value;
    const time = document.getElementById('timeValue').value;
    const timezone = document.getElementById('timezone').value;
    const activity = document.getElementById('activity').value;

    // Validasi jika input nama masih kosong
    if (name === "") {
        alert("Harap masukkan nama pasanganmu dulu ya! 🥰");
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

    // Simpan data ke variabel global untuk keperluan kirim ke WA
    ticketData = {
        name: name,
        date: formattedDate,
        time: formattedTime,
        activity: activity,
        code: randomCode
    };

    // Sembunyikan bagian form input, lalu tampilkan tiket wrapper
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('ticketWrapper').style.display = 'block';
}

// Fungsi Baru untuk mengirim detail tiket ke WhatsApp
function sendToWhatsApp() {
    // GANTI NOMOR DI BAWAH INI DENGAN NOMOR WHATSAPP KAMU
    const myPhoneNumber = "+6281932475240"; 

    // Menyusun teks pesan WhatsApp dengan format yang rapi
    const message = `Halo! Aku sudah buat tiket kencan kita nih ✨%0A%0A` +
                    `*🎫 VOUCHER KENCAN SPESIAL* %0A` +
                    `----------------------------------------%0A` +
                    `• *Kode Tiket:* ${ticketData.code}%0A` +
                    `• *Untuk:* ${ticketData.name}%0A` +
                    `• *Tanggal:* ${ticketData.date}%0A` +
                    `• *Waktu:* ${ticketData.time}%0A` +
                    `• *Agenda:* ${ticketData.activity}%0A` +
                    `----------------------------------------%0A` +
                    `Sampai ketemu di hari H ya! 🥰❤️`;

    // Membuka tautan WhatsApp di tab baru
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${myPhoneNumber}&text=${message}`;
    window.open(whatsappUrl, '_blank');
}
function downloadTicket() {
    const ticketElement = document.getElementById('ticketContent');
    
    // Memberikan sedikit info ke user karena proses convert butuh 1-2 detik
    const downloadBtn = document.querySelector('.action-btns .btn:not(.btn-secondary)');
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "Mengunduh... ⏳";
    downloadBtn.disabled = true;

    // Mengubah elemen tiket menjadi Canvas gambar
    html2canvas(ticketElement, {
        scale: 2, // Menggandakan resolusi gambar agar hasilnya jernih dan tidak blur
        backgroundColor: null, // Membuat background sekitar potongan tiket transparan
        useCORS: true
    }).then(canvas => {
        // Mengubah canvas menjadi link download gambar PNG
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        
        // Memberi nama file gambar yang diunduh
        link.download = `Tiket_Kencan_${ticketData.name.replace(/\s+/g, '_')}.png`;
        link.href = image;
        link.click();

        // Mengembalikan tombol ke kondisi semula
        downloadBtn.innerText = originalText;
        downloadBtn.disabled = false;
    }).catch(error => {
        alert("Waduh, gagal menyimpan gambar secara otomatis. Silakan gunakan screenshot manual di HP ya! 🙏");
        downloadBtn.innerText = originalText;
        downloadBtn.disabled = false;
    });
}
