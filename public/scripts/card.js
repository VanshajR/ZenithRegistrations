const gs = [
    {
        name: 'Naman Babbar',
        instagramId: 'naman.xyz',
        linkedinId: 'namanbabbar',
        githubId: 'nmnbabbar',
        imageLink: 'https://i.postimg.cc/bJfd0Gcm/IMG-0167-Naman-Babbar.jpg',
        designation: 'Gen Sec',
    },
    {
        name: 'Aarushi Gupta',
        instagramId: 'aaaarrushi',
        linkedinId: 'aarushigupta16',
        githubId: 'aarushi1610',
        imageLink: 'https://i.postimg.cc/hPqp5Mgr/profile-pic-aarushi-gupta.jpg',
        designation: 'Joint Gen Sec',
    }
    
];

const gs_container = document.getElementById('Cardsgs');
const teamHtmlgs = gs.map(member => `
    <div class="gs" id="${member.name}">
        <div class="card_container">
            <div class="card_details">
                <img src="${member.imageLink}"
                        alt="${member.name}" class="details" id="profilepicture">
                <h2><span class="nme" id="nme">${member.name}
                <h5 class="designation">${member.designation}</h5></span></h2>
                <div class="data">
                    <br>
                    <li>
                        <h4><a href="https://instagram.com/${member.instagramId}" target="_blank"><i class="fa-brands fa-instagram" id="instagram"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://github.com/${member.githubId}" target="_blank"><i class="fa-brands fa-github" id="github"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://www.linkedin.com/in/${member.linkedinId}" target="_blank"><i class="fa-brands fa-linkedin-in" id="linkedin"></i></a></h4>
                    </li>
                </div>
            </div>
        </div>
    </div>
`).join('');

gs_container.innerHTML = teamHtmlgs;



const heads = [
    {
        name: "Vanshaj Raghuvanshi",
        instagramId: "vanshajr_0410",
        linkedinId: 'vanshaj-raghuvanshi-328aa024b',
        githubId: 'VanshajR',
        imageLink: 'https://res.cloudinary.com/dnciaoigz/image/upload/v1707856611/upload_gtp9wd.jpg',
        designation: 'Tech Head',

    },
    {
        name: 'Katyayani Jha',
        instagramId: 'katyayani.jha',
        linkedinId: 'katyayani-jha-1997b9264',
        githubId: 'katyayani-jha',
        imageLink: 'https://i.postimg.cc/pdyZF6Y2/Katyayani-Jha-Katyayani-Jha.jpg',
        designation: 'Design Head',
    },
    {
        name: 'Ridham Uppal',
        instagramId: 'https://www.instagram.com/hey.ridham/',
        linkedinId: 'ridham-uppal-107936268',
        githubId: 'ridham-uppal',
        imageLink: 'https://res.cloudinary.com/dnciaoigz/image/upload/v1707892470/image_50779393_deufew.jpg',
        designation: 'Management Head',
    },
    {
        name: 'Sonal Kasana',
        instagramId: 'sonalkasana_',
        linkedinId: 'sonal-kasana-ba182b27a',
        githubId: 'skasana',
        imageLink: 'https://res.cloudinary.com/dnciaoigz/image/upload/v1707975398/IMG_20240215_110442_jq0coo.jpg',
        designation: 'Treasurer',
    },
]

const heads_container = document.getElementById('Cardsheads');
const teamHtmlheads = heads.map(member => `
    <div class="he" id="${member.name}">
        <div class="card_container">
            <div class="card_details">
                <img src="${member.imageLink}"
                        alt="${member.name}" class="details" id="profilepicture">
                <h2><span class="nme" id="nme">${member.name}
                <h6 class="designation">${member.designation}</h6></span></h2>
                <div class="data">
                    <br>
                    <li>
                        <h4><a href="https://instagram.com/${member.instagramId}" target="_blank"><i class="fa-brands fa-instagram" id="instagram"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://github.com/${member.githubId}" target="_blank"><i class="fa-brands fa-github" id="github"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://www.linkedin.com/in/${member.linkedinId}" target="_blank"><i class="fa-brands fa-linkedin-in" id="linkedin"></i></a></h4>
                    </li>
                </div>
            </div>
        </div>
    </div>
`).join('');

