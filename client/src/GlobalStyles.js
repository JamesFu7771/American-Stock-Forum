import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
--color-outer-space: #2C3639;
--color-cape-cod: #3F4E4F;
--color-leather: #A27B5C;
--color-moon-mist: #DCD7C9;
--color-white: #fff;
--color-gold: #a37e2c;
--color-grey: #f8f8f8;
--color-dark-grey: #d4d4d4;
--main-font: "RolexFont";
--text-font: "Helvetica Now Text","Helvetica Neue","Arial Nova",Helvetica,Arial,sans-serif;
--weight-light: 300;
--weight-regular: 400;
--weight-bold: 700;
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, a
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    vertical-align: baseline;
}

body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}

h1, h2, h3, label, button, p, a, li, blockquote, input {
    font-family: var(--main-font);
}

h1 {
    font-size: 64px;
}

h4 {
    /* font-size: calc(8px + 2vmin); */
    font-size: 20px;
}
a {
    font-size: 18px;
}
`;