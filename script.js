const config = {
    categories: {
        "Satovi": ["Muški - Metalni", "Ženski - Metalni", "Gumeni (G-Shock)"],
        "Parfemi": ["Muški", "Ženski"],
        "Torbice": ["Muške", "Ženske"],
        "Ogrlice": ["Muške - Zlato", "Muške - Belo Zlato", "Muške - Srebro", "Ženske - Zlato", "Ženske - Belo Zlato", "Ženske - Srebro"],
        "Prstenovi": ["Muški - Zlato", "Muški - Srebro", "Ženski - Zlato", "Ženski - Belo Zlato", "Ženski - Srebro"],
        "Narukvice": ["Muške - Zlato", "Muške - Srebro", "Ženske - Zlato", "Ženske - Belo Zlato", "Ženske - Srebro"]
    },
    images: {
        "Satovi": "watch,luxury",
        "Parfemi": "perfume,luxury",
        "Torbice": "handbag,luxury",
        "Ogrlice": "necklace,gold",
        "Prstenovi": "ring,diamond",
        "Narukvice": "bracelet,jewelry"
    }
};

const gShockModels = ["GA-2100-1AER", "DW-5600BB-1ER", "GA-100-1A1ER", "GG-B100-1AER", "GW-M5610U-1ER"];

function init() {
    renderMainCategories();
}

function renderMainCategories() {
    const selector = document.getElementById('category-selector');
    const grid = document.getElementById('product-grid');
    const bread = document.getElementById('category-bread-crumbs');
    
    selector.innerHTML = '';
    grid.innerHTML = '';
    bread.innerHTML = 'Sve Kategorije';

    Object.keys(config.categories).forEach(cat => {
        const btn = document.createElement('div');
        btn.className = "cursor-pointer border border-[#d4af37]/20 p-6 text-center hover:bg-[#d4af37] hover:text-[#0a192f] transition-all duration-500 glow-gold fade-in-up";
        btn.innerHTML = `<span class="uppercase tracking-widest text-[11px] font-bold">${cat}</span>`;
        btn.onclick = () => selectSubCategory(cat);
        selector.appendChild(btn);
    });
}

function selectSubCategory(cat) {
    const selector = document.getElementById('category-selector');
    const bread = document.getElementById('category-bread-crumbs');
    
    selector.innerHTML = '';
    bread.innerHTML = `Početna / ${cat}`;

    config.categories[cat].forEach(sub => {
        const btn = document.createElement('div');
        btn.className = "cursor-pointer border border-[#0f52ba]/40 p-4 text-center hover:border-[#d4af37] transition-all fade-in-up bg-[#071121]";
        btn.innerHTML = `<span class="uppercase tracking-tighter text-[10px]">${sub}</span>`;
        btn.onclick = () => renderProducts(cat, sub);
        selector.appendChild(btn);
    });

    const back = document.createElement('div');
    back.className = "col-span-full text-center mt-6 text-[#d4af37] cursor-pointer text-xs underline uppercase tracking-widest";
    back.innerText = "← Povratak";
    back.onclick = renderMainCategories;
    selector.appendChild(back);
}

function renderProducts(mainCat, subCat) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    for(let i = 1; i <= 10; i++) {
        const price = Math.floor(Math.random() * (4000 - 200) + 200);
        const isGShock = subCat.includes("G-Shock");
        const title = isGShock ? gShockModels[i % 5] : `${subCat} Ref.${1000 + i + Math.floor(Math.random()*500)}`;
        
        const item = document.createElement('div');
        item.className = "product-card group cursor-pointer fade-in-up";
        item.innerHTML = `
            <div class="relative overflow-hidden aspect-[4/5] bg-[#071121] mb-5 border border-white/5">
                <img src="https://source.unsplash.com/featured/800x1000?${config.images[mainCat]}&sig=${i+Math.random()}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
            </div>
            <div class="flex justify-between items-end">
                <div>
                    <h3 class="text-xs uppercase tracking-widest text-gray-400 mb-1">${mainCat}</h3>
                    <p class="font-['Playfair_Display'] text-xl">${title}</p>
                </div>
                <p class="text-[#d4af37] font-bold text-lg">${price} KM</p>
            </div>
        `;
        item.onclick = () => openModal(mainCat, title, price, i);
        grid.appendChild(item);
    }
}

function openModal(cat, title, price, idx) {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modal.innerHTML = `
        <div class="bg-[#0a192f] border border-[#d4af37]/30 max-w-6xl w-full max-h-[95vh] overflow-y-auto p-6 md:p-12 relative flex flex-col md:flex-row gap-12">
            <button onclick="closeModal()" class="absolute top-6 right-6 text-3xl text-[#d4af37] hover:rotate-90 transition-transform">×</button>
            
            <div class="md:w-1/2 space-y-4">
                <img id="main-img" src="https://source.unsplash.com/featured/1000x1200?${config.images[cat]}&sig=${idx}" class="w-full aspect-[4/5] object-cover border border-[#d4af37]/10">
                <div class="grid grid-cols-5 gap-2">
                    ${[1,2,3,4,5].map(n => `<img src="https://source.unsplash.com/featured/400x500?${config.images[cat]}&sig=${n+20}" onclick="document.getElementById('main-img').src=this.src" class="gallery-thumb h-20 w-full object-cover border border-white/10">`).join('')}
                </div>
            </div>

            <div class="md:w-1/2 flex flex-col justify-center">
                <h2 class="font-['Playfair_Display'] text-5xl mb-6">${title}</h2>
                <p class="text-3xl text-[#d4af37] mb-8 font-light">${price} KM</p>
                <div class="space-y-4 text-gray-400 leading-relaxed border-t border-[#d4af37]/20 pt-8 mb-8">
                    <p>• Ekskluzivna ručna izrada</p>
                    <p>• Vrhunska završna obrada i kontrola kvaliteta</p>
                    <p>• Garancija autentičnosti Zlatare Plavi Safir</p>
                    <p class="italic mt-4">"Nakit koji čuva uspomene."</p>
                </div>
                <a href="https://wa.me/38765959096" class="block text-center bg-[#d4af37] text-[#0a192f] py-5 uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors duration-500">Pošalji Upit</a>
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

window.onload = init;