heads_container.innerHTML = teamHtmlheads;

const tts = [
    {
        name: 'Achin Agarwal',
        instagramId: 'achin22446',
        linkedinId: 'achin-agarwal-5ba452296',
        githubId: 'Achin-Agarwal',
        imageLink: 'https://i.postimg.cc/xdKLV3tG/WH33F5-1.jpg',
    },
    {
        name: 'Akansha Joshi',
        instagramId: 'akanshaaaa_joshi',
        linkedinId: 'akansha-joshi-95195a296',
        githubId: 'Akanshajoshiiii',
        imageLink: 'https://i.postimg.cc/FR5DtY1Z/Whats-App-Image-2024-02-04-at-19-46-53.jpg',
    },
    {
        name: 'Amandeep Singh',
        instagramId: 'amandeep.singh____',
        linkedinId: 'amandeep-singh-69a68b26b',
        githubId: 'iaman29',
        imageLink: 'https://i.postimg.cc/jdbCnnQ2/Amandeep-Singh-Amandeep.png',
    },
    {
        name: 'Devansh Vashishat',
        instagramId: 'it_s_106',
        linkedinId: 'devansh-vashishat-89b2a528b',
        githubId: 'genius-de',
        imageLink: 'https://i.postimg.cc/6Q6CwXZz/WHATSA-1.jpg',
    },
    {
        name: 'Jasmine Garg',
        instagramId: 'jazzmine_garg',
        linkedinId: 'jasmine-garg-6b2485248',
        githubId: 'jazzminegarg',
        imageLink: 'https://i.postimg.cc/8zpw157f/1C99CA-1.jpg',
    },
    {
        name: 'Priya Sharma',
        instagramId: 'sharma.priya4',
        linkedinId: 'priya-sharma-8453442a3',
        githubId: 'Priyasharma04',
        imageLink: 'https://i.postimg.cc/c4qYCYYv/WHATSA-3.jpg',
    },
    {
        name: 'Sanya Chakraborty',
        instagramId: '__.shanno',
        linkedinId: 'sanya-chakraborty-6304022a4',
        githubId: 'sanyachakraborty',
        imageLink: 'https://i.postimg.cc/Y2FdRTc0/bcs-img-SANYA-CHAKRABORTY.jpg',
    },
    {
        name: 'Shikhar Saxena',
        instagramId: 'shikhar6219',
        linkedinId: 'shikhar-saxena-90a484296',
        githubId: 'Shikhar1808',
        imageLink: 'https://i.postimg.cc/MTvRMmdQ/WHATSA-1.jpg',
    },
    {
        name: 'Tarshdeep Kaur',
        instagramId: 'tash_u2210',
        linkedinId: 'tarshdeep-kaur-55ba13296',
        githubId: 'Tarshdeep2210',
        imageLink: 'https://i.postimg.cc/YS5DNr3y/Whats-App-Image-2024-02-12-at-14-42-33.jpg',
    },
    {
        name: 'Vaibhav Sundriyal',
        instagramId: 'vaibhav_sundriyal',
        linkedinId: 'vaibhav-sundriyal-aab567283',
        githubId: 'PHYNiX29',
        imageLink: 'https://i.postimg.cc/PqcMzQ21/Whats-App-Image-2024-01-06-at-20-43-36.jpg',
    },
    {
        name: 'Vinesh Sharda',
        instagramId: '__vine.sh_',
        linkedinId: 'vinesh-sharda-740a6a299',
        githubId: 'vsharda-06',
        imageLink: 'https://i.postimg.cc/FHpJTB6S/image-VINESH-SHARDA.jpg',
    },
    {
        name: 'Yash Yadav',
        instagramId: 'yashyash009',
        linkedinId: 'yash-yadav-102868264',
        githubId: 'YashYadav007',
        imageLink: 'https://i.postimg.cc/c1vMr0bb/SCREEN-2.jpg',
    }

]
const tt_container = document.getElementById('rowtt');
const teamHtmltt = tts.map(member => `
    <div class="tt" id="${member.name}">
        <div class="card_container">
            <div class="card_details">
                <img src="${member.imageLink}"
                        alt="${member.name}" class="details" id="profilepicture">
                <h2><span class="nme" id="nme">${member.name}</span></h2>
                <div class="data">
                    <br>
                    <li>
                        <h4><a href="https://instagram.com/${member.instagramId}" target="_blank"><i class="fa-brands fa-instagram" id="instagram"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://github.com/${member.githubId}" target="_blank"><i class="fa-brands fa-github" id="github"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://www.linkedin.com/in/${member.linkedinId}" target="_blank"><i class="fa-brands fa-linkedin-in" id="linkedin"></i></a></h4>
                    </li>
                </div>
            </div>
        </div>
    </div>
`).join('');

