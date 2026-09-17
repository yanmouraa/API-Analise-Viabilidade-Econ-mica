const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("#sidebar-toggle");
const navigationItems = document.querySelectorAll("[data-nav-item]");

function atualizarEstadoSidebar(collapsed) {
    document.body.classList.toggle("sidebar_collapsed", collapsed);
    document.body.classList.toggle("sidebar_expanded", !collapsed);
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
    sidebarToggle.setAttribute("title", collapsed ? "Expandir menu" : "Recolher menu");
}

sidebarToggle.addEventListener("click", () => {
    atualizarEstadoSidebar(!document.body.classList.contains("sidebar_collapsed"));
});

navigationItems.forEach((item) => {
    item.addEventListener("click", () => {
        navigationItems.forEach((navigationItem) => {
            navigationItem.classList.remove("active");
            navigationItem.removeAttribute("aria-current");
        });

        item.classList.add("active");
        item.setAttribute("aria-current", "page");
    });
});

atualizarEstadoSidebar(true);