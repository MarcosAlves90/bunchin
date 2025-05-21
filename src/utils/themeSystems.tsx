export function toggleClassOnHtml(removeClass: string, addClass: string): void {
    const html = document.documentElement;
    if (html.classList.contains(removeClass)) {
        html.classList.remove(removeClass);
    }
    if (!html.classList.contains(addClass)) {
        html.classList.add(addClass);
    }
}

export function changeTheme(tema: string, setTema: (tema: string) => void): void {
    const novoTema = tema === "light" ? "dark" : "light";
    setTema(novoTema);
    toggleClassOnHtml(tema, novoTema);
    localStorage.setItem("tema", novoTema);
}