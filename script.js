const productNames = {
    "Satovi": ["Royal Oak", "Submariner", "Daytona", "Classic Fusion", "Nautilus", "Speedmaster", "Seamaster", "Black Bay", "Navitimer", "Carrera"],
    "Parfemi": ["Midnight Oud", "Blue Sapphire", "Golden Dust", "Silver Rain", "Imperial", "Velvet Rose", "Ocean Breeze", "Mystic Night", "Pure Silk", "Noble Leather"],
    "Torbice": ["Milano", "Parisian", "Venice Lux", "Roma", "Madrid", "London Soul", "Berlin Chic", "Monaco", "Vienna", "Florence"],
    "Ogrlice": ["Venezia", "Infinity", "Luna", "Stella", "Aurora", "Diamond Heart", "Crystal Drop", "Royal Chain", "Elegance", "Serenity"],
    "Prstenovi": ["Solitaire", "Sparkle", "Crown", "Destiny", "Promise", "Eternal", "Halo", "Vintage Glow", "Modern Love", "Tiara"],
    "Narukvice": ["Bangle Lux", "Tennis Star", "Golden Mesh", "Silver Link", "Butterfly", "Charm", "Nodes", "Spiral", "Grace", "Unity"]
};

const gShockModels = ["GA-2100-1AER", "DW-5600BB-1ER", "GA-100-1A1ER", "GG-B100-1AER", "GW-M5610U-1ER", "GA-2100SKE", "DW-6900", "GM-2100", "GST-B400", "GX-56BB"];

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

let menuHistory = [];

function openFullMenu(key) {
    const menu = document.getElementById('full-menu');
    const content = document.getElementById('menu-content');
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    content.innerHTML = `<h2 class="text-blue-400 text-[10px] font-bold mb-10 tracking-[0.4em] uppercase opacity-60 italic">— ${key} —</h2>`;

    menuData[key].forEach(option => {
        const btn = document.createElement('button');
        btn.className = "menu-btn mb-4 fade-in";
        btn.innerText = option;
        btn.onclick = () => {
            menuHistory.push(key);
            handleMenuClick(key, option);
        };
        content.appendChild(btn);
    });

    if(key !== 'Glavni') {
        const backBtn = document.createElement('button');
        backBtn.className = "mt-10 py-3 px-10 border-2 border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-widest rounded-full hover:border-blue-600 hover:text-blue-600 transition-all";
        backBtn.innerHTML = "← Vrati se nazad";
        backBtn.onclick = () => {
            const lastMenu = menuHistory.pop();
            openFullMenu(lastMenu || 'Glavni');
        };
        content.appendChild(backBtn);
    }
}

function handleMenuClick(parent, option) {
    if (["Muške", "Ženske", "Muški", "Ženski", "Muško", "Žensko"].includes(option)) {
        if (parent === "Satovi") openFullMenu('Sub-Satovi');
        else if (parent === "Parfemi" || parent === "Torbice") showProducts(option, parent);
        else openFullMenu('Sub-Metal');
    } else if (["Zlato", "Srebro", "Gumeni"].includes(option)) {
        let realCat = menuHistory[menuHistory.length - 1] || parent;
        showProducts(option, realCat);
    } else {
        openFullMenu(option);
    }
}

function closeFullMenu() {
    document.getElementById('full-menu').classList.add('hidden');
    document.body.style.overflow = 'auto';
    menuHistory = [];
}

function showProducts(subCategory, mainCategory) {
    closeFullMenu();
    const section = document.getElementById('shop-section');
    const grid = document.getElementById('product-grid');
    const bread = document.getElementById('breadcrumb');
    
    section.classList.remove('hidden');
    bread.innerText = `KOLEKCIJA / ${mainCategory} / ${subCategory}`;
    grid.innerHTML = '';

    const namesList = productNames[mainCategory] || ["Elegance", "Lux", "Prestige"];

    for (let i = 0; i < 10; i++) {
        const price = (Math.floor(Math.random() * 800) + 120).toFixed(2);
        const oldPrice = (parseFloat(price) + 80).toFixed(2);
        let finalName = subCategory === "Gumeni" ? `G-Shock ${gShockModels[i]}` : `${mainCategory} "${namesList[i % namesList.length]}"`;

        grid.innerHTML += `
            <div class="olx-card fade-in cursor-pointer" onclick="openDetails('${finalName}', '${price}', '${mainCategory}')">
                <div class="aspect-square bg-white overflow-hidden border-b border-slate-50">
                    <img src="https://source.unsplash.com/featured/500x500?${mainCategory.toLowerCase()},jewelry&sig=${i + Math.random()}" class="w-full h-full object-cover">
                </div>
                <div class="p-4">
                    <div class="flex gap-2 mb-2">
                        <span class="text-[9px] border border-blue-100 text-blue-500 px-2 py-0.5 rounded font-bold uppercase">Novo</span>
                        <span class="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold uppercase italic">Akcija</span>
                    </div>
                    <h3 class="text-[13px] font-bold text-slate-700 leading-tight h-10 mb-3 uppercase tracking-tight">${finalName}</h3>
                    <div class="flex flex-col">
                        <span class="text-[10px] text-slate-300 line-through">${oldPrice} KM</span>
                        <span class="text-xl font-bold text-blue-600">${price} KM</span>
                    </div>
                </div>
            </div>
        `;
    }
    setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 300);
}

function openDetails(name, price, cat) {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modal.innerHTML = `
        <div class="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative flex flex-col md:flex-row gap-10">
            <button onclick="closeDetails()" class="absolute top-6 right-8 text-4xl text-slate-200 hover:text-blue-600">×</button>
            <div class="md:w-1/2">
                <img src="https://source.unsplash.com/featured/800x800?${cat.toLowerCase()},jewelry&sig=${Math.random()}" class="w-full aspect-square object-cover rounded-[30px] border border-slate-100">
                <div class="flex justify-center mt-6 gap-2">
                    <div class="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div class="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
            </div>
            <div class="md:w-1/2 flex flex-col justify-center">
                <h2 class="text-4xl font-['Playfair_Display'] text-blue-950 mb-3">${name}</h2>
                <p class="text-3xl font-bold text-blue-600 mb-8">${price} KM</p>
                <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 text-sm text-slate-500 italic leading-relaxed italic">
                    "Vrhunski komad iz kolekcije Plavi Safir. Ručna izrada, garancija na kvalitet i autentičnost. Dostupno odmah u radnji."
                </div>
                <a href="https://wa.me/38765959096" target="_blank" class="w-full py-5 bg-blue-600 text-white rounded-full font-bold text-center shadow-xl shadow-blue-100 hover:bg-blue-700 transition transform hover:scale-105 active:scale-95">
                    <i class="fab fa-whatsapp mr-2"></i> NARUČI PREKO WHATSAPP-A
                </a>
            </div>
        </div>
    `;
}

function closeDetails() {
    document.getElementById('detail-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
