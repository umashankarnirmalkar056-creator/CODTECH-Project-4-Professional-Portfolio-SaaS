// Base64 Placeholder Avatar Initial Data Hook
let base64ImageData = "https://via.placeholder.com/150";

// ==========================================
// NAVIGATION & ROUTING SYSTEMS
// ==========================================
function navigateTo(pageId) {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'none';
    
    document.getElementById(pageId).style.display = 'flex';
}

// ==========================================
// DYNAMIC THEME MODE SWITCH ENGINE
// ==========================================
function toggleDashboardTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        themeIcon.className = "fa-solid fa-moon";
        themeText.innerText = "Dark Mode";
        localStorage.setItem("portfolioTheme", "light");
    } else {
        themeIcon.className = "fa-solid fa-sun";
        themeText.innerText = "Light Mode";
        localStorage.setItem("portfolioTheme", "dark");
    }
}

// ==========================================
// AUTHENTICATION SECURITY LOGIC
// ==========================================
function handleLogin() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMsg = document.getElementById("loginError");

    if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("saasLoggedIn", "true");
        errorMsg.innerText = "";
        navigateTo('mainApp');
    } else {
        errorMsg.innerText = "❌ Invalid SaaS Credentials";
    }
}

function autoFillDemoCredentials() {
    document.getElementById("email").value = "admin@gmail.com";
    document.getElementById("password").value = "admin123";
}

function handleLogout() {
    localStorage.removeItem("saasLoggedIn");
    navigateTo('landingPage');
}

// ==========================================
// IMAGE READSTREAM BASE64 ENGINE
// ==========================================
function previewProfilePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            base64ImageData = e.target.result;
            document.getElementById('avatarImg').src = base64ImageData;
        }
        reader.readAsDataURL(file);
    }
}

// ==========================================
// SYNC DATA TO TEMPLATE
// ==========================================
function syncPortfolioData() {
    document.getElementById('pfRenderName').innerText = document.getElementById('pName').value;
    document.getElementById('pfRenderTitle').innerText = document.getElementById('pTitle').value;
    document.getElementById('pfRenderAbout').innerText = document.getElementById('pAbout').value;
    document.getElementById('pfRenderBoxImage').src = base64ImageData;
    
    let githubUrl = document.getElementById('pGithub').value;
    let githubLinkNode = document.getElementById('pfRenderGithub');
    githubLinkNode.href = githubUrl;
    githubLinkNode.innerText = githubUrl;

    let skillsInput = document.getElementById('pSkills').value;
    let badgeBox = document.getElementById('pfRenderSkills');
    badgeBox.innerHTML = "";
    
    skillsInput.split(',').forEach(skill => {
        if(skill.trim() !== "") {
            let span = document.createElement('span');
            span.className = 'skill-badge';
            span.innerText = skill.trim();
            badgeBox.appendChild(span);
        }
    });
}

// ==========================================
// FIXED: OPEN PREVIEW IN NEW WINDOW
// ==========================================
function openPreviewInNewWindow() {
    syncPortfolioData();
    const content = document.getElementById("portfolioPrintArea").innerHTML;
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    
    newWindow.document.write('<html><head><title>Portfolio Preview</title>');
    newWindow.document.write('<style>body{font-family:sans-serif; padding:40px; background:#fff;} img{width:150px; border-radius:50%;} .skill-badge{display:inline-block; padding:5px 10px; background:#eee; margin:5px; border-radius:5px;}</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write(content);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
}

// ==========================================
// FIXED: PRINT/DOWNLOAD PDF IN NEW WINDOW
// ==========================================
function printPortfolio() {
    syncPortfolioData();
    const content = document.getElementById("portfolioPrintArea").innerHTML;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    printWindow.document.write('<html><head><title>Print Portfolio</title>');
    printWindow.document.write('<style>body{font-family:sans-serif; padding:40px; background:#fff;} img{width:150px; border-radius:50%;} .skill-badge{display:inline-block; padding:5px 10px; background:#eee; margin:5px; border-radius:5px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// ==========================================
// AUTOMATED LIFECYCLE DOM HOOKS
// ==========================================
window.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("portfolioTheme") === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("themeIcon").className = "fa-solid fa-moon";
        document.getElementById("themeText").innerText = "Dark Mode";
    }

    if (localStorage.getItem("saasLoggedIn") === "true") {
        navigateTo('mainApp');
    } else {
        navigateTo('landingPage');
    }
});