const menuData = {
    "Glavni": ["Satovi", "Parfemi", "Torbice", "Ogrlice", "Prstenovi", "Narukvice"],
    "Torbice": ["Muške", "Ženske"],
    "Parfemi": ["Muški", "Ženski"],
    "Ogrlice": ["Muško", "Žensko"],
    "Narukvice": ["Muško", "Žensko"],
    "Prstenovi": ["Muško", "Žensko"],
    "Satovi": ["Muški", "Ženski"],
    "Sub-Metal": ["Zlato", "Srebro"],
    "Sub-Satovi": ["Zlato", "Srebro", "Gumeni"]
};

// Funkcija za otvaranje menija (preko celog ekrana)
function openFullMenu(key) {
    const menu = document.getElementById('full-menu');
    const content = document.getElementById('menu-content');
    
    // Prikazujemo meni
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Zabranjujemo skrolovanje pozadine
    
    content.innerHTML = `<h2 class="text-blue-400 text-xs font-bold mb-8 tracking-[0.2em] uppercase opacity-70 italic">— Izaberite kategoriju —</h2>`;

    menuData[key].forEach(option => {
        const btn = document.createElement('button');
        btn.className = "menu-btn mb-4 fade-in block w-full"; // Naša zaobljena dugmad
        btn.innerText = option;
        btn.onclick = () => handleMenuClick(key, option);
        content.appendChild(btn);
    });

    // Dugme za nazad ako nismo na početnom meniju
    if(key !== 'Glavni') {
        const back = document.createElement('button');
        back.className = "mt-8 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-blue-600 transition";
        back.innerHTML = "← VRATI SE NAZA";
        back.onclick = () => openFullMenu('Glavni');
        content.appendChild(back);
    }
}

// Logika grananja (Šta se desi kad klikneš na dugme u meniju)
function handleMenuClick(parent, option) {
    if (["Muške", "Ženske", "Muški", "Ženski", "Muško", "Žensko"].includes(option)) {
        if (parent === "Satovi") {
            openFullMenu('Sub-Satovi');
        } else if (parent === "Parfemi" || parent === "Torbice") {
            showProducts(option); // Odmah slike za torbe i parfeme
        } else {
            openFullMenu('Sub-Metal'); // Za nakit ide izbor Zlato/Srebro
        }
    } else if (["Zlato", "Srebro", "Gumeni"].includes(option)) {
        showProducts(option); // Konačno prikazujemo slike
    } else {
        openFullMenu(option); // Otvaramo sledeći nivo (npr. Satovi -> Muški/Ženski)
    }
}

// Zatvaranje menija
function closeFullMenu() {
    document.getElementById('full-menu').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Prikazivanje GRID-a sa proizvodima (OLX stil)
function showProducts(category) {
    closeFullMenu();
    const section = document.getElementById('shop-section');
    const grid = document.getElementById('product-grid');
    const bread = document.getElementById('breadcrumb');
    
    section.classList.remove('hidden');
    bread.innerText = `KOLEKCIJA / ${category}`;
    grid.innerHTML = '';

    // Generišemo 10 artikala (2 u redu na mobilnom, 5 na laptopu)
    for (let i = 1; i <= 10; i++) {
        const price = (Math.floor(Math.random() * 900) + 49).toFixed(2);
        grid.innerHTML += `
            <div class="olx-card fade-in cursor-pointer" onclick="openDetails('${category} Artikal #${i}', '${price}')">
                <div class="aspect-square bg-white overflow-hidden rounded-t-lg border-b border-gray-100">
                    <img src="https://source.unsplash.com/featured/400x400?jewelry,${category}&sig=${i + Math.random()}" class="w-full h-full object-cover">
                </div>
                <div class="p-4 bg-white">
                    <div class="flex gap-2 mb-2">
                        <span class="text-[9px] border border-blue-200 text-blue-500 px-2 py-0.5 rounded font-bold uppercase">Novo</span>
                        <span class="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase italic">Dostupno odmah</span>
                    </div>
                    <h3 class="text-[13px] font-medium text-slate-700 leading-tight h-10 overflow-hidden mb-4">${category} - Ekskluzivni model iz kolekcije 2026</h3>
                    <div class="flex flex-col">
                        <span class="text-[11px] text-gray-400 line-through">${(parseFloat(price) + 50).toFixed(2)} KM</span>
                        <span class="text-xl font-bold text-red-500">${price} KM</span>
                    </div>
                </div>
            </div>
        `;
    }
    // Automatski skrolujemo do proizvoda
    setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Detaljan prikaz artikla (Modal)
function openDetails(name, price) {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modal.innerHTML = `
        <div class="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-8 md:p-12 relative flex flex-col md:flex-row gap-10 shadow-2xl">
            <button onclick="closeDetails()" class="absolute top-6 right-8 text-4xl text-gray-300 hover:text-blue-900 transition">×</button>
            <div class="md:w-1/2">
                <img src="https://source.unsplash.com/featured/800x800?jewelry&sig=${Math.random()}" class="w-full aspect-square object-cover rounded-[30px] shadow-lg">
                <div class="flex justify-center mt-6 gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div class="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>
            </div>
            <div class="md:w-1/2 flex flex-col justify-center">
                <span class="text-blue-500 font-bold text-xs tracking-widest uppercase mb-2">Zlatara Plavi Safir</span>
                <h2 class="text-4xl font-['Playfair_Display'] text-blue-950 mb-4">${name}</h2>
                <p class="text-3xl font-bold text-blue-600 mb-8">${price} KM</p>
                <div class="bg-blue-50/50 p-6 rounded-2xl mb-8">
                    <p class="text-gray-600 text-sm leading-relaxed italic">
                        "Ručni rad vrhunskog kvaliteta. Svaki detalj je pažljivo obrađen kako bi se osigurao besprekoran izgled i dugovečnost."
                    </p>
                    <p class="text-blue-900 font-bold text-[11px] mt-4 uppercase tracking-wider">● 14K BELO ZLATO / SREBRO 925</p>
                </div>
                <a href="https://wa.me/38765959096" target="_blank" class="w-full py-5 bg-blue-600 text-white rounded-full font-bold text-center shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform hover:scale-105">
                    <i class="fab fa-whatsapp mr-2"></i> PITAJ ZA CIJENU
                </a>
            </div>
        </div>
    `;
}

function closeDetails() {
    document.getElementById('detail-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Inicijalizacija
document.addEventListener('DOMContentLoaded', () => {
    // Ovde ništa ne radimo, čekamo klik na dugme
});
