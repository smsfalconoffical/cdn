document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("toggle");
    const currentTheme = getCookie("themeMode");

    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeToggle.checked = true;
            setThemeMode("dark");
        } else {
            setThemeMode("light");

        }
    }

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            setThemeMode("dark");
        } else {
            setThemeMode("light");
        }
    });

    function setThemeMode(theme) {
        KTApp.setThemeMode(theme, function () {
            console.log(`changed to ${theme} mode`);
            setCookie('themeMode', theme, 365);
            document.documentElement.setAttribute("data-theme", theme);
        });
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }
});