tt_container.innerHTML = teamHtmltt;

const dt = [
    {
        name: 'Archisha .',
        instagramId: 'nitrogoose',
        linkedinId: 'archisha-5932a3271',
        githubId: 'nitrogoose',
        imageLink: 'https://i.postimg.cc/qqNtqBBX/IMG-20231209-174417-Archisha.jpg',
    },
    {
        name: 'Awanee Bhanot',
        instagramId: 'awanee_bhanot',
        linkedinId: 'awanee-bhanot-6934482a4',
        githubId: 'awaneebhanot',
        imageLink: 'https://i.postimg.cc/FR5TXx3N/IMG-20231116-WA0107-Awanee-Bhanot.jpg',
    },
    {
        name: 'Chetan Bisht',
        instagramId: 'cbbisht2004',
        linkedinId: 'chetan-bisht-971543191',
        githubId: 'ConfusedKlutz',
        imageLink: 'https://i.postimg.cc/mgmjhs9X/WHATSA-4.jpg',
    },
    {
        name: 'Divjot Singh Gulati',
        instagramId: '_.divjot._24',
        linkedinId: 'divjot-singh-gulati-837313288',
        githubId: 'DivjotSingh24',
        imageLink: 'https://i.postimg.cc/9Q9LLPQM/maybe-achi-pic-Divjot-Singh-Gulati.jpg',
    },
    {
        name: 'Gouri Singh Rawat',
        instagramId: 'Gourisinghrawat_',
        linkedinId: 'gouri-singh-rawat-18185b269',
        githubId: 'gourisinghrawat',
        imageLink: 'https://i.postimg.cc/26Q2kB7v/IMG-20231014-WA0096-Gouri-Singh-Rawat.jpg',
    },
    {
        name: 'Ojasvin Marwah',
        instagramId: 'ojasvin_',
        linkedinId: 'ojasvin-marwah-491900286',
        githubId: 'OJASVINMARWAH',
        imageLink: 'https://i.postimg.cc/RVctHFQX/WHATSA-2.jpg',
    },
    {
        name: 'Palak Masson',
        instagramId: 'palak.masson21',
        linkedinId: 'palak-masson-940070287',
        githubId: 'gitHubPalak21',
        imageLink: 'https://i.postimg.cc/VvX4N09n/Profile-pic-Palak-Masson.jpg',
    },
    {
        name: 'Shruti Thakur',
        instagramId: 'shru_thakur09',
        linkedinId: 'shruti-thakur-5a4330296',
        githubId: 'dashboard',
        imageLink: 'https://i.postimg.cc/wxN4y7bv/Whats-App-Image-2024-02-13-at-21-42-40.jpg',
    }
]
const dt_container = document.getElementById('rowdt');
const teamHtmldt = dt.map(member => `
    <div class="dt" id="${member.name}">
        <div class="card_container">
            <div class="card_details">
                <img src="${member.imageLink}"
                        alt="${member.name}" class="details" id="profilepicture">
                <h2><span class="nme" id="nme">${member.name}</span></h2>
                <div class="data">
                    <br>
                    <li>
                        <h4><a href="https://instagram.com/${member.instagramId}" target="_blank"><i class="fa-brands fa-instagram" id="instagram"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://github.com/${member.githubId}" target="_blank"><i class="fa-brands fa-github" id="github"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://www.linkedin.com/in/${member.linkedinId}" target="_blank"><i class="fa-brands fa-linkedin-in" id="linkedin"></i></a></h4>
                    </li>
                </div>
            </div>
        </div>
    </div>
`).join('');

