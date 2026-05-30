// Menunggu dokumen HTML selesai di-render secara penuh oleh browser
document.addEventListener("DOMContentLoaded", () => {
    // Memberikan durasi penahanan loading screen selama 1.5 detik
    setTimeout(() => {
        const loader = document.getElementById('loader');
        
        if (loader) {
            // Mengubah opasitas menjadi transparan dengan efek transisi CSS
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            
            // Sepenuhnya mencopot loader dari layar setelah efek menghilang selesai (500ms)
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500); 
});

// Fungsi utama pengendali mekanisme penukaran halaman tanpa reload browser
function switchPage(targetPageId) {
    // 1. Mengumpulkan semua elemen section halaman lalu menguncinya
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.add('page-hidden');
        page.classList.remove('page-enter');
    });

    // 2. Membuka blokir elemen section halaman yang dituju
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.remove('page-hidden');
        void targetPage.offsetWidth; 
        targetPage.classList.add('page-enter');
    }

    // --- FIX KARTU LOOKER STUDIO KECIL ---
    // Cek apakah user sedang membuka halaman dashboard
    if (targetPageId === 'dashboard') {
        const iframe = document.querySelector('.iframe-container iframe');
        // Kalau iframe ada, dan atribut src-nya masih kosong...
        if (iframe && !iframe.getAttribute('src')) {
            // Pindahkan link dari data-src ke src buat memicu loading saat itu juga
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
        }
    }
    // -------------------------------------

    // 3. Mengubah gaya tampilan visual menu navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'font-bold', 'bg-blue-50');
        link.classList.add('text-slate-500', 'font-medium', 'hover:bg-slate-50');
    });

    // Menambahkan aksen warna menu aktif
    const activeNav = document.getElementById(`nav-${targetPageId}`);
    if (activeNav) {
        activeNav.classList.remove('text-slate-500', 'font-medium', 'hover:bg-slate-50');
        activeNav.classList.add('text-blue-600', 'font-bold', 'bg-blue-50');
    }
}