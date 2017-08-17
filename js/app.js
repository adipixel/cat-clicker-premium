
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    setCat: function(cat) {
        model.currentCat.name = cat.name;
        model.currentCat.imgSrc = cat.imgSrc;
        model.currentCat.clickCount = cat.clickCount;
    },
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        this.adminBtn = document.getElementById('admin-btn');
        this.cancel = document.getElementById('cancel');
        this.submit = document.getElementById('submit');
        this.catNameElemE = document.getElementById('cat-name-e');
        this.catImageElemE = document.getElementById('cat-img-e');
        this.countElemE = document.getElementById('cat-count-e');
        this.adminPanel = document.getElementById('admin-panel');
        this.adminPanel.style.display = 'none';

        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        var tempAP = this.adminPanel;
        this.adminBtn.addEventListener('click', (function(tempAP){
            return function(){
                tempAP.style.display = 'block';
            }
        })(tempAP));

        this.cancel.addEventListener('click', (function(tempAP){
            return function(){
                tempAP.style.display = 'none';
            }
        })(tempAP));

        var catNameElemE = this.catNameElemE;
        var countElemE = this.countElemE;
        var catImageElemE = this.catImageElemE;
        this.submit.addEventListener('click', (function(catNameElemE, countElemE, catImageElemE){
            return function()
            {
                var cat = {
                    name: catNameElemE.value,
                    clickCount : countElemE.value,
                    imgSrc : catImageElemE.value,
                    imgAttribution : 'https://www.flickr.com/'
                }
                octopus.setCat(cat);
                catView.render();
            }
        })(catNameElemE, countElemE, catImageElemE));


        

        this.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;

        this.countElemE.value = currentCat.clickCount;
        this.catNameElemE.value = currentCat.name;
        this.catImageElemE.value = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render: function() {
        var cat, elem, i;
        var cats = octopus.getCats();

        this.catListElem.innerHTML = '';

        for (i = 0; i < cats.length; i++) {
            cat = cats[i];

            elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem);
        }
    }
};

octopus.init();
