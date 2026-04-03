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

let currentPath = [];

function openFullMenu(key) {
    const menu = document.getElementById('full-menu');
    const content = document.getElementById('menu-content');
    menu.classList.remove('hidden');
    content.innerHTML = `<h2 class="text-blue-900 text-sm font-bold mb-6 tracking-tighter uppercase opacity-50">${key}</h2>`;

    menuData[key].forEach(option => {
        const btn = document.createElement('button');
        btn.className = "menu-btn mb-3 fade-in";
        btn.innerText = option;
        btn.onclick = () => handleMenuClick(key, option);
        content.appendChild(btn);
    });

    if(key !== 'Glavni') {
        const back = document.createElement('button');
        back.className = "mt-6 text-blue-400 font-bold uppercase text-xs";
        back.innerText = "← Nazad";
        back.onclick = () => openFullMenu('Glavni');
        content.appendChild(back);
    }
}

function handleMenuClick(parent, option) {
    if (option === "Muške" || option === "Ženske" || option === "Muški" || option === "Ženski" || option === "Muško" || option === "Žensko") {
        if (parent === "Satovi") openFullMenu('Sub-Satovi');
        else if (parent === "Parfemi" || parent === "Torbice") showProducts(option);
        else openFullMenu('Sub-Metal');
    } else if (option === "Zlato" || option === "Srebro" || option === "Gumeni") {
        showProducts(option);
    } else {
        openFullMenu(option);
    }
}

function closeFullMenu() {
    document.getElementById('full-menu').classList.add('hidden');
}

function showProducts(category) {
    closeFullMenu();
    const section = document.getElementById('shop-section');
    const grid = document.getElementById('product-grid');
    const bread = document.getElementById('breadcrumb');
    
    section.classList.remove('hidden');
    bread.innerText = `Kolekcija / ${category}`;
    grid.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        const price = (Math.random() * 500 + 50).toFixed(2);
        grid.innerHTML += `
            <div class="olx-card fade-in" onclick="openDetails('${category} Model ${i}', '${price}')">
                <div class="aspect-square bg-slate-100 overflow-hidden rounded-t-lg">
                    <img src="https://source.unsplash.com/featured/?jewelry,${category}&sig=${i}" class="w-full h-full object-cover">
                </div>
                <div class="p-3">
                    <span class="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">Novo</span>
                    <h3 class="text-sm font-semibold mt-2 text-slate-700 truncate">${category} Artikal #${i}</h3>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-blue-900 font-bold">${price} KM</span>
                    </div>
                </div>
            </div>
        `;
    }
    window.scrollTo({ top: section.offsetTop - 100, behavior: 'smooth' });
}

function openDetails(name, price) {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    modal.innerHTML = `
        <div class="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 relative flex flex-col md:flex-row gap-8">
            <button onclick="this.parentElement.parentElement.classList.add('hidden')" class="absolute top-4 right-6 text-3xl">&times;</button>
            <div class="md:w-1/2">
                <img src="https://source.unsplash.com/featured/?jewelry&sig=${Math.random()}" class="w-full aspect-square object-cover rounded-2xl">
                <div class="flex justify-center mt-4">
                    <div class="gallery-dot bg-blue-600"></div>
                    <div class="gallery-dot"></div>
                    <div class="gallery-dot"></div>
                </div>
            </div>
            <div class="md:w-1/2">
                <h2 class="text-3xl font-['Playfair_Display'] text-blue-950 mb-2">${name}</h2>
                <p class="text-2xl font-bold text-blue-600 mb-6">${price} KM</p>
                <div class="border-t border-b py-6 my-6">
                    <p class="text-gray-500 leading-relaxed text-sm">
                        Ovaj ekskluzivni komad iz naše najnovije kolekcije odlikuje se vrhunskom završnom obradom. 
                        Unikatan dizajn, ručni rad. Dostupno odmah u radnji u Gradišci.
                    </p>
                </div>
                <button class="w-full py-4 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition">NARUČI PREKO WHATSAPP-A</button>
            </div>
        </div>
    `;
}