dt_container.innerHTML = teamHtmldt;

const mt = [
    {
        name: 'Gaurav Yadav',
        instagramId: 'gaurav_yaadavv',
        linkedinId: 'gaurav-yadav-23b181273',
        githubId: 'Gaurav-Rao-1',
        imageLink: 'https://res.cloudinary.com/dnciaoigz/image/upload/v1707976240/WhatsApp_Image_2024-02-15_at_11.17.50_b12346b5_szhr8q.jpg',
    },
    {
        name: "Meera Goyal",
        instagramId: "mgoyal3012/",
        linkedinId: "meera-goyal-434aa2279/",
        githubId: "mgoyal3012",
        imageLink: "https://i.postimg.cc/T1gbddL1/Meera-Goyal.jpg",
    },
    {
        name: 'Nandan Garg',
        instagramId: '_nandann._',
        linkedinId: 'nandan-garg-25a1b0252',
        githubId: 'nandan65', // Replace with the actual GitHub ID if available
        imageLink: 'https://i.postimg.cc/sD3zYYBB/IMG-3298-NANDAN-GARG.jpg',
    },
    {
        name: 'Prithvi Ahuja',
        instagramId: 'prithvi_ahuja04',
        linkedinId: 'prithvi-ahuja-ab8473296',
        githubId: 'prithviahuja',
        imageLink: 'https://i.postimg.cc/QtSnvswp/Whats-App-Image-2024-01.jpg',
    },
    {
        name: 'Sahil Kumar',
        instagramId: 'sahil0._.0',
        linkedinId: 'sahil-kumar-459482296',
        githubId: 'SaHiL-Ez',
        imageLink: 'https://i.postimg.cc/rmrNhRP3/IMG-20230215-234552-Sahil-Kumar.jpg',
    },
    {
        name: 'Samaksh Singh',
        instagramId: '_samaksh_',
        linkedinId: 'samaksh-singh-a38434143',
        githubId: 'Normallysamaksh',
        imageLink: 'https://i.postimg.cc/sXZSm7Yv/93AD34-1.jpg',
    },
    {
        name: 'Sameer Khan',
        instagramId: 'saxmeerr',
        linkedinId: 'sameer-khan-aa3b7724a',
        githubId: 'sameerr24',
        imageLink: 'https://i.postimg.cc/7LbbmY0v/IMG-20230316-171446-461-Sameer-Khan.jpg',
    },
    {
        name: 'Siddhant Bhardwaj',
        instagramId: '_sidbhardwaj47',
        githubId: 'cemlus',
        linkedinId: 'na',
        imageLink: 'https://i.postimg.cc/c1k5rdBK/IMG-1799-Original-Siddhant-Bhardwaj.jpg',
    },
    
]
const mt_container = document.getElementById('rowmt');
const teamHtmlmt = mt.map(member => `
    <div class="mt" id="${member.name}">
        <div class="card_container">
            <div class="card_details">
                <img src="${member.imageLink}"
                        alt="${member.name}" class="details" id="profilepicture">
                <h2><span class="nme" id="nme">${member.name}</span></h2>
                <div class="data">
                    <br>
                    <li>
                        <h4><a href="https://instagram.com/${member.instagramId}" target="_blank"><i class="fa-brands fa-instagram" id="instagram"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://github.com/${member.githubId}" target="_blank"><i class="fa-brands fa-github" id="github"></i></a></h4>
                    </li>
                    <li>
                        <h4><a href="https://www.linkedin.com/in/${member.linkedinId}" target="_blank"><i class="fa-brands fa-linkedin-in" id="linkedin"></i></a></h4>
                    </li>
                </div>
            </div>
        </div>
    </div>
`).join('');

mt_container.innerHTML = teamHtmlmt;
