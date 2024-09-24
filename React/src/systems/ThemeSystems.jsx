export function toggleClassOnBody(removeClass, addClass) {
    document.body.classList.remove(removeClass);
    document.body.classList.add(addClass);
}

export function changeTheme(tema, setTema) {
    if (tema === "light") {
        setTema("dark");
        toggleClassOnBody("root-light", "root-dark");
        localStorage.setItem("tema", "dark");
    } else {
        setTema("light");
        toggleClassOnBody("root-dark", "root-light");
        localStorage.setItem("tema", "light");
    }
